package com.reactlibrary;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.PaymentDataRequest;
import com.google.android.gms.wallet.PaymentsClient;
import com.google.android.gms.wallet.WalletConstants;
import com.judopay.IdealPaymentActivity;
import com.judopay.Judo;
import com.judopay.JudoApiService;
import com.judopay.PaymentActivity;
import com.judopay.PaymentMethodActivity;
import com.judopay.PreAuthActivity;
import com.judopay.arch.GooglePaymentUtils;
import com.judopay.error.JudoIdInvalidError;
import com.judopay.model.CardToken;
import com.judopay.model.Consumer;
import com.judopay.model.GooglePayRequest;
import com.judopay.model.OrderDetails;
import com.judopay.model.PaymentMethod;
import com.judopay.model.Receipt;
import com.judopay.model.Risks;

import java.text.SimpleDateFormat;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.TimeZone;

import javax.annotation.Nonnull;

import io.reactivex.Single;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;

import static com.judopay.Judo.GPAY_REQUEST;
import static com.judopay.Judo.IDEAL_PAYMENT;
import static com.judopay.Judo.JUDO_OPTIONS;
import static com.judopay.Judo.JUDO_RECEIPT;
import static com.judopay.Judo.LIVE;
import static com.judopay.Judo.PAYMENT_METHOD;
import static com.judopay.Judo.PAYMENT_REQUEST;
import static com.judopay.Judo.PRE_AUTH_REQUEST;
import static com.judopay.Judo.RESULT_CANCELED;
import static com.judopay.Judo.RESULT_DECLINED;
import static com.judopay.Judo.RESULT_ERROR;
import static com.judopay.Judo.RESULT_SUCCESS;
import static com.judopay.Judo.SANDBOX;

public class JudoReactNativeModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static final String JUDO_ERROR = "JUDO_ERROR";
    private static final String JUDO_USER_CANCELLED = "JUDO_USER_CANCELLED";
    private static final String INVALID_CONFIGURATION = "Configuration error";

    private Promise promise;
    private ReadableMap options;
    private Disposable disposable;
    @SuppressWarnings("FieldCanBeLocal")
    private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (promise == null) {
                return;
            }

            if (requestCode == PAYMENT_REQUEST || requestCode == PRE_AUTH_REQUEST || requestCode == PAYMENT_METHOD || requestCode == IDEAL_PAYMENT) {
                switch (resultCode) {
                    case RESULT_SUCCESS:
                        Receipt receipt = intent.getParcelableExtra(JUDO_RECEIPT);
                        if (receipt != null) {
                            WritableMap result;
                            if (requestCode == IDEAL_PAYMENT) {
                                result = convert(receipt.getOrderDetails());
                            } else {
                                result = convert(receipt);
                            }
                            promise.resolve(result);
                        } else {
                            promise.reject(JUDO_ERROR, "Something went wrong");
                        }
                        break;
                    case RESULT_CANCELED:
                        promise.reject(JUDO_USER_CANCELLED, "User cancelled");
                        break;
                    case RESULT_ERROR:
                        Receipt errorReceipt = intent.getParcelableExtra(JUDO_RECEIPT);
                        if (errorReceipt != null) {
                            promise.reject(JUDO_ERROR, errorReceipt.getMessage());
                        } else {
                            promise.reject(JUDO_ERROR, "Something went wrong");
                        }
                        break;
                    case RESULT_DECLINED:
                        Receipt declinedReceipt = intent.getParcelableExtra(JUDO_RECEIPT);
                        if (declinedReceipt != null) {
                            WritableMap userInfo = convert(declinedReceipt);
                            promise.reject(JUDO_ERROR, userInfo);
                        } else {
                            promise.reject(JUDO_ERROR, "Something went wrong");
                        }
                        break;
                }
                promise = null;
            } else if (requestCode == GPAY_REQUEST) {
                switch (resultCode) {
                    case Activity.RESULT_OK:
                        PaymentData paymentData = PaymentData.getFromIntent(intent);
                        if (paymentData != null) {
                            Judo judo = getJudo(options);
                            if (judo == null) {
                                promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
                                promise = null;
                            } else {
                                GooglePayRequest googlePayRequest = GooglePaymentUtils.createGooglePayRequest(judo, paymentData);
                                handleGooglePayRequest(googlePayRequest);
                            }
                        } else {
                            promise.reject(JUDO_ERROR, "Google Pay error. No payment data.");
                            promise = null;
                        }
                        break;
                    case Activity.RESULT_CANCELED:
                        promise.reject(JUDO_USER_CANCELLED, "User cancelled");
                        promise = null;
                        break;
                    case AutoResolveHelper.RESULT_ERROR:
                        Status status = AutoResolveHelper.getStatusFromIntent(intent);
                        if (status != null) {
                            promise.reject(JUDO_ERROR, String.format(Locale.US, "Google Pay error. Code: %d", status.getStatusCode()));
                        } else {
                            promise.reject(JUDO_ERROR, "Google Pay error");
                        }
                        promise = null;
                        break;
                }
            }
        }
    };
    private PaymentsClient googlePayClient;

    @SuppressWarnings("WeakerAccess")
    public JudoReactNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
        reactContext.addActivityEventListener(activityEventListener);
    }

    @Nonnull
    @Override
    public String getName() {
        return "RNJudo";
    }

    @Override
    public void onHostResume() {
        // Activity `onResume`
    }

    @Override
    public void onHostPause() {
        // Activity `onPause`
    }

    @Override
    public void onHostDestroy() {
        if (disposable != null && !disposable.isDisposed()) {
            disposable.dispose();
            disposable = null;
        }
    }

    private void handleGooglePayRequest(GooglePayRequest googlePayRequest) {
        Judo judo = getJudo(options);
        if (judo == null) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            promise = null;
            return;
        }
        final JudoApiService apiService = judo.getApiService(Objects.requireNonNull(getCurrentActivity()));
        Single<Receipt> apiRequest;
        if (options.getInt("transactionType") == 1) {
            apiRequest = apiService.googlePayPreAuth(googlePayRequest);
        } else {
            apiRequest = apiService.googlePayPayment(googlePayRequest);
        }

        disposable = apiRequest
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(receipt -> {
                    if (receipt.isSuccess()) {
                        promise.resolve(convert(receipt));
                    } else {
                        promise.reject(JUDO_ERROR, receipt.getErrorExplanation());
                    }
                    promise = null;
                }, error -> {
                    promise.reject(JUDO_ERROR, error.getLocalizedMessage());
                    promise = null;
                });

    }

    private WritableMap convert(Receipt receipt) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.ENGLISH);
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

        WritableMap result = new WritableNativeMap();
        result.putString("result", receipt.getResult());
        result.putString("message", receipt.getMessage());
        if (receipt.getErrorCategory() != null) {
            result.putInt("errorCategory", receipt.getErrorCategory());
        } else {
            result.putString("errorCategory", null);
        }
        result.putString("errorExplanation", receipt.getErrorExplanation());
        result.putString("errorResolution", receipt.getErrorResolution());
        result.putString("errorCode", receipt.getErrorCode());

        if (receipt.getJudoID() != null) {
            result.putInt("judoId", receipt.getJudoID().intValue());
        } else {
            result.putString("judoId", "");
        }
        result.putString("receiptId", receipt.getReceiptId());
        result.putString("originalReceiptId", receipt.getOriginalReceiptId());
        result.putString("partnerServiceFee", receipt.getPartnerServiceFee());
        result.putString("yourPaymentReference", receipt.getYourPaymentReference());
        result.putString("type", receipt.getType());
        result.putString("createdAt", sdf.format(receipt.getCreatedAt()));
        result.putString("merchantName", receipt.getMerchantName());
        result.putString("appearsOnStatementAs", receipt.getAppearsOnStatementAs());
        result.putString("originalAmount", receipt.getOriginalAmount().toString());
        result.putString("netAmount", receipt.getNetAmount().toString());
        result.putString("amount", receipt.getAmount().toString());
        result.putString("currency", receipt.getCurrency());
        result.putMap("cardDetails", convert(receipt.getCardDetails()));
        result.putMap("consumer", convert(receipt.getConsumer()));
        result.putMap("risks", convert(receipt.getRisks()));
        return result;
    }

    private WritableMap convert(CardToken cardDetail) {
        WritableMap result = new WritableNativeMap();
        result.putString("endDate", cardDetail.getEndDate());
        //noinspection SpellCheckingInspection
        result.putString("cardLastfour", cardDetail.getLastFour());
        result.putString("cardToken", cardDetail.getToken());
        result.putInt("cardType", cardDetail.getType());
        result.putString("cardScheme", cardDetail.getScheme());
        result.putString("cardFunding", cardDetail.getFunding());
        result.putString("cardCategory", cardDetail.getCategory());
        result.putString("cardCountry", cardDetail.getCountry());
        result.putString("bank", cardDetail.getBank());
        return result;
    }

    private WritableMap convert(Consumer consumer) {
        WritableMap result = new WritableNativeMap();
        result.putString("consumerToken", consumer.getConsumerToken());
        result.putString("yourConsumerReference", consumer.getYourConsumerReference());
        return result;
    }

    private WritableMap convert(Risks risks) {
        if (risks == null) {
            return null;
        }
        WritableMap result = new WritableNativeMap();
        result.putString("postCodeCheck", risks.getPostCodeCheck());
        return result;
    }

    private WritableMap convert(OrderDetails orderDetails) {
        if (orderDetails == null) {
            return null;
        }
        WritableMap result = new WritableNativeMap();
        result.putString("orderId", orderDetails.getOrderId());
        result.putString("orderStatus", orderDetails.getOrderStatus().name());
        result.putString("orderFailureReason", orderDetails.getOrderFailureReason());
        result.putString("timestamp", orderDetails.getTimestamp());
        return result;
    }

    private Judo getJudo(ReadableMap options) {
        Bundle bundle = new Bundle();
        ReadableMap metadataMap = options.getMap("metaData");
        if (metadataMap != null) {
            for (String keyName : metadataMap.toHashMap().keySet()) {
                bundle.putString(keyName, metadataMap.getString(keyName));
            }
        }

        EnumSet<PaymentMethod> paymentMethodEnumSet = EnumSet.allOf(PaymentMethod.class);
        if (options.hasKey("paymentMethods")) {
            int paymentMethods = options.getInt("paymentMethods");
            switch (paymentMethods) {
                case 1:
                    paymentMethodEnumSet = EnumSet.of(PaymentMethod.CREATE_PAYMENT);
                    break;
                case 2:
                    paymentMethodEnumSet = EnumSet.of(PaymentMethod.GPAY_PAYMENT);
                    break;
            }
        }

        String judoId = options.getString("judoId");
        if (judoId == null) {
            return null;
        }

        String siteId = options.getString("siteId");
        boolean idealEnabled = siteId != null && !siteId.isEmpty();

        Judo.Builder judoBuilder = new Judo.Builder()
                .setJudoId(judoId)
                .setSiteId(siteId)
                .setIdealEnabled(idealEnabled)
                .setApiToken(options.getString("token"))
                .setApiSecret(options.getString("secret"))
                .setEnvironment(options.getBoolean("isSandbox") ? SANDBOX : LIVE)
                .setAmount(options.getString("amount"))
                .setCurrency(options.getString("currency"))
                .setConsumerReference(options.getString("consumerReference"))
                .setPaymentReference(options.getString("paymentReference"))
                .setMetaData(bundle)
                .setPaymentMethod(paymentMethodEnumSet);
        if (options.hasKey("requireContactDetails")) {
            judoBuilder.setGPayRequireContactDetails(options.getBoolean("requireContactDetails"));
        }
        if (options.hasKey("requireBillingDetails")) {
            judoBuilder.setGPayRequireBillingDetails(options.getBoolean("requireBillingDetails"));
        }
        if (options.hasKey("requireShippingDetails")) {
            judoBuilder.setGPayRequireShippingDetails(options.getBoolean("requireShippingDetails"));
        }

        try {
            return judoBuilder.build();
        } catch (JudoIdInvalidError e) {
            return null;
        }
    }

    private boolean isOptionsInvalid(ReadableMap options) {
        String judoId = options.getString("judoId");

        if (judoId == null) {
            return true;
        }
        if (isEmpty(options.getString("token"))) {
            return true;
        }
        if (isEmpty(options.getString("secret"))) {
            return true;
        }
        if (isEmpty(options.getString("amount"))) {
            return true;
        }
        if (isEmpty(options.getString("currency"))) {
            return true;
        }
        if (isEmpty(options.getString("consumerReference"))) {
            return true;
        }
        return isEmpty(options.getString("paymentReference"));
    }

    private boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }

    @SuppressWarnings("unused")
    @ReactMethod
    public void makePayment(ReadableMap options, Promise promise) {
        if (isOptionsInvalid(options)) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        Judo judo = getJudo(options);
        if (judo == null) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        this.promise = promise;
        this.options = options;

        Activity currentActivity = Objects.requireNonNull(getCurrentActivity());
        Intent intent = new Intent(currentActivity, PaymentActivity.class);
        intent.putExtra(JUDO_OPTIONS, judo);
        currentActivity.startActivityForResult(intent, PAYMENT_REQUEST);
    }

    @SuppressWarnings("unused")
    @ReactMethod
    public void makePreAuth(ReadableMap options, Promise promise) {
        if (isOptionsInvalid(options)) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        Judo judo = getJudo(options);
        if (judo == null) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        this.promise = promise;
        this.options = options;

        Activity currentActivity = Objects.requireNonNull(getCurrentActivity());
        Intent intent = new Intent(currentActivity, PreAuthActivity.class);
        intent.putExtra(JUDO_OPTIONS, judo);
        currentActivity.startActivityForResult(intent, PRE_AUTH_REQUEST);
    }

    @SuppressWarnings("unused")
    @ReactMethod
    public void showPaymentMethods(ReadableMap options, Promise promise) {
        if (isOptionsInvalid(options.getMap("judoConfig"))) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        Judo judo = getJudo(options.getMap("judoConfig"));
        if (judo == null) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        WritableMap flattenOptions = new WritableNativeMap();
        flattenOptions.merge(options.getMap("judoConfig"));
        flattenOptions.merge(options.getMap("judoApplePayConfig"));
        flattenOptions.merge(options.getMap("judoGooglePayConfig"));
        flattenOptions.merge(options.getMap("judoPaymentMethodsConfig"));
        this.promise = promise;
        this.options = flattenOptions;

        Activity currentActivity = Objects.requireNonNull(getCurrentActivity());
        Intent intent = new Intent(currentActivity, PaymentMethodActivity.class);
        intent.putExtra(JUDO_OPTIONS, judo);
        intent.putExtra(Judo.GPAY_PREAUTH, options.getInt("transactionType") == 1);
        currentActivity.startActivityForResult(intent, PAYMENT_METHOD);
    }

    @SuppressWarnings("unused")
    @ReactMethod
    public void makeIDEALPayment(ReadableMap options, Promise promise) {
        if (isOptionsInvalid(options)) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        Judo judo = getJudo(options);
        if (judo == null) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        this.promise = promise;
        this.options = options;

        Activity currentActivity = Objects.requireNonNull(getCurrentActivity());
        Intent intent = new Intent(currentActivity, IdealPaymentActivity.class);
        intent.putExtra(JUDO_OPTIONS, judo);
        currentActivity.startActivityForResult(intent, IDEAL_PAYMENT);
    }

    @SuppressWarnings("unused")
    @ReactMethod
    public void canUseGooglePay(ReadableMap options, final Promise promise) {
        boolean isTestEnv = options.getBoolean("googlePayTestEnvironment");
        initGooglePayClient(isTestEnv);
        GooglePaymentUtils.checkIsReadyGooglePay(googlePayClient, promise::resolve);
    }

    @SuppressWarnings("unused")
    @ReactMethod
    public void makeGooglePayPayment(ReadableMap options, final Promise promise) {
        if (isOptionsInvalid(options.getMap("judoConfig"))) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        Judo judo = getJudo(options.getMap("judoConfig"));
        if (judo == null) {
            promise.reject(JUDO_ERROR, INVALID_CONFIGURATION);
            return;
        }
        WritableMap flattenOptions = new WritableNativeMap();
        flattenOptions.merge(options.getMap("judoConfig"));
        flattenOptions.merge(options.getMap("judoApplePayConfig"));
        flattenOptions.merge(options.getMap("judoGooglePayConfig"));
        flattenOptions.merge(options.getMap("judoPaymentMethodsConfig"));
        this.promise = promise;
        this.options = flattenOptions;

        boolean isTestEnv = options.getBoolean("googlePayTestEnvironment");
        initGooglePayClient(isTestEnv);

        PaymentDataRequest paymentDataRequest = GooglePaymentUtils.createDefaultPaymentDataRequest(judo);
        final Task<PaymentData> taskDefaultPaymentData = googlePayClient.loadPaymentData(paymentDataRequest);
        AutoResolveHelper.resolveTask(
                taskDefaultPaymentData,
                Objects.requireNonNull(getCurrentActivity()),
                GPAY_REQUEST);
    }

    private void initGooglePayClient(boolean isTestEnv) {
        if (googlePayClient == null) {
            googlePayClient = GooglePaymentUtils.getGooglePayPaymentsClient(Objects.requireNonNull(getCurrentActivity()),
                    isTestEnv ? WalletConstants.ENVIRONMENT_TEST : WalletConstants.ENVIRONMENT_PRODUCTION);
        }
    }
}

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
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.CardInfo;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.PaymentDataRequest;
import com.google.android.gms.wallet.PaymentMethodToken;
import com.google.android.gms.wallet.PaymentsClient;
import com.google.android.gms.wallet.WalletConstants;
import com.judopay.Judo;
import com.judopay.JudoApiService;
import com.judopay.PaymentActivity;
import com.judopay.PaymentMethodActivity;
import com.judopay.PreAuthActivity;
import com.judopay.arch.GooglePayIsReadyResult;
import com.judopay.arch.GooglePaymentUtils;
import com.judopay.model.CardToken;
import com.judopay.model.Consumer;
import com.judopay.model.GooglePayRequest;
import com.judopay.model.GooglePayWallet;
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

import static com.judopay.Judo.JUDO_OPTIONS;
import static com.judopay.Judo.JUDO_RECEIPT;
import static com.judopay.Judo.LIVE;
import static com.judopay.Judo.RESULT_CANCELED;
import static com.judopay.Judo.RESULT_DECLINED;
import static com.judopay.Judo.RESULT_ERROR;
import static com.judopay.Judo.RESULT_SUCCESS;
import static com.judopay.Judo.SANDBOX;

public class JudoReactNativeModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static final int PAYMENT_REQUEST = 101;
    private static final int PRE_AUTH_REQUEST = 201;
    private static final int LOAD_PAYMENT_DATA_REQUEST_CODE = 1337;
    private static final int GPAY_REQUEST = 500;
    private static final String ACTIVITY_DOES_NOT_EXIST = "ACTIVITY_DOES_NOT_EXIST";
    private static final String JUDO_ERROR = "JUDO_ERROR";
    private static final String JUDO_GOOGLE_PAY_ERROR = "JUDO_GOOGLE_PAY_ERROR";
    private static final String JUDO_USER_CANCELLED = "JUDO_USER_CANCELLED";
    private static final String SDK_WRAPPER_NAME = "RNJudo";
    private static final String PAYMENT_METHODS_KEY = "paymentMethods";

    private final String ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    private final SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT, Locale.ENGLISH);
    private Promise promise;
    private ReadableMap options;
    private Disposable disposable;
    private PaymentsClient googlePayClient;

    private static final String PAYMENT_METHOD_NONE = "PAYMENT_METHOD_NONE";
    private static final String PAYMENT_METHOD_CARD = "PAYMENT_METHOD_CARD";
    private static final String PAYMENT_METHOD_GOOGLE_PAY = "PAYMENT_METHOD_GOOGLE_PAY";
    private static final String PAYMENT_METHOD_ALL = "PAYMENT_METHOD_ALL";

    @Nonnull
    @Override
    public String getName() {
        return JudoReactNativeModule.SDK_WRAPPER_NAME;
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
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(PAYMENT_METHOD_NONE, PAYMENT_METHOD_NONE);
        constants.put(PAYMENT_METHOD_CARD, PAYMENT_METHOD_CARD);
        constants.put(PAYMENT_METHOD_GOOGLE_PAY, PAYMENT_METHOD_GOOGLE_PAY);
        constants.put(PAYMENT_METHOD_ALL, PAYMENT_METHOD_ALL);
        return constants;
    }

    @SuppressWarnings("FieldCanBeLocal")
    private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (promise == null) {
                return;
            }

            if (requestCode == PAYMENT_REQUEST || requestCode == PRE_AUTH_REQUEST) {
                switch (resultCode) {
                    case RESULT_SUCCESS:
                        Receipt receipt = intent.getParcelableExtra(JUDO_RECEIPT);
                        WritableMap result = convert(receipt);
                        promise.resolve(result);
                        break;

                    case RESULT_CANCELED:
                        promise.reject(JUDO_USER_CANCELLED, "User cancelled");
                        break;

                    case RESULT_ERROR:
                        promise.reject(JUDO_ERROR, "Something went wrong :(");
                        break;

                    case RESULT_DECLINED:
                        Receipt declinedReceipt = intent.getParcelableExtra(JUDO_RECEIPT);
                        WritableMap userInfo = convert(declinedReceipt);
                        promise.reject(JUDO_ERROR, userInfo);
                        break;
                }
                promise = null;
            } else if (requestCode == LOAD_PAYMENT_DATA_REQUEST_CODE) {
                switch (resultCode) {
                    case Activity.RESULT_OK:
                        PaymentData paymentData = PaymentData.getFromIntent(intent);
                        if (paymentData != null) {
                            handlePaymentSuccess(paymentData);
                        }
                        break;
                    case Activity.RESULT_CANCELED:
                        promise.reject(JUDO_USER_CANCELLED, "User cancelled");
                        promise = null;
                        break;
                    case AutoResolveHelper.RESULT_ERROR:
                        Status status = AutoResolveHelper.getStatusFromIntent(intent);
                        promise.reject(JUDO_GOOGLE_PAY_ERROR, status.getStatusMessage());
                        promise = null;
                        break;
                }
            } else if (requestCode == GPAY_REQUEST) {
                switch (resultCode) {
                    case Activity.RESULT_OK:
                        PaymentData paymentData = PaymentData.getFromIntent(intent);
                        if (paymentData != null) {
                            GooglePayRequest googlePayRequest = GooglePaymentUtils.createGooglePayRequest(getJudo(), paymentData);
                            finishGPayRequest(googlePayRequest);
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
                            promise.reject(JUDO_ERROR, String.format("Google Pay error. Code: %d", status.getStatusCode()));
                        } else {
                            promise.reject(JUDO_ERROR, "Google Pay error");
                        }
                        promise = null;
                        break;
                }
            }
        }
    };

    @SuppressWarnings("WeakerAccess")
    public JudoReactNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
        reactContext.addActivityEventListener(activityEventListener);
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
    }

    @Override
    public void onHostDestroy() {
        if (disposable != null && !disposable.isDisposed()) {
            disposable.dispose();
            disposable = null;
        }
    }

    private void finishGPayRequest(GooglePayRequest googlePayRequest) {
        final JudoApiService apiService = getJudo().getApiService(Objects.requireNonNull(getCurrentActivity()));
        Single<Receipt> apiRequest = apiService.googlePayPayment(googlePayRequest);

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

    private void handlePaymentSuccess(PaymentData paymentData) {
        PaymentMethodToken token = paymentData.getPaymentMethodToken();
        if (token == null) {
            promise.reject(JUDO_ERROR, "Payment token not found");
            promise = null;
            return;
        }
        if (token.getToken().equals("examplePaymentMethodToken")) {
            promise.reject(JUDO_ERROR, "Gateway name invalid");
            promise = null;
            return;
        }

        Judo judo = getJudo();

        CardInfo cardInfo = paymentData.getCardInfo();
        GooglePayWallet googlePayWallet = new GooglePayWallet.Builder()
                .setToken(token.getToken())
                .setCardNetwork(cardInfo.getCardNetwork())
                .setCardDetails(cardInfo.getCardDetails())
                .build();
        GooglePayRequest googlePayRequest = new GooglePayRequest.Builder()
                .setGooglePayWallet(googlePayWallet)
                .setAmount(judo.getAmount())
                .setCurrency(judo.getCurrency())
                .setJudoId(judo.getJudoId())
                .setConsumerReference(judo.getConsumerReference())
                .build();

        disposable = judo.getApiService(getCurrentActivity())
                .googlePayPreAuth(googlePayRequest)
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
            result.putInt("judoID", receipt.getJudoID().intValue());
        } else {
            result.putString("judoID", null);
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
        result.putString("md", receipt.getMd());
        result.putString("paReq", receipt.getPaReq());
        result.putString("acsUrl", receipt.getAcsUrl());
        return result;
    }

    private WritableMap convert(CardToken cardDetail) {
        WritableMap result = new WritableNativeMap();
        result.putString("endDate", cardDetail.getEndDate());
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

    private void initGooglePayClient() {
        if (googlePayClient == null) {
            int googlePayEnvironment = WalletConstants.ENVIRONMENT_PRODUCTION;
            if (options.getBoolean("googlePayTestEnvironment")) {
                googlePayEnvironment = WalletConstants.ENVIRONMENT_TEST;
            }
            googlePayClient = GooglePaymentUtils.getGooglePayPaymentsClient(Objects.requireNonNull(
                    getCurrentActivity()),
                    googlePayEnvironment);
        }
    }

    private Judo getJudo() {
        Bundle bundle = new Bundle();
        ReadableMap metadataMap = options.getMap("metaData");
        if (metadataMap != null) {
          for (String keyName : metadataMap.toHashMap().keySet()) {
              bundle.putString(keyName, metadataMap.getString(keyName));
          }
        }
        EnumSet<PaymentMethod> paymentMethodEnumSet = EnumSet.noneOf(PaymentMethod.class);
        if (options.hasKey(PAYMENT_METHODS_KEY)) {
            switch (options.getString(PAYMENT_METHODS_KEY)) {
                case PAYMENT_METHOD_CARD:
                    paymentMethodEnumSet.add(PaymentMethod.CREATE_PAYMENT);
                    break;
                case PAYMENT_METHOD_GOOGLE_PAY:
                    paymentMethodEnumSet.add(PaymentMethod.GPAY_PAYMENT);
                    break;
                case PAYMENT_METHOD_ALL:
                    paymentMethodEnumSet.add(PaymentMethod.CREATE_PAYMENT);
                    paymentMethodEnumSet.add(PaymentMethod.GPAY_PAYMENT);
                    break;
                default:
                    break;
            }
        }
        Judo.Builder judoBuilder = new Judo.Builder()
                .setJudoId(options.getString("judoId"))
                .setApiToken(options.getString("token"))
                .setApiSecret(options.getString("secret"))
                .setEnvironment(options.getBoolean("isSandbox") ? SANDBOX : LIVE)
                .setAmount(options.getString("amount"))
                .setCurrency(options.getString("currency"))
                .setConsumerReference(options.getString("consumerReference"))
                .setPaymentReference(options.getString("paymentReference"))
                .setMetaData(bundle)
                .setPaymentMethod(paymentMethodEnumSet);
        if (options.hasKey("isRequestContactDetails")) {
            judoBuilder.setGPayRequireContactDetails(options.getBoolean("isRequestContactDetails"));
        }
        if (options.hasKey("isRequestBilling")) {
            judoBuilder.setGPayRequireBillingDetails(options.getBoolean("isRequestBilling"));
        }
        if (options.hasKey("isRequestShipping")) {
            judoBuilder.setGPayRequireShippingDetails(options.getBoolean("isRequestShipping"));
        }
        return judoBuilder.build();
    }

    @ReactMethod
    public void showPaymentMethods(ReadableMap options, Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject(ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        this.promise = promise;
        this.options = options;

        Intent intent = new Intent(currentActivity, PaymentMethodActivity.class);
        intent.putExtra(JUDO_OPTIONS, getJudo());
        currentActivity.startActivityForResult(intent, PAYMENT_REQUEST);
    }

    @ReactMethod
    public void makePayment(ReadableMap options, Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject(ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        this.promise = promise;
        this.options = options;

        Intent intent = new Intent(currentActivity, PaymentActivity.class);
        intent.putExtra(JUDO_OPTIONS, getJudo());
        currentActivity.startActivityForResult(intent, PAYMENT_REQUEST);
    }

    @ReactMethod
    public void makePreAuth(ReadableMap options, Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject(ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        this.promise = promise;
        this.options = options;

        Intent intent = new Intent(currentActivity, PreAuthActivity.class);
        intent.putExtra(JUDO_OPTIONS, getJudo());
        currentActivity.startActivityForResult(intent, PRE_AUTH_REQUEST);
    }

    @ReactMethod
    public void canUseGooglePay(ReadableMap options, final Promise promise) {
        this.options = options;
        initGooglePayClient();

        GooglePaymentUtils.checkIsReadyGooglePay(googlePayClient, new GooglePayIsReadyResult() {
            @Override
            public void setResult(boolean result) {
                promise.resolve(result);
            }
        });
    }

    @ReactMethod
    public void makeGooglePayPayment(ReadableMap options, final Promise promise) {
        this.promise = promise;
        this.options = options;
        initGooglePayClient();

        Judo judo = getJudo();
        PaymentDataRequest paymentDataRequest = GooglePaymentUtils.createDefaultPaymentDataRequest(judo);
        final Task<PaymentData> taskDefaultPaymentData = googlePayClient.loadPaymentData(paymentDataRequest);
        AutoResolveHelper.resolveTask(
                taskDefaultPaymentData,
                Objects.requireNonNull(getCurrentActivity()),
                Judo.GPAY_REQUEST);
    }
}

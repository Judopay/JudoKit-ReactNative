package com.reactlibrary;

import android.app.Activity;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.CardInfo;
import com.google.android.gms.wallet.CardRequirements;
import com.google.android.gms.wallet.IsReadyToPayRequest;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.PaymentDataRequest;
import com.google.android.gms.wallet.PaymentMethodToken;
import com.google.android.gms.wallet.PaymentMethodTokenizationParameters;
import com.google.android.gms.wallet.PaymentsClient;
import com.google.android.gms.wallet.ShippingAddressRequirements;
import com.google.android.gms.wallet.TransactionInfo;
import com.google.android.gms.wallet.Wallet;
import com.google.android.gms.wallet.WalletConstants;
import com.judopay.Judo;
import com.judopay.PaymentActivity;
import com.judopay.PreAuthActivity;
import com.judopay.model.CardToken;
import com.judopay.model.Consumer;
import com.judopay.model.GooglePayRequest;
import com.judopay.model.GooglePayWallet;
import com.judopay.model.Receipt;
import com.judopay.model.Risks;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Locale;
import java.util.Objects;
import java.util.TimeZone;

import javax.annotation.Nonnull;

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
    private static final String ACTIVITY_DOES_NOT_EXIST = "ACTIVITY_DOES_NOT_EXIST";
    private static final String JUDO_ERROR = "JUDO_ERROR";
    private static final String JUDO_GOOGLE_PAY_ERROR = "JUDO_GOOGLE_PAY_ERROR";
    private static final String JUDO_USER_CANCELLED = "JUDO_USER_CANCELLED";

    private final String ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    private final SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT, Locale.ENGLISH);
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
            }
        }
    };
    private PaymentsClient googlePayClient;

    @SuppressWarnings("WeakerAccess")
    public JudoReactNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
        reactContext.addActivityEventListener(activityEventListener);
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
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
        // Activity `onDestroy`
        if (disposable != null && !disposable.isDisposed()) {
            disposable.dispose();
            disposable = null;
        }
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

        Judo judo = getJudo(options);

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

    @Nonnull
    @Override
    public String getName() {
        return "RNJudo";
    }

    @ReactMethod
    public void makePayment(ReadableMap options, Promise promise) {
        // TODO: validate options
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject(ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        this.promise = promise;

        Intent intent = new Intent(currentActivity, PaymentActivity.class);
        intent.putExtra(JUDO_OPTIONS, getJudo(options));
        currentActivity.startActivityForResult(intent, PAYMENT_REQUEST);
    }

    @ReactMethod
    public void makePreAuth(ReadableMap options, Promise promise) {
        // TODO: validate options
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject(ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        this.promise = promise;

        Intent intent = new Intent(currentActivity, PreAuthActivity.class);
        intent.putExtra(JUDO_OPTIONS, getJudo(options));
        currentActivity.startActivityForResult(intent, PRE_AUTH_REQUEST);
    }

    @ReactMethod
    public void canUseGooglePay(ReadableMap options, final Promise promise) {
        initGooglePayClient(options);

        IsReadyToPayRequest request = IsReadyToPayRequest.newBuilder()
                .addAllowedPaymentMethod(WalletConstants.PAYMENT_METHOD_TOKENIZED_CARD)
                .build();

        googlePayClient.isReadyToPay(request).addOnCompleteListener(new OnCompleteListener<Boolean>() {
            @Override
            public void onComplete(@NonNull Task<Boolean> task) {
                promise.resolve(task.isSuccessful());
            }
        });
    }

    private void initGooglePayClient(ReadableMap options) {
        if (googlePayClient == null) {
            int googlePayEnvironment = WalletConstants.ENVIRONMENT_PRODUCTION;
            if (options.getBoolean("googlePayTestEnvironment")) {
                googlePayEnvironment = WalletConstants.ENVIRONMENT_TEST;
            }
            googlePayClient = Wallet.getPaymentsClient(
                    Objects.requireNonNull(getCurrentActivity()),
                    (new Wallet.WalletOptions.Builder())
                            .setEnvironment(googlePayEnvironment)
                            .build()
            );
        }
    }

    @ReactMethod
    public void makeGooglePayPayment(ReadableMap options, final Promise promise) {
        initGooglePayClient(options);

        TransactionInfo transactionInfo = TransactionInfo.newBuilder()
                .setTotalPriceStatus(WalletConstants.TOTAL_PRICE_STATUS_FINAL)
                .setTotalPrice(options.getString("amount"))
                .setCurrencyCode(options.getString("currency"))
                .build();

        String merchantId = options.getString("merchantId");

        PaymentMethodTokenizationParameters.Builder paramsBuilder = PaymentMethodTokenizationParameters.newBuilder()
                .setPaymentMethodTokenizationType(WalletConstants.PAYMENT_METHOD_TOKENIZATION_TYPE_PAYMENT_GATEWAY)
                .addParameter("gateway", "judopay")
                .addParameter("gatewayMerchantId", merchantId);

        PaymentDataRequest request =
                PaymentDataRequest.newBuilder()
                        .setPhoneNumberRequired(false)
                        .setEmailRequired(true)
                        .setShippingAddressRequired(true)
                        .setShippingAddressRequirements(
                                ShippingAddressRequirements.newBuilder()
                                        .addAllowedCountryCodes(Arrays.asList(
                                                "US",
                                                "GB"
                                        ))
                                        .build())
                        .setTransactionInfo(transactionInfo)
                        .addAllowedPaymentMethods(Collections.singletonList(WalletConstants.PAYMENT_METHOD_TOKENIZED_CARD))
                        .setCardRequirements(
                                CardRequirements.newBuilder()
                                        .addAllowedCardNetworks(Arrays.asList(
                                                WalletConstants.CARD_NETWORK_AMEX,
                                                WalletConstants.CARD_NETWORK_DISCOVER,
                                                WalletConstants.CARD_NETWORK_VISA,
                                                WalletConstants.CARD_NETWORK_MASTERCARD
                                        ))
                                        .setAllowPrepaidCards(true)
                                        .setBillingAddressRequired(true)
                                        .setBillingAddressFormat(WalletConstants.BILLING_ADDRESS_FORMAT_FULL)
                                        .build())
                        .setPaymentMethodTokenizationParameters(paramsBuilder.build())
                        .setUiRequired(true)
                        .build();

        this.promise = promise;
        this.options = options;

        AutoResolveHelper.resolveTask(
                googlePayClient.loadPaymentData(request),
                Objects.requireNonNull(getCurrentActivity()),
                LOAD_PAYMENT_DATA_REQUEST_CODE);

    }

    private Judo getJudo(ReadableMap options) {
        return new Judo.Builder()
                .setJudoId(options.getString("judoId"))
                .setApiToken(options.getString("token"))
                .setApiSecret(options.getString("secret"))
                .setEnvironment(options.getBoolean("isSandbox") ? SANDBOX : LIVE)
                .setAmount(options.getString("amount"))
                .setCurrency(options.getString("currency"))
                .setConsumerReference(options.getString("consumerReference"))
                .build();
    }
}

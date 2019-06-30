package com.reactlibrary;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.judopay.Judo;
import com.judopay.PaymentActivity;
import com.judopay.PreAuthActivity;
import com.judopay.model.CardToken;
import com.judopay.model.Consumer;
import com.judopay.model.Receipt;
import com.judopay.model.Risks;

import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;

import javax.annotation.Nonnull;

import static com.judopay.Judo.JUDO_OPTIONS;
import static com.judopay.Judo.JUDO_RECEIPT;
import static com.judopay.Judo.LIVE;
import static com.judopay.Judo.RESULT_CANCELED;
import static com.judopay.Judo.RESULT_DECLINED;
import static com.judopay.Judo.RESULT_ERROR;
import static com.judopay.Judo.RESULT_SUCCESS;
import static com.judopay.Judo.SANDBOX;

public class JudoReactNativeModule extends ReactContextBaseJavaModule {
    private static final int PAYMENT_REQUEST = 101;
    private static final int PRE_AUTH_REQUEST = 201;
    private static final String ACTIVITY_DOES_NOT_EXIST = "ACTIVITY_DOES_NOT_EXIST";
    private static final String JUDO_ERROR = "JUDO_ERROR";
    private static final String JUDO_USER_CANCELLED = "JUDO_USER_CANCELLED";

    private final String ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    private final SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT, Locale.ENGLISH);
    private Promise promise;

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
            }

        }
    };

    @SuppressWarnings("WeakerAccess")
    public JudoReactNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(activityEventListener);
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
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

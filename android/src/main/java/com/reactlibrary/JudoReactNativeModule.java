package com.reactlibrary;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.judopay.Judo;
import com.judopay.JudoActivity;
import com.judopay.api.error.ApiError;
import com.judopay.api.model.response.Receipt;
import com.judopay.model.Amount;
import com.judopay.model.CardNetwork;
import com.judopay.model.Currency;
import com.judopay.model.PaymentWidgetType;
import com.judopay.model.Reference;

import java.util.ArrayList;
import java.util.Objects;

import javax.annotation.Nonnull;

import static com.judopay.JudoKt.JUDO_ERROR;
import static com.judopay.JudoKt.JUDO_OPTIONS;
import static com.judopay.JudoKt.JUDO_RECEIPT;
import static com.judopay.JudoKt.PAYMENT_ERROR;
import static com.judopay.JudoKt.PAYMENT_SUCCESS;

public class JudoReactNativeModule extends ReactContextBaseJavaModule {

    //------------------------------------------------------------
    // MARK: Constants
    //------------------------------------------------------------

    private static final int JUDO_PAYMENT_WIDGET_REQUEST_CODE = 1;

    //------------------------------------------------------------
    // MARK: Variables
    //------------------------------------------------------------

    private Promise transactionPromise;
    private final ActivityEventListener listener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

            if (resultCode == PAYMENT_ERROR) {
                ApiError error = data.getParcelableExtra(JUDO_ERROR);
                String codeError = Integer.toString(error.getCode());
                transactionPromise.reject(codeError, error.getMessage());
            }

            if (resultCode == PAYMENT_SUCCESS) {
                Receipt receipt = data.getParcelableExtra(JUDO_RECEIPT);
                transactionPromise.resolve(receipt);
            }

            transactionPromise = null;
        }
    };

    //------------------------------------------------------------
    // MARK: Initializer
    //------------------------------------------------------------

    JudoReactNativeModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(listener);
    }

    //------------------------------------------------------------
    // MARK: SDK Methods
    //------------------------------------------------------------

    @ReactMethod
    @SuppressWarnings("unused")
    public void invokeTransaction(ReadableMap options, Promise promise) {

        transactionPromise = promise;

        Judo configuration = getJudoConfiguration(options);

        Activity currentActivity = Objects.requireNonNull(getCurrentActivity());

        Intent intent = new Intent(currentActivity, JudoActivity.class);
        intent.putExtra(JUDO_OPTIONS, configuration);

        currentActivity.startActivityForResult(intent, JUDO_PAYMENT_WIDGET_REQUEST_CODE);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void invokeGooglePay(ReadableMap options, Promise promise) {
        // TODO: Handle Google Pay logic
        System.out.println(options);
        promise.resolve(true);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void invokePaymentMethodScreen(ReadableMap options, Promise promise) {
        // TODO: Handle Payment Methods screen logic
        System.out.println(options);
        promise.resolve(true);
    }

    //------------------------------------------------------------
    // MARK: Helper methods
    //------------------------------------------------------------

    private Judo getJudoConfiguration(ReadableMap options) {

        Amount amount = getAmount();
        Reference reference = getReference();
        Boolean isSandboxed = true;

        return new Judo.Builder(PaymentWidgetType.CARD_PAYMENT)
                .setJudoId("judoId")
                .setSiteId("siteId")
                .setApiToken("token")
                .setApiSecret("secret")
                .setAmount(amount)
                .setReference(reference)
                .setIsSandboxed(isSandboxed)
                .build();
    }

    private Amount getAmount() {
        return new Amount.Builder()
                .setAmount("0.01")
                .setCurrency(Currency.GBP)
                .build();
    }

    private Reference getReference() {
        return new Reference.Builder()
                .setConsumerReference("my-reference")
                .setPaymentReference("my-payment-reference")
                .build();
    }

    private CardNetwork[] getCardNetworks() {
        ArrayList<CardNetwork> networks = new ArrayList<>();
        networks.add(CardNetwork.VISA);
        return (CardNetwork[]) networks.toArray();
    }

    //------------------------------------------------------------
    // MARK: React Native methods
    //------------------------------------------------------------

    @Nonnull
    @Override
    public String getName() {
        return "RNJudo";
    }
}
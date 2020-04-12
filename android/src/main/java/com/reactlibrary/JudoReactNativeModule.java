package com.reactlibrary;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import com.judopay.Judo;
import com.judopay.JudoActivity;
import com.judopay.api.error.ApiError;
import com.judopay.api.model.response.Receipt;
import com.judopay.model.Amount;
import com.judopay.model.CardNetwork;
import com.judopay.model.Currency;
import com.judopay.model.GooglePayConfiguration;
import com.judopay.model.PaymentMethod;
import com.judopay.model.PaymentWidgetType;
import com.judopay.model.Reference;
import com.judopay.model.UiConfiguration;
import com.judopay.model.googlepay.GooglePayAddressFormat;
import com.judopay.model.googlepay.GooglePayBillingAddressParameters;
import com.judopay.model.googlepay.GooglePayEnvironment;
import com.judopay.model.googlepay.GooglePayShippingAddressParameters;

import java.util.ArrayList;
import java.util.Objects;

import javax.annotation.Nonnull;

import static com.judopay.JudoKt.JUDO_ERROR;
import static com.judopay.JudoKt.JUDO_OPTIONS;
import static com.judopay.JudoKt.JUDO_RECEIPT;
import static com.judopay.JudoKt.PAYMENT_ERROR;
import static com.judopay.JudoKt.PAYMENT_SUCCESS;
import static com.judopay.model.googlepay.GooglePayEnvironment.*;

public class JudoReactNativeModule extends ReactContextBaseJavaModule {

    // ------------------------------------------------------------
    // MARK: Constants
    // ------------------------------------------------------------

    private static final int JUDO_PAYMENT_WIDGET_REQUEST_CODE = 1;

    // ------------------------------------------------------------
    // MARK: Variables
    // ------------------------------------------------------------

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

    // ------------------------------------------------------------
    // MARK: Initializer
    // ------------------------------------------------------------

    JudoReactNativeModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(listener);
    }

    // ------------------------------------------------------------
    // MARK: SDK Methods
    // ------------------------------------------------------------

    @ReactMethod
    @SuppressWarnings("unused")
    public void invokeTransaction(ReadableMap options, Promise promise) {
        Judo configuration = getTransactionConfiguration(options);
        startJudoActivity(configuration, promise);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void invokeGooglePay(ReadableMap options, Promise promise) {
        Judo configuration = getGoogleTransactionConfiguration(options);
        startJudoActivity(configuration, promise);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void invokePaymentMethodScreen(ReadableMap options, Promise promise) {
        Judo configuration = getPaymentMethodsConfiguration(options);
        startJudoActivity(configuration, promise);
    }

    public void startJudoActivity(Judo configuration, Promise promise) {
        transactionPromise = promise;

        Activity currentActivity = Objects.requireNonNull(getCurrentActivity());

        Intent intent = new Intent(currentActivity, JudoActivity.class);
        intent.putExtra(JUDO_OPTIONS, configuration);

        currentActivity.startActivityForResult(intent, JUDO_PAYMENT_WIDGET_REQUEST_CODE);
    }

    // ------------------------------------------------------------
    // MARK: Helper methods
    // ------------------------------------------------------------

    private Judo getTransactionConfiguration(ReadableMap options) {
        PaymentWidgetType widgetType = getWidgetType(options);
        return getJudoConfiguration(widgetType, options);
    }

    private Judo getGoogleTransactionConfiguration(ReadableMap options) {
        int transactionMode = options.getInt("transactionMode");

        if (transactionMode == 0) {
            return getJudoConfiguration(PaymentWidgetType.GOOGLE_PAY, options);
        }

        return getJudoConfiguration(PaymentWidgetType.PRE_AUTH_GOOGLE_PAY, options);
    }

    private Judo getPaymentMethodsConfiguration(ReadableMap options) {
        int transactionMode = options.getInt("transactionMode");

        if (transactionMode == 0) {
            return getJudoConfiguration(PaymentWidgetType.PAYMENT_METHODS, options);
        }

        return getJudoConfiguration(PaymentWidgetType.PRE_AUTH_PAYMENT_METHODS, options);
    }

    private Judo getJudoConfiguration(PaymentWidgetType type, ReadableMap options) {
        String token = options.getString("token");
        String secret = options.getString("secret");
        Boolean isSandboxed = options.getBoolean("sandboxed");

        String judoId = getJudoId(options);
        String siteId = getSiteId(options);

        Amount amount = getAmount(options);
        Reference reference = getReference(options);
        CardNetwork[] cardNetworks = getCardNetworks(options);
        PaymentMethod[] paymentMethods = getPaymentMethods(options);
        UiConfiguration uiConfiguration = getUIConfiguration(options);

        GooglePayConfiguration googlePayConfiguration = getGooglePayConfiguration(options);

        return new Judo.Builder(type)
                .setApiToken(token)
                .setApiSecret(secret)
                .setIsSandboxed(isSandboxed)
                .setJudoId(judoId)
                .setSiteId(siteId)
                .setAmount(amount)
                .setReference(reference)
                .setSupportedCardNetworks(cardNetworks)
                .setPaymentMethods(paymentMethods)
                .setUiConfiguration(uiConfiguration)
                .setGooglePayConfiguration(googlePayConfiguration)
                .build();
    }

    private PaymentWidgetType getWidgetType(ReadableMap options) {
        int transactionType = options.getInt("transactionType");
        switch (transactionType) {
            case 1:
                return PaymentWidgetType.PRE_AUTH_CARD_PAYMENT;
            case 2:
                return PaymentWidgetType.CREATE_CARD_TOKEN;
            case 3:
                return PaymentWidgetType.CHECK_CARD;
            case 4:
                return PaymentWidgetType.SAVE_CARD;
            default:
                return PaymentWidgetType.CARD_PAYMENT;
        }
    }

    private String getJudoId(ReadableMap options) {
        ReadableMap configurations = options.getMap("configuration");
        return configurations.getString("judoId");
    }

    private Amount getAmount(ReadableMap options) {
        ReadableMap configurations = options.getMap("configuration");
        ReadableMap amount = configurations.getMap("amount");

        String amountValue = amount.getString("value");
        String currencyValue = amount.getString("currency");
        Currency currency = getCurrency(currencyValue);

        return new Amount.Builder()
                .setAmount(amountValue)
                .setCurrency(currency)
                .build();
    }

    private Currency getCurrency(String value) {
        switch (value) {
            case "AED":
                return Currency.AED;
            case "AUD":
                return Currency.AUD;
            case "BRL":
                return Currency.BRL;
            case "CAD":
                return Currency.CAD;
            case "CHF":
                return Currency.CHF;
            case "DKK":
                return Currency.DKK;
            case "EUR":
                return Currency.EUR;
            case "HKD":
                return Currency.HKD;
            case "HUF":
                return Currency.HUF;
            case "JPY":
                return Currency.JPY;
            case "NOK":
                return Currency.NOK;
            case "NZD":
                return Currency.NZD;
            case "PLN":
                return Currency.PLN;
            case "SAR":
                return Currency.SAR;
            case "SEK":
                return Currency.SEK;
            case "SGD":
                return Currency.SGD;
            case "QAR":
                return Currency.QAR;
            case "USD":
                return Currency.USD;
            case "ZAR":
                return Currency.ZAR;
            default:
                return Currency.GBP;
        }
    }

    private Reference getReference(ReadableMap options) {
        ReadableMap configurations = options.getMap("configuration");
        ReadableMap reference = configurations.getMap("reference");

        String consumerReference = reference.getString("consumerReference");
        String paymentReference = reference.getString("paymentReference");

        // TODO: MAP METADATA BUNDLE ?
        return new Reference.Builder()
                .setConsumerReference(consumerReference)
                .setPaymentReference(paymentReference)
                .build();
    }

    private String getSiteId(ReadableMap options) {
        ReadableMap configurations = options.getMap("configuration");
        return configurations.getString("siteId");
    }

    private CardNetwork[] getCardNetworks(ReadableMap options) {

        int CARD_VISA = 1;
        int CARD_MASTERCARD = 1 << 1;
        int CARD_MAESTRO = 1 << 2;
        int CARD_AMEX = 1 << 3;
        int CARD_CHINAUNIONPAY = 1 << 4;
        int CARD_JCB = 1 << 5;
        int CARD_DISCOVER = 1 << 6;
        int CARD_DINERSCLUB = 1 << 7;
        int CARD_ALL = 1 << 8;

        ReadableMap configurations = options.getMap("configuration");
        int cardNetworkValue = configurations.getInt("supportedCardNetworks");

        ArrayList<CardNetwork> supportedNetworks = new ArrayList<>();

        if ((cardNetworkValue & CARD_ALL) == 1 << 8) {
            supportedNetworks.add(CardNetwork.VISA);
            supportedNetworks.add(CardNetwork.MASTERCARD);
            supportedNetworks.add(CardNetwork.MAESTRO);
            supportedNetworks.add(CardNetwork.AMEX);
            supportedNetworks.add(CardNetwork.CHINA_UNION_PAY);
            supportedNetworks.add(CardNetwork.JCB);
            supportedNetworks.add(CardNetwork.DISCOVER);
            supportedNetworks.add(CardNetwork.DINERS_CLUB);

            return supportedNetworks.toArray(new CardNetwork[0]);
        }

        if ((cardNetworkValue & CARD_VISA) == 1) {
            supportedNetworks.add(CardNetwork.VISA);
        }

        if ((cardNetworkValue & CARD_MASTERCARD) == 1 << 1) {
            supportedNetworks.add(CardNetwork.MASTERCARD);
        }

        if ((cardNetworkValue & CARD_MAESTRO) == 1 << 2) {
            supportedNetworks.add(CardNetwork.MAESTRO);
        }

        if ((cardNetworkValue & CARD_AMEX) == 1 << 3) {
            supportedNetworks.add(CardNetwork.AMEX);
        }

        if ((cardNetworkValue & CARD_CHINAUNIONPAY) == 1 << 4) {
            supportedNetworks.add(CardNetwork.CHINA_UNION_PAY);
        }

        if ((cardNetworkValue & CARD_JCB) == 1 << 5) {
            supportedNetworks.add(CardNetwork.JCB);
        }

        if ((cardNetworkValue & CARD_DISCOVER) == 1 << 6) {
            supportedNetworks.add(CardNetwork.DISCOVER);
        }

        if ((cardNetworkValue & CARD_DINERSCLUB) == 1 << 7) {
            supportedNetworks.add(CardNetwork.DINERS_CLUB);
        }

        return supportedNetworks.toArray(new CardNetwork[0]);
    }

    private PaymentMethod[] getPaymentMethods(ReadableMap options) {
        ReadableMap configurations = options.getMap("configuration");
        int paymentMethodValue = configurations.getInt("paymentMethods");

        int METHOD_CARD = 1;
        int METHOD_GOOGLE_PAY = 1 << 2;
        int METHOD_IDEAL = 1 << 3;
        int METHOD_ALL = 1 << 4;

        ArrayList<PaymentMethod> paymentMethods = new ArrayList<>();

        if ((paymentMethodValue & METHOD_ALL) == 1 << 4) {
            paymentMethods.add(PaymentMethod.CARD);
            paymentMethods.add(PaymentMethod.GOOGLE_PAY);
            paymentMethods.add(PaymentMethod.IDEAL);
            return paymentMethods.toArray(new PaymentMethod[0]);
        }

        if ((paymentMethodValue & METHOD_CARD) == 1) {
            paymentMethods.add(PaymentMethod.CARD);
        }

        if ((paymentMethodValue & METHOD_GOOGLE_PAY) == 1 << 2) {
            paymentMethods.add(PaymentMethod.GOOGLE_PAY);
        }

        if ((paymentMethodValue & METHOD_IDEAL) == 1 << 3) {
            paymentMethods.add(PaymentMethod.IDEAL);
        }

        return paymentMethods.toArray(new PaymentMethod[0]);
    }

    private UiConfiguration getUIConfiguration(ReadableMap options) {
        ReadableMap configurations = options.getMap("configuration");
        ReadableMap uiConfiguration = configurations.getMap("uiConfiguration");
        Boolean isAVSEnabled = uiConfiguration.getBoolean("isAVSEnabled");
        return new UiConfiguration.Builder()
                .setAvsEnabled(isAVSEnabled)
                .build();
    }

    private GooglePayConfiguration getGooglePayConfiguration(ReadableMap options) {

        ReadableMap configuration = options.getMap("configuration");
        ReadableMap googlePayConfig = configuration.getMap("googlePayConfiguration");

        String countryCode = googlePayConfig.getString("countryCode");

        int environmentValue = googlePayConfig.getInt("environment");

        GooglePayEnvironment environment = (environmentValue == 0) ? TEST : PRODUCTION;

        Boolean isEmailRequired = googlePayConfig.getBoolean("isEmailRequired");
        Boolean isBillingAddressRequired = googlePayConfig.getBoolean("isBillingAddressRequired");
        Boolean isShippingAddressRequired = googlePayConfig.getBoolean("isShippingAddressRequired");

        ReadableMap billingFormatMap = googlePayConfig.getMap("billingAddressParameters");
        GooglePayBillingAddressParameters billingParameters = getBillingParameters(billingFormatMap);

        ReadableMap shippingFormatMap = googlePayConfig.getMap("shippingAddressParameters");
        GooglePayShippingAddressParameters shippingParameters = getShippingParameters(shippingFormatMap);

        return new GooglePayConfiguration.Builder()
                .setTransactionCountryCode(countryCode)
                .setEnvironment(environment)
                .setIsEmailRequired(isEmailRequired)
                .setIsBillingAddressRequired(isBillingAddressRequired)
                .setBillingAddressParameters(billingParameters)
                .setIsShippingAddressRequired(isShippingAddressRequired)
                .setShippingAddressParameters(shippingParameters)
                .build();
    }

    private GooglePayBillingAddressParameters getBillingParameters(ReadableMap formatMap) {
        int addressFormatValue = formatMap.getInt("addressFormat");

        GooglePayAddressFormat addressFormat = (addressFormatValue == 0)
                ? GooglePayAddressFormat.MIN
                : GooglePayAddressFormat.FULL;

        Boolean isPhoneNumberRequired = formatMap.getBoolean("isPhoneNumberRequired");
        return new GooglePayBillingAddressParameters(addressFormat, isPhoneNumberRequired);
    }

    private GooglePayShippingAddressParameters getShippingParameters(ReadableMap formatMap) {

        ReadableArray billingParameters = formatMap.getArray("allowedCountryCodes");
        String[] billingParametersArray = billingParameters.toArrayList().toArray(new String[0]);

        Boolean isPhoneNumberRequired = formatMap.getBoolean("isPhoneNumberRequired");
        return new GooglePayShippingAddressParameters(billingParametersArray, isPhoneNumberRequired);
    }

    // ------------------------------------------------------------
    // MARK: React Native methods
    // ------------------------------------------------------------

    @Nonnull
    @Override
    public String getName() {
        return "RNJudo";
    }
}
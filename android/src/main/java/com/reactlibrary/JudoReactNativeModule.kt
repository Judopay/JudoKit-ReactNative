package com.reactlibrary

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import com.facebook.react.bridge.*
import com.judopay.*
import com.judopay.api.error.ApiError
import com.judopay.api.model.response.Receipt
import com.judopay.model.*
import com.judopay.model.Currency
import com.judopay.model.googlepay.GooglePayAddressFormat
import com.judopay.model.googlepay.GooglePayBillingAddressParameters
import com.judopay.model.googlepay.GooglePayEnvironment
import com.judopay.model.googlepay.GooglePayShippingAddressParameters
import java.lang.Exception
import java.util.*
import kotlin.collections.ArrayList

class JudoReactNativeModule internal constructor(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    // ------------------------------------------------------------
    // MARK: Variables
    // ------------------------------------------------------------

    private var transactionPromise: Promise? = null

    private val listener: ActivityEventListener = object : BaseActivityEventListener() {

        override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent) {

            if (resultCode == PAYMENT_ERROR) {
                val error: ApiError? = data.getParcelableExtra(JUDO_ERROR)
                error?.let {
                    transactionPromise?.reject(error.code.toString(), error.message.toString())
                }
            }

            if (resultCode == PAYMENT_SUCCESS) {
                val receipt: Receipt? = data.getParcelableExtra(JUDO_RECEIPT)
                receipt?.let {
                    transactionPromise?.resolve(receipt)
                }
            }
            transactionPromise = null
        }
    }

    // ------------------------------------------------------------
    // MARK: SDK Methods
    // ------------------------------------------------------------

    @ReactMethod
    fun invokeTransaction(options: ReadableMap, promise: Promise) {
        val configuration = getTransactionConfiguration(options)
        startJudoActivity(configuration, promise)
    }

    @ReactMethod
    fun invokeGooglePay(options: ReadableMap, promise: Promise) {
        val configuration = getGoogleTransactionConfiguration(options)
        startJudoActivity(configuration, promise)
    }

    @ReactMethod
    fun invokePaymentMethodScreen(options: ReadableMap, promise: Promise) {
        val configuration = getPaymentMethodsConfiguration(options)
        startJudoActivity(configuration, promise)
    }

    private fun startJudoActivity(configuration: Judo, promise: Promise) {
        transactionPromise = promise

        val intent = Intent(currentActivity, JudoActivity::class.java)
        intent.putExtra(JUDO_OPTIONS, configuration)

        currentActivity?.startActivityForResult(intent, JUDO_PAYMENT_WIDGET_REQUEST_CODE)
    }

    // ------------------------------------------------------------
    // MARK: Helper methods
    // ------------------------------------------------------------

    private fun getTransactionConfiguration(options: ReadableMap): Judo {
        val widgetType = getWidgetType(options)
        return getJudoConfiguration(widgetType, options)
    }

    private fun getGoogleTransactionConfiguration(options: ReadableMap): Judo {
        val transactionMode = options.getInt("transactionMode")
        return if (transactionMode == 0) {
            getJudoConfiguration(PaymentWidgetType.GOOGLE_PAY, options)
        } else getJudoConfiguration(PaymentWidgetType.PRE_AUTH_GOOGLE_PAY, options)
    }

    private fun getPaymentMethodsConfiguration(options: ReadableMap): Judo {
        val transactionMode = options.getInt("transactionMode")
        return if (transactionMode == 0) {
            getJudoConfiguration(PaymentWidgetType.PAYMENT_METHODS, options)
        } else getJudoConfiguration(PaymentWidgetType.PRE_AUTH_PAYMENT_METHODS, options)
    }

    private fun getJudoConfiguration(type: PaymentWidgetType, options: ReadableMap): Judo {
        val token = options.getString("token")
        val secret = options.getString("secret")
        val isSandboxed = options.getBoolean("sandboxed")
        val judoId = getJudoId(options)
        val siteId = getSiteId(options)
        val amount = getAmount(options)
        val reference = getReference(options)
        val cardNetworks = getCardNetworks(options)
        val paymentMethods = getPaymentMethods(options)
        val uiConfiguration = getUIConfiguration(options)
        val googlePayConfiguration = getGooglePayConfiguration(options)
        return Judo.Builder(type)
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
                .build()
    }

    private fun getWidgetType(options: ReadableMap): PaymentWidgetType {
        val transactionType = options.getInt("transactionType")
        return when (transactionType) {
            1 -> PaymentWidgetType.PRE_AUTH_CARD_PAYMENT
            2 -> PaymentWidgetType.CREATE_CARD_TOKEN
            3 -> PaymentWidgetType.CHECK_CARD
            4 -> PaymentWidgetType.SAVE_CARD
            else -> PaymentWidgetType.CARD_PAYMENT
        }
    }

    private fun getJudoId(options: ReadableMap): String? {
        val configurations = options.getMap("configuration")
        return configurations!!.getString("judoId")
    }

    private fun getAmount(options: ReadableMap): Amount {
        val configurations = options.getMap("configuration")
        val amount = configurations!!.getMap("amount")
        val amountValue = amount!!.getString("value")
        val currencyValue = amount.getString("currency")
        val currency = Currency.valueOf(currencyValue!!)
        return Amount.Builder()
                .setAmount(amountValue)
                .setCurrency(currency)
                .build()
    }

    private fun getReference(options: ReadableMap): Reference {
        val configurations = options.getMap("configuration")
        val reference = configurations!!.getMap("reference")
        val consumerReference = reference!!.getString("consumerReference")
        val paymentReference = reference.getString("paymentReference")
        val metadata = reference.getMap("metadata")
        val metadataMap: HashMap<*, *> = metadata!!.toHashMap()
        val metadataBundle = Bundle()
        for (o in metadataMap.entries) {
            val element = o as Map.Entry<*, *>
            metadataBundle.putString(element.key.toString(), element.value.toString())
        }
        return Reference.Builder()
                .setConsumerReference(consumerReference)
                .setPaymentReference(paymentReference)
                .setMetaData(metadataBundle)
                .build()
    }

    private fun getSiteId(options: ReadableMap): String? {
        val configurations = options.getMap("configuration")
        return configurations!!.getString("siteId")
    }

    private fun getCardNetworks(options: ReadableMap): Array<CardNetwork> {
        val CARD_VISA = 1
        val CARD_MASTERCARD = 1 shl 1
        val CARD_MAESTRO = 1 shl 2
        val CARD_AMEX = 1 shl 3
        val CARD_CHINAUNIONPAY = 1 shl 4
        val CARD_JCB = 1 shl 5
        val CARD_DISCOVER = 1 shl 6
        val CARD_DINERSCLUB = 1 shl 7
        val CARD_ALL = 1 shl 8
        val configurations = options.getMap("configuration")
        val cardNetworkValue = configurations!!.getInt("supportedCardNetworks")
        val supportedNetworks = ArrayList<CardNetwork>()
        if (cardNetworkValue and CARD_ALL == CARD_ALL) {
            supportedNetworks.add(CardNetwork.VISA)
            supportedNetworks.add(CardNetwork.MASTERCARD)
            supportedNetworks.add(CardNetwork.MAESTRO)
            supportedNetworks.add(CardNetwork.AMEX)
            supportedNetworks.add(CardNetwork.CHINA_UNION_PAY)
            supportedNetworks.add(CardNetwork.JCB)
            supportedNetworks.add(CardNetwork.DISCOVER)
            supportedNetworks.add(CardNetwork.DINERS_CLUB)
            return supportedNetworks.toTypedArray()
        }
        if (cardNetworkValue and CARD_VISA == CARD_VISA) {
            supportedNetworks.add(CardNetwork.VISA)
        }
        if (cardNetworkValue and CARD_MASTERCARD == CARD_MASTERCARD) {
            supportedNetworks.add(CardNetwork.MASTERCARD)
        }
        if (cardNetworkValue and CARD_MAESTRO == CARD_MAESTRO) {
            supportedNetworks.add(CardNetwork.MAESTRO)
        }
        if (cardNetworkValue and CARD_AMEX == CARD_AMEX) {
            supportedNetworks.add(CardNetwork.AMEX)
        }
        if (cardNetworkValue and CARD_CHINAUNIONPAY == CARD_CHINAUNIONPAY) {
            supportedNetworks.add(CardNetwork.CHINA_UNION_PAY)
        }
        if (cardNetworkValue and CARD_JCB == CARD_JCB) {
            supportedNetworks.add(CardNetwork.JCB)
        }
        if (cardNetworkValue and CARD_DISCOVER == CARD_DISCOVER) {
            supportedNetworks.add(CardNetwork.DISCOVER)
        }
        if (cardNetworkValue and CARD_DINERSCLUB == CARD_DINERSCLUB) {
            supportedNetworks.add(CardNetwork.DINERS_CLUB)
        }
        return supportedNetworks.toTypedArray()
    }

    private fun getPaymentMethods(options: ReadableMap): Array<PaymentMethod> {
        val configurations = options.getMap("configuration")
        val paymentMethodValue = configurations!!.getInt("paymentMethods")
        val METHOD_CARD = 1
        val METHOD_GOOGLE_PAY = 1 shl 2
        val METHOD_IDEAL = 1 shl 3
        val METHOD_ALL = 1 shl 4
        val paymentMethods = ArrayList<PaymentMethod>()
        if (paymentMethodValue and METHOD_ALL == METHOD_ALL) {
            paymentMethods.add(PaymentMethod.CARD)
            paymentMethods.add(PaymentMethod.GOOGLE_PAY)
            paymentMethods.add(PaymentMethod.IDEAL)
            return paymentMethods.toTypedArray()
        }
        if (paymentMethodValue and METHOD_CARD == METHOD_CARD) {
            paymentMethods.add(PaymentMethod.CARD)
        }
        if (paymentMethodValue and METHOD_GOOGLE_PAY == METHOD_GOOGLE_PAY) {
            paymentMethods.add(PaymentMethod.GOOGLE_PAY)
        }
        if (paymentMethodValue and METHOD_IDEAL == METHOD_IDEAL) {
            paymentMethods.add(PaymentMethod.IDEAL)
        }
        return paymentMethods.toTypedArray()
    }

    private fun getUIConfiguration(options: ReadableMap): UiConfiguration {
        val configurations = options.getMap("configuration")
        val uiConfiguration = configurations!!.getMap("uiConfiguration")
        val isAVSEnabled = uiConfiguration!!.getBoolean("isAVSEnabled")
        return UiConfiguration.Builder()
                .setAvsEnabled(isAVSEnabled)
                .build()
    }

    private fun getGooglePayConfiguration(options: ReadableMap): GooglePayConfiguration? {

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        val googlePayConfiguration = try {
            configuration?.getMap("googlePayConfiguration")
        } catch (_: Exception) {
            return null
        }

        val countryCode = try {
            googlePayConfiguration?.getString("countryCode")
        } catch (_: Exception) {
            return null
        }

        val environmentValue = try {
            googlePayConfiguration?.getInt("environment")
        } catch (_: Exception) {
            return null
        }

        val environment = when (environmentValue) {
            0 -> GooglePayEnvironment.TEST
            else -> GooglePayEnvironment.PRODUCTION
        }

        val isEmailRequired = try {
            googlePayConfiguration?.getBoolean("isEmailRequired")
        } catch (_: Exception) {
            return null
        }

        val isBillingAddressRequired = try {
            googlePayConfiguration?.getBoolean("isBillingAddressRequired")
        } catch (_: Exception) {
            return null
        }

        val isShippingAddressRequired = try {
            googlePayConfiguration?.getBoolean("isShippingAddressRequired")
        } catch (_: Exception) {
            return null
        }

        val billingFormatMap = try {
            googlePayConfiguration?.getMap("billingAddressParameters")
        } catch (_: Exception) {
            null
        }

        val billingParameters = billingFormatMap?.let {
            getBillingParameters(billingFormatMap)
        }

        val shippingFormatMap = try {
            googlePayConfiguration?.getMap("shippingAddressParameters")
        } catch (_: Exception) {
            null
        }

        val shippingParameters = shippingFormatMap?.let {
            getShippingParameters(shippingFormatMap)
        }

        var builder = GooglePayConfiguration.Builder()
                .setTransactionCountryCode(countryCode)
                .setEnvironment(environment)
                .setIsEmailRequired(isEmailRequired)
                .setIsBillingAddressRequired(isBillingAddressRequired)
                .setIsShippingAddressRequired(isShippingAddressRequired)

        billingParameters.let {
            builder = builder.setBillingAddressParameters(billingParameters)
        }

        shippingParameters.let {
            builder = builder.setShippingAddressParameters(shippingParameters)
        }

        return builder.build()
    }

    private fun getBillingParameters(formatMap: ReadableMap): GooglePayBillingAddressParameters? {

        val isPhoneNumberRequired = try {
            formatMap.getBoolean("isPhoneNumberRequired")
        } catch (_: Exception) {
            return null
        }

        val addressFormatValue = try {
            formatMap.getInt("addressFormat")
        } catch (_: Exception) {
            return null
        }

        val addressFormat = when (addressFormatValue) {
            0 -> GooglePayAddressFormat.MIN
            else -> GooglePayAddressFormat.FULL
        }

        return GooglePayBillingAddressParameters(addressFormat, isPhoneNumberRequired)
    }

    private fun getShippingParameters(formatMap: ReadableMap): GooglePayShippingAddressParameters? {

        val isPhoneNumberRequired = try {
            formatMap.getBoolean("isPhoneNumberRequired")
        } catch (_: Exception) {
            return null
        }

        val allowedCountryCodeList = try {
            formatMap.getArray("allowedCountryCodes")?.toArrayList()
        } catch (_: Exception) {
            null
        }

        var allowedCountryCodes: Array<String>? = null

        allowedCountryCodeList?.let {
            val countryList = allowedCountryCodeList.mapNotNull { it as String }
            allowedCountryCodes = countryList.toTypedArray()
        }

        return GooglePayShippingAddressParameters(allowedCountryCodes, isPhoneNumberRequired)
    }

    // ------------------------------------------------------------
    // MARK: React Native methods
    // ------------------------------------------------------------

    override fun getName(): String {
        return "RNJudo"
    }

    // ------------------------------------------------------------
    // MARK: Constants
    // ------------------------------------------------------------

    companion object {
        private const val JUDO_PAYMENT_WIDGET_REQUEST_CODE = 1
    }

    // ------------------------------------------------------------
    // MARK: Initializer
    // ------------------------------------------------------------

    init {
        context.addActivityEventListener(listener)
    }
}
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
import kotlin.collections.ArrayList

class JudoReactNativeModule internal constructor(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    // ------------------------------------------------------------
    // MARK: Constants
    // ------------------------------------------------------------

    companion object {
        private const val JUDO_PAYMENT_WIDGET_REQUEST_CODE = 1
    }

    // ------------------------------------------------------------
    // MARK: Variables
    // ------------------------------------------------------------

    private var transactionPromise: Promise? = null

    private val listener: ActivityEventListener = object : BaseActivityEventListener() {

        override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent) {

            if (resultCode == PAYMENT_ERROR) {
                val error: ApiError? = data.getParcelableExtra(JUDO_ERROR)
                error?.let {
                    transactionPromise?.reject(error.code.toString(), error.message)
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
    // MARK: Initializer
    // ------------------------------------------------------------

    init {
        context.addActivityEventListener(listener)
    }

    // ------------------------------------------------------------
    // MARK: SDK Methods
    // ------------------------------------------------------------

    @ReactMethod
    fun invokeTransaction(options: ReadableMap, promise: Promise) {
        getTransactionConfiguration(options)?.let {
            startJudoActivity(it, promise)
        }
    }

    @ReactMethod
    fun invokeGooglePay(options: ReadableMap, promise: Promise) {
        getGoogleTransactionConfiguration(options)?.let {
            startJudoActivity(it, promise)
        }
    }

    @ReactMethod
    fun invokePaymentMethodScreen(options: ReadableMap, promise: Promise) {
        getPaymentMethodsConfiguration(options)?.let {
            startJudoActivity(it, promise)
        }
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

    private fun getTransactionConfiguration(options: ReadableMap): Judo? {
        val widgetType = getWidgetType(options)
        return getJudoConfiguration(widgetType, options)
    }

    private fun getGoogleTransactionConfiguration(options: ReadableMap): Judo? {

        val transactionMode = try {
            options.getInt("transactionMode")
        } catch (_: Exception) {
            return null
        }

        val type = when (transactionMode) {
            0 -> PaymentWidgetType.GOOGLE_PAY
            else -> PaymentWidgetType.PRE_AUTH_GOOGLE_PAY
        }

        return getJudoConfiguration(type, options)
    }

    private fun getPaymentMethodsConfiguration(options: ReadableMap): Judo? {

        val transactionMode = try {
            options.getInt("transactionMode")
        } catch (_: Exception) {
            return null
        }

        val type = when (transactionMode) {
            0 -> PaymentWidgetType.PAYMENT_METHODS
            else -> PaymentWidgetType.PRE_AUTH_PAYMENT_METHODS
        }

        return getJudoConfiguration(type, options)
    }

    private fun getJudoConfiguration(type: PaymentWidgetType, options: ReadableMap): Judo? {

        val token = try {
            options.getString("token")
        } catch (_: Exception) {
            return null
        }

        val secret = try {
            options.getString("secret")
        } catch (_: Exception) {
            return null
        }

        val isSandboxed = try {
            options.getBoolean("sandboxed")
        } catch (_: Exception) {
            return null
        }

        var builder = Judo.Builder(type)
                .setApiToken(token)
                .setApiSecret(secret)
                .setIsSandboxed(isSandboxed)

        getJudoId(options)?.let {
            builder = builder.setJudoId(it)
        }

        getSiteId(options)?.let {
            builder = builder.setSiteId(it)
        }

        getAmount(options)?.let {
            builder = builder.setAmount(it)
        }

        getReference(options)?.let {
            builder = builder.setReference(it)
        }

        getCardNetworks(options)?.let {
            builder = builder.setSupportedCardNetworks(it)
        }

        getPaymentMethods(options)?.let {
            builder = builder.setPaymentMethods(it)
        }

        getUIConfiguration(options)?.let {
            builder = builder.setUiConfiguration(it)
        }

        getPrimaryAccountDetails(options)?.let {
            builder = builder.setPrimaryAccountDetails(it)
        }

        getGooglePayConfiguration(options)?.let {
            builder = builder.setGooglePayConfiguration(it)
        }

        return try {
            builder.build()
        } catch (_: Exception) {
            null
        }
    }

    private fun getWidgetType(options: ReadableMap): PaymentWidgetType {
        return when (options.getInt("transactionType")) {
            1 -> PaymentWidgetType.PRE_AUTH_CARD_PAYMENT
            2 -> PaymentWidgetType.CREATE_CARD_TOKEN
            3 -> PaymentWidgetType.CHECK_CARD
            4 -> PaymentWidgetType.SAVE_CARD
            else -> PaymentWidgetType.CARD_PAYMENT
        }
    }

    private fun getJudoId(options: ReadableMap): String? {

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        return try {
            configuration?.getString("judoId")
        } catch (_: Exception) {
            null
        }
    }

    private fun getAmount(options: ReadableMap): Amount? {

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        val amount = try {
            configuration?.getMap("amount")
        } catch (_: Exception) {
            return null
        }

        val amountValue = try {
            amount?.getString("value")
        } catch (_: Exception) {
            return null
        }

        val currencyValue = try {
            amount?.getString("currency")
        } catch (_: Exception) {
            return null
        }

        val currency = when (currencyValue) {
            null -> Currency.GBP
            else -> Currency.valueOf(currencyValue)
        }

        return try { Amount.Builder()
                .setAmount(amountValue)
                .setCurrency(currency)
                .build() } catch (_: Exception) {
            null
        }
    }

    private fun getReference(options: ReadableMap): Reference? {

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        val reference = try {
            configuration?.getMap("reference")
        } catch (_: Exception) {
            return null
        }

        val consumerReference = try {
            reference?.getString("consumerReference")
        } catch (_: Exception) {
            return null
        }

        val paymentReference = try {
            reference?.getString("paymentReference")
        } catch (_: Exception) {
            null
        }

        val metadata = try {
            reference?.getMap("metadata")
        } catch (_: Exception) {
            null
        }

        var builder = Reference.Builder()
                .setConsumerReference(consumerReference)
                .setPaymentReference(paymentReference)

        metadata?.let {
            val bundle = Bundle()
            metadata.toHashMap().forEach {
                bundle.putString(it.key, it.value.toString())
            }
            builder = builder.setMetaData(bundle)
        }

        return try {
            builder.build()
        } catch (_: Exception) {
            null
        }
    }

    private fun getSiteId(options: ReadableMap): String? {

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        return try {
            configuration?.getString("siteId")
        } catch (_: Exception) {
            null
        }
    }

    private fun getCardNetworks(options: ReadableMap): Array<CardNetwork>? {

        val cardVisa = 1
        val cardMastercard = 1 shl 1
        val cardMaestro = 1 shl 2
        val cardAmex = 1 shl 3
        val cardChinaUnionPay = 1 shl 4
        val cardJcb = 1 shl 5
        val cardDiscover = 1 shl 6
        val cardDinersClub = 1 shl 7
        val cardsAll = 1 shl 8

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        val cardNetworkValue = try {
            configuration?.getInt("supportedCardNetworks")
        } catch (_: Exception) {
            return null
        }

        var supportedNetworks: MutableList<CardNetwork>? = null

        cardNetworkValue?.let {
            
            supportedNetworks = ArrayList()

            if (cardNetworkValue and cardVisa == cardVisa) {
                supportedNetworks?.add(CardNetwork.VISA)
            }

            if (cardNetworkValue and cardMastercard == cardMastercard) {
                supportedNetworks?.add(CardNetwork.MASTERCARD)
            }

            if (cardNetworkValue and cardMaestro == cardMaestro) {
                supportedNetworks?.add(CardNetwork.MAESTRO)
            }

            if (cardNetworkValue and cardAmex == cardAmex) {
                supportedNetworks?.add(CardNetwork.AMEX)
            }

            if (cardNetworkValue and cardChinaUnionPay == cardChinaUnionPay) {
                supportedNetworks?.add(CardNetwork.CHINA_UNION_PAY)
            }

            if (cardNetworkValue and cardJcb == cardJcb) {
                supportedNetworks?.add(CardNetwork.JCB)
            }

            if (cardNetworkValue and cardDiscover == cardDiscover) {
                supportedNetworks?.add(CardNetwork.DISCOVER)
            }

            if (cardNetworkValue and cardDinersClub == cardDinersClub) {
                supportedNetworks?.add(CardNetwork.DINERS_CLUB)
            }

            if (cardNetworkValue and cardsAll == cardsAll) {
                return CardNetwork.values()
            }
        }
        return supportedNetworks?.toTypedArray()
    }

    private fun getPaymentMethods(options: ReadableMap): Array<PaymentMethod>? {

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        val paymentMethodValue = try {
            configuration?.getInt("paymentMethods")
        } catch (_: Exception) {
            return null
        }

        var paymentMethods: ArrayList<PaymentMethod>? = null

        val cardPaymentValue = 1
        val googlePaymentValue = 1 shl 2
        val idealPaymentValue = 1 shl 3
        val allPaymentValues = 1 shl 4

        paymentMethodValue?.let {

            paymentMethods = ArrayList()

            if (paymentMethodValue and cardPaymentValue == cardPaymentValue) {
                paymentMethods?.add(PaymentMethod.CARD)
            }

            if (paymentMethodValue and googlePaymentValue == googlePaymentValue) {
                paymentMethods?.add(PaymentMethod.GOOGLE_PAY)
            }

            if (paymentMethodValue and idealPaymentValue == idealPaymentValue) {
                paymentMethods?.add(PaymentMethod.IDEAL)
            }

            if (paymentMethodValue and allPaymentValues == allPaymentValues) {
                return PaymentMethod.values()
            }
        }

        return paymentMethods?.toTypedArray()
    }

    private fun getUIConfiguration(options: ReadableMap): UiConfiguration? {

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        val uiConfiguration = try {
            configuration?.getMap("uiConfiguration")
        } catch (_: Exception) {
            return null
        }

        val isAVSEnabled = try {
            uiConfiguration?.getBoolean("isAVSEnabled")
        } catch (_: Exception) {
            return null
        }

        return try { UiConfiguration.Builder()
                .setAvsEnabled(isAVSEnabled)
                .build() } catch (_: Exception) {
            null
        }
    }

    private fun getPrimaryAccountDetails(options: ReadableMap): PrimaryAccountDetails? {

        val configuration = try {
            options.getMap("configuration")
        } catch (_: Exception) {
            return null
        }

        val primaryAccountDetails = try {
            configuration?.getMap("primaryAccountDetails")
        } catch (_: Exception) {
            return null
        }

        val name = try {
            primaryAccountDetails?.getString("name")
        } catch (_: Exception) {
            null
        }

        val accountNumber = try {
            primaryAccountDetails?.getString("accountNumber")
        } catch (_: Exception) {
            null
        }

        val dateOfBirth = try {
            primaryAccountDetails?.getString("dateOfBirth")
        } catch (_: Exception) {
            null
        }

        val postCode = try {
            primaryAccountDetails?.getString("postCode")
        } catch (_: Exception) {
            null
        }

        return try { PrimaryAccountDetails.Builder()
                .setName(name)
                .setAccountNumber(accountNumber)
                .setDateOfBirth(dateOfBirth)
                .setPostCode(postCode).build() } catch (_: Exception) {
            null
        }
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

        return try {
            builder.build()
        } catch (_: Exception) {
            null
        }
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
}
package com.reactlibrary

import android.net.Uri
import android.os.Bundle
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.judopay.judo3ds2.customization.ButtonCustomization
import com.judopay.judo3ds2.customization.LabelCustomization
import com.judopay.judo3ds2.customization.TextBoxCustomization
import com.judopay.judo3ds2.customization.ToolbarCustomization
import com.judopay.judo3ds2.customization.UiCustomization
import com.judopay.judokit.android.Judo
import com.judopay.judokit.android.api.model.Authorization
import com.judopay.judokit.android.api.model.BasicAuthorization
import com.judopay.judokit.android.api.model.PaymentSessionAuthorization
import com.judopay.judokit.android.api.model.request.Address
import com.judopay.judokit.android.model.*
import com.judopay.judokit.android.model.googlepay.*

// For consistency with:
// https://github.com/Judopay/JudoKit-iOS/blob/master/Source/Models/Response/JPResponse.m#L36
private const val TRANSACTION_TYPE_PAYMENT = "payment"
private const val TRANSACTION_TYPE_PRE_AUTH = "preauth"
private const val TRANSACTION_TYPE_REGISTER = "register"
private const val TRANSACTION_TYPE_REGISTER_CARD = "registercard"
private const val TRANSACTION_TYPE_SAVE_CARD = "save"
private const val TRANSACTION_TYPE_CHECK_CARD = "checkcard"

// For consistency with:
// https://github.com/Judopay/JudoKit-iOS/blob/master/Source/Models/Transaction/JPTransactionType.h#L30
private enum class TransactionType(val value: Int, val typeAsStrings: List<String>? = null) {
    PAYMENT(1, listOf(TRANSACTION_TYPE_PAYMENT)),
    PRE_AUTH(2, listOf(TRANSACTION_TYPE_PRE_AUTH)),
    REGISTER_CARD(3, listOf(TRANSACTION_TYPE_REGISTER, TRANSACTION_TYPE_REGISTER_CARD)),
    CHECK_CARD(4, listOf(TRANSACTION_TYPE_CHECK_CARD)),
    SAVE_CARD(5, listOf(TRANSACTION_TYPE_SAVE_CARD)),
    UNKNOWN(-1)
}

// For consistency with:
// https://github.com/Judopay/JudoKit-iOS/blob/master/Source/Models/Response/JPResponse.m#L32
private const val STATUS_DECLINED = "declined"
private const val STATUS_SUCCESS = "success"
private const val STATUS_ERROR = "error"

// For consistency with:
// https://github.com/Judopay/JudoKit-iOS/blob/abd34bbfe4784fb5f074ed30f93d6743ba295622/Source/Models/Transaction/JPTransactionResult.h#L27
private enum class TransactionResult(val value: Int, val status: String? = null) {
    ERROR(0, STATUS_ERROR),
    SUCCESS(1, STATUS_SUCCESS),
    DECLINED(2, STATUS_DECLINED),
    UNKNOWN(-1)
}

internal fun getTransactionConfiguration(options: ReadableMap): Judo {
    val widgetType = getTransactionTypeWidget(options)
    return getJudoConfiguration(widgetType, options)
}

internal fun getTokenTransactionConfiguration(options: ReadableMap): Judo {
    val widgetType = getTransactionModeWidget(options)
    return getJudoConfiguration(widgetType, options)
}

internal fun getGoogleTransactionConfiguration(options: ReadableMap): Judo {
    val type = when (options.transactionMode) {
        0 -> PaymentWidgetType.GOOGLE_PAY
        else -> PaymentWidgetType.PRE_AUTH_GOOGLE_PAY
    }
    return getJudoConfiguration(type, options)
}

internal fun getPaymentMethodsConfiguration(options: ReadableMap): Judo {
    val type = when (options.transactionMode) {
        0 -> PaymentWidgetType.PAYMENT_METHODS
        1 -> PaymentWidgetType.PRE_AUTH_PAYMENT_METHODS
        2 -> PaymentWidgetType.SERVER_TO_SERVER_PAYMENT_METHODS
        else -> PaymentWidgetType.PAYMENT_METHODS
    }
    return getJudoConfiguration(type, options)
}

internal fun getMappedType(type: String?): Int {
    val typeInLowercase = type?.lowercase()
    val typeValue = TransactionType.values().firstOrNull { it.typeAsStrings?.contains(typeInLowercase) ?: false }

    return typeValue?.value ?: TransactionType.UNKNOWN.value
}

// consistent with:
// https://github.com/Judopay/JudoKit-iOS/blob/master/Source/Models/Response/JPResponse.m#L125
internal fun getMappedResult(result: String?): Int {
    val resultInLowercase = result?.lowercase()
    val resultValue = TransactionResult.values().firstOrNull { it.status == resultInLowercase }

    return resultValue?.value ?: TransactionResult.UNKNOWN.value
}

internal fun getMappedResult(result: JudoResult?): WritableMap {
    val map = Arguments.createMap()
    map.putString("receiptId", result?.receiptId)
    map.putString("yourPaymentReference", result?.yourPaymentReference)
    map.putInt("type", getMappedType(result?.type))
    map.putString("createdAt", result?.createdAt.toString())
    map.putInt("result", getMappedResult(result?.result))
    map.putString("message", result?.message)
    map.putString("judoId", result?.judoId)
    map.putString("merchantName", result?.merchantName)
    map.putString("appearsOnStatementAs", result?.appearsOnStatementAs)
    map.putString("originalAmount", result?.originalAmount.toString())
    map.putString("netAmount", result?.netAmount.toString())
    map.putString("amount", result?.amount.toString())
    map.putString("currency", result?.currency)

    val cardDetailsMap = Arguments.createMap()
    cardDetailsMap.putString("cardLastFour", result?.cardDetails?.lastFour)
    cardDetailsMap.putString("endDate", result?.cardDetails?.endDate)
    cardDetailsMap.putString("cardToken", result?.cardDetails?.token)
    result?.cardDetails?.type?.let { cardDetailsMap.putInt("cardNetwork", it) }
    cardDetailsMap.putString("bank", result?.cardDetails?.bank)
    cardDetailsMap.putString("cardCategory", result?.cardDetails?.category)
    cardDetailsMap.putString("cardCountry", result?.cardDetails?.country)
    cardDetailsMap.putString("cardFunding", result?.cardDetails?.funding)
    cardDetailsMap.putString("cardScheme", result?.cardDetails?.scheme)
    cardDetailsMap.putString("cardHolderName", result?.cardDetails?.cardHolderName)

    map.putMap("cardDetails", cardDetailsMap)

    val consumerMap = Arguments.createMap()
    consumerMap.putString("consumerToken", result?.consumer?.consumerToken)
    consumerMap.putString("consumerReference", result?.consumer?.yourConsumerReference)

    map.putMap("consumer", consumerMap)

    return map
}

internal fun getJudoConfigurationForApiService(options: ReadableMap): Judo {
    val authorization = getAuthorization(options)

    val amount = Amount.Builder()
        .setAmount("0.00")
        .setCurrency(Currency.GBP)
        .build()

    val reference = Reference.Builder()
        .setConsumerReference("reference")
        .build()

    return Judo.Builder(PaymentWidgetType.CARD_PAYMENT)
        .setIsSandboxed(options.isSandboxed)
        .setJudoId("000000")
        .setAuthorization(authorization)
        .setAmount(amount)
        .setReference(reference)
        .build()
}

internal fun getJudoConfiguration(type: PaymentWidgetType, options: ReadableMap): Judo {
    val authorization = getAuthorization(options)
    val amount = getAmount(options)
    val reference = getReference(options)
    val cardNetworks = getCardNetworks(options)
    val paymentMethods = getPaymentMethods(options)
    val uiConfiguration = getUIConfiguration(options)
    val primaryAccountDetails = getPrimaryAccountDetails(options)
    val googlePayConfiguration = getGooglePayConfiguration(options)
    val pbbaConfiguration = getPBBAConfiguration(options)
    val timeouts = getNetworkTimeout(options)
    val challengeRequestIndicator = getChallengeRequestIndicator(options)
    val scaExemption = getScaExemption(options)
    val address = getAddress(options)

    return Judo.Builder(type)
        .setAuthorization(authorization)
        .setIsSandboxed(options.isSandboxed)
        .setJudoId(options.judoId)
        .setAmount(amount)
        .setReference(reference)
        .setSupportedCardNetworks(cardNetworks)
        .setPaymentMethods(paymentMethods)
        .setUiConfiguration(uiConfiguration)
        .setPrimaryAccountDetails(primaryAccountDetails)
        .setGooglePayConfiguration(googlePayConfiguration)
        .setPBBAConfiguration(pbbaConfiguration)
        .setInitialRecurringPayment(options.isInitialRecurringPayment)
        .setDelayedAuthorisation(options.isDelayedAuthorisation)
        .setNetworkTimeout(timeouts)
        .setChallengeRequestIndicator(challengeRequestIndicator)
        .setScaExemption(scaExemption)
        .setMobileNumber(options.mobileNumber)
        .setEmailAddress(options.emailAddress)
        .setThreeDSTwoMaxTimeout(options.threeDSTwoMaxTimeout)
        .setThreeDSTwoMessageVersion(options.threeDSTwoMessageVersion)
        .setPhoneCountryCode(options.phoneCountryCode)
        .setAddress(address)
        .build()
}

internal fun getAddress(options: ReadableMap): Address? {
    if (options.cardAddress != null) {
        return Address.Builder()
            .setLine1(options.cardAddressLine1)
            .setLine2(options.cardAddressLine2)
            .setLine3(options.cardAddressLine3)
            .setTown(options.cardAddressTown)
            .setPostCode(options.cardAddressPostCode)
            .setCountryCode(options.cardAddressCountryCode)
            .setState(options.cardAddressState)
            .build()
    }
    return null
}

internal fun getNetworkTimeout(options: ReadableMap): NetworkTimeout? {
    val networkTimeout = options.networkTimeout
    if (networkTimeout != null) {
        return NetworkTimeout.Builder()
            .setConnectTimeout(options.networkConnectTimeout)
            .setReadTimeout(options.networkReadTimeout)
            .setWriteTimeout(options.networkWriteTimeout)
            .build()
    }
    return null
}

internal fun getChallengeRequestIndicator(options: ReadableMap): ChallengeRequestIndicator? = ChallengeRequestIndicator.values().firstOrNull { it.value == options.challengeRequestIndicator }

internal fun getScaExemption(options: ReadableMap): ScaExemption? = ScaExemption.values().firstOrNull { it.value == options.scaExemption }

internal fun getAuthorization(options: ReadableMap): Authorization {
    val token = options.token

    options.secret?.let { secret ->
        return BasicAuthorization.Builder()
            .setApiToken(token)
            .setApiSecret(secret)
            .build()
    }

    options.paymentSession?.let { paymentSession ->
        return PaymentSessionAuthorization.Builder()
            .setApiToken(token)
            .setPaymentSession(paymentSession)
            .build()
    }

    throw IllegalArgumentException("No secret or payment session in the authorization")
}

internal fun getTransactionTypeWidget(options: ReadableMap) = when (options.getInt("transactionType")) {
    1 -> PaymentWidgetType.CARD_PAYMENT
    2 -> PaymentWidgetType.PRE_AUTH
    3 -> PaymentWidgetType.REGISTER_CARD
    4 -> PaymentWidgetType.CHECK_CARD
    5 -> PaymentWidgetType.CREATE_CARD_TOKEN
    else -> throw IllegalArgumentException("Unknown transaction type")
}

internal fun getTransactionModeWidget(options: ReadableMap) = when (options.getInt("transactionMode")) {
    1 -> PaymentWidgetType.PRE_AUTH
    else -> PaymentWidgetType.CARD_PAYMENT
}

internal fun getAmount(options: ReadableMap): Amount {
    val currency = when (val currencyValue = options.currencyValue) {
        null -> Currency.GBP
        else -> Currency.valueOf(currencyValue)
    }
    return Amount.Builder()
        .setAmount(options.amountValue)
        .setCurrency(currency)
        .build()
}

internal fun getReference(options: ReadableMap): Reference? {

    var builder = Reference.Builder()
        .setConsumerReference(options.consumerReference)
        .setPaymentReference(options.paymentReference)

    val metadataMap = options.metadata
    metadataMap?.let {
        val bundle = Bundle()
        metadataMap.toHashMap().forEach {
            bundle.putString(it.key, it.value.toString())
        }
        builder = builder.setMetaData(bundle)
    }

    return builder.build()
}

internal fun getCardNetworks(options: ReadableMap): Array<CardNetwork>? {

    val cardVisa = 1
    val cardMastercard = 1 shl 1
    val cardMaestro = 1 shl 2
    val cardAmex = 1 shl 3
    val cardChinaUnionPay = 1 shl 4
    val cardJcb = 1 shl 5
    val cardDiscover = 1 shl 6
    val cardDinersClub = 1 shl 7
    val cardsAll = 1 shl 8

    var supportedNetworks: MutableList<CardNetwork>? = null

    val cardValue = options.cardNetworkValue
    cardValue?.let {

        supportedNetworks = ArrayList()

        if (cardValue and cardVisa == cardVisa) {
            supportedNetworks?.add(CardNetwork.VISA)
        }

        if (cardValue and cardMastercard == cardMastercard) {
            supportedNetworks?.add(CardNetwork.MASTERCARD)
        }

        if (cardValue and cardMaestro == cardMaestro) {
            supportedNetworks?.add(CardNetwork.MAESTRO)
        }

        if (cardValue and cardAmex == cardAmex) {
            supportedNetworks?.add(CardNetwork.AMEX)
        }

        if (cardValue and cardChinaUnionPay == cardChinaUnionPay) {
            supportedNetworks?.add(CardNetwork.CHINA_UNION_PAY)
        }

        if (cardValue and cardJcb == cardJcb) {
            supportedNetworks?.add(CardNetwork.JCB)
        }

        if (cardValue and cardDiscover == cardDiscover) {
            supportedNetworks?.add(CardNetwork.DISCOVER)
        }

        if (cardValue and cardDinersClub == cardDinersClub) {
            supportedNetworks?.add(CardNetwork.DINERS_CLUB)
        }

        if (cardValue and cardsAll == cardsAll) {
            return CardNetwork.values()
        }
    }
    return supportedNetworks?.toTypedArray()
}

internal fun getPaymentMethods(options: ReadableMap): Array<PaymentMethod>? {

    var paymentMethods: ArrayList<PaymentMethod>? = null

    val cardPaymentValue = 1
    val googlePaymentValue = 1 shl 2
    val idealPaymentValue = 1 shl 3
    val allPaymentValues = 1 shl 4

    options.paymentMethodValue?.let {

        paymentMethods = arrayListOf()

        if (it and cardPaymentValue == cardPaymentValue) {
            paymentMethods?.add(PaymentMethod.CARD)
        }

        if (it and googlePaymentValue == googlePaymentValue) {
            paymentMethods?.add(PaymentMethod.GOOGLE_PAY)
        }

        if (it and idealPaymentValue == idealPaymentValue) {
            paymentMethods?.add(PaymentMethod.IDEAL)
        }

        if (it and allPaymentValues == allPaymentValues) {
            return PaymentMethod.values()
        }
    }

    return paymentMethods?.toTypedArray()
}

internal fun getUIConfiguration(options: ReadableMap): UiConfiguration? {
    return if (options.uiConfiguration != null) {
        UiConfiguration.Builder()
            .setAvsEnabled(options.isAVSEnabled)
            .setShouldPaymentMethodsDisplayAmount(options.shouldPaymentMethodsDisplayAmount)
            .setShouldPaymentButtonDisplayAmount(options.shouldPaymentButtonDisplayAmount)
            .setShouldPaymentMethodsVerifySecurityCode(options.shouldPaymentMethodsVerifySecurityCode)
            .setShouldAskForBillingInformation(options.shouldAskForBillingInformation)
            .setThreeDSUiCustomization(getThreeDSUiCustomization(options))
            .build()
    } else {
        null
    }
}

internal fun getThreeDSUiCustomization(options: ReadableMap): UiCustomization? {
    return if (options.threeDSUIConfiguration != null) {

        val uiCustomization = UiCustomization()

        options.threeDSUIToolbarCustomization?.let {
            uiCustomization.setToolbarCustomization(ToolbarCustomization().apply {
                setTextFontName(it.textFontName)
                setTextColor(it.textColor)
                setTextFontSize(it.textFontSize)
                setBackgroundColor(it.backgroundColor)
                setHeaderText(it.headerText)
                setButtonText(it.buttonText)
            })
        }

        options.threeDSUILabelCustomization?.let {
            uiCustomization.setLabelCustomization(LabelCustomization().apply {
                setTextFontName(it.textFontName)
                setTextColor(it.textColor)
                setTextFontSize(it.textFontSize)
                setHeadingTextFontName(it.headingTextFontName)
                setHeadingTextColor(it.headingTextColor)
                setHeadingTextFontSize(it.headingTextFontSize)
            })
        }

        options.threeDSUITextBoxCustomization?.let {
            uiCustomization.setTextBoxCustomization(TextBoxCustomization().apply {
                setTextFontName(it.textFontName)
                setTextColor(it.textColor)
                setTextFontSize(it.textFontSize)
                setBorderWidth(it.borderWidth)
                setBorderColor(it.borderColor)
                setCornerRadius(it.cornerRadius)
            })
        }

        if (options.threeDSUIButtonCustomizations != null) {

            options.threeDSUISubmitButtonCustomization?.let {
                uiCustomization.setButtonCustomization(ButtonCustomization().apply {
                    setTextFontName(it.textFontName)
                    setTextColor(it.textColor)
                    setTextFontSize(it.textFontSize)
                    setBackgroundColor(it.backgroundColor)
                    setCornerRadius(it.cornerRadius)
                }, UiCustomization.ButtonType.SUBMIT)
            }

            options.threeDSUINextButtonCustomization?.let {
                uiCustomization.setButtonCustomization(ButtonCustomization().apply {
                    setTextFontName(it.textFontName)
                    setTextColor(it.textColor)
                    setTextFontSize(it.textFontSize)
                    setBackgroundColor(it.backgroundColor)
                    setCornerRadius(it.cornerRadius)
                }, UiCustomization.ButtonType.NEXT)
            }

            options.threeDSUIContinueButtonCustomization?.let {
                uiCustomization.setButtonCustomization(ButtonCustomization().apply {
                    setTextFontName(it.textFontName)
                    setTextColor(it.textColor)
                    setTextFontSize(it.textFontSize)
                    setBackgroundColor(it.backgroundColor)
                    setCornerRadius(it.cornerRadius)
                }, UiCustomization.ButtonType.CONTINUE)
            }

            options.threeDSUICancelButtonCustomization?.let {
                uiCustomization.setButtonCustomization(ButtonCustomization().apply {
                    setTextFontName(it.textFontName)
                    setTextColor(it.textColor)
                    setTextFontSize(it.textFontSize)
                    setBackgroundColor(it.backgroundColor)
                    setCornerRadius(it.cornerRadius)
                }, UiCustomization.ButtonType.CANCEL)
            }

            options.threeDSUIResendButtonCustomization?.let {
                uiCustomization.setButtonCustomization(ButtonCustomization().apply {
                    setTextFontName(it.textFontName)
                    setTextColor(it.textColor)
                    setTextFontSize(it.textFontSize)
                    setBackgroundColor(it.backgroundColor)
                    setCornerRadius(it.cornerRadius)
                }, UiCustomization.ButtonType.RESEND)
            }
        }

        uiCustomization
    } else {
        null
    }
}

internal fun getPrimaryAccountDetails(options: ReadableMap): PrimaryAccountDetails? {
    return if (options.primaryAccountDetails != null) {
        PrimaryAccountDetails.Builder()
            .setName(options.name)
            .setAccountNumber(options.accountNumber)
            .setDateOfBirth(options.dateOfBirth)
            .setPostCode(options.postCode)
            .build()
    } else {
        null
    }
}

internal fun getGooglePayConfiguration(options: ReadableMap): GooglePayConfiguration? {

    val environment = when (options.environmentValue) {
        0 -> GooglePayEnvironment.TEST
        else -> GooglePayEnvironment.PRODUCTION
    }
    val totalPriceStatus = when (options.totalPriceStatus) {
        0 -> GooglePayPriceStatus.FINAL
        1 -> GooglePayPriceStatus.ESTIMATED
        2 -> GooglePayPriceStatus.NOT_CURRENTLY_KNOWN
        else -> null
    }

    val checkoutOption = when (options.checkoutOption) {
        0 -> GooglePayCheckoutOption.DEFAULT
        1 -> GooglePayCheckoutOption.COMPLETE_IMMEDIATE_PURCHASE
        else -> null
    }

    val billingParameters = getBillingParameters(options)
    val shippingParameters = getShippingParameters(options)

    return if (options.googlePayConfiguration != null) {
        GooglePayConfiguration.Builder()
            .setEnvironment(environment)
            .setMerchantName(options.merchantName)
            .setTransactionCountryCode(options.countryCode)
            .setTransactionId(options.transactionId)
            .setTotalPriceStatus(totalPriceStatus)
            .setTotalPriceLabel(options.totalPriceLabel)
            .setCheckoutOption(checkoutOption)
            .setIsEmailRequired(options.isEmailRequired)
            .setIsBillingAddressRequired(options.isBillingAddressRequired)
            .setBillingAddressParameters(billingParameters)
            .setIsShippingAddressRequired(options.isShippingAddressRequired)
            .setShippingAddressParameters(shippingParameters)
            .setAllowPrepaidCards(options.allowPrepaidCards)
            .setAllowCreditCards(options.allowCreditCards)
            .build()
    } else {
        null
    }
}

internal fun getBillingParameters(options: ReadableMap): GooglePayBillingAddressParameters? {
    val addressFormat = when (options.addressFormat) {
        0 -> GooglePayAddressFormat.MIN
        else -> GooglePayAddressFormat.FULL
    }
    return GooglePayBillingAddressParameters(
        addressFormat,
        options.isBillingPhoneNumberRequired
    )
}

internal fun getShippingParameters(options: ReadableMap): GooglePayShippingAddressParameters? {

    var allowedCountryCodes: Array<String>? = null
    val allowedCountryArray = options.allowedCountryCodeList

    allowedCountryArray?.let {
        val countryList = allowedCountryArray.toArrayList().mapNotNull { it as String }
        allowedCountryCodes = countryList.toTypedArray()
    }

    return GooglePayShippingAddressParameters(
        allowedCountryCodes,
        options.isShippingPhoneNumberRequired
    )
}

internal fun getPBBAConfiguration(options: ReadableMap): PBBAConfiguration? {
    return if (options.pbbaConfiguration != null) {
        val deeplinkUri = if (options.deeplinkURL.isNullOrBlank()) {
            null
        } else {
            Uri.parse(options.deeplinkURL)
        }

        PBBAConfiguration.Builder()
            .setMobileNumber(options.pbbaMobileNumber)
            .setEmailAddress(options.pbbaEmailAddress)
            .setDeepLinkURL(deeplinkUri)
            .setDeepLinkScheme(options.deeplinkScheme)
            .build()
    } else {
        null
    }
}

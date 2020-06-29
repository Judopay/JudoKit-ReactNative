package com.reactlibrary

import android.net.Uri
import android.os.Bundle
import com.facebook.react.bridge.ReadableMap
import com.judokit.android.Judo
import com.judokit.android.model.Amount
import com.judokit.android.model.CardNetwork
import com.judokit.android.model.Currency
import com.judokit.android.model.GooglePayConfiguration
import com.judokit.android.model.PaymentMethod
import com.judokit.android.model.PaymentWidgetType
import com.judokit.android.model.PBBAConfiguration
import com.judokit.android.model.PrimaryAccountDetails
import com.judokit.android.model.Reference
import com.judokit.android.model.UiConfiguration
import com.judokit.android.model.googlepay.GooglePayAddressFormat
import com.judokit.android.model.googlepay.GooglePayBillingAddressParameters
import com.judokit.android.model.googlepay.GooglePayEnvironment
import com.judokit.android.model.googlepay.GooglePayShippingAddressParameters

internal fun getTransactionConfiguration(options: ReadableMap): Judo {
    val widgetType = getWidgetType(options)
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

internal fun getJudoConfiguration(type: PaymentWidgetType, options: ReadableMap): Judo {
    val amount = getAmount(options)
    val reference = getReference(options)
    val cardNetworks = getCardNetworks(options)
    val paymentMethods = getPaymentMethods(options)
    val uiConfiguration = getUIConfiguration(options)
    val primaryAccountDetails = getPrimaryAccountDetails(options)
    val googlePayConfiguration = getGooglePayConfiguration(options)
    val pbbaConfiguration = getPBBAConfiguration(options)

    return Judo.Builder(type)
            .setApiToken(options.token)
            .setApiSecret(options.secret)
            .setIsSandboxed(options.isSandboxed)
            .setJudoId(options.judoId)
            .setSiteId(options.siteId)
            .setAmount(amount)
            .setReference(reference)
            .setSupportedCardNetworks(cardNetworks)
            .setPaymentMethods(paymentMethods)
            .setUiConfiguration(uiConfiguration)
            .setPrimaryAccountDetails(primaryAccountDetails)
            .setGooglePayConfiguration(googlePayConfiguration)
            .setPBBAConfiguration(pbbaConfiguration)
            .build()
}

internal fun getWidgetType(options: ReadableMap) = when (options.getInt("transactionType")) {
    1 -> PaymentWidgetType.PRE_AUTH
    2 -> PaymentWidgetType.REGISTER_CARD
    3 -> PaymentWidgetType.CHECK_CARD
    4 -> PaymentWidgetType.CREATE_CARD_TOKEN
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
                .build()
    } else {
        null
    }
}

internal fun getPrimaryAccountDetails(options: ReadableMap): PrimaryAccountDetails? {
    return PrimaryAccountDetails.Builder()
            .setName(options.name)
            .setAccountNumber(options.accountNumber)
            .setDateOfBirth(options.dateOfBirth)
            .setPostCode(options.postCode)
            .build()
}

internal fun getGooglePayConfiguration(options: ReadableMap): GooglePayConfiguration? {

    val environment = when (options.environmentValue) {
        0 -> GooglePayEnvironment.TEST
        else -> GooglePayEnvironment.PRODUCTION
    }

    val billingParameters = getBillingParameters(options)
    val shippingParameters = getShippingParameters(options)

    return if (options.googlePayConfiguration != null) {
        GooglePayConfiguration.Builder()
                .setTransactionCountryCode(options.countryCode)
                .setEnvironment(environment)
                .setIsEmailRequired(options.isEmailRequired)
                .setIsBillingAddressRequired(options.isBillingAddressRequired)
                .setBillingAddressParameters(billingParameters)
                .setIsShippingAddressRequired(options.isShippingAddressRequired)
                .setShippingAddressParameters(shippingParameters)
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
                .setMobileNumber(options.mobileNumber)
                .setEmailAddress(options.emailAddress)
                .setDeepLinkURL(deeplinkUri)
                .setDeepLinkScheme(options.deeplinkScheme)
                .build()
    } else {
        null
    }
}

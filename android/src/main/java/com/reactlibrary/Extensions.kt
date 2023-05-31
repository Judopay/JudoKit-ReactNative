package com.reactlibrary

import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.judopay.judokit.android.JUDO_OPTIONS
import com.judopay.judokit.android.Judo
import com.judopay.judokit.android.JudoActivity
import com.judopay.judokit.android.model.CardNetwork

const val CARD_SCHEME_VISA = "visa"
const val CARD_SCHEME_MASTERCARD = "mastercard"
const val CARD_SCHEME_AMEX = "amex"

internal fun ReadableMap?.hasKey(key: String): Boolean = this?.hasKey(key) ?: false

internal fun ReadableMap?.getOptionalString(key: String): String? = if (hasKey(key)) {
    this?.getString(key)
} else {
    null
}

internal fun ReadableMap?.getOptionalBoolean(key: String): Boolean? = if (hasKey(key)) {
    this?.getBoolean(key)
} else {
    null
}

internal fun ReadableMap?.getOptionalInt(key: String): Int? = if (hasKey(key)) {
    this?.getInt(key)
} else {
    null
}

internal fun ReadableMap?.getOptionalDouble(key: String): Double? = if (hasKey(key)) {
    this?.getDouble(key)
} else {
    null
}

internal fun ReadableMap?.getOptionalMap(key: String): ReadableMap? = if (hasKey(key)) {
    this?.getMap(key)
} else {
    null
}

internal fun ReadableMap?.getOptionalArray(key: String): ReadableArray? = if (hasKey(key)) {
    this?.getArray(key)
} else {
    null
}

internal val ReadableMap.configuration: ReadableMap?
    get() = getOptionalMap("configuration")

internal val ReadableMap.transactionMode: Int?
    get() = getOptionalInt("transactionMode")

internal val ReadableMap.authorization: ReadableMap?
    get() = getOptionalMap("authorization")

internal val ReadableMap.isSandboxed: Boolean?
    get() = getOptionalBoolean("sandboxed")

internal val ReadableMap.packageVersion: String?
    get() = getOptionalString("packageVersion")

internal val ReadableMap.cardToken: String?
    get() = getOptionalString("cardToken")

internal val ReadableMap.securityCode: String?
    get() = getOptionalString("securityCode")

internal val ReadableMap.cardholderName: String?
    get() = getOptionalString("cardholderName")

internal val ReadableMap.cardType: CardNetwork
    get() {
        val cardScheme = if (hasKey("cardScheme")) {
            getString("cardScheme")?.lowercase() ?: ""
        } else {
            ""
        }

        return when {
            cardScheme.contains(CARD_SCHEME_VISA) -> CardNetwork.VISA
            cardScheme.contains(CARD_SCHEME_MASTERCARD) -> CardNetwork.MASTERCARD
            cardScheme.contains(CARD_SCHEME_AMEX) -> CardNetwork.AMEX
            else -> CardNetwork.OTHER
        }
    }

internal val ReadableMap.judoId: String?
    get() = configuration?.getOptionalString("judoId")

internal val ReadableMap.receiptId: String?
    get() = getOptionalString("receiptId")

internal val ReadableMap.token: String?
    get() = authorization?.getOptionalString("token")

internal val ReadableMap.secret: String?
    get() = authorization?.getOptionalString("secret")

internal val ReadableMap.paymentSession: String?
    get() = authorization?.getOptionalString("paymentSession")

internal val ReadableMap.amount: ReadableMap?
    get() = configuration?.getOptionalMap("amount")

internal val ReadableMap.amountValue: String?
    get() = amount?.getOptionalString("value")

internal val ReadableMap.currencyValue: String?
    get() = amount?.getOptionalString("currency")

internal val ReadableMap.reference: ReadableMap?
    get() = configuration?.getOptionalMap("reference")

internal val ReadableMap.consumerReference: String?
    get() = reference?.getOptionalString("consumerReference")

internal val ReadableMap.paymentReference: String?
    get() = reference?.getOptionalString("paymentReference")

internal val ReadableMap.isInitialRecurringPayment: Boolean?
    get() = configuration?.getOptionalBoolean("isInitialRecurringPayment")

internal val ReadableMap.isDelayedAuthorisation: Boolean?
    get() = configuration?.getOptionalBoolean("isDelayedAuthorisation")

internal val ReadableMap.networkTimeout: ReadableMap?
    get() = configuration?.getOptionalMap("networkTimeout")

internal val ReadableMap.cardAddress: ReadableMap?
    get() = configuration?.getOptionalMap("cardAddress")

internal val ReadableMap.cardAddressLine1: String?
    get() = cardAddress?.getOptionalString("line1")

internal val ReadableMap.cardAddressLine2: String?
    get() = cardAddress?.getOptionalString("line2")

internal val ReadableMap.cardAddressLine3: String?
    get() = cardAddress?.getOptionalString("line3")

internal val ReadableMap.cardAddressPostCode: String?
    get() = cardAddress?.getOptionalString("postCode")

internal val ReadableMap.cardAddressTown: String?
    get() = cardAddress?.getOptionalString("town")

internal val ReadableMap.cardAddressCountryCode: Int?
    get() = cardAddress?.getOptionalInt("countryCode")

internal val ReadableMap.cardAddressState: String?
    get() = cardAddress?.getOptionalString("state")

internal val ReadableMap.networkConnectTimeout: Long?
    get() = networkTimeout?.getOptionalDouble("connectTimeout")?.toLong()

internal val ReadableMap.networkReadTimeout: Long?
    get() = networkTimeout?.getOptionalDouble("readTimeout")?.toLong()

internal val ReadableMap.networkWriteTimeout: Long?
    get() = networkTimeout?.getOptionalDouble("writeTimeout")?.toLong()

internal val ReadableMap.challengeRequestIndicator: String?
    get() = configuration?.getOptionalString("challengeRequestIndicator")

internal val ReadableMap.scaExemption: String?
    get() = configuration?.getOptionalString("scaExemption")

internal val ReadableMap.mobileNumber: String?
    get() = configuration?.getOptionalString("mobileNumber")

internal val ReadableMap.phoneCountryCode: String?
    get() = configuration?.getOptionalString("phoneCountryCode")

internal val ReadableMap.emailAddress: String?
    get() = configuration?.getOptionalString("emailAddress")

internal val ReadableMap.threeDSTwoMaxTimeout: Int?
    get() = configuration?.getOptionalInt("threeDSTwoMaxTimeout")

internal val ReadableMap.threeDSTwoMessageVersion: String?
    get() = configuration?.getOptionalString("threeDSTwoMessageVersion")

internal val ReadableMap.metadata: ReadableMap?
    get() = reference?.getOptionalMap("metadata")

internal val ReadableMap.cardNetworkValue: Int?
    get() = configuration?.getOptionalInt("supportedCardNetworks")

internal val ReadableMap.paymentMethodValue: Int?
    get() = configuration?.getOptionalInt("paymentMethods")

internal val ReadableMap.uiConfiguration: ReadableMap?
    get() = configuration?.getOptionalMap("uiConfiguration")

internal val ReadableMap.threeDSUIConfiguration: ReadableMap?
    get() = uiConfiguration?.getOptionalMap("threeDSUIConfiguration")

internal val ReadableMap.threeDSUITextBoxCustomization: ReadableMap?
    get() = threeDSUIConfiguration?.getOptionalMap("textBoxCustomization")

internal val ReadableMap.threeDSUIButtonCustomizations: ReadableMap?
    get() = threeDSUIConfiguration?.getOptionalMap("buttonCustomizations")

internal val ReadableMap.threeDSUISubmitButtonCustomization: ReadableMap?
    get() = threeDSUIButtonCustomizations?.getOptionalMap("SUBMIT")

internal val ReadableMap.threeDSUIContinueButtonCustomization: ReadableMap?
    get() = threeDSUIButtonCustomizations?.getOptionalMap("CONTINUE")

internal val ReadableMap.threeDSUINextButtonCustomization: ReadableMap?
    get() = threeDSUIButtonCustomizations?.getOptionalMap("NEXT")

internal val ReadableMap.threeDSUICancelButtonCustomization: ReadableMap?
    get() = threeDSUIButtonCustomizations?.getOptionalMap("CANCEL")

internal val ReadableMap.threeDSUIResendButtonCustomization: ReadableMap?
    get() = threeDSUIButtonCustomizations?.getOptionalMap("RESEND")

internal val ReadableMap.threeDSUIToolbarCustomization: ReadableMap?
    get() = threeDSUIConfiguration?.getOptionalMap("toolbarCustomization")

internal val ReadableMap.threeDSUILabelCustomization: ReadableMap?
    get() = threeDSUIConfiguration?.getOptionalMap("labelCustomization")

internal val ReadableMap.textFontName: String?
    get() = getOptionalString("textFontName")

internal val ReadableMap.textColor: String?
    get() = getOptionalString("textColor")

internal val ReadableMap.backgroundColor: String?
    get() = getOptionalString("backgroundColor")

internal val ReadableMap.headerText: String?
    get() = getOptionalString("headerText")

internal val ReadableMap.buttonText: String?
    get() = getOptionalString("buttonText")

internal val ReadableMap.headingTextFontName: String?
    get() = getOptionalString("headingTextFontName")

internal val ReadableMap.headingTextColor: String?
    get() = getOptionalString("headingTextColor")

internal val ReadableMap.borderColor: String?
    get() = getOptionalString("borderColor")

internal val ReadableMap.textFontSize: Int?
    get() = getOptionalInt("textFontSize")

internal val ReadableMap.cornerRadius: Int?
    get() = getOptionalInt("cornerRadius")

internal val ReadableMap.headingTextFontSize: Int?
    get() = getOptionalInt("headingTextFontSize")

internal val ReadableMap.borderWidth: Int?
    get() = getOptionalInt("borderWidth")

internal val ReadableMap.isAVSEnabled: Boolean?
    get() = uiConfiguration?.getOptionalBoolean("isAVSEnabled")

internal val ReadableMap.shouldPaymentMethodsDisplayAmount: Boolean?
    get() = uiConfiguration?.getOptionalBoolean("shouldPaymentMethodsDisplayAmount")

internal val ReadableMap.shouldPaymentButtonDisplayAmount: Boolean?
    get() = uiConfiguration?.getOptionalBoolean("shouldPaymentButtonDisplayAmount")

internal val ReadableMap.shouldPaymentMethodsVerifySecurityCode: Boolean?
    get() = uiConfiguration?.getOptionalBoolean("shouldPaymentMethodsVerifySecurityCode")

internal val ReadableMap.shouldAskForBillingInformation: Boolean
    get() = uiConfiguration?.getOptionalBoolean("shouldAskForBillingInformation") ?: true

internal val ReadableMap.primaryAccountDetails: ReadableMap?
    get() = configuration?.getOptionalMap("primaryAccountDetails")

internal val ReadableMap.name: String?
    get() = primaryAccountDetails?.getOptionalString("name")

internal val ReadableMap.accountNumber: String?
    get() = primaryAccountDetails?.getOptionalString("accountNumber")

internal val ReadableMap.dateOfBirth: String?
    get() = primaryAccountDetails?.getOptionalString("dateOfBirth")

internal val ReadableMap.postCode: String?
    get() = primaryAccountDetails?.getOptionalString("postCode")

internal val ReadableMap.googlePayConfiguration: ReadableMap?
    get() = configuration?.getOptionalMap("googlePayConfiguration")

internal val ReadableMap.countryCode: String?
    get() = googlePayConfiguration?.getOptionalString("countryCode")

internal val ReadableMap.environmentValue: Int?
    get() = googlePayConfiguration?.getOptionalInt("environment")

internal val ReadableMap.merchantName: String?
    get() = googlePayConfiguration?.getOptionalString("merchantName")

internal val ReadableMap.transactionId: String?
    get() = googlePayConfiguration?.getOptionalString("transactionId")

internal val ReadableMap.totalPriceStatus: Int?
    get() = googlePayConfiguration?.getOptionalInt("totalPriceStatus")

internal val ReadableMap.totalPriceLabel: String?
    get() = googlePayConfiguration?.getOptionalString("totalPriceLabel")

internal val ReadableMap.checkoutOption: Int?
    get() = googlePayConfiguration?.getOptionalInt("checkoutOption")

internal val ReadableMap.isEmailRequired: Boolean?
    get() = googlePayConfiguration?.getOptionalBoolean("isEmailRequired")

internal val ReadableMap.isBillingAddressRequired: Boolean?
    get() = googlePayConfiguration?.getOptionalBoolean("isBillingAddressRequired")

internal val ReadableMap.isShippingAddressRequired: Boolean?
    get() = googlePayConfiguration?.getOptionalBoolean("isShippingAddressRequired")

internal val ReadableMap.billingAddressParameters: ReadableMap?
    get() = googlePayConfiguration?.getOptionalMap("billingAddressParameters")

internal val ReadableMap.shippingAddressParameters: ReadableMap?
    get() = googlePayConfiguration?.getOptionalMap("shippingAddressParameters")

internal val ReadableMap.isBillingPhoneNumberRequired: Boolean?
    get() = billingAddressParameters?.getOptionalBoolean("isPhoneNumberRequired")

internal val ReadableMap.addressFormat: Int?
    get() = billingAddressParameters?.getOptionalInt("addressFormat")

internal val ReadableMap.isShippingPhoneNumberRequired: Boolean?
    get() = shippingAddressParameters?.getOptionalBoolean("isPhoneNumberRequired")

internal val ReadableMap.allowedCountryCodeList: ReadableArray?
    get() = shippingAddressParameters?.getOptionalArray("allowedCountryCodes")

internal val ReadableMap.allowPrepaidCards: Boolean?
    get() = googlePayConfiguration?.getOptionalBoolean("allowPrepaidCards")

internal val ReadableMap.allowCreditCards: Boolean?
    get() = googlePayConfiguration?.getOptionalBoolean("allowCreditCards")

internal val ReadableMap.pbbaConfiguration: ReadableMap?
    get() = configuration?.getOptionalMap("pbbaConfiguration")

internal val ReadableMap.pbbaMobileNumber: String?
    get() = pbbaConfiguration?.getOptionalString("mobileNumber")

internal val ReadableMap.pbbaEmailAddress: String?
    get() = pbbaConfiguration?.getOptionalString("emailAddress")

internal val ReadableMap.deeplinkScheme: String?
    get() = pbbaConfiguration?.getOptionalString("deeplinkScheme")

internal val ReadableMap.deeplinkURL: String?
    get() = pbbaConfiguration?.getOptionalString("deeplinkURL")

fun Judo.toJudoActivityIntent(packageContext: Context): Intent =
    Intent(packageContext, JudoActivity::class.java)
        .also { it.putExtra(JUDO_OPTIONS, this) }

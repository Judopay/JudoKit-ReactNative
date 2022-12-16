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

internal fun ReadableMap?.hasKey(key: String): Boolean {
    if (this != null) {
        return this.hasKey(key)
    }
    return false
}

internal val ReadableMap.configuration: ReadableMap?
    get() = getMap("configuration")

internal val ReadableMap.transactionMode: Int?
    get() = getInt("transactionMode")

internal val ReadableMap.authorization: ReadableMap?
    get() = getMap("authorization")

internal val ReadableMap.isSandboxed: Boolean?
    get() = getBoolean("sandboxed")

internal val ReadableMap.cardToken: String?
    get() = getString("cardToken")

internal val ReadableMap.securityCode: String?
    get() {
        if (hasKey("securityCode")) {
            return getString("securityCode")
        }
        return null
    }

internal val ReadableMap.cardholderName: String?
    get() {
        if (hasKey("cardholderName")) {
            return getString("cardholderName")
        }
        return null
    }

internal val ReadableMap.cardType: CardNetwork
    get() {
        val cardScheme = if (hasKey("cardScheme")) {
            getString("cardScheme")?.lowercase() ?: ""
        } else {
            ""
        }

        return when {
            cardScheme.contains(CARD_SCHEME_VISA)  -> CardNetwork.VISA
            cardScheme.contains(CARD_SCHEME_MASTERCARD) -> CardNetwork.MASTERCARD
            cardScheme.contains(CARD_SCHEME_AMEX) -> CardNetwork.AMEX
            else -> CardNetwork.OTHER
        }
    }

internal val ReadableMap.judoId: String?
    get() = configuration?.getString("judoId")

internal val ReadableMap.receiptId: String?
    get() = getString("receiptId")

internal val ReadableMap.token: String?
    get() = authorization?.getString("token")

internal val ReadableMap.secret: String?
    get() = authorization?.getString("secret")

internal val ReadableMap.paymentSession: String?
    get() = authorization?.getString("paymentSession")

internal val ReadableMap.amount: ReadableMap?
    get() = configuration?.getMap("amount")

internal val ReadableMap.amountValue: String?
    get() = amount?.getString("value")

internal val ReadableMap.currencyValue: String?
    get() = amount?.getString("currency")

internal val ReadableMap.reference: ReadableMap?
    get() = configuration?.getMap("reference")

internal val ReadableMap.consumerReference: String?
    get() = reference?.getString("consumerReference")

internal val ReadableMap.paymentReference: String?
    get() = reference?.getString("paymentReference")

internal val ReadableMap.isInitialRecurringPayment: Boolean?
    get() = configuration?.getBoolean("isInitialRecurringPayment")

internal val ReadableMap.isDelayedAuthorisation: Boolean?
    get() = configuration?.getBoolean("isDelayedAuthorisation")

internal val ReadableMap.networkTimeout: ReadableMap?
    get() {
        if (configuration.hasKey("networkTimeout")) {
            return configuration?.getMap("networkTimeout")
        }
        return null
    }

internal val ReadableMap.cardAddress: ReadableMap?
    get() {
        if (configuration.hasKey("cardAddress")) {
            return configuration?.getMap("cardAddress")
        }
        return null
    }

internal val ReadableMap.cardAddressLine1: String?
get() {
    if (cardAddress.hasKey("line1")) {
        return cardAddress?.getString("line1")
    }

    return null
}

internal val ReadableMap.cardAddressLine2: String?
    get() {
        if (cardAddress.hasKey("line2")) {
            return cardAddress?.getString("line2")
        }

        return null
    }

internal val ReadableMap.cardAddressLine3: String?
    get() {
        if (cardAddress.hasKey("line3")) {
            return cardAddress?.getString("line3")
        }

        return null
    }

internal val ReadableMap.cardAddressPostCode: String?
    get() {
        if (cardAddress.hasKey("postCode")) {
            return cardAddress?.getString("postCode")
        }

        return null
    }

internal val ReadableMap.cardAddressTown: String?
    get() {
        if (cardAddress.hasKey("town")) {
            return cardAddress?.getString("town")
        }

        return null
    }

internal val ReadableMap.cardAddressCountryCode: Int?
    get() {
        if (cardAddress.hasKey("countryCode")) {
            return cardAddress?.getInt("countryCode")
        }

        return null
    }

internal val ReadableMap.cardAddressState: String?
    get() {
        if (cardAddress.hasKey("state")) {
            return cardAddress?.getString("state")
        }

        return null
    }

internal val ReadableMap.networkConnectTimeout: Long?
    get() = networkTimeout?.getDouble("connectTimeout")?.toLong()

internal val ReadableMap.networkReadTimeout: Long?
    get() = networkTimeout?.getDouble("readTimeout")?.toLong()

internal val ReadableMap.networkWriteTimeout: Long?
    get() = networkTimeout?.getDouble("writeTimeout")?.toLong()

internal val ReadableMap.challengeRequestIndicator: String?
    get() {
        if (configuration.hasKey("challengeRequestIndicator")) {
            return configuration?.getString("challengeRequestIndicator")
        }
        return null
    }

internal val ReadableMap.scaExemption: String?
    get() {
        if (configuration.hasKey("scaExemption")) {
            return configuration?.getString("scaExemption")
        }
        return null
    }

internal val ReadableMap.mobileNumber: String?
    get() {
        if (configuration.hasKey("mobileNumber")) {
            return configuration?.getString("mobileNumber")
        }
        return null
    }

internal val ReadableMap.phoneCountryCode: String?
    get() {
        if (configuration.hasKey("phoneCountryCode")) {
            return configuration?.getString("phoneCountryCode")
        }
        return null
    }

internal val ReadableMap.emailAddress: String?
    get() {
        if (configuration.hasKey("emailAddress")) {
            return configuration?.getString("emailAddress")
        }
        return null
    }

internal val ReadableMap.threeDSTwoMaxTimeout: Int?
    get() {
        if (configuration.hasKey("threeDSTwoMaxTimeout")) {
            return configuration?.getInt("threeDSTwoMaxTimeout")
        }
        return null
    }

internal val ReadableMap.threeDSTwoMessageVersion: String?
    get() {
        if (configuration.hasKey("threeDSTwoMessageVersion")) {
            return configuration?.getString("threeDSTwoMessageVersion")
        }
        return null
    }

internal val ReadableMap.metadata: ReadableMap?
    get() {
        if (reference.hasKey("metadata")) {
            return reference?.getMap("metadata")
        }
        return null
    }

internal val ReadableMap.cardNetworkValue: Int?
    get() {
        if (configuration.hasKey("supportedCardNetworks")) {
            return configuration?.getInt("supportedCardNetworks")
        }
        return null
    }

internal val ReadableMap.paymentMethodValue: Int?
    get() {
        if (configuration.hasKey("paymentMethods")) {
            return configuration?.getInt("paymentMethods")
        }
        return null
    }

internal val ReadableMap.uiConfiguration: ReadableMap?
    get() {
        if (configuration.hasKey("uiConfiguration")) {
            return configuration?.getMap("uiConfiguration")
        }
        return null
    }

internal val ReadableMap.threeDSUIConfiguration: ReadableMap?
    get() {
        if (uiConfiguration.hasKey("threeDSUIConfiguration")) {
            return uiConfiguration?.getMap("threeDSUIConfiguration")
        }
        return null
    }

internal val ReadableMap.threeDSUITextBoxCustomization: ReadableMap?
    get() {
        if (threeDSUIConfiguration.hasKey("textBoxCustomization")) {
            return threeDSUIConfiguration?.getMap("textBoxCustomization")
        }
        return null
    }

internal val ReadableMap.threeDSUIButtonCustomizations: ReadableMap?
    get() {
        if (threeDSUIConfiguration.hasKey("buttonCustomizations")) {
            return threeDSUIConfiguration?.getMap("buttonCustomizations")
        }
        return null
    }

internal val ReadableMap.threeDSUISubmitButtonCustomization: ReadableMap?
    get() {
        if (threeDSUIButtonCustomizations.hasKey("SUBMIT")) {
            return threeDSUIButtonCustomizations?.getMap("SUBMIT")
        }
        return null
    }

internal val ReadableMap.threeDSUIContinueButtonCustomization: ReadableMap?
    get() {
        if (threeDSUIButtonCustomizations.hasKey("CONTINUE")) {
            return threeDSUIButtonCustomizations?.getMap("CONTINUE")
        }
        return null
    }

internal val ReadableMap.threeDSUINextButtonCustomization: ReadableMap?
    get() {
        if (threeDSUIButtonCustomizations.hasKey("NEXT")) {
            return threeDSUIButtonCustomizations?.getMap("NEXT")
        }
        return null
    }

internal val ReadableMap.threeDSUICancelButtonCustomization: ReadableMap?
    get() {
        if (threeDSUIButtonCustomizations.hasKey("CANCEL")) {
            return threeDSUIButtonCustomizations?.getMap("CANCEL")
        }
        return null
    }

internal val ReadableMap.threeDSUIResendButtonCustomization: ReadableMap?
    get() {
        if (threeDSUIButtonCustomizations.hasKey("RESEND")) {
            return threeDSUIButtonCustomizations?.getMap("RESEND")
        }
        return null
    }

internal val ReadableMap.threeDSUIToolbarCustomization: ReadableMap?
    get() {
        if (threeDSUIConfiguration.hasKey("toolbarCustomization")) {
            return threeDSUIConfiguration?.getMap("toolbarCustomization")
        }
        return null
    }

internal val ReadableMap.threeDSUILabelCustomization: ReadableMap?
    get() {
        if (threeDSUIConfiguration.hasKey("labelCustomization")) {
            return threeDSUIConfiguration?.getMap("labelCustomization")
        }
        return null
    }

internal val ReadableMap.textFontName: String?
    get() {
        if (hasKey("textFontName")) {
            return getString("textFontName")
        }
        return null
    }

internal val ReadableMap.textColor: String?
    get() {
        if (hasKey("textColor")) {
            return getString("textColor")
        }
        return null
    }

internal val ReadableMap.backgroundColor: String?
    get() {
        if (hasKey("backgroundColor")) {
            return getString("backgroundColor")
        }
        return null
    }

internal val ReadableMap.headerText: String?
    get() {
        if (hasKey("headerText")) {
            return getString("headerText")
        }
        return null
    }

internal val ReadableMap.buttonText: String?
    get() {
        if (hasKey("buttonText")) {
            return getString("buttonText")
        }
        return null
    }

internal val ReadableMap.headingTextFontName: String?
    get() {
        if (hasKey("headingTextFontName")) {
            return getString("headingTextFontName")
        }
        return null
    }

internal val ReadableMap.headingTextColor: String?
    get() {
        if (hasKey("headingTextColor")) {
            return getString("headingTextColor")
        }
        return null
    }

internal val ReadableMap.borderColor: String?
    get() {
        if (hasKey("borderColor")) {
            return getString("borderColor")
        }
        return null
    }

internal val ReadableMap.textFontSize: Int?
    get() {
        if (hasKey("textFontSize")) {
            return getInt("textFontSize")
        }
        return null
    }

internal val ReadableMap.cornerRadius: Int?
    get() {
        if (hasKey("cornerRadius")) {
            return getInt("cornerRadius")
        }
        return null
    }

internal val ReadableMap.headingTextFontSize: Int?
    get() {
        if (hasKey("headingTextFontSize")) {
            return getInt("headingTextFontSize")
        }
        return null
    }

internal val ReadableMap.borderWidth: Int?
    get() {
        if (hasKey("borderWidth")) {
            return getInt("borderWidth")
        }
        return null
    }

internal val ReadableMap.isAVSEnabled: Boolean?
    get() = uiConfiguration?.getBoolean("isAVSEnabled")

internal val ReadableMap.shouldPaymentMethodsDisplayAmount: Boolean?
    get() = uiConfiguration?.getBoolean("shouldPaymentMethodsDisplayAmount")

internal val ReadableMap.shouldPaymentButtonDisplayAmount: Boolean?
    get() = uiConfiguration?.getBoolean("shouldPaymentButtonDisplayAmount")

internal val ReadableMap.shouldPaymentMethodsVerifySecurityCode: Boolean?
    get() = uiConfiguration?.getBoolean("shouldPaymentMethodsVerifySecurityCode")

internal val ReadableMap.shouldAskForBillingInformation: Boolean
    get() {
        if (uiConfiguration.hasKey("shouldAskForBillingInformation")) {
            return uiConfiguration?.getBoolean("shouldAskForBillingInformation") ?: true
        }
        return true
    }

internal val ReadableMap.primaryAccountDetails: ReadableMap?
    get() {
        if (configuration.hasKey("primaryAccountDetails")) {
            return configuration?.getMap("primaryAccountDetails")
        }
        return null
    }

internal val ReadableMap.name: String?
    get() {
        if (primaryAccountDetails.hasKey("name")) {
            return primaryAccountDetails?.getString("name")
        }
        return null
    }

internal val ReadableMap.accountNumber: String?
    get() {
        if (primaryAccountDetails.hasKey("accountNumber")) {
            return primaryAccountDetails?.getString("accountNumber")
        }
        return null
    }

internal val ReadableMap.dateOfBirth: String?
    get() {
        if (primaryAccountDetails.hasKey("dateOfBirth")) {
            return primaryAccountDetails?.getString("dateOfBirth")
        }
        return null
    }

internal val ReadableMap.postCode: String?
    get() {
        if (primaryAccountDetails.hasKey("postCode")) {
            return primaryAccountDetails?.getString("postCode")
        }
        return null
    }

internal val ReadableMap.googlePayConfiguration: ReadableMap?
    get() {
        if (configuration.hasKey("googlePayConfiguration")) {
            return configuration?.getMap("googlePayConfiguration")
        }
        return null
    }

internal val ReadableMap.countryCode: String?
    get() = googlePayConfiguration?.getString("countryCode")

internal val ReadableMap.environmentValue: Int?
    get() = googlePayConfiguration?.getInt("environment")

internal val ReadableMap.isEmailRequired: Boolean?
    get() = googlePayConfiguration?.getBoolean("isEmailRequired")

internal val ReadableMap.isBillingAddressRequired: Boolean?
    get() = googlePayConfiguration?.getBoolean("isBillingAddressRequired")

internal val ReadableMap.isShippingAddressRequired: Boolean?
    get() = googlePayConfiguration?.getBoolean("isShippingAddressRequired")

internal val ReadableMap.billingAddressParameters: ReadableMap?
    get() {
        if (googlePayConfiguration.hasKey("billingAddressParameters")) {
            return googlePayConfiguration?.getMap("billingAddressParameters")
        }
        return null
    }

internal val ReadableMap.shippingAddressParameters: ReadableMap?
    get() {
        if (googlePayConfiguration.hasKey("shippingAddressParameters")) {
            return googlePayConfiguration?.getMap("shippingAddressParameters")
        }
        return null
    }

internal val ReadableMap.isBillingPhoneNumberRequired: Boolean?
    get() = billingAddressParameters?.getBoolean("isPhoneNumberRequired")

internal val ReadableMap.addressFormat: Int?
    get() = billingAddressParameters?.getInt("addressFormat")

internal val ReadableMap.isShippingPhoneNumberRequired: Boolean?
    get() = shippingAddressParameters?.getBoolean("isPhoneNumberRequired")

internal val ReadableMap.allowedCountryCodeList: ReadableArray?
    get() {
        if (shippingAddressParameters.hasKey("allowedCountryCodes")) {
            return shippingAddressParameters?.getArray("allowedCountryCodes")
        }
        return null
    }

internal val ReadableMap.pbbaConfiguration: ReadableMap?
    get() {
        if (configuration.hasKey("pbbaConfiguration")) {
            return configuration?.getMap("pbbaConfiguration")
        }
        return null
    }

internal val ReadableMap.pbbaMobileNumber: String?
    get() = pbbaConfiguration?.getString("mobileNumber")

internal val ReadableMap.pbbaEmailAddress: String?
    get() = pbbaConfiguration?.getString("emailAddress")

internal val ReadableMap.deeplinkScheme: String?
    get() = pbbaConfiguration?.getString("deeplinkScheme")

internal val ReadableMap.deeplinkURL: String?
    get() {
        return if (pbbaConfiguration.hasKey("deeplinkURL")) {
            pbbaConfiguration?.getString("deeplinkURL")
        } else {
            null
        }
    }

fun Judo.toJudoActivityIntent(packageContext: Context): Intent =
    Intent(packageContext, JudoActivity::class.java)
        .also { it.putExtra(JUDO_OPTIONS, this) }

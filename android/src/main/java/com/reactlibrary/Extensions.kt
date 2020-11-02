package com.reactlibrary

import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.judokit.android.JUDO_OPTIONS
import com.judokit.android.Judo
import com.judokit.android.JudoActivity

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
    get() = getString("securityCode")

internal val ReadableMap.judoId: String?
    get() = configuration?.getString("judoId")

internal val ReadableMap.token: String?
    get() = authorization?.getString("token")

internal val ReadableMap.secret: String?
    get() {
        return authorization?.getString("secret")
    }

internal val ReadableMap.paymentSession: String?
    get() {
        return authorization?.getString("paymentSession")
    }

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

internal val ReadableMap.metadata: ReadableMap?
    get() {
        val hasKey = reference?.hasKey("metadata") ?: false
        if (hasKey) {
            return reference?.getMap("metadata")
        }
        return null
    }

internal val ReadableMap.cardNetworkValue: Int?
    get() {
        val hasKey = configuration?.hasKey("supportedCardNetworks") ?: false
        if (hasKey) {
            return configuration?.getInt("supportedCardNetworks")
        }
        return null
    }

internal val ReadableMap.paymentMethodValue: Int?
    get() {
        val hasKey = configuration?.hasKey("paymentMethods") ?: false
        if (hasKey) {
            return configuration?.getInt("paymentMethods")
        }
        return null
    }

internal val ReadableMap.uiConfiguration: ReadableMap?
    get() {
        val hasKey = configuration?.hasKey("uiConfiguration") ?: false
        if (hasKey) {
            return configuration?.getMap("uiConfiguration")
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

internal val ReadableMap.primaryAccountDetails: ReadableMap?
    get() {
        val hasKey = configuration?.hasKey("primaryAccountDetails") ?: false
        if (hasKey) {
            return configuration?.getMap("primaryAccountDetails")
        }
        return null
    }

internal val ReadableMap.name: String?
    get() {
        val hasKey = primaryAccountDetails?.hasKey("name") ?: false
        if (hasKey) {
            return primaryAccountDetails?.getString("name")
        }
        return null
    }

internal val ReadableMap.accountNumber: String?
    get() {
        val hasKey = primaryAccountDetails?.hasKey("accountNumber") ?: false
        if (hasKey) {
            return primaryAccountDetails?.getString("accountNumber")
        }
        return null
    }

internal val ReadableMap.dateOfBirth: String?
    get() {
        val hasKey = primaryAccountDetails?.hasKey("dateOfBirth") ?: false
        if (hasKey) {
            return primaryAccountDetails?.getString("dateOfBirth")
        }
        return null
    }

internal val ReadableMap.postCode: String?
    get() {
        val hasKey = primaryAccountDetails?.hasKey("postCode") ?: false
        if (hasKey) {
            return primaryAccountDetails?.getString("postCode")
        }
        return null
    }

internal val ReadableMap.googlePayConfiguration: ReadableMap?
    get() {
        val hasKey = configuration?.hasKey("googlePayConfiguration") ?: false
        if (hasKey) {
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
        val hasKey = googlePayConfiguration?.hasKey("billingAddressParameters") ?: false
        if (hasKey) {
            return googlePayConfiguration?.getMap("billingAddressParameters")
        }
        return null
    }

internal val ReadableMap.shippingAddressParameters: ReadableMap?
    get() {
        val hasKey = googlePayConfiguration?.hasKey("shippingAddressParameters") ?: false
        if (hasKey) {
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
        val hasKey = shippingAddressParameters?.hasKey("allowedCountryCodes") ?: false
        if (hasKey) {
            return shippingAddressParameters?.getArray("allowedCountryCodes")
        }
        return null
    }

internal val ReadableMap.pbbaConfiguration: ReadableMap?
    get() {
        val hasKey = configuration?.hasKey("pbbaConfiguration") ?: false
        if (hasKey) {
            return configuration?.getMap("pbbaConfiguration")
        }
        return null
    }

internal val ReadableMap.mobileNumber: String?
    get() = pbbaConfiguration?.getString("mobileNumber")

internal val ReadableMap.emailAddress: String?
    get() = pbbaConfiguration?.getString("emailAddress")

internal val ReadableMap.deeplinkScheme: String?
    get() = pbbaConfiguration?.getString("deeplinkScheme")

internal val ReadableMap.deeplinkURL: String?
    get() {
        val hasKey = pbbaConfiguration?.hasKey("deeplinkURL") ?: false
        return if (hasKey) {
            pbbaConfiguration?.getString("deeplinkURL")
        } else {
            null
        }
    }

fun Judo.toJudoActivityIntent(packageContext: Context): Intent =
        Intent(packageContext, JudoActivity::class.java)
                .also { it.putExtra(JUDO_OPTIONS, this) }
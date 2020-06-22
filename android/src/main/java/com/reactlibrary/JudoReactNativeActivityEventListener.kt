package com.reactlibrary

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.judokit.android.*
import com.judokit.android.model.JudoError
import com.judokit.android.model.JudoResult

class JudoReactNativeActivityEventListener : BaseActivityEventListener() {

    internal var transactionPromise: Promise? = null

    override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent
    ) {

        if (requestCode != JUDO_PAYMENT_WIDGET_REQUEST_CODE) {
            return
        }

        when (resultCode) {
            PAYMENT_ERROR -> {
                val error = data.getParcelableExtra<JudoError>(JUDO_ERROR)
                transactionPromise?.reject(JUDO_PROMISE_REJECTION_CODE, error?.message)
            }
            PAYMENT_SUCCESS -> {
                val result = data.getParcelableExtra<JudoResult>(JUDO_RESULT)
                transactionPromise?.resolve(getMappedResult(result))
            }
        }

        transactionPromise = null
    }

    private fun getMappedResult(result: JudoResult?): WritableMap {
        val map = Arguments.createMap()
        map.putString("receiptId", result?.receiptId)
        map.putString("yourPaymentReference", result?.yourPaymentReference)
        map.putString("createdAt", result?.createdAt.toString())
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
        cardDetailsMap.putString("cardCountry", result?.cardDetails?.country)
        cardDetailsMap.putString("bank", result?.cardDetails?.bank)
        cardDetailsMap.putString("cardScheme", result?.cardDetails?.scheme)

        map.putMap("cardDetails", cardDetailsMap)

        val consumerMap = Arguments.createMap()
        consumerMap.putString("consumerToken", result?.consumer?.consumerToken)
        consumerMap.putString("consumerReference", result?.consumer?.yourConsumerReference)

        map.putMap("consumer", consumerMap)

        return map
    }
}
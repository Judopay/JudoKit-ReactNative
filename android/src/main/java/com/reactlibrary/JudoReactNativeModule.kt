package com.reactlibrary

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import androidx.fragment.app.FragmentActivity
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.facebook.react.bridge.*
import com.judokit.android.Judo
import com.judokit.android.api.JudoApiService
import com.judokit.android.api.factory.JudoApiServiceFactory
import com.judokit.android.api.model.response.JudoApiCallResult
import com.judokit.android.api.model.response.Receipt
import com.judokit.android.api.model.response.toCardVerificationModel
import com.judokit.android.api.model.response.toJudoPaymentResult
import com.judokit.android.api.model.response.toJudoResult
import com.judokit.android.model.JudoPaymentResult
import com.judokit.android.model.JudoResult
import com.judokit.android.model.PaymentWidgetType
import com.judokit.android.toTokenRequest
import com.judokit.android.ui.cardverification.THREE_DS_ONE_DIALOG_FRAGMENT_TAG
import com.judokit.android.ui.cardverification.ThreeDSOneCardVerificationDialogFragment
import com.judokit.android.ui.cardverification.ThreeDSOneCompletionCallback
import com.judokit.android.ui.common.BR_PBBA_RESULT
import com.judokit.android.ui.common.PBBA_RESULT
import com.judokit.android.ui.common.isBankingAppAvailable
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

const val JUDO_PAYMENT_WIDGET_REQUEST_CODE = 1
const val JUDO_PROMISE_REJECTION_CODE = "JUDO_ERROR"

class JudoReactNativeModule internal constructor(val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

    private val listener = JudoReactNativeActivityEventListener()

    /**
     * A broadcast receiver to catch Pay by Bank app /order/bank/sale response event.
     */
    private val payByBankAppReceiver: BroadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent) {
            val pbbaSaleResult = intent.getParcelableExtra<JudoResult>(PBBA_RESULT)
            payByBankSalePromise.resolve(getMappedResult(pbbaSaleResult))
        }
    }

    init {
        context.addActivityEventListener(listener)
        LocalBroadcastManager.getInstance(context).registerReceiver(payByBankAppReceiver, IntentFilter(BR_PBBA_RESULT))
    }

    override fun getName() = "RNJudo"

    /**
     * Promise to make a callback from the first /order/bank/sale response of PbBa request.
     * Initialised in [invokePayByBankApp] or [invokePaymentMethodScreen].
     * Resolved in [payByBankAppReceiver].
     */
    private lateinit var payByBankSalePromise: Promise

    @ReactMethod
    fun invokeTransaction(options: ReadableMap, promise: Promise) {
        try {
            val judo = getTransactionConfiguration(options)
            startJudoActivity(judo, promise)
        } catch (error: Exception) {
            promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun invokeGooglePay(options: ReadableMap, promise: Promise) {
        try {
            val judo = getGoogleTransactionConfiguration(options)
            startJudoActivity(judo, promise)
        } catch (error: Exception) {
            promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun invokePayByBankApp(options: ReadableMap, promise: Promise) {
        try {
            val judo = getJudoConfiguration(PaymentWidgetType.PAY_BY_BANK_APP, options)
            payByBankSalePromise = promise
            startJudoActivity(judo, promise)
        } catch (error: Exception) {
            promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun invokePaymentMethodScreen(options: ReadableMap, promise: Promise) {
        try {
            val judo = getPaymentMethodsConfiguration(options)
            payByBankSalePromise = promise
            startJudoActivity(judo, promise)
        } catch (error: Exception) {
            promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun performTokenTransaction(options: ReadableMap, promise: Promise) {
        try {

            val judo = getTokenTransactionConfiguration(options)

            val service = JudoApiServiceFactory.createApiService(context, judo)

            val cardToken = options.cardToken
            val securityCode = options.securityCode

            if (cardToken == null) {
                promise.reject(JUDO_PROMISE_REJECTION_CODE, "No card token found")
                return
            }

            service.tokenPayment(judo.toTokenRequest(cardToken, securityCode)).enqueue(object : Callback<JudoApiCallResult<Receipt>> {

                override fun onFailure(call: Call<JudoApiCallResult<Receipt>>, t: Throwable) {
                    promise.reject(t)
                }

                override fun onResponse(call: Call<JudoApiCallResult<Receipt>>, response: Response<JudoApiCallResult<Receipt>>) {

                    if (response.body() == null) {
                        promise.reject(JUDO_PROMISE_REJECTION_CODE, "Response body is empty")
                        return
                    }

                    when (val data = response.body()?.toJudoPaymentResult(context.resources)) {
                        is JudoPaymentResult.Success -> {
                            val receipt = (response.body() as JudoApiCallResult.Success).data
                            if (receipt != null && receipt.is3dSecureRequired) {
                                handleThreeDSAuthentication(promise, service, receipt)
                            } else {
                                promise.resolve(getMappedResult(receipt?.toJudoResult()))
                            }
                        }
                        is JudoPaymentResult.Error -> {
                            promise.reject(JUDO_PROMISE_REJECTION_CODE, data.error.message)
                        }
                    }
                }
            })

        } catch (exception: Exception) {
            promise.reject(exception)
        }
    }

    @ReactMethod
    fun isBankingAppAvailable(promise: Promise) {
        try {
            promise.resolve(isBankingAppAvailable(context))
        } catch (exception: Exception) {
            promise.reject(JUDO_PROMISE_REJECTION_CODE, exception.localizedMessage, exception)
        }
    }

    private fun startJudoActivity(configuration: Judo, promise: Promise) = currentActivity?.let {
        listener.transactionPromise = promise
        val intent = configuration.toJudoActivityIntent(it)
        it.startActivityForResult(intent, JUDO_PAYMENT_WIDGET_REQUEST_CODE)
    }

    private fun handleThreeDSAuthentication(promise: Promise, service: JudoApiService, receipt: Receipt) {
        val callback = object : ThreeDSOneCompletionCallback {
            override fun onSuccess(success: JudoPaymentResult) {
                handleSuccessfulThreeDSTransaction(success, promise)
            }

            override fun onFailure(error: JudoPaymentResult) {
                handleFailedThreeDSTransaction(error, promise)
            }
        }

        val fragment = ThreeDSOneCardVerificationDialogFragment(
                service,
                receipt.toCardVerificationModel(),
                callback
        )
        fragment.show((context.currentActivity as FragmentActivity).supportFragmentManager, THREE_DS_ONE_DIALOG_FRAGMENT_TAG)
    }

    private fun handleFailedThreeDSTransaction(error: JudoPaymentResult, promise: Promise) {
        when (error) {
            is JudoPaymentResult.Error -> promise.reject(JUDO_PROMISE_REJECTION_CODE, error.error.message)
            is JudoPaymentResult.UserCancelled -> promise.reject(JUDO_PROMISE_REJECTION_CODE, error.error.message)
            else -> promise.reject(JUDO_PROMISE_REJECTION_CODE, "The transaction was unsuccessful")
        }
    }

    private fun handleSuccessfulThreeDSTransaction(success: JudoPaymentResult, promise: Promise) {
        if (success is JudoPaymentResult.Success) {
            promise.resolve(getMappedResult(success.result))
        } else {
            promise.reject(JUDO_PROMISE_REJECTION_CODE, "Unknown error occured")
        }
    }
}

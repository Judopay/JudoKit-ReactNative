package com.reactlibrary

import com.facebook.react.bridge.*
import com.judokit.android.Judo
import com.judokit.android.api.factory.JudoApiServiceFactory
import com.judokit.android.api.model.response.JudoApiCallResult
import com.judokit.android.api.model.response.Receipt
import com.judokit.android.api.model.response.toJudoPaymentResult
import com.judokit.android.model.JudoPaymentResult
import com.judokit.android.model.JudoResult
import com.judokit.android.model.PaymentWidgetType
import com.judokit.android.toTokenRequest
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

const val JUDO_PAYMENT_WIDGET_REQUEST_CODE = 1
const val JUDO_PROMISE_REJECTION_CODE = "JUDO_ERROR"

class JudoReactNativeModule internal constructor(val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

    private val listener = JudoReactNativeActivityEventListener()

    init {
        context.addActivityEventListener(listener)
    }

    override fun getName() = "RNJudo"

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
            startJudoActivity(judo, promise)
        } catch (error: Exception) {
            promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun invokePaymentMethodScreen(options: ReadableMap, promise: Promise) {
        try {
            val judo = getPaymentMethodsConfiguration(options)
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
                            promise.resolve(getMappedResult(data.result))
                        }
                        is JudoPaymentResult.Error -> {
                            promise.reject(JUDO_PROMISE_REJECTION_CODE, data.error.message)
                        }
                    }
                }
            })

        } catch(exception: java.lang.Exception) {
            promise.reject(exception)
        }
    }

    private fun startJudoActivity(configuration: Judo, promise: Promise) = currentActivity?.let {
        listener.transactionPromise = promise
        val intent = configuration.toJudoActivityIntent(it)
        it.startActivityForResult(intent, JUDO_PAYMENT_WIDGET_REQUEST_CODE)
    }
}

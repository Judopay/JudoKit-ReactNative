package com.reactlibrary

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.judokit.android.Judo

const val JUDO_PAYMENT_WIDGET_REQUEST_CODE = 1
const val JUDO_PROMISE_REJECTION_CODE = "JUDO_ERROR"

class JudoReactNativeModule internal constructor(context: ReactApplicationContext) :
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
            val judo = getPayByBankAppConfiguration(options)
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

    private fun startJudoActivity(configuration: Judo, promise: Promise) = currentActivity?.let {
        listener.transactionPromise = promise
        val intent = configuration.toJudoActivityIntent(it)
        it.startActivityForResult(intent, JUDO_PAYMENT_WIDGET_REQUEST_CODE)
    }
}
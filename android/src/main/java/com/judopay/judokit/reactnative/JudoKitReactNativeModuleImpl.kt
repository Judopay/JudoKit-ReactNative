package com.judopay.judokit.reactnative

import android.app.Activity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.judopay.judokit.android.Judo
import com.judopay.judokit.android.api.factory.JudoApiServiceFactory
import com.judopay.judokit.android.api.model.response.JudoApiCallResult
import com.judopay.judokit.android.api.model.response.Receipt
import com.judopay.judokit.android.api.model.response.toJudoResult
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class JudoKitReactNativeModuleImpl(
  private val reactContext: ReactApplicationContext,
) {
  private val listener = JudoActivityEventListener()

  init {
    reactContext.addActivityEventListener(listener)
  }

  fun invokeTransaction(
    currentActivity: Activity?,
    options: ReadableMap,
    promise: Promise,
  ) {
    try {
      val judo = getTransactionConfiguration(options)
      startJudoActivity(currentActivity, judo, promise)
    } catch (error: Exception) {
      promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
    }
  }

  fun invokeGooglePay(
    currentActivity: Activity?,
    options: ReadableMap,
    promise: Promise,
  ) {
    try {
      val judo = getGoogleTransactionConfiguration(options)
      startJudoActivity(currentActivity, judo, promise)
    } catch (error: Exception) {
      promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
    }
  }

  fun invokePaymentMethodScreen(
    currentActivity: Activity?,
    options: ReadableMap,
    promise: Promise,
  ) {
    try {
      val judo = getPaymentMethodsConfiguration(options)
      startJudoActivity(currentActivity, judo, promise)
    } catch (error: Exception) {
      promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
    }
  }

  fun performTokenTransaction(
    currentActivity: Activity?,
    options: ReadableMap,
    promise: Promise,
  ) {
    if (options.cardToken.isNullOrEmpty()) {
      promise.reject(
        JUDO_PROMISE_REJECTION_CODE,
        "No card token provided, please make sure you provide it when invoking performTokenTransaction.",
      )
      return
    }

    try {
      val judo = getTokenTransactionConfiguration(options)
      startJudoActivity(currentActivity, judo, promise)
    } catch (error: Exception) {
      promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
    }
  }

  fun fetchTransactionDetails(
    options: ReadableMap,
    promise: Promise,
  ) {
    try {
      val judo = getJudoConfigurationForApiService(options)
      val receiptId = options.receiptId ?: ""

      val service = JudoApiServiceFactory.create(reactContext, judo)

      service.fetchTransactionWithReceiptId(receiptId).enqueue(
        object : Callback<JudoApiCallResult<Receipt>> {
          override fun onResponse(
            call: Call<JudoApiCallResult<Receipt>>,
            response: Response<JudoApiCallResult<Receipt>>,
          ) {
            when (val result = response.body()) {
              is JudoApiCallResult.Success -> {
                val receipt = result.data
                if (receipt != null) {
                  val judoResult = receipt.toJudoResult()
                  promise.resolve(getMappedResult(judoResult))
                } else {
                  promise.reject(
                    JUDO_PROMISE_REJECTION_CODE,
                    REQUEST_FAILED_MESSAGE,
                  )
                }
              }

              is JudoApiCallResult.Failure -> {
                val message = result.error?.message ?: REQUEST_FAILED_MESSAGE
                promise.reject(JUDO_PROMISE_REJECTION_CODE, message)
              }

              else -> {
                promise.reject(
                  JUDO_PROMISE_REJECTION_CODE,
                  REQUEST_FAILED_MESSAGE,
                )
              }
            }
          }

          override fun onFailure(
            call: Call<JudoApiCallResult<Receipt>>,
            throwable: Throwable,
          ) {
            promise.reject(JUDO_PROMISE_REJECTION_CODE, throwable.localizedMessage, throwable)
          }
        },
      )
    } catch (error: Exception) {
      promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
    }
  }

  fun isApplePayAvailableWithConfiguration(
    params: ReadableMap,
    promise: Promise,
  ) = promise.reject(JUDO_PROMISE_REJECTION_CODE, APPLE_PAY_UNSUPPORTED)

  fun invokeApplePay(
    params: ReadableMap,
    promise: Promise,
  ) = promise.reject(JUDO_PROMISE_REJECTION_CODE, APPLE_PAY_UNSUPPORTED)

  private fun startJudoActivity(
    currentActivity: Activity?,
    judo: Judo,
    promise: Promise,
  ) {
    currentActivity?.let {
      listener.transactionPromise = promise
      val intent = judo.toJudoActivityIntent(it)
      it.startActivityForResult(intent, JUDO_PAYMENT_WIDGET_REQUEST_CODE)
    } ?: promise.reject(JUDO_PROMISE_REJECTION_CODE, "No current activity available")
  }

  companion object {
    const val REQUEST_FAILED_MESSAGE = "The request was unsuccessful."
    const val JUDO_PROMISE_REJECTION_CODE = "JUDO_ERROR"
    const val APPLE_PAY_UNSUPPORTED = "Apple Pay is not supported on Android."
    const val NAME = "JudoKitReactNative"
  }
}

package com.judopay.judokit.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.judopay.judokit.android.Judo
import com.judopay.judokit.android.api.factory.JudoApiServiceFactory
import com.judopay.judokit.android.api.model.response.JudoApiCallResult
import com.judopay.judokit.android.api.model.response.Receipt
import com.judopay.judokit.android.api.model.response.toJudoResult
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

const val REQUEST_FAILED_MESSAGE = "The request was unsuccessful."
const val MODULE_NAME = "JudoKitReactNative"

class JudoKitReactNativeModule internal constructor(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
    override fun getName() = MODULE_NAME

    private val listener = JudoActivityEventListener()

    init {
      reactContext.addActivityEventListener(listener)
    }

    @ReactMethod
    fun invokeTransaction(
      options: ReadableMap,
      promise: Promise,
    ) {
      try {
        val judo = getTransactionConfiguration(options)
        startJudoActivity(judo, promise)
      } catch (error: Exception) {
        promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
      }
    }

    @ReactMethod
    fun invokeGooglePay(
      options: ReadableMap,
      promise: Promise,
    ) {
      try {
        val judo = getGoogleTransactionConfiguration(options)
        startJudoActivity(judo, promise)
      } catch (error: Exception) {
        promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
      }
    }

    @ReactMethod
    fun invokePaymentMethodScreen(
      options: ReadableMap,
      promise: Promise,
    ) {
      try {
        val judo = getPaymentMethodsConfiguration(options)
        startJudoActivity(judo, promise)
      } catch (error: Exception) {
        promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
      }
    }

    @ReactMethod
    fun performTokenTransaction(
      options: ReadableMap,
      promise: Promise,
    ) {
      if (options.cardToken == null) {
        promise.reject(
          JUDO_PROMISE_REJECTION_CODE,
          "No card token provided, please make sure you provide it when invoking performTokenTransaction.",
        )
        return
      }

      try {
        val judo = getTokenTransactionConfiguration(options)
        startJudoActivity(judo, promise)
      } catch (error: Exception) {
        promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
      }
    }

    @ReactMethod
    fun fetchTransactionDetails(
      options: ReadableMap,
      promise: Promise,
    ) {
      try {
        val judo = getJudoConfigurationForApiService(options)
        val receiptId = options.receiptId ?: ""

        val service = JudoApiServiceFactory.create(reactContext, judo)

        val fetchTransactionDetailsCallback =
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
                    promise.reject(JUDO_PROMISE_REJECTION_CODE, REQUEST_FAILED_MESSAGE)
                  }
                }

                is JudoApiCallResult.Failure -> {
                  val message = result.error?.message ?: REQUEST_FAILED_MESSAGE
                  promise.reject(JUDO_PROMISE_REJECTION_CODE, message)
                }

                else -> {
                  promise.reject(JUDO_PROMISE_REJECTION_CODE, REQUEST_FAILED_MESSAGE)
                }
              }
            }

            override fun onFailure(
              call: Call<JudoApiCallResult<Receipt>>,
              throwable: Throwable,
            ) {
              promise.reject(JUDO_PROMISE_REJECTION_CODE, throwable.localizedMessage, throwable)
            }
          }

        service
          .fetchTransactionWithReceiptId(receiptId)
          .enqueue(fetchTransactionDetailsCallback)
      } catch (error: Exception) {
        promise.reject(JUDO_PROMISE_REJECTION_CODE, error.localizedMessage, error)
      }
    }

    private fun startJudoActivity(
      configuration: Judo,
      promise: Promise,
    ) = currentActivity?.let {
      listener.transactionPromise = promise
      val intent = configuration.toJudoActivityIntent(it)
      it.startActivityForResult(intent, JUDO_PAYMENT_WIDGET_REQUEST_CODE)
    }
  }

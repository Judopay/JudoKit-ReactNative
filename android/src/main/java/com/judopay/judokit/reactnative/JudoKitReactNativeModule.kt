package com.judopay.judokit.reactnative

import androidx.fragment.app.FragmentActivity
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
import com.judopay.judokit.android.model.JudoPaymentResult
import com.judopay.judokit.android.model.PaymentWidgetType
import com.judopay.judokit.android.model.TransactionDetails
import com.judopay.judokit.android.service.CardTransactionManager
import com.judopay.judokit.android.service.CardTransactionManagerResultListener
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

const val REQUEST_FAILED_MESSAGE = "The request was unsuccessful."
const val MODULE_NAME = "JudoKitReactNative"

class JudoKitReactNativeModule internal constructor(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), CardTransactionManagerResultListener {
    override fun getName() = MODULE_NAME

    private val listener = JudoActivityEventListener()
    private var transactionPromise: Promise? = null
    private var isSubscribedToCardTransactionResults = false

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
      try {
        ensureIsSubscribedToCardTransactionResults()

        val activity = reactContext.currentActivity as FragmentActivity
        val manager = CardTransactionManager.getInstance(activity)

        val judo = getTokenTransactionConfiguration(options)
        val cardToken = options.cardToken

        if (cardToken == null) {
          promise.reject(JUDO_PROMISE_REJECTION_CODE, "No card token found")
          return
        }

        manager.configureWith(judo)

        val details =
          TransactionDetails.Builder()
            .setCardHolderName(options.cardholderName)
            .setSecurityNumber(options.securityCode)
            .setCardType(options.cardType)
            .setCardToken(cardToken)
            .setEmail(judo.emailAddress)
            .setCountryCode(judo.address?.countryCode.toString())
            .setPhoneCountryCode(judo.phoneCountryCode)
            .setMobileNumber(judo.mobileNumber)
            .setAddressLine1(judo.address?.line1)
            .setAddressLine2(judo.address?.line2)
            .setAddressLine3(judo.address?.line3)
            .setCity(judo.address?.town)
            .setPostalCode(judo.address?.postCode)
            .build()

        transactionPromise = promise

        when (judo.paymentWidgetType) {
          PaymentWidgetType.CARD_PAYMENT -> manager.paymentWithToken(details, JudoKitReactNativeModule::class.java.name)
          PaymentWidgetType.PRE_AUTH -> manager.preAuthWithToken(details, JudoKitReactNativeModule::class.java.name)
          else ->
            promise.reject(
              JUDO_PROMISE_REJECTION_CODE,
              "${judo.paymentWidgetType.name} payment widget type is not valid for token transactions",
            )
        }
      } catch (exception: Exception) {
        promise.reject(exception)
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

    private fun ensureIsSubscribedToCardTransactionResults() {
      if (isSubscribedToCardTransactionResults) {
        return
      }

      val activity = reactContext.currentActivity
      activity?.let {
        isSubscribedToCardTransactionResults = true
        CardTransactionManager.getInstance(activity as FragmentActivity).registerResultListener(this)
      }
    }

    private fun unsubscribeFromCardTransactionResults() {
      val activity = reactContext.currentActivity
      activity?.let {
        isSubscribedToCardTransactionResults = false
        CardTransactionManager.getInstance(activity as FragmentActivity).unRegisterResultListener(this)
      }
    }

    override fun initialize() {
      super.initialize()
      ensureIsSubscribedToCardTransactionResults()
    }

    override fun invalidate() {
      super.invalidate()
      unsubscribeFromCardTransactionResults()
    }

    override fun onCardTransactionResult(result: JudoPaymentResult) {
      transactionPromise?.let {
        if (result is JudoPaymentResult.Success) {
          it.resolve(getMappedResult(result.result))
        } else {
          val message =
            when (result) {
              is JudoPaymentResult.Error -> result.error.message
              is JudoPaymentResult.UserCancelled -> result.error.message
              else -> "The transaction was unsuccessful"
            }
          it.reject(JUDO_PROMISE_REJECTION_CODE, message)
        }
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

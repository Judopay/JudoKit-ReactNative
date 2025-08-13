package com.judopay.judokit.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = JudoKitReactNativeModuleImpl.NAME)
class JudoKitReactNativeModule(
  reactContext: ReactApplicationContext,
) : NativeJudoKitReactNativeModuleSpec(reactContext) {
  private val moduleImpl = JudoKitReactNativeModuleImpl(reactContext)

  override fun invokeTransaction(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.invokeTransaction(currentActivity, options, promise)
  }

  override fun invokeGooglePay(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.invokeGooglePay(currentActivity, options, promise)
  }

  override fun invokePaymentMethodScreen(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.invokePaymentMethodScreen(currentActivity, options, promise)
  }

  override fun performTokenTransaction(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.performTokenTransaction(currentActivity, options, promise)
  }

  override fun fetchTransactionDetails(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.fetchTransactionDetails(options, promise)
  }

  override fun isApplePayAvailableWithConfiguration(
    params: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.isApplePayAvailableWithConfiguration(params, promise)
  }

  override fun invokeApplePay(
    params: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.invokeApplePay(params, promise)
  }
}

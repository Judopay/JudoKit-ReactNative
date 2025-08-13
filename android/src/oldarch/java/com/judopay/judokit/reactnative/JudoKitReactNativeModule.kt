package com.judopay.judokit.reactnative

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class JudoKitReactNativeModule(
  reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  private val moduleImpl = JudoKitReactNativeModuleImpl(reactContext)

  override fun getName() = JudoKitReactNativeModuleImpl.NAME

  @ReactMethod
  fun invokeTransaction(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.invokeTransaction(currentActivity, options, promise)
  }

  @ReactMethod
  fun invokeGooglePay(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.invokeGooglePay(currentActivity, options, promise)
  }

  @ReactMethod
  fun invokePaymentMethodScreen(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.invokePaymentMethodScreen(currentActivity, options, promise)
  }

  @ReactMethod
  fun performTokenTransaction(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.performTokenTransaction(currentActivity, options, promise)
  }

  @ReactMethod
  fun fetchTransactionDetails(
    options: ReadableMap,
    promise: Promise,
  ) {
    moduleImpl.fetchTransactionDetails(options, promise)
  }
}

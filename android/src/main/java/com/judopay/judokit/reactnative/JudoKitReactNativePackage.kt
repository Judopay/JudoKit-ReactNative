package com.judopay.judokit.reactnative

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class JudoKitReactNativePackage : BaseReactPackage() {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
    listOf(JudoKitReactNativeModule(reactContext))

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> = emptyList()

  override fun getModule(
    name: String,
    reactContext: ReactApplicationContext,
  ): NativeModule? =
    if (name == JudoKitReactNativeModule.NAME) {
      JudoKitReactNativeModule(reactContext)
    } else {
      null // Todo: old arch!
    }

  override fun getReactModuleInfoProvider() =
    ReactModuleInfoProvider {
      mapOf(
        JudoKitReactNativeModule.NAME to
          ReactModuleInfo(
            name = JudoKitReactNativeModule.NAME,
            className = JudoKitReactNativeModule::class.java.name,
            canOverrideExistingModule = false,
            needsEagerInit = false,
            isCxxModule = false,
            isTurboModule = true,
          ),
      )
    }
}

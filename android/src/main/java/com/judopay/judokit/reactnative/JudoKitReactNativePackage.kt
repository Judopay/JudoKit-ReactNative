package com.judopay.judokit.reactnative

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class JudoKitReactNativePackage : BaseReactPackage() {
  override fun getModule(
    name: String,
    reactContext: ReactApplicationContext,
  ): NativeModule? =
    if (name == JudoKitReactNativeModuleImpl.NAME) {
      JudoKitReactNativeModule(reactContext)
    } else {
      null
    }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    val moduleList: Array<Class<out NativeModule?>> = arrayOf(JudoKitReactNativeModule::class.java)
    val reactModuleInfoMap: MutableMap<String, ReactModuleInfo> = HashMap()
    for (moduleClass in moduleList) {
      val reactModule = moduleClass.getAnnotation(ReactModule::class.java) ?: continue
      reactModuleInfoMap[reactModule.name] =
        ReactModuleInfo(
          reactModule.name,
          moduleClass.name,
          true,
          reactModule.needsEagerInit,
          reactModule.isCxxModule,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
        )
    }
    return ReactModuleInfoProvider { reactModuleInfoMap }
  }
}

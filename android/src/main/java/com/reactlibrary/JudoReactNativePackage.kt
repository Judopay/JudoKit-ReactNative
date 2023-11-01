package com.reactlibrary

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext

@Suppress("unused")
class JudoReactNativePackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext) =
        listOf(JudoReactNativeModule(reactContext))
}

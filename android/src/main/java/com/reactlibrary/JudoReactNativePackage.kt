package com.reactlibrary

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

@Suppress("unused")
class JudoReactNativePackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext) =
        listOf(JudoReactNativeModule(reactContext))

    override fun createViewManagers(reactContext: ReactApplicationContext) =
        emptyList<ViewManager<*, *>>()
}
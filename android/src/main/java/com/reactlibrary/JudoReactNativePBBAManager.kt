package com.reactlibrary

import android.widget.Button
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class JudoReactNativePBBAManager: SimpleViewManager<Button>() {

    override fun getName(): String {
        return "RNPBBAButton"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): Button {
        return Button(reactContext)
    }

}
package com.reactlibrary

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.judokit.android.ui.common.PayByBankButton

class JudoReactNativePBBAManager: SimpleViewManager<PayByBankButton>() {

    override fun getName(): String {
        return "RNPBBAButton"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): PayByBankButton {
        return PayByBankButton(reactContext)
    }

}
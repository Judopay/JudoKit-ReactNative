package com.reactlibrary

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.judopay.judokit.android.ui.common.PayByBankButton
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event

internal class OnPressEvent constructor(surfaceId: Int, viewId: Int):Event<OnPressEvent>(surfaceId, viewId) {

    override fun getEventName(): String = EVENT_NAME

    override fun getCoalescingKey(): Short = 0

    override fun getEventData(): WritableMap? = Arguments.createMap()

    companion object {
        const val EVENT_NAME = "onPress"
    }
}

class JudoReactNativePBBAManager: SimpleViewManager<PayByBankButton>() {

    override fun getName(): String {
        return "RNPBBAButton"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): PayByBankButton {
        val button = PayByBankButton(reactContext)
        button.setOnClickListener {
            val screenContext = it.context as ThemedReactContext
            val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(screenContext, it.id)
            eventDispatcher?.dispatchEvent(
                OnPressEvent(
                    screenContext.surfaceId,
                    it.id
                )
            )
        }
        return button
    }

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
        return MapBuilder.of(
            OnPressEvent.EVENT_NAME,
            MapBuilder.of("registrationName", "onPress"),
        )
    }
}
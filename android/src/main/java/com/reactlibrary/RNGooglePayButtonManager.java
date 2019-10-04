package com.reactlibrary;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.RelativeLayout;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;

public class RNGooglePayButtonManager extends SimpleViewManager<RelativeLayout> {

    public static final String REACT_CLASS = "RNNativePayButton";


    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RelativeLayout createViewInstance(ThemedReactContext context) {
        final LayoutInflater mLayoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        RelativeLayout googlePayButton = (RelativeLayout)mLayoutInflater.inflate(R.layout.googlepay_button_no_shadow, null);
        googlePayButton.setOnClickListener(view -> {
            onClickCalled(view, context);
        });
        return googlePayButton;
    }

    private void onClickCalled(View view, ThemedReactContext reactContext) {
        Log.v("tag", "clap");
        final ReactContext context = reactContext;
        context.getJSModule(RCTEventEmitter.class).receiveEvent(
                view.getId(),
                "onPayPress",
                null
        );
    }

    @Override
    public @Nullable
    Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                "onPayPress",
                MapBuilder.of("registrationName", "onPayPress")
                );
    }
}

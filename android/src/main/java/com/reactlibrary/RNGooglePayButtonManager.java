package com.reactlibrary;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.RelativeLayout;

import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;

import javax.annotation.Nonnull;

public class RNGooglePayButtonManager extends SimpleViewManager<RelativeLayout> {
    private ThemedReactContext context;
//    private boolean isDark;

    @Nonnull
    @Override
    public String getName() {
        return "RNGooglePayButton";
    }

    @Nonnull
    @Override
    public RelativeLayout createViewInstance(@Nonnull ThemedReactContext context) {
        this.context = context;
        RelativeLayout container = new RelativeLayout(context);
        container.addView(getGooglePayButton(container));
        return container;
    }

    @Override
    public @Nullable
    Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                "onPayPress",
                MapBuilder.of("registrationName", "onPayPress")
        );
    }

    @ReactProp(name = "isDark")
    public void setIsDark(RelativeLayout view, boolean isDark) {
        // TODO: dark theme is not supported yet (the layout is missing from the native SDK)
//        this.isDark = isDark;
//        view.removeAllViews();
//        view.addView(getGooglePayButton());
    }

    private RelativeLayout getGooglePayButton(View container) {
        final LayoutInflater mLayoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        RelativeLayout googlePayButton = (RelativeLayout) mLayoutInflater.inflate(R.layout.googlepay_button_no_shadow, null);
        googlePayButton.setOnClickListener(view -> context.getJSModule(RCTEventEmitter.class).receiveEvent(container.getId(), "onPayPress", null));
        return googlePayButton;
    }
}

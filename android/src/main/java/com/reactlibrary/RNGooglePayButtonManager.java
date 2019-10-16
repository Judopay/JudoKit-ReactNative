package com.reactlibrary;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.RelativeLayout;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;

import androidx.annotation.Nullable;

public class RNGooglePayButtonManager extends SimpleViewManager<RelativeLayout> {

    public static final String REACT_CLASS = "RNGooglePayButton";

    private int[] stylesArray = new int[]{
            R.layout.googlepay_button_no_shadow
    };

    private int selectedStyle = R.layout.googlepay_button_no_shadow;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RelativeLayout createViewInstance(ThemedReactContext context) {
        RelativeLayout container = new RelativeLayout(context);
        container.addView(addGoogleButton(context, container));
        return container;
    }

    @Override
    public @Nullable Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                "onPayPress",
                MapBuilder.of("registrationName", "onPayPress")
        );
    }

    @ReactProp(name = "setThemeStyle")
    public void setThemeStyle(RelativeLayout view, @Nullable int styleId) {
        if (styleId > -1 && styleId < stylesArray.length) {
          selectedStyle = stylesArray[styleId];
        }
        view.removeAllViews();
        view.addView(addGoogleButton((ThemedReactContext)view.getContext(), view));
    }

    private RelativeLayout addGoogleButton(ThemedReactContext context, RelativeLayout container) {
        final LayoutInflater mLayoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        RelativeLayout googlePayButton = (RelativeLayout)mLayoutInflater.inflate(selectedStyle, null);
        googlePayButton.setOnClickListener(view -> {
            onClickCalled(container, context);
        });
        return googlePayButton;
    }

    private void onClickCalled(View view, ThemedReactContext reactContext) {
        final ReactContext context = reactContext;
        context.getJSModule(RCTEventEmitter.class).receiveEvent(
                view.getId(),
                "onPayPress",
                null
        );
    }
}

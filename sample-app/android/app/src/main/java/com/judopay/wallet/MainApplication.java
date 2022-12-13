package com.judopay.wallet;

import android.app.Application;

import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.chuckerteam.chucker.api.ChuckerCollector;
import com.chuckerteam.chucker.api.ChuckerInterceptor;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.clipboard.ClipboardPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.judopay.judokit.android.api.factory.JudoApiServiceFactory;
import com.reactlibrary.JudoReactNativePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.asList(
                    new MainReactPackage(),
                    new ClipboardPackage(),
                    new AsyncStoragePackage(),
                    new RNScreensPackage(),
                    new SafeAreaContextPackage(),
                    new RNGestureHandlerPackage(),
                    new JudoReactNativePackage(),
                    new SnackbarPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        ChuckerInterceptor interceptor =  new ChuckerInterceptor.Builder(this)
                .collector(new ChuckerCollector(this))
                .maxContentLength(250000L)
                .alwaysReadResponseBody(false)
                .build();

        JudoApiServiceFactory.setExternalInterceptors(Collections.singletonList(interceptor));
    }
}

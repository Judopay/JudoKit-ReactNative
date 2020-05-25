package com.judopay.wallet;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.judokit.android.api.factory.JudoApiServiceFactory;
import com.reactlibrary.JudoReactNativePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.readystatesoftware.chuck.ChuckInterceptor;
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
                    new AsyncStoragePackage(),
                    new RNScreensPackage(),
                    new SafeAreaContextPackage(),
                    new RNGestureHandlerPackage(),
                    new JudoReactNativePackage()
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
        ChuckInterceptor interceptor = new ChuckInterceptor(this);
        JudoApiServiceFactory.setExternalInterceptors(Collections.singletonList(interceptor));
    }
}

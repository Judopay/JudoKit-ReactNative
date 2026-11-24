package com.judopay.wallet

import android.app.Application
import com.chuckerteam.chucker.api.ChuckerCollector
import com.chuckerteam.chucker.api.ChuckerInterceptor
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.judopay.judokit.android.api.factory.JudoHttpInterceptors

class MainApplication :
  Application(),
  ReactApplication {
  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          add(SettingsJsonPackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)

    val interceptor: ChuckerInterceptor =
      ChuckerInterceptor
        .Builder(this)
        .collector(ChuckerCollector(this))
        .maxContentLength(250000L)
        .alwaysReadResponseBody(false)
        .build()

    JudoHttpInterceptors.interceptors = listOf(interceptor)
  }
}

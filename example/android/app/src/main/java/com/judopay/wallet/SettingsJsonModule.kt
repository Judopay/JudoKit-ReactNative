package com.judopay.wallet

import android.app.Activity
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SettingsJsonModule(
  private val reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {
  private var filePickPromise: Promise? = null

  private val activityEventListener: ActivityEventListener =
    object : BaseActivityEventListener() {
      override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?,
      ) {
        if (requestCode != REQUEST_PICK_JSON) {
          return
        }

        val promise = filePickPromise ?: return
        filePickPromise = null

        if (resultCode != Activity.RESULT_OK) {
          promise.reject(ERROR_CANCELLED, "File pick cancelled")
          return
        }

        readJson(data?.data, promise)
      }
    }

  init {
    reactContext.addActivityEventListener(activityEventListener)
  }

  override fun getName(): String = NAME

  @ReactMethod
  fun copyToClipboard(text: String) {
    val clipboard = reactContext.getSystemService(ClipboardManager::class.java)
    clipboard.setPrimaryClip(ClipData.newPlainText("judo_settings", text))
  }

  @ReactMethod
  fun pickJsonFile(promise: Promise) {
    val activity = reactContext.currentActivity
    if (activity == null) {
      promise.reject("no_activity", "No current activity")
      return
    }

    filePickPromise?.reject(ERROR_CANCELLED, "File pick cancelled")
    filePickPromise = promise

    val intent =
      Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
        addCategory(Intent.CATEGORY_OPENABLE)
        type = "*/*"
        putExtra(Intent.EXTRA_MIME_TYPES, arrayOf("application/json", "text/plain", "*/*"))
      }

    try {
      @Suppress("DEPRECATION")
      activity.startActivityForResult(intent, REQUEST_PICK_JSON)
    } catch (error: Exception) {
      filePickPromise = null
      promise.reject("pick_error", error.localizedMessage, error)
    }
  }

  private fun readJson(
    uri: Uri?,
    promise: Promise,
  ) {
    if (uri == null) {
      promise.reject("read_error", "Failed to read file")
      return
    }

    try {
      val json =
        reactContext.contentResolver.openInputStream(uri)?.use { stream ->
          stream.bufferedReader().readText()
        }
      if (json == null) {
        promise.reject("read_error", "Failed to read file")
      } else {
        promise.resolve(json)
      }
    } catch (error: Exception) {
      promise.reject("read_error", error.localizedMessage, error)
    }
  }

  companion object {
    const val NAME = "SettingsJsonModule"
    private const val REQUEST_PICK_JSON = 24041
    private const val ERROR_CANCELLED = "cancelled"
  }
}

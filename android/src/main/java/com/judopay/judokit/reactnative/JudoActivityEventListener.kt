package com.judopay.judokit.reactnative

import android.app.Activity
import android.app.Activity.RESULT_CANCELED
import android.content.Intent
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.judopay.judokit.android.JUDO_ERROR
import com.judopay.judokit.android.JUDO_RESULT
import com.judopay.judokit.android.PAYMENT_CANCELLED
import com.judopay.judokit.android.PAYMENT_ERROR
import com.judopay.judokit.android.PAYMENT_SUCCESS
import com.judopay.judokit.android.model.JudoError
import com.judopay.judokit.android.model.JudoResult

const val JUDO_PAYMENT_WIDGET_REQUEST_CODE = 65520
const val JUDO_PROMISE_REJECTION_CODE = "JUDO_ERROR"

class JudoActivityEventListener : BaseActivityEventListener() {
  internal var transactionPromise: Promise? = null

  override fun onActivityResult(
    activity: Activity,
    requestCode: Int,
    resultCode: Int,
    data: Intent?,
  ) {
    if (data == null || resultCode == RESULT_CANCELED || requestCode != JUDO_PAYMENT_WIDGET_REQUEST_CODE) {
      return
    }

    try {
      when (resultCode) {
        PAYMENT_ERROR, PAYMENT_CANCELLED -> {
          val error = data.getParcelableExtra<JudoError>(JUDO_ERROR)
          transactionPromise?.reject(JUDO_PROMISE_REJECTION_CODE, error?.message)
        }

        PAYMENT_SUCCESS -> {
          val result = data.getParcelableExtra<JudoResult>(JUDO_RESULT)
          transactionPromise?.resolve(getMappedResult(result))
        }
      }
    } catch (throwable: Throwable) {
      transactionPromise?.reject(JUDO_PROMISE_REJECTION_CODE, throwable.message)
    }

    transactionPromise = null
  }
}

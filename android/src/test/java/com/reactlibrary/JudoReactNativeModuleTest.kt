package com.reactlibrary

import android.app.Activity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.judokit.android.Judo
import io.mockk.Called
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.mockkClass
import io.mockk.mockkStatic
import io.mockk.spyk
import io.mockk.verify
import junit.framework.TestCase.assertEquals
import org.junit.Before
import org.junit.Test

class JudoReactNativeModuleTest {

    private val reactContextMock = mockkClass(ReactApplicationContext::class)
    private val currentActivityMock = mockkClass(Activity::class)
    private val mapMock = mockkClass(ReadableMap::class)
    private val judoMock = mockkClass(Judo::class)
    private val promiseMock = spyk<Promise>()

    private lateinit var sut: JudoReactNativeModule

    @Before
    fun setUp() {
        mockkStatic("com.reactlibrary.HelpersKt")

        every { getTransactionConfiguration(any()) } returns judoMock
        every { getGoogleTransactionConfiguration(any()) } returns judoMock
        every { getPaymentMethodsConfiguration(any()) } returns judoMock
        every { getJudoConfiguration(any(), any()) } returns judoMock

        justRun { reactContextMock.addActivityEventListener(any()) }
        every { reactContextMock.currentActivity } returns currentActivityMock
        every { reactContextMock.applicationContext } returns mockk(relaxed = true)

        sut = JudoReactNativeModule(reactContextMock)
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokeTransaction on this instance then startActivityForResult should be called on currentActivity instance`() {
        sut.invokeTransaction(mapMock, promiseMock)

        verify {
            currentActivityMock.startActivityForResult(any(), JUDO_PAYMENT_WIDGET_REQUEST_CODE)
        }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokeGooglePay on this instance then startActivityForResult should be called on currentActivity instance`() {
        sut.invokeGooglePay(mapMock, promiseMock)

        verify {
            currentActivityMock.startActivityForResult(any(), JUDO_PAYMENT_WIDGET_REQUEST_CODE)
        }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokePayByBankApp on this instance then startActivityForResult should be called on currentActivity instance`() {
        sut.invokePayByBankApp(mapMock, promiseMock)

        verify {
            currentActivityMock.startActivityForResult(any(), JUDO_PAYMENT_WIDGET_REQUEST_CODE)
        }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokePaymentMethodScreen on this instance then startActivityForResult should be called on currentActivity instance`() {
        sut.invokePaymentMethodScreen(mapMock, promiseMock)

        verify {
            currentActivityMock.startActivityForResult(any(), JUDO_PAYMENT_WIDGET_REQUEST_CODE)
        }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokeTransaction on this instance and getTransactionConfiguration throws then promise should reject`() {
        every { getTransactionConfiguration(any()) } throws NullPointerException("Message")

        sut.invokeTransaction(mapMock, promiseMock)

        verify {
            promiseMock.reject(
                    eq(JUDO_PROMISE_REJECTION_CODE),
                    eq("Message"),
                    ofType(NullPointerException::class)
            )

            currentActivityMock wasNot Called
        }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokeGooglePay on this instance and getGoogleTransactionConfiguration throws then promise should reject`() {
        every { getGoogleTransactionConfiguration(any()) } throws NullPointerException("Message")

        sut.invokeGooglePay(mapMock, promiseMock)

        verify {
            promiseMock.reject(
                    eq(JUDO_PROMISE_REJECTION_CODE),
                    eq("Message"),
                    ofType(NullPointerException::class)
            )

            currentActivityMock wasNot Called
        }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokePaymentMethodScreen on this instance and getPaymentMethodsConfiguration throws then promise should reject`() {
        every { getPaymentMethodsConfiguration(any()) } throws NullPointerException("Message")

        sut.invokePaymentMethodScreen(mapMock, promiseMock)

        verify {
            promiseMock.reject(
                    eq(JUDO_PROMISE_REJECTION_CODE),
                    eq("Message"),
                    ofType(NullPointerException::class)
            )

            currentActivityMock wasNot Called
        }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokeTransaction on this instance and currentActivity is null then nothing should happen`() {
        every { reactContextMock.currentActivity } returns null

        sut.invokeTransaction(mapMock, promiseMock)

        verify { judoMock wasNot Called }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokeGooglePay on this instance and currentActivity is null then nothing should happen`() {
        every { reactContextMock.currentActivity } returns null

        sut.invokeTransaction(mapMock, promiseMock)

        verify { judoMock wasNot Called }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking invokePaymentMethodScreen on this instance and currentActivity is null then nothing should happen`() {
        every { reactContextMock.currentActivity } returns null

        sut.invokeTransaction(mapMock, promiseMock)

        verify { judoMock wasNot Called }
    }

    @Test
    fun `Given a JudoReactNativeModule instance is created when invoking name on this instance then 'RNJudo' should be returned`() {
        assertEquals(sut.name, "RNJudo")
    }
}
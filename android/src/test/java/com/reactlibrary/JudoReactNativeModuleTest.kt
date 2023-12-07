package com.reactlibrary

import android.app.Activity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.judopay.judokit.android.Judo
import io.mockk.Called
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.mockkClass
import io.mockk.mockkStatic
import io.mockk.spyk
import io.mockk.verify
import junit.framework.TestCase.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@DisplayName("Testing JudoReactNativeModule class")
class JudoReactNativeModuleTest {

    private val reactContextMock = mockkClass(ReactApplicationContext::class)
    private val currentActivityMock = mockkClass(Activity::class)
    private val mapMock = mockkClass(ReadableMap::class)
    private val judoMock = mockkClass(Judo::class)
    private val promiseMock = spyk<Promise>()

    private lateinit var sut: JudoReactNativeModule

    @BeforeEach
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

    @Nested
    @DisplayName("Given a JudoReactNativeModule instance is created")
    inner class JudoReactNativeModuleInstanceIsCreated {

        @Nested
        @DisplayName("when invoking invokeTransaction on this instance")
        inner class InvokingInvokeTransactionOnInstance {

            @Test
            @DisplayName("then startActivityForResult should be called on currentActivity instance")
            fun startActivityForResultShouldBeCalled() {
                sut.invokeTransaction(mapMock, promiseMock)

                verify {
                    currentActivityMock.startActivityForResult(any(), JUDO_PAYMENT_WIDGET_REQUEST_CODE)
                }
            }

            @Test
            @DisplayName("and getTransactionConfiguration throws then promise should reject")
            fun rejectPromiseOnGetTransactionConfigurationThrowsException() {
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
            @DisplayName("and currentActivity is null then nothing should happen")
            fun nothingShouldHappendWhenCurrentActivityIsNull() {
                every { reactContextMock.currentActivity } returns null

                sut.invokeTransaction(mapMock, promiseMock)

                verify { judoMock wasNot Called }
            }
        }

        @Nested
        @DisplayName("when invoking invokeGooglePay on this instance")
        inner class InvokingInvokeGooglePayOnInstance {


            @Test
            @DisplayName("then startActivityForResult should be called on currentActivity instance")
            fun startActivityForResultShouldBeCalled() {
                sut.invokeGooglePay(mapMock, promiseMock)

                verify {
                    currentActivityMock.startActivityForResult(any(), JUDO_PAYMENT_WIDGET_REQUEST_CODE)
                }
            }

            @Test
            @DisplayName("and getGoogleTransactionConfiguration throws then promise should reject")
            fun rejectPromiseWhenGetGoogleTransactionConfigurationThrowsException() {
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
            @DisplayName("and currentActivity is null then nothing should happen")
            fun nothingShouldHappendWhenCurrentActivityIsNull() {
                every { reactContextMock.currentActivity } returns null

                sut.invokeTransaction(mapMock, promiseMock)

                verify { judoMock wasNot Called }
            }
        }

        @Nested
        @DisplayName("when invoking invokePaymentMethodScreen on this instance")
        inner class InvokingInvokePaymentMethodScreen {

            @Test
            @DisplayName("then startActivityForResult should be called on currentActivity instance")
            fun startActivityForResultShouldBeCalled() {
                sut.invokePaymentMethodScreen(mapMock, promiseMock)

                verify {
                    currentActivityMock.startActivityForResult(any(), JUDO_PAYMENT_WIDGET_REQUEST_CODE)
                }
            }


            @Test
            @DisplayName("and getPaymentMethodsConfiguration throws then promise should reject")
            fun rejectPromiseWhenGetPaymentMethodsConfigurationThrowsException() {
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
            @DisplayName("and currentActivity is null then nothing should happen")
            fun nothingShouldHappenWhenCurrentActivityIsNull() {
                every { reactContextMock.currentActivity } returns null

                sut.invokeTransaction(mapMock, promiseMock)

                verify { judoMock wasNot Called }
            }
        }

        @Test
        @DisplayName("when invoking name on this instance then 'RNJudo' should be returned")
        fun rnJudoShouldBeReturnedWhenInvokingName() {
            assertEquals(sut.name, "RNJudo")
        }
    }
}

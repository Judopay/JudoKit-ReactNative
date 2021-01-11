package com.reactlibrary

import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertNotNull
import junit.framework.TestCase.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@DisplayName("Testing UiConfiguration readable map extensions")
class UIConfigurationReadableMapExtensionsTest {

    private val configMock = mockkClass(ReadableMap::class)
    private val uiConfigMock = mockkClass(ReadableMap::class)
    private val sut = mockkClass(ReadableMap::class)

    @BeforeEach
    fun setUp() {
        every { sut.getMap("configuration") } returns configMock
    }

    @Nested
    @DisplayName("Given configuration object has uiConfiguration key")
    inner class ConfigObjectHasUiConfigurationKey {

        @BeforeEach
        internal fun setUp() {
            every { configMock.getMap("uiConfiguration") } returns uiConfigMock
            every { configMock.hasKey("uiConfiguration") } returns true
        }

        @Test
        @DisplayName("when invoking isAVSEnabled then the value of isAVSEnabled property should be returned")
        fun returnIsAVSEnabledOnIsAVSEnabledCall() {
            every { uiConfigMock.getBoolean("isAVSEnabled") } returns true
            assertNotNull(sut.isAVSEnabled)
            assert(sut.isAVSEnabled!!)
        }

        @Test
        @DisplayName("when invoking shouldPaymentMethodsDisplayAmount then the value of shouldDisplayAmount property should be returned")
        fun returnShouldDisplayAmountOnShouldPaymentMethodsDisplayAmount() {
            every { uiConfigMock.getBoolean("shouldPaymentMethodsDisplayAmount") } returns true
            assertNotNull(sut.shouldPaymentMethodsDisplayAmount)
            assert(sut.shouldPaymentMethodsDisplayAmount!!)
        }
    }

    @Nested
    @DisplayName("Given configuration object has no uiConfiguration key")
    inner class ConfigObjectHasNoUiConfigurationKey {
        @BeforeEach
        internal fun setUp() {
            every { configMock.hasKey("uiConfiguration") } returns false
        }

        @Test
        @DisplayName("when invoking isAVSEnabled then null should be returned")
        fun returnNullOnIsAVSEnabledCall() {
            assertNull(sut.isAVSEnabled)
        }

        @Test
        @DisplayName("when invoking shouldPaymentMethodsDisplayAmount then null should be returned")
        fun returnNullOnShouldPaymentMethodsDisplayAmountCall() {
            assertNull(sut.shouldPaymentMethodsDisplayAmount)
        }
    }
}

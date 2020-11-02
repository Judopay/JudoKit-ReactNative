package com.reactlibrary

import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertNotNull
import junit.framework.TestCase.assertNull
import org.junit.Before
import org.junit.Test

class UIConfigurationReadableMapExtensionsTest {

    private val configMock = mockkClass(ReadableMap::class)
    private val uiConfigMock = mockkClass(ReadableMap::class)
    private val sut = mockkClass(ReadableMap::class)

    @Before
    fun before() {
        every { configMock.getMap("uiConfiguration") } returns uiConfigMock
        every { configMock.hasKey("uiConfiguration") } returns true
        every { sut.getMap("configuration") } returns configMock
    }

    @Test
    fun `Given configuration object has uiConfiguration key when invoking isAVSEnabled then the value of isAVSEnabled property should be returned`() {
        every { uiConfigMock.getBoolean("isAVSEnabled") } returns true
        assertNotNull(sut.isAVSEnabled)
        assert(sut.isAVSEnabled!!)
    }

    @Test
    fun `Given configuration object has no uiConfiguration key when invoking isAVSEnabled then null should be returned`() {
        every { configMock.hasKey("uiConfiguration") } returns false
        assertNull(sut.isAVSEnabled)
    }

    @Test
    fun `Given configuration object has uiConfiguration key when invoking shouldPaymentMethodsDisplayAmount then the value of shouldDisplayAmount property should be returned`() {
        every { uiConfigMock.getBoolean("shouldPaymentMethodsDisplayAmount") } returns true
        assertNotNull(sut.shouldPaymentMethodsDisplayAmount)
        assert(sut.shouldPaymentMethodsDisplayAmount!!)
    }

    @Test
    fun `Given configuration object has no uiConfiguration key when invoking shouldPaymentMethodsDisplayAmount then null should be returned`() {
        every { configMock.hasKey("uiConfiguration") } returns false
        assertNull(sut.shouldPaymentMethodsDisplayAmount)
    }
}
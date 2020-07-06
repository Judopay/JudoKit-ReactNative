package com.reactlibrary

import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNull
import org.junit.Before
import org.junit.Test

class AmountReadableMapExtensionsTest {

    private val configMock = mockkClass(ReadableMap::class)
    private val amountMock = mockkClass(ReadableMap::class)
    private val sut = mockkClass(ReadableMap::class)

    private val amount = "1.5"
    private val currency = "GBP"

    @Before
    fun before() {
        every { amountMock.getString("value") } returns amount
        every { amountMock.getString("currency") } returns currency
        every { configMock.getMap("amount") } returns amountMock
        every { sut.getMap("configuration") } returns configMock
    }

    @Test
    fun `Given configuration object contains amount when invoking amountValue then the amount string should be returned`() {
        assertEquals(sut.amountValue, amount)
    }

    @Test
    fun `Given configuration object contains amount when invoking currencyValue then the currency string should be returned`() {
        assertEquals(sut.currencyValue, currency)
    }

    @Test
    fun `Given configuration object has no amount when invoking amountValue then null should be returned`() {
        every { configMock.getMap("amount") } returns null
        assertNull(sut.amountValue)
    }

    @Test
    fun `Given configuration object has no amount when invoking currencyValue then null should be returned`() {
        every { configMock.getMap("amount") } returns null
        assertNull(sut.currencyValue)
    }

}
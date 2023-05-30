package com.reactlibrary

import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@DisplayName("Testing Amount readable map extensions")
class AmountReadableMapExtensionsTest {

    private val configMock = mockkClass(ReadableMap::class)
    private val amountMock = mockkClass(ReadableMap::class)
    private val sut = mockkClass(ReadableMap::class)

    private val amount = "1.5"
    private val currency = "GBP"

    @BeforeEach
    fun setUp() {
        every { amountMock.getString("value") } returns amount
        every { amountMock.getString("currency") } returns currency
        every { amountMock.hasKey("value") } returns true
        every { amountMock.hasKey("currency") } returns true

        every { configMock.getMap("amount") } returns amountMock
        every { configMock.hasKey("amount") } returns true

        every { sut.getMap("configuration") } returns configMock
        every { sut.hasKey("configuration") } returns true
    }

    @Nested
    @DisplayName("Given configuration object contains amount")
    inner class ConfigObjectContainsAmount {

        @Test
        @DisplayName("when invoking amountValue then the amount string should be returned")
        fun returnAmountStringOnAmountValue() {
            assertEquals(sut.amountValue, amount)
        }

        @Test
        @DisplayName("when invoking currencyValue then the currency string should be returned")
        fun returnCurrencyStringOnCurrencyValue() {
            assertEquals(sut.currencyValue, currency)
        }
    }

    @Nested
    @DisplayName("Given configuration object has no amount ")
    inner class ConfigObjectDoesNotContainAmount {

        @BeforeEach
        internal fun setUp() {
            every { configMock.getMap("amount") } returns null
        }

        @Test
        @DisplayName("when invoking amountValue then null should be returned")
        fun returnNullOnAmountValue() {
            assertNull(sut.amountValue)
        }

        @Test
        @DisplayName("when invoking currencyValue then null should be returned")
        fun returnNullOnCurrencyValue() {
            assertNull(sut.currencyValue)
        }
    }
}

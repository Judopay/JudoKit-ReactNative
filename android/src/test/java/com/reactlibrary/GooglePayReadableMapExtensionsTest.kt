package com.reactlibrary

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNull
import junit.framework.TestCase.assertTrue
import org.junit.Before
import org.junit.Test

class GooglePayReadableMapExtensionsTest {

    private val configMock = mockkClass(ReadableMap::class)
    private val googlePayConfigurationMock = mockkClass(ReadableMap::class)
    private val billingAddressParametersMock = mockkClass(ReadableMap::class)
    private val shippingAddressParametersMock = mockkClass(ReadableMap::class)
    private val allowedCountryCodesMock = mockkClass(ReadableArray::class)
    private val sut = mockkClass(ReadableMap::class)

    private val countryCode = "GB"
    private val environment = 1
    private val isEmailRequired = true
    private val isBillingAddressRequired = true
    private val isShippingAddressRequired = true

    private val isPhoneNumberRequired = true
    private val addressFormat = 1

    @Before
    fun before() {
        every { googlePayConfigurationMock.getString("countryCode") } returns countryCode
        every { googlePayConfigurationMock.getInt("environment") } returns environment
        every { googlePayConfigurationMock.getBoolean("isEmailRequired") } returns isEmailRequired
        every { googlePayConfigurationMock.getBoolean("isBillingAddressRequired") } returns isBillingAddressRequired
        every { googlePayConfigurationMock.getBoolean("isShippingAddressRequired") } returns isShippingAddressRequired
        every { googlePayConfigurationMock.getMap("billingAddressParameters") } returns billingAddressParametersMock
        every { googlePayConfigurationMock.getMap("shippingAddressParameters") } returns shippingAddressParametersMock
        every { googlePayConfigurationMock.hasKey("billingAddressParameters") } returns true
        every { googlePayConfigurationMock.hasKey("shippingAddressParameters") } returns true

        every { billingAddressParametersMock.getBoolean("isPhoneNumberRequired") } returns isPhoneNumberRequired
        every { billingAddressParametersMock.getInt("addressFormat") } returns addressFormat

        every { shippingAddressParametersMock.getBoolean("isPhoneNumberRequired") } returns isPhoneNumberRequired
        every { shippingAddressParametersMock.getArray("allowedCountryCodes") } returns allowedCountryCodesMock
        every { shippingAddressParametersMock.hasKey("allowedCountryCodes") } returns true

        every { configMock.hasKey("googlePayConfiguration") } returns true
        every { configMock.getMap("googlePayConfiguration") } returns googlePayConfigurationMock

        every { sut.getMap("configuration") } returns configMock
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking countryCode property then GB should be returned`() {
        assertEquals(sut.countryCode, countryCode)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking environment property then environment value should be returned`() {
        assertEquals(sut.environmentValue, environment)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking isEmailRequired property then true should be returned`() {
        assertTrue(sut.isEmailRequired!!)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking isBillingPhoneNumberRequired property then isPhoneNumberRequired should be returned`() {
        assertTrue(sut.isBillingPhoneNumberRequired!!)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking isShippingPhoneNumberRequired property then isPhoneNumberRequired should be returned`() {
        assertTrue(sut.isShippingPhoneNumberRequired!!)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking isBillingAddressRequired property then true should be returned`() {
        assertTrue(sut.isBillingAddressRequired!!)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking isShippingAddressRequired property then true should be returned`() {
        assertTrue(sut.isShippingAddressRequired!!)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking billingAddressParameters property then googlePayConfigurationMock should be returned`() {
        assertEquals(sut.billingAddressParameters, billingAddressParametersMock)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking shippingAddressParameters property then shippingAddressParametersMock should be returned`() {
        assertEquals(sut.shippingAddressParameters, shippingAddressParametersMock)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking allowedCountryCodeList property then allowedCountryCodesMock should be returned`() {
        assertEquals(sut.allowedCountryCodeList, allowedCountryCodesMock)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration and shippingAddressParameters has no allowedCountryCodes key when invoking allowedCountryCodeList property then null should be returned`() {
        every { shippingAddressParametersMock.hasKey("allowedCountryCodes") } returns false
        assertNull(sut.allowedCountryCodeList)
    }

    @Test
    fun `Given configuration object contains googlePayConfiguration when invoking addressFormat property then addressFormat should be returned`() {
        assertEquals(sut.addressFormat, addressFormat)
    }

    @Test
    fun `Given configuration object has no googlePayConfiguration when invoking googlePayConfiguration properties then null should be returned for each one`() {
        every { configMock.hasKey("googlePayConfiguration") } returns false

        assertNull(sut.countryCode)
        assertNull(sut.environmentValue)
        assertNull(sut.isEmailRequired)
        assertNull(sut.isBillingAddressRequired)
        assertNull(sut.isShippingAddressRequired)

        assertNull(sut.shippingAddressParameters)
        assertNull(sut.shippingAddressParameters?.isShippingPhoneNumberRequired)
        assertNull(sut.shippingAddressParameters?.allowedCountryCodeList)

        assertNull(sut.billingAddressParameters)
        assertNull(sut.billingAddressParameters?.isBillingPhoneNumberRequired)
        assertNull(sut.billingAddressParameters?.addressFormat)
    }
}
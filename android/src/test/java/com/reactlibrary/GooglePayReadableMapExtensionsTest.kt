package com.reactlibrary

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNull
import junit.framework.TestCase.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@DisplayName("Testing Google Pay readable map extensions")
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

    @BeforeEach
    fun setUp() {
        every { googlePayConfigurationMock.getString("countryCode") } returns countryCode
        every { googlePayConfigurationMock.getInt("environment") } returns environment
        every { googlePayConfigurationMock.getBoolean("isEmailRequired") } returns isEmailRequired
        every { googlePayConfigurationMock.getBoolean("isBillingAddressRequired") } returns isBillingAddressRequired
        every { googlePayConfigurationMock.getBoolean("isShippingAddressRequired") } returns isShippingAddressRequired
        every { googlePayConfigurationMock.getMap("billingAddressParameters") } returns billingAddressParametersMock
        every { googlePayConfigurationMock.getMap("shippingAddressParameters") } returns shippingAddressParametersMock

        every { googlePayConfigurationMock.hasKey("countryCode") } returns true
        every { googlePayConfigurationMock.hasKey("environment") } returns true
        every { googlePayConfigurationMock.hasKey("isEmailRequired") } returns true
        every { googlePayConfigurationMock.hasKey("isBillingAddressRequired") } returns true
        every { googlePayConfigurationMock.hasKey("isShippingAddressRequired") } returns true
        every { googlePayConfigurationMock.hasKey("billingAddressParameters") } returns true
        every { googlePayConfigurationMock.hasKey("shippingAddressParameters") } returns true

        every { billingAddressParametersMock.getBoolean("isPhoneNumberRequired") } returns isPhoneNumberRequired
        every { billingAddressParametersMock.getInt("addressFormat") } returns addressFormat

        every { billingAddressParametersMock.hasKey("isPhoneNumberRequired") } returns true
        every { billingAddressParametersMock.hasKey("addressFormat") } returns true

        every { shippingAddressParametersMock.getBoolean("isPhoneNumberRequired") } returns isPhoneNumberRequired
        every { shippingAddressParametersMock.getArray("allowedCountryCodes") } returns allowedCountryCodesMock

        every { shippingAddressParametersMock.hasKey("isPhoneNumberRequired") } returns true
        every { shippingAddressParametersMock.hasKey("allowedCountryCodes") } returns true

        every { configMock.getMap("googlePayConfiguration") } returns googlePayConfigurationMock
        every { configMock.hasKey("googlePayConfiguration") } returns true

        every { sut.getMap("configuration") } returns configMock
        every { sut.hasKey("configuration") } returns true
    }

    @Nested
    @DisplayName("Given configuration object contains googlePayConfiguration")
    inner class ConfigObjectContainsGooglePayConfig {

        @Test
        @DisplayName("when invoking countryCode property then GB should be returned")
        fun returnGBOnCountryCode() {
            assertEquals(sut.countryCode, countryCode)
        }

        @Test
        @DisplayName("when invoking environmentValue property then environment value should be returned")
        fun returnEnvironmentOnEnvironmentValue() {
            assertEquals(sut.environmentValue, environment)
        }

        @Test
        @DisplayName("when invoking isEmailRequired property then true should be returned")
        fun returnTrueOnIsEmailRequired() {
            assertTrue(sut.isEmailRequired!!)
        }

        @Test
        @DisplayName("when invoking isBillingPhoneNumberRequired property then true should be returned")
        fun returnTrueOnIsBillingPhoneNumberRequired() {
            assertTrue(sut.isBillingPhoneNumberRequired!!)
        }

        @Test
        @DisplayName("when invoking isShippingPhoneNumberRequired property then true should be returned")
        fun returnTrueOnIsShippingPhoneNumberRequired() {
            assertTrue(sut.isShippingPhoneNumberRequired!!)
        }

        @Test
        @DisplayName("when invoking isBillingAddressRequired property then true should be returned")
        fun returnTrueOnIsBillingAddressRequired() {
            assertTrue(sut.isBillingAddressRequired!!)
        }

        @Test
        @DisplayName("when invoking isShippingAddressRequired property then true should be returned")
        fun returnTrueOnIsShippingAddressRequired() {
            assertTrue(sut.isShippingAddressRequired!!)
        }

        @Test
        @DisplayName("when invoking billingAddressParameters property then googlePayConfigurationMock should be returned")
        fun returnGooglePayConfigurationMockOnBillingAddressParameters() {
            assertEquals(sut.billingAddressParameters, billingAddressParametersMock)
        }

        @Test
        @DisplayName("when invoking shippingAddressParameters property then shippingAddressParametersMock should be returned")
        fun returnShippingAddressParametersMockOnShippingAddressParameters() {
            assertEquals(sut.shippingAddressParameters, shippingAddressParametersMock)
        }

        @Test
        @DisplayName("when invoking allowedCountryCodeList property then allowedCountryCodesMock should be returned")
        fun returnAllowedCountryCodesMockOnAllowedCountryCodeList() {
            assertEquals(sut.allowedCountryCodeList, allowedCountryCodesMock)
        }

        @Test
        @DisplayName("and shippingAddressParameters has no allowedCountryCodes key when invoking allowedCountryCodeList property then null should be returned")
        fun returnNullOnAllowedCountryCodeListWHenShippingAddressParametersHasNoAllowedCountryCodesKey() {
            every { shippingAddressParametersMock.hasKey("allowedCountryCodes") } returns false
            assertNull(sut.allowedCountryCodeList)
        }

        @Test
        @DisplayName("when invoking addressFormat property then addressFormat should be returned")
        fun returnAddressFormatOnAddressFormat() {
            assertEquals(sut.addressFormat, addressFormat)
        }
    }

    @Test
    @DisplayName("Given configuration object has no googlePayConfiguration when invoking googlePayConfiguration properties then null should be returned for each one")
    fun returnNullForEachPropertyOnGooglePayConfigurationWhenConfigObjectHasNoGooglePayConfiguration() {
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

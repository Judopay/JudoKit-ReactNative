package com.reactlibrary

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.judokit.android.model.CardNetwork
import com.judokit.android.model.Currency
import com.judokit.android.model.PaymentMethod
import com.judokit.android.model.PaymentWidgetType
import com.judokit.android.model.googlepay.GooglePayAddressFormat
import com.judokit.android.model.googlepay.GooglePayEnvironment
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNotNull
import junit.framework.TestCase.assertNull
import junit.framework.TestCase.assertTrue
import org.junit.Before
import org.junit.Test

class HelpersKtTest {

    private val configurationMock = mockkClass(ReadableMap::class)
    private val mapMock = mockkClass(ReadableMap::class)
    private val amountMock = mockkClass(ReadableMap::class)
    private val referenceMock = mockkClass(ReadableMap::class)
    private val uiConfigurationMock = mockkClass(ReadableMap::class)
    private val primaryAccountDetailsMock = mockkClass(ReadableMap::class)
    private val metadataMock = mockkClass(ReadableMap::class)
    private val billingAddressParametersMock = mockkClass(ReadableMap::class)
    private val shippingAddressParametersMock = mockkClass(ReadableMap::class)
    private val googlePayConfigurationMock = mockkClass(ReadableMap::class)
    private val allowedCountryCodesMock = mockkClass(ReadableArray::class)

    @Before
    fun before() {

        every { mapMock.getInt("transactionMode") } returns 1
        every { mapMock.getString("token") } returns "token"
        every { mapMock.getString("secret") } returns "secret"
        every { mapMock.getBoolean("sandboxed") } returns true
        every { configurationMock.getString("judoId") } returns "judoId"

        // siteId
        every { configurationMock.hasKey("siteId") } returns true
        every { configurationMock.getString("siteId") } returns "siteId"

        // amount
        every { amountMock.getString("value") } returns "1.50"
        every { amountMock.getString("currency") } returns "GBP"

        every { configurationMock.getMap("amount") } returns amountMock

        // reference
        every { referenceMock.getString("consumerReference") } returns "consumerReference"
        every { referenceMock.getString("paymentReference") } returns "paymentReference"
        every { referenceMock.getMap("metadata") } returns metadataMock
        every { referenceMock.hasKey("metadata") } returns true
        every { metadataMock.toHashMap() } returns hashMapOf(Pair("key", "value"))

        every { configurationMock.getMap("reference") } returns referenceMock

        // supportedCardNetworks
        every { configurationMock.hasKey("supportedCardNetworks") } returns true
        every { configurationMock.getInt("supportedCardNetworks") } returns 1

        // paymentMethods
        every { configurationMock.hasKey("paymentMethods") } returns true
        every { configurationMock.getInt("paymentMethods") } returns (1 shl 4)

        // uiConfigurationMock
        every { uiConfigurationMock.getBoolean("isAVSEnabled") } returns true
        every { uiConfigurationMock.getBoolean("shouldDisplayAmount") } returns true

        every { configurationMock.hasKey("uiConfiguration") } returns true
        every { configurationMock.getMap("uiConfiguration") } returns uiConfigurationMock

        // primaryAccountDetails
        every { primaryAccountDetailsMock.hasKey("name") } returns true
        every { primaryAccountDetailsMock.getString("name") } returns "name"

        every { primaryAccountDetailsMock.hasKey("accountNumber") } returns true
        every { primaryAccountDetailsMock.getString("accountNumber") } returns "accountNumber"

        every { primaryAccountDetailsMock.hasKey("dateOfBirth") } returns true
        every { primaryAccountDetailsMock.getString("dateOfBirth") } returns "dateOfBirth"

        every { primaryAccountDetailsMock.hasKey("postCode") } returns true
        every { primaryAccountDetailsMock.getString("postCode") } returns "postCode"

        every { configurationMock.hasKey("primaryAccountDetails") } returns true
        every { configurationMock.getMap("primaryAccountDetails") } returns primaryAccountDetailsMock

        // googlePayConfiguration
        every { configurationMock.hasKey("googlePayConfiguration") } returns true
        every { configurationMock.getMap("googlePayConfiguration") } returns googlePayConfigurationMock

        every { googlePayConfigurationMock.hasKey("billingAddressParameters") } returns true
        every { googlePayConfigurationMock.hasKey("shippingAddressParameters") } returns true

        every { googlePayConfigurationMock.getMap("billingAddressParameters") } returns billingAddressParametersMock
        every { googlePayConfigurationMock.getMap("shippingAddressParameters") } returns shippingAddressParametersMock
        every { googlePayConfigurationMock.getInt("environment") } returns 10
        every { googlePayConfigurationMock.getString("countryCode") } returns "GB"
        every { googlePayConfigurationMock.getBoolean("isEmailRequired") } returns true
        every { googlePayConfigurationMock.getBoolean("isBillingAddressRequired") } returns true
        every { googlePayConfigurationMock.getBoolean("isShippingAddressRequired") } returns true

        every { billingAddressParametersMock.getBoolean("isPhoneNumberRequired") } returns true
        every { billingAddressParametersMock.getInt("addressFormat") } returns 1

        every { shippingAddressParametersMock.getBoolean("isPhoneNumberRequired") } returns true
        every { shippingAddressParametersMock.hasKey("allowedCountryCodes") } returns true
        every { shippingAddressParametersMock.getArray("allowedCountryCodes") } returns allowedCountryCodesMock
        every { allowedCountryCodesMock.toArrayList() } returns arrayListOf("US")

        every { mapMock.configuration } returns configurationMock
    }

    @Test
    fun `Given valid user configuration is provided when invoking getAmount with the given configuration then a valid amount object should be returned`() {
        val amount = getAmount(mapMock)

        assertEquals(amount.amount, "1.50")
        assertEquals(amount.currency, Currency.GBP)
    }

    @Test
    fun `Given valid user configuration is provided and it contains no currency when invoking getAmount with the given configurations then a valid amount object should be returned with GBP as currency`() {
        every { amountMock.getString("currency") } returns null

        val amount = getAmount(mapMock)
        assertEquals(amount.currency, Currency.GBP)
    }

    @Test
    fun `Given valid user configuration is provided when invoking getReference with the given configurations then a valid reference object should be returned`() {
        val reference = getReference(mapMock)

        assertEquals(reference?.paymentReference, "paymentReference")
        assertEquals(reference?.consumerReference, "consumerReference")
        assertNotNull(reference?.metaData)
    }

    @Test
    fun `Given valid user configuration is provided and it contains no metadata key when invoking getReference with the given configurations then a valid reference object should be returned with null metaData`() {
        every { referenceMock.hasKey("metadata") } returns false

        val reference = getReference(mapMock)

        assertEquals(reference?.paymentReference, "paymentReference")
        assertEquals(reference?.consumerReference, "consumerReference")
        assertNull(reference?.metaData)
    }

    @Test
    fun `Given user configuration contains transactionType key with value 1 when invoking getWidgetType with the given configurations then PaymentWidgetType-PRE_AUTH should be returned`() {
        every { mapMock.getInt("transactionType") } returns 1

        val type = getWidgetType(mapMock)
        assertEquals(type, PaymentWidgetType.PRE_AUTH)
    }

    @Test
    fun `Given user configuration contains transactionType key with value 2 when invoking getWidgetType with the given configurations then PaymentWidgetType-REGISTER_CARD should be returned`() {
        every { mapMock.getInt("transactionType") } returns 2

        val type = getWidgetType(mapMock)
        assertEquals(type, PaymentWidgetType.REGISTER_CARD)
    }

    @Test
    fun `Given user configuration contains transactionType key with value 3 when invoking getWidgetType with the given configurations then PaymentWidgetType-CHECK_CARD should be returned`() {
        every { mapMock.getInt("transactionType") } returns 3

        val type = getWidgetType(mapMock)
        assertEquals(type, PaymentWidgetType.CHECK_CARD)
    }

    @Test
    fun `Given user configuration contains transactionType key with value 4 when invoking getWidgetType with the given configurations then PaymentWidgetType-CREATE_CARD_TOKEN should be returned`() {
        every { mapMock.getInt("transactionType") } returns 4

        val type = getWidgetType(mapMock)
        assertEquals(type, PaymentWidgetType.CREATE_CARD_TOKEN)
    }

    @Test
    fun `Given user configuration contains transactionType key with any unknown value when invoking getWidgetType with the given configurations then PaymentWidgetType-CARD_PAYMENT should be returned`() {
        every { mapMock.getInt("transactionType") } returns 100

        val type = getWidgetType(mapMock)
        assertEquals(type, PaymentWidgetType.CARD_PAYMENT)
    }

    @Test
    fun `Given valid user configuration is provided when invoking getPrimaryAccountDetails with the given configurations then a valid PrimaryAccountDetails object should be returned`() {
        val account = getPrimaryAccountDetails(mapMock)

        assertEquals(account?.name, "name")
        assertEquals(account?.accountNumber, "accountNumber")
        assertEquals(account?.dateOfBirth, "dateOfBirth")
        assertEquals(account?.postCode, "postCode")
    }

    @Test
    fun `Given valid user configuration is provided when invoking getUIConfiguration with the given configurations then a valid UiConfiguration object should be returned`() {
        val configuration = getUIConfiguration(mapMock)

        assertTrue(configuration!!.avsEnabled)
        assertTrue(configuration!!.shouldDisplayAmount)
    }

    @Test
    fun `Given valid user configuration is provided and it contains no uiConfiguration key when invoking getUIConfiguration with the given configurations then null should be returned`() {
        every { configurationMock.hasKey("uiConfiguration") } returns false

        val configuration = getUIConfiguration(mapMock)
        assertNull(configuration)
    }

    @Test
    fun `Given valid user configuration is provided when invoking getPaymentMethods with the given configurations then an array with all supported PaymentMethods should be returned`() {
        val methods = getPaymentMethods(mapMock)

        assertNotNull(methods)
        assertTrue(methods!!.contains(PaymentMethod.CARD))
        assertTrue(methods.contains(PaymentMethod.GOOGLE_PAY))
        assertTrue(methods.contains(PaymentMethod.IDEAL))
    }

    @Test
    fun `Given valid user configuration is provided and it contains no paymentMethods key when invoking getPaymentMethods with the given configurations then null should be returned`() {
        every { configurationMock.hasKey("paymentMethods") } returns false

        val methods = getPaymentMethods(mapMock)

        assertNull(methods)
    }

    @Test
    fun `Given valid user configuration is provided and it contains 1 as a value of paymentMethods when invoking getPaymentMethods with the given configurations then an array with only PaymentMethod-CARD should be returned`() {
        every { configurationMock.getInt("paymentMethods") } returns 1

        val methods = getPaymentMethods(mapMock)

        assertNotNull(methods)
        assertTrue(methods!!.size == 1)
        assertTrue(methods.contains(PaymentMethod.CARD))
    }

    @Test
    fun `Given valid user configuration is provided and it contains 1 shl 2 as a value of paymentMethods when invoking getPaymentMethods with the given configurations then an array with only PaymentMethod-GOOGLE_PAY should be returned`() {
        every { configurationMock.getInt("paymentMethods") } returns (1 shl 2)

        val methods = getPaymentMethods(mapMock)

        assertNotNull(methods)
        assertTrue(methods!!.size == 1)
        assertTrue(methods.contains(PaymentMethod.GOOGLE_PAY))
    }

    @Test
    fun `Given valid user configuration is provided and it contains 1 shl 3 as a value of paymentMethods when invoking getPaymentMethods with the given configurations then an array with only PaymentMethod-IDEAL should be returned`() {
        every { configurationMock.getInt("paymentMethods") } returns (1 shl 3)

        val methods = getPaymentMethods(mapMock)

        assertNotNull(methods)
        assertTrue(methods!!.size == 1)
        assertTrue(methods.contains(PaymentMethod.IDEAL))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 shl 8 as a value when invoking getCardNetworks with the given configurations then an array with all CardNetworks should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 8)

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.contains(CardNetwork.VISA))
        assertTrue(networks.contains(CardNetwork.MASTERCARD))
        assertTrue(networks.contains(CardNetwork.MAESTRO))
        assertTrue(networks.contains(CardNetwork.AMEX))
        assertTrue(networks.contains(CardNetwork.CHINA_UNION_PAY))
        assertTrue(networks.contains(CardNetwork.JCB))
        assertTrue(networks.contains(CardNetwork.DISCOVER))
        assertTrue(networks.contains(CardNetwork.DINERS_CLUB))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-VISA should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns 1

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.size == 1)
        assertTrue(networks.contains(CardNetwork.VISA))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 shl 1 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-MASTERCARD should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 1)

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.size == 1)
        assertTrue(networks.contains(CardNetwork.MASTERCARD))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 shl 2 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-MAESTRO should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 2)

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.size == 1)
        assertTrue(networks.contains(CardNetwork.MAESTRO))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 shl 3 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-AMEX should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 3)

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.size == 1)
        assertTrue(networks.contains(CardNetwork.AMEX))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 shl 4 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-CHINA_UNION_PAY should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 4)

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.size == 1)
        assertTrue(networks.contains(CardNetwork.CHINA_UNION_PAY))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 shl 5 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-JCB should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 5)

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.size == 1)
        assertTrue(networks.contains(CardNetwork.JCB))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 shl 6 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-DISCOVER should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 6)

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.size == 1)
        assertTrue(networks.contains(CardNetwork.DISCOVER))
    }

    @Test
    fun `Given user configuration contains supportedCardNetworks key with 1 shl 7 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-DINERS_CLUB should be returned`() {
        every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 7)

        val networks = getCardNetworks(mapMock)

        assertNotNull(networks)
        assertTrue(networks!!.size == 1)
        assertTrue(networks.contains(CardNetwork.DINERS_CLUB))
    }

    @Test
    fun `Given valid user configuration is provided when invoking getTransactionConfiguration with the given configurations then a valid Judo object should be returned`() {
        every { mapMock.getInt("transactionType") } returns 1
        val judo = getTransactionConfiguration(mapMock)

        assertEquals(judo.paymentWidgetType, PaymentWidgetType.PRE_AUTH)
    }

    @Test
    fun `Given valid user configuration is provided and it contains transactionMode key with 0 as value when invoking getGoogleTransactionConfiguration with the given configurations then a valid Judo object should be returned`() {
        every { mapMock.getInt("transactionMode") } returns 0
        val judo = getGoogleTransactionConfiguration(mapMock)

        assertEquals(judo.paymentWidgetType, PaymentWidgetType.GOOGLE_PAY)
    }

    @Test
    fun `Given valid user configuration is provided and it contains transactionMode key with value different than 0 when invoking getGoogleTransactionConfiguration with the given configurations then a valid Judo object should be returned`() {
        every { mapMock.getInt("transactionMode") } returns -1
        val judo = getGoogleTransactionConfiguration(mapMock)

        assertEquals(judo.paymentWidgetType, PaymentWidgetType.PRE_AUTH_GOOGLE_PAY)
    }

    @Test
    fun `Given valid user configuration is provided and it contains transactionMode key with value different than 0 when invoking getPaymentMethodsConfiguration with the given configurations then a valid Judo object should be returned`() {
        every { mapMock.getInt("transactionMode") } returns 0
        val judo = getPaymentMethodsConfiguration(mapMock)

        assertEquals(judo.paymentWidgetType, PaymentWidgetType.PAYMENT_METHODS)
    }

    @Test
    fun `Given valid user configuration is provided and it contains transactionMode key with value different than 1 when invoking getPaymentMethodsConfiguration with the given configurations then a valid Judo object should be returned`() {
        every { mapMock.getInt("transactionMode") } returns 1
        val judo = getPaymentMethodsConfiguration(mapMock)

        assertEquals(judo.paymentWidgetType, PaymentWidgetType.PRE_AUTH_PAYMENT_METHODS)
    }

    @Test
    fun `Given valid user configuration is provided and it contains transactionMode key with value different than 2 when invoking getPaymentMethodsConfiguration with the given configurations then a valid Judo object should be returned`() {
        every { mapMock.getInt("transactionMode") } returns 2
        val judo = getPaymentMethodsConfiguration(mapMock)

        assertEquals(judo.paymentWidgetType, PaymentWidgetType.SERVER_TO_SERVER_PAYMENT_METHODS)
    }

    @Test
    fun `Given valid user configuration is provided and it contains transactionMode key with an unexpected value when invoking getPaymentMethodsConfiguration with the given configurations then a valid Judo object should be returned`() {
        every { mapMock.getInt("transactionMode") } returns -1
        val judo = getPaymentMethodsConfiguration(mapMock)

        assertEquals(judo.paymentWidgetType, PaymentWidgetType.PAYMENT_METHODS)
    }

    @Test
    fun `Given valid user configuration is provided when invoking getShippingParameters with the given configurations then a valid GooglePayShippingAddressParameters object should be returned`() {
        val params = getShippingParameters(mapMock)!!

        assertTrue(params.phoneNumberRequired!!)
        assertTrue(params.allowedCountryCodes!!.contains("US"))
    }

    @Test
    fun `Given valid user configuration is provided when invoking getBillingParameters with the given configurations then a valid GooglePayBillingAddressParameters object should be returned`() {
        val params = getBillingParameters(mapMock)!!

        assertTrue(params.phoneNumberRequired!!)
        assertEquals(params.format, GooglePayAddressFormat.FULL)
    }

    @Test
    fun `Given valid user configuration is provided when invoking getGooglePayConfiguration with the given configurations then a valid GooglePayConfiguration object should be returned`() {
        val params = getGooglePayConfiguration(mapMock)!!

        assertEquals(params.isEmailRequired, true)
        assertEquals(params.isBillingAddressRequired, true)
        assertEquals(params.isShippingAddressRequired, true)
        assertEquals(params.environment, GooglePayEnvironment.PRODUCTION)
    }

    @Test
    fun `Given valid user configuration is provided and it contains no googlePayConfiguration key when invoking getGooglePayConfiguration with the given configurations then null should be returned`() {
        every { configurationMock.hasKey("googlePayConfiguration") } returns false

        val params = getGooglePayConfiguration(mapMock)

        assertNull(params)
    }

}
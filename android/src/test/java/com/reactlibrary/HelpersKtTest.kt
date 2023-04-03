package com.reactlibrary

import android.net.Uri
import android.util.Base64
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.judopay.judokit.android.api.model.response.CardToken
import com.judopay.judokit.android.model.*
import com.judopay.judokit.android.model.googlepay.GooglePayAddressFormat
import com.judopay.judokit.android.model.googlepay.GooglePayCheckoutOption
import com.judopay.judokit.android.model.googlepay.GooglePayEnvironment
import com.judopay.judokit.android.model.googlepay.GooglePayPriceStatus
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkClass
import io.mockk.mockkStatic
import junit.framework.TestCase.*
import org.junit.jupiter.api.*
import java.nio.charset.StandardCharsets

@DisplayName("Testing Helpers class")
class HelpersKtTest {

    private val configurationMock = mockkClass(ReadableMap::class)
    private val mapMock = mockkClass(ReadableMap::class)
    private val amountMock = mockkClass(ReadableMap::class)
    private val authorizationMock = mockkClass(ReadableMap::class)
    private val referenceMock = mockkClass(ReadableMap::class)
    private val uiConfigurationMock = mockkClass(ReadableMap::class)
    private val primaryAccountDetailsMock = mockkClass(ReadableMap::class)
    private val metadataMock = mockkClass(ReadableMap::class)
    private val billingAddressParametersMock = mockkClass(ReadableMap::class)
    private val shippingAddressParametersMock = mockkClass(ReadableMap::class)
    private val googlePayConfigurationMock = mockkClass(ReadableMap::class)
    private val pbbaConfigurationMock = mockkClass(ReadableMap::class)
    private val allowedCountryCodesMock = mockkClass(ReadableArray::class)

    @BeforeEach
    fun setUp() {
        mockkStatic("android.util.Base64")
        mockkStatic("android.net.Uri")
        mockkStatic("com.facebook.react.bridge.Arguments")
        every { Arguments.createMap() } returns JavaOnlyMap()
        every { Base64.encodeToString("token:secret".toByteArray(StandardCharsets.UTF_8), Base64.NO_WRAP) } returns "credentials"

        every { mapMock.getInt("transactionMode") } returns 1

        every { mapMock.getBoolean("sandboxed") } returns true
        every { configurationMock.getString("judoId") } returns "111111111"

        every { mapMock.getMap("authorization") } returns authorizationMock
        every { authorizationMock.getString("token") } returns "token"
        every { authorizationMock.getString("secret") } returns "secret"

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
        every { uiConfigurationMock.getBoolean("shouldPaymentMethodsDisplayAmount") } returns true
        every { uiConfigurationMock.getBoolean("shouldPaymentButtonDisplayAmount") } returns true
        every { uiConfigurationMock.getBoolean("shouldPaymentMethodsVerifySecurityCode") } returns true
        every { uiConfigurationMock.getBoolean("shouldAskForBillingInformation") } returns true
        every { uiConfigurationMock.hasKey("shouldAskForBillingInformation") } returns true
        every { uiConfigurationMock.hasKey("threeDSUIConfiguration") } returns false
        every { uiConfigurationMock.getMap("threeDSUIConfiguration") } returns null

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
        every { googlePayConfigurationMock.getString("merchantName") } returns "a merchant"
        every { googlePayConfigurationMock.getString("transactionId") } returns "trans id 1"
        every { googlePayConfigurationMock.getInt("totalPriceStatus") } returns 0
        every { googlePayConfigurationMock.getString("totalPriceLabel") } returns "Total"
        every { googlePayConfigurationMock.getInt("checkoutOption") } returns 0

        every { billingAddressParametersMock.getBoolean("isPhoneNumberRequired") } returns true
        every { billingAddressParametersMock.getInt("addressFormat") } returns 1

        every { shippingAddressParametersMock.getBoolean("isPhoneNumberRequired") } returns true
        every { shippingAddressParametersMock.hasKey("allowedCountryCodes") } returns true
        every { shippingAddressParametersMock.getArray("allowedCountryCodes") } returns allowedCountryCodesMock
        every { allowedCountryCodesMock.toArrayList() } returns arrayListOf("US")

        // pbbaConfiguration
        every { configurationMock.hasKey("pbbaConfiguration") } returns true
        every { configurationMock.getMap("pbbaConfiguration") } returns pbbaConfigurationMock

        every { pbbaConfigurationMock.getString("mobileNumber") } returns "123-123"
        every { pbbaConfigurationMock.getString("emailAddress") } returns "example@mail.com"
        every { pbbaConfigurationMock.hasKey("deeplinkURL") } returns true
        every { pbbaConfigurationMock.getString("deeplinkURL") } returns "https://www.google.com"
        every { pbbaConfigurationMock.getString("deeplinkScheme") } returns "deep://link"

        every { mapMock.getMap("configuration") } returns configurationMock
    }

    @Nested
    @DisplayName("Given valid user configuration is provided")
    inner class ValidUserConfig {

        @Test
        @DisplayName("when invoking getAmount with the given configuration then a valid amount object should be returned")
        fun returnAmountOnValidUserConfig() {
            val amount = getAmount(mapMock)

            assertEquals(amount.amount, "1.50")
            assertEquals(amount.currency, Currency.GBP)
        }

        @Test
        @DisplayName("and it contains no currency when invoking getAmount with the given configurations then a valid amount object should be returned with GBP as currency")
        fun returnGbpWhenUserConfigHasNoCurrency() {
            every { amountMock.getString("currency") } returns null

            val amount = getAmount(mapMock)
            assertEquals(amount.currency, Currency.GBP)
        }

        @Test
        @DisplayName("when invoking getReference with the given configurations then a valid reference object should be returned")
        fun returnReferenceObjectWhenInvokingGetReference() {
            val reference = getReference(mapMock)

            assertEquals(reference?.paymentReference, "paymentReference")
            assertEquals(reference?.consumerReference, "consumerReference")
            assertNotNull(reference?.metaData)
        }

        @Test
        @DisplayName("and it contains no metadata key when invoking getReference with the given configurations then a valid reference object should be returned with null metaData")
        fun returnReferenceObjectWithNullMetaData() {
            every { referenceMock.hasKey("metadata") } returns false

            val reference = getReference(mapMock)

            assertEquals(reference?.paymentReference, "paymentReference")
            assertEquals(reference?.consumerReference, "consumerReference")
            assertNull(reference?.metaData)
        }


        @Test
        @DisplayName("when invoking getPrimaryAccountDetails with the given configurations then a valid PrimaryAccountDetails object should be returned")
        fun returnPrimaryAccountDetailsOnGetPrimaryAccountDetails() {
            val account = getPrimaryAccountDetails(mapMock)

            assertEquals(account?.name, "name")
            assertEquals(account?.accountNumber, "accountNumber")
            assertEquals(account?.dateOfBirth, "dateOfBirth")
            assertEquals(account?.postCode, "postCode")
        }

        @Test
        @DisplayName("when invoking getUIConfiguration with the given configurations then a valid UiConfiguration object should be returned")
        fun returnUiConfigurationOnGetUIConfiguration() {
            val configuration = getUIConfiguration(mapMock)

            assertTrue(configuration!!.avsEnabled)
            assertTrue(configuration.shouldPaymentMethodsDisplayAmount)
        }

        @Test
        @DisplayName("and it contains no uiConfiguration key when invoking getUIConfiguration with the given configurations then null should be returned")
        fun returnNullOnGetUiConfigurationWhenNoUiConfigurationIsSet() {
            every { configurationMock.hasKey("uiConfiguration") } returns false

            val configuration = getUIConfiguration(mapMock)
            assertNull(configuration)
        }

        @Test
        @DisplayName("when invoking getPaymentMethods with the given configurations then an array with all supported PaymentMethods should be returned")
        fun returnArrayOfPaymentMethodsOnGetPaymentMethods() {
            val methods = getPaymentMethods(mapMock)

            assertNotNull(methods)
            assertTrue(methods!!.contains(PaymentMethod.CARD))
            assertTrue(methods.contains(PaymentMethod.GOOGLE_PAY))
            assertTrue(methods.contains(PaymentMethod.IDEAL))
        }

        @Test
        @DisplayName("and it contains no paymentMethods key when invoking getPaymentMethods with the given configurations then null should be returned")
        fun returnNullOnGetPaymentMethodsWhenNoPaymentMethodsAreSet() {
            every { configurationMock.hasKey("paymentMethods") } returns false

            val methods = getPaymentMethods(mapMock)

            assertNull(methods)
        }

        @Test
        @DisplayName("and it contains 1 as a value of paymentMethods when invoking getPaymentMethods with the given configurations then an array with only PaymentMethod-CARD should be returned")
        fun returnCardOnGetPaymentMethodsWhenValueIsOne() {
            every { configurationMock.getInt("paymentMethods") } returns 1

            val methods = getPaymentMethods(mapMock)

            assertNotNull(methods)
            assertTrue(methods!!.size == 1)
            assertTrue(methods.contains(PaymentMethod.CARD))
        }

        @Test
        @DisplayName("and it contains 1 shl 2 as a value of paymentMethods when invoking getPaymentMethods then an array with only PaymentMethod-GOOGLE_PAY should be returned")
        fun returnGooglePayOnGetPaymentMethodsWhenValueIsOneShlTwo() {
            every { configurationMock.getInt("paymentMethods") } returns (1 shl 2)

            val methods = getPaymentMethods(mapMock)

            assertNotNull(methods)
            assertTrue(methods!!.size == 1)
            assertTrue(methods.contains(PaymentMethod.GOOGLE_PAY))
        }

        @Test
        @DisplayName("and it contains 1 shl 3 as a value of paymentMethods when invoking getPaymentMethods with the given configurations then an array with only PaymentMethod-IDEAL should be returned")
        fun returnIdealOnGetPaymentMethodsWhenValueIsOneShlThree() {
            every { configurationMock.getInt("paymentMethods") } returns (1 shl 3)

            val methods = getPaymentMethods(mapMock)

            assertNotNull(methods)
            assertTrue(methods!!.size == 1)
            assertTrue(methods.contains(PaymentMethod.IDEAL))
        }

        @Test
        @DisplayName("when invoking getShippingParameters with the given configurations then a valid GooglePayShippingAddressParameters object should be returned")
        fun returnValidGooglePayShippingAddressParametersOnGetShippingParameters() {
            val params = getShippingParameters(mapMock)!!

            assertTrue(params.phoneNumberRequired!!)
            assertTrue(params.allowedCountryCodes!!.contains("US"))
        }

        @Test
        @DisplayName("when invoking getBillingParameters with the given configurations then a valid GooglePayBillingAddressParameters object should be returned")
        fun returnValidGooglePayBillingAddressParametersOnGetBillingParameters() {
            val params = getBillingParameters(mapMock)!!

            assertTrue(params.phoneNumberRequired!!)
            assertEquals(params.format, GooglePayAddressFormat.FULL)
        }

        @Test
        @DisplayName("when invoking getGooglePayConfiguration with the given configurations then a valid GooglePayConfiguration object should be returned")
        fun returnValidGooglePayConfigurationOnGetGooglePayConfiguration() {
            val params = getGooglePayConfiguration(mapMock)!!

            assertEquals(params.isEmailRequired, true)
            assertEquals(params.isBillingAddressRequired, true)
            assertEquals(params.isShippingAddressRequired, true)
            assertEquals(params.environment, GooglePayEnvironment.PRODUCTION)
            assertEquals(params.merchantName, "a merchant")
            assertEquals(params.transactionId, "trans id 1")
            assertEquals(params.totalPriceStatus, GooglePayPriceStatus.FINAL)
            assertEquals(params.totalPriceLabel, "Total")
            assertEquals(params.checkoutOption, GooglePayCheckoutOption.DEFAULT)
        }

        @Test
        @DisplayName("and it contains no googlePayConfiguration key when invoking getGooglePayConfiguration with the given configurations then null should be returned")
        fun returnNullOnGetGooglePayConfigurationWhenNoGooglePayConfigurationKeyPresent() {
            every { configurationMock.hasKey("googlePayConfiguration") } returns false

            val params = getGooglePayConfiguration(mapMock)

            assertNull(params)
        }

        @Test
        @DisplayName("when invoking getPBBAConfiguration with the given configurations then a valid PBBAConfiguration object should be returned")
        fun returnValidPBBAConfigurationOnGetPBBAConfiguration() {
            val deeplinkUrl = mockk<Uri>(relaxed = true)
            every { Uri.parse("https://www.google.com") } returns deeplinkUrl

            val params = getPBBAConfiguration(mapMock)!!

            assertEquals("123-123", params.mobileNumber)
            assertEquals("example@mail.com", params.emailAddress)
            assertEquals(deeplinkUrl, params.deepLinkURL)
            assertEquals("deep://link", params.deepLinkScheme)
        }

        @Test
        @DisplayName("and it contains no pbbaConfiguration key when invoking getPBBAConfiguration with the given configurations then null should be returned")
        fun returnNullOnGetPBBAConfigurationWhenNoPbbaConfigurationKeyPresent() {
            every { configurationMock.hasKey("pbbaConfiguration") } returns false

            val params = getPBBAConfiguration(mapMock)

            assertNull(params)
        }
    }

    @Nested
    @DisplayName("Given user configuration contains transactionType key")
    inner class UserConfigContainsTransactionTypeKey {

        @Test
        @DisplayName("and value is 2 when invoking getWidgetType with the given configurations then PaymentWidgetType-PRE_AUTH should be returned")
        fun returnPreAuthOnGetWidgetTypeWhenValueIsOne() {
            every { mapMock.getInt("transactionType") } returns 2

            val type = getTransactionTypeWidget(mapMock)
            assertEquals(type, PaymentWidgetType.PRE_AUTH)
        }

        @Test
        @DisplayName("and value is 3 when invoking getWidgetType with the given configurations then PaymentWidgetType-REGISTER_CARD should be returned")
        fun returnRegisterCardOnGetWidgetTypeWhenValueIsTwo() {
            every { mapMock.getInt("transactionType") } returns 3

            val type = getTransactionTypeWidget(mapMock)
            assertEquals(type, PaymentWidgetType.REGISTER_CARD)
        }

        @Test
        @DisplayName("and value is 4 when invoking getWidgetType with the given configurations then PaymentWidgetType-CHECK_CARD should be returned")
        fun returnCheckCardOnGetWidgetTypeWhenValueIsThree() {
            every { mapMock.getInt("transactionType") } returns 4

            val type = getTransactionTypeWidget(mapMock)
            assertEquals(type, PaymentWidgetType.CHECK_CARD)
        }

        @Test
        @DisplayName("and value is 5 when invoking getWidgetType with the given configurations then PaymentWidgetType-CREATE_CARD_TOKEN should be returned")
        fun returnCreateCardTokenOnGetWidgetTypeWhenValueIsFour() {
            every { mapMock.getInt("transactionType") } returns 5

            val type = getTransactionTypeWidget(mapMock)
            assertEquals(type, PaymentWidgetType.CREATE_CARD_TOKEN)
        }

        @Test
        @DisplayName("and with any unknown value when invoking getWidgetType with the given configurations then IllegalArgumentException should be thrown")
        fun returnCardPaymentOnGetWidgetTypeWhenUnknownValue() {
            every { mapMock.getInt("transactionType") } returns 100

            assertThrows<IllegalArgumentException> {
                getTransactionTypeWidget(mapMock)
            }
        }
    }

    @Nested
    @DisplayName("Given user configuration contains supportedCardNetworks key")
    inner class UserConfigContainsSupportedCardNetworksKey {

        @Test
        @DisplayName("and 1 shl 8 as a value when invoking getCardNetworks with the given configurations then an array with all CardNetworks should be returned")
        fun returnAllCardNetworksOnGetCardNetworksWhenValueOneShlEight() {
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
        @DisplayName("and 1 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-VISA should be returned")
        fun returnVisaOnGetCardNetworksWHenValueOne() {
            every { configurationMock.getInt("supportedCardNetworks") } returns 1

            val networks = getCardNetworks(mapMock)

            assertNotNull(networks)
            assertTrue(networks!!.size == 1)
            assertTrue(networks.contains(CardNetwork.VISA))
        }

        @Test
        @DisplayName("and 1 shl 1 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-MASTERCARD should be returned")
        fun returnMastercardOnGetCardNetworksWhenValueOneShlOne() {
            every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 1)

            val networks = getCardNetworks(mapMock)

            assertNotNull(networks)
            assertTrue(networks!!.size == 1)
            assertTrue(networks.contains(CardNetwork.MASTERCARD))
        }

        @Test
        @DisplayName("and 1 shl 2 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-MAESTRO should be returned")
        fun returnMaestroOnGetCardNetworksWhenValueOneShlTwo() {
            every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 2)

            val networks = getCardNetworks(mapMock)

            assertNotNull(networks)
            assertTrue(networks!!.size == 1)
            assertTrue(networks.contains(CardNetwork.MAESTRO))
        }

        @Test
        @DisplayName("and 1 shl 3 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-AMEX should be returned")
        fun returnAmexOnGetCardNetworksWhenValueOneShlThree() {
            every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 3)

            val networks = getCardNetworks(mapMock)

            assertNotNull(networks)
            assertTrue(networks!!.size == 1)
            assertTrue(networks.contains(CardNetwork.AMEX))
        }

        @Test
        @DisplayName("and 1 shl 4 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-CHINA_UNION_PAY should be returned")
        fun returnChinaUnionPayOnGetCardNetworksWhenValueOneShlFour() {
            every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 4)

            val networks = getCardNetworks(mapMock)

            assertNotNull(networks)
            assertTrue(networks!!.size == 1)
            assertTrue(networks.contains(CardNetwork.CHINA_UNION_PAY))
        }

        @Test
        @DisplayName("and 1 shl 5 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-JCB should be returned")
        fun returnJcbOnGetCardNetworksWhenValueOneShlFive() {
            every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 5)

            val networks = getCardNetworks(mapMock)

            assertNotNull(networks)
            assertTrue(networks!!.size == 1)
            assertTrue(networks.contains(CardNetwork.JCB))
        }

        @Test
        @DisplayName("and 1 shl 6 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-DISCOVER should be returned")
        fun returnDiscoverOnGetCardNetworksWhenValueOneShlSix() {
            every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 6)

            val networks = getCardNetworks(mapMock)

            assertNotNull(networks)
            assertTrue(networks!!.size == 1)
            assertTrue(networks.contains(CardNetwork.DISCOVER))
        }

        @Test
        @DisplayName("and 1 shl 7 as a value when invoking getCardNetworks with the given configurations then an array with only CardNetwork-DINERS_CLUB should be returned")
        fun returnDinersClubOnGetCardNetworksWhenValueOneShlSeven() {
            every { configurationMock.getInt("supportedCardNetworks") } returns (1 shl 7)

            val networks = getCardNetworks(mapMock)

            assertNotNull(networks)
            assertTrue(networks!!.size == 1)
            assertTrue(networks.contains(CardNetwork.DINERS_CLUB))
        }
    }

    @Nested
    @DisplayName("Given getMappedType is called")
    inner class CallGetMappedType {

        @Test
        @DisplayName("when value is PreAuth then 2 should be returned")
        fun returnOneOnGetMappedTypeWhenValuePreAuth() {
            val mappedType = getMappedType("PreAuth")

            assertEquals(2, mappedType)
        }

        @Test
        @DisplayName("when value is RegisterCard then 3 should be returned")
        fun returnTwoOnGetMappedTypeWhenValueRegisterCard() {
            val mappedType = getMappedType("RegisterCard")

            assertEquals(3, mappedType)
        }

        @Test
        @DisplayName("when value is CheckCard then 4 should be returned")
        fun returnThreeOnGetMappedTypeWhenValueCheckCard() {
            val mappedType = getMappedType("CheckCard")

            assertEquals(4, mappedType)
        }

        @Test
        @DisplayName("when value is Save then 5 should be returned")
        fun returnFourOnGetMappedTypeWhenValueSave() {
            val mappedType = getMappedType("Save")

            assertEquals(5, mappedType)
        }

        @Test
        @DisplayName("when value is undefined then -1 should be returned")
        fun returnZer0OnGetMappedTypeWhenValueUndefined() {
            val mappedType = getMappedType("undefined")

            assertEquals(-1, mappedType)
        }
    }

    @Nested
    @DisplayName("Given getMappedResult is called")
    inner class CallGetMappedResult {

        @Test
        @DisplayName("when value is Declined then 2 should be returned")
        fun returnTwoOnGetMappedResultWhenValueDeclined() {
            val mappedResult = getMappedResult("Declined")

            assertEquals(2, mappedResult)
        }

        @Test
        @DisplayName("when value is Success then 1 should be returned")
        fun returnOneOnGetMappedResultWhenValueSuccess() {
            val mappedResult = getMappedResult("Success")

            assertEquals(1, mappedResult)
        }

        @Test
        @DisplayName("when value is Error then 0 should be returned")
        fun returnOneOnGetMappedResultWhenValueError() {
            val mappedResult = getMappedResult("Error")

            assertEquals(0, mappedResult)
        }

        @Test
        @DisplayName("when value is undefined then -1 should be returned")
        fun returnIntMaxOnGetMappedResultWhenValueUndefined() {
            val mappedResult = getMappedResult("undefined")

            assertEquals(-1, mappedResult)
        }

        @Test
        @DisplayName("when JudoResult's type field is set to PreAuth, then map.getInt('type') should return 1")
        fun mapShouldContainType() {
            val mappedResult = getMappedResult(JudoResult(type = "PreAuth"))

            assertEquals(2, mappedResult.getInt("type"))
        }

        @Test
        @DisplayName("when JudoResult's receiptId field is set to receipt, then map.getString('receiptId') should return receipt")
        fun mapShouldContainReceipt() {
            val mappedResult = getMappedResult(JudoResult(receiptId = "receipt"))

            assertEquals("receipt", mappedResult.getString("receiptId"))
        }

        @Test
        @DisplayName("when JudoResult's cardDetails.category field is set to cardCategory, then map.getString('cardCategory') should return cardCategory")
        fun mapShouldContainCardCategory() {
            val mappedResult = getMappedResult(JudoResult(cardDetails = CardToken(category = "cardCategory")))

            assertEquals("cardCategory", mappedResult.getMap("cardDetails")?.getString("cardCategory"))
        }

        @Test
        @DisplayName("when JudoResult's cardDetails.country field is set to cardCountry, then map.getString('cardCountry') should return cardCountry")
        fun mapShouldContainCardCountry() {
            val mappedResult = getMappedResult(JudoResult(cardDetails = CardToken(country = "cardCountry")))

            assertEquals("cardCountry", mappedResult.getMap("cardDetails")?.getString("cardCountry"))
        }

        @Test
        @DisplayName("when JudoResult's cardDetails.funding field is set to cardFunding, then map.getString('cardFunding') should return cardFunding")
        fun mapShouldContainCardFunding() {
            val mappedResult = getMappedResult(JudoResult(cardDetails = CardToken(funding = "cardFunding")))

            assertEquals("cardFunding", mappedResult.getMap("cardDetails")?.getString("cardFunding"))
        }

        @Test
        @DisplayName("when JudoResult's cardDetails.scheme field is set to cardScheme, then map.getString('cardScheme') should return cardScheme")
        fun mapShouldContainCardScheme() {
            val mappedResult = getMappedResult(JudoResult(cardDetails = CardToken(scheme = "cardScheme")))

            assertEquals("cardScheme", mappedResult.getMap("cardDetails")?.getString("cardScheme"))
        }
    }
}

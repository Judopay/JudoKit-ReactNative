package com.reactlibrary

import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

@DisplayName("Testing Judo readable map extensions")
class JudoReadableMapExtensionsTest {
    private val configMock = mockkClass(ReadableMap::class)
    private val sut = mockkClass(ReadableMap::class)

    private val transactionMode = 1
    private val token = "token"
    private val secret = "secret"
    private val isSandboxed = true
    private val isInitialRecurringPayment = false
    private val judoId = "judoId"
    private val cardNetworkValue = 1
    private val paymentMethodValue = 1
    private val authorization = mockk<ReadableMap>(relaxed = true)

    @BeforeEach
    fun setUp() {
        every { configMock.getString("judoId") } returns judoId
        every { configMock.getInt("supportedCardNetworks") } returns cardNetworkValue
        every { configMock.getInt("paymentMethods") } returns paymentMethodValue
        every { configMock.getBoolean("isInitialRecurringPayment") } returns isInitialRecurringPayment

        every { sut.getMap("configuration") } returns configMock
        every { sut.getInt("transactionMode") } returns transactionMode
        every { sut.getMap("authorization") } returns authorization
        every { authorization.token } returns token
        every { authorization.secret } returns secret
        every { sut.getBoolean("sandboxed") } returns isSandboxed
    }

    @Test
    @DisplayName("Given configuration object contains transactionMode when invoking transactionMode then the transactionMode integer should be returned")
    fun returnTransactionModeOnTransactionModeCall() {
        assertEquals(sut.transactionMode, transactionMode)
    }

    @Test
    @DisplayName("Given configuration object contains token when invoking token then the token string should be returned")
    fun returnTokenOnTokenCall() {
        assertEquals(sut.authorization?.token, token)
    }

    @Test
    @DisplayName("Given configuration object contains secret when invoking secret then the secret string should be returned")
    fun returnSecretOnSecretCall() {
        assertEquals(sut.authorization?.secret, secret)
    }

    @Test
    @DisplayName("Given configuration object contains sandboxed when invoking isSandboxed then the sandboxed boolean should be returned")
    fun returnSandboxedOnSandboxedCall() {
        assertEquals(sut.isSandboxed, isSandboxed)
    }

    @Test
    @DisplayName("Given configuration object contains judoId when invoking judoId then the judoId string should be returned")
    fun returnJudoIdOnJudoIdCall() {
        assertEquals(sut.judoId, judoId)
    }

    @Test
    @DisplayName("Given configuration object contains supportedCardNetworks when invoking cardNetworkValue then the supportedCardNetworks integer should be returned")
    fun returnSupportedCardNetworksOnCardNetworkValueCall() {
        every { configMock.hasKey("supportedCardNetworks") } returns true

        assertEquals(sut.cardNetworkValue, cardNetworkValue)
    }

    @Test
    @DisplayName("Given configuration object has no supportedCardNetworks key when invoking cardNetworkValue then null should be returned")
    fun returnNullOnCardNetworkCallWhenConfigObjectHasNoSupportedCardNetworksKey() {
        every { configMock.hasKey("supportedCardNetworks") } returns false

        assertNull(sut.cardNetworkValue)
    }


    @Test
    @DisplayName("Given configuration object contains paymentMethods when invoking paymentMethodValue then the paymentMethods integer should be returned")
    fun returnPaymentMethodsOnPaymentMethodsCall() {
        every { configMock.hasKey("paymentMethods") } returns true

        assertEquals(sut.paymentMethodValue, paymentMethodValue)
    }

    @Test
    @DisplayName("Given configuration object has no paymentMethods key when invoking paymentMethodValue then null should be returned")
    fun returnNullOnPaymentMethodsCallWHenConfigObjectHasNoPaymentMethodsKey() {
        every { configMock.hasKey("paymentMethods") } returns false

        assertNull(sut.paymentMethodValue)
    }

    @Test
    @DisplayName("Given configuration object contains isInitialRecurringPayment when invoking isInitialRecurringPayment then the isInitialRecurringPayment boolean should be returned")
    fun returnIsInitialRecurringPaymentOnIsInitialRecurringPaymentCall() {
        assertEquals(sut.isInitialRecurringPayment, isInitialRecurringPayment)
    }
}

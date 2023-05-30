package com.reactlibrary

import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNotNull
import junit.framework.TestCase.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@DisplayName("Testing Reference readable map extensions")
class ReferenceReadableMapExtensionsTest {

    private val configMock = mockkClass(ReadableMap::class)
    private val referenceMock = mockkClass(ReadableMap::class)
    private val metadataMock = mockkClass(ReadableMap::class)
    private val sut = mockkClass(ReadableMap::class)

    private val consumerReference = "ref1"
    private val paymentReference = "ref2"

    @BeforeEach
    fun setUp() {
        every { referenceMock.getString("consumerReference") } returns consumerReference
        every { referenceMock.getString("paymentReference") } returns paymentReference
        every { referenceMock.hasKey("consumerReference") } returns true
        every { referenceMock.hasKey("paymentReference") } returns true

        every { referenceMock.getMap("metadata") } returns metadataMock
        every { referenceMock.hasKey("metadata") } returns true

        every { configMock.getMap("reference") } returns referenceMock
        every { configMock.hasKey("reference") } returns true

        every { sut.getMap("configuration") } returns configMock
        every { sut.hasKey("configuration") } returns true
    }

    @Nested
    @DisplayName("Given configuration object contains reference")
    inner class ConfigObjectContainsReference {

        @Test
        @DisplayName("when invoking consumerReference then the consumerReference string should be returned")
        fun returnConsumerReferenceOnConsumerReferenceCall() {
            assertEquals(sut.consumerReference, consumerReference)
        }

        @Test
        @DisplayName("when invoking paymentReference then the paymentReference string should be returned")
        fun returnPaymentReferenceOnPaymentReferenceCall() {
            assertEquals(sut.paymentReference, paymentReference)
        }

        @Test
        @DisplayName("when invoking metadata then the value of metadata property should be returned")
        fun returnMetadataOnMetadataCall() {
            assertNotNull(sut.metadata)
            assertEquals(sut.metadata, metadataMock)
        }
    }

    @Nested
    @DisplayName("Given configuration object has no reference")
    inner class ConfigObjectHasNoReference {

        @BeforeEach
        internal fun setUp() {
            every { configMock.getMap("reference") } returns null
        }

        @Test
        @DisplayName("when invoking consumerReference then null should be returned")
        fun returnNullOnConsumerReferenceCall() {
            assertNull(sut.consumerReference)
        }

        @Test
        @DisplayName("when invoking paymentReference then null should be returned")
        fun returnNullOnPaymentReferenceCall() {
            assertNull(sut.paymentReference)
        }
    }

    @Test
    @DisplayName("Given reference object has no metadata key when invoking metadata then null should be returned")
    fun returnNullOnMetadataCallWhenReferenceHasNoMetadataKey() {
        every { referenceMock.hasKey("metadata") } returns false
        assertNull(sut.metadata)
    }
}

package com.reactlibrary

import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNotNull
import junit.framework.TestCase.assertNull
import org.junit.Before
import org.junit.Test

class ReferenceReadableMapExtensionsTest {

    private val configMock = mockkClass(ReadableMap::class)
    private val referenceMock = mockkClass(ReadableMap::class)
    private val metadataMock = mockkClass(ReadableMap::class)
    private val sut = mockkClass(ReadableMap::class)

    private val consumerReference = "ref1"
    private val paymentReference = "ref2"

    @Before
    fun before() {
        every { referenceMock.getString("consumerReference") } returns consumerReference
        every { referenceMock.getString("paymentReference") } returns paymentReference
        every { referenceMock.getMap("metadata") } returns metadataMock
        every { referenceMock.hasKey("metadata") } returns true

        every { configMock.getMap("reference") } returns referenceMock

        every { sut.getMap("configuration") } returns configMock
    }

    @Test
    fun `Given configuration object contains reference when invoking consumerReference then the consumerReference string should be returned`() {
        assertEquals(sut.consumerReference, consumerReference)
    }

    @Test
    fun `Given configuration object contains reference when invoking paymentReference then the paymentReference string should be returned`() {
        assertEquals(sut.paymentReference, paymentReference)
    }

    @Test
    fun `Given configuration object has no reference when invoking consumerReference then null should be returned`() {
        every { configMock.getMap("reference") } returns null

        assertNull(sut.consumerReference)
    }

    @Test
    fun `Given configuration object has no reference when invoking paymentReference then null should be returned`() {
        every { configMock.getMap("reference") } returns null
        assertNull(sut.paymentReference)
    }

    @Test
    fun `Given configuration object has reference when invoking metadata then the value of metadata property should be returned`() {
        assertNotNull(sut.metadata)
        assertEquals(sut.metadata, metadataMock)
    }

    @Test
    fun `Given reference object has no metadata key when invoking metadata then null should be returned`() {
        every { referenceMock.hasKey("metadata") } returns false
        assertNull(sut.metadata)
    }
}
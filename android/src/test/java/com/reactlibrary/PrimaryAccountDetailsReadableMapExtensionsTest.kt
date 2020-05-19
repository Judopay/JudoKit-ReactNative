package com.reactlibrary

import com.facebook.react.bridge.ReadableMap
import io.mockk.every
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNull
import org.junit.Before
import org.junit.Test

class PrimaryAccountDetailsReadableMapExtensionsTest {

    private val configMock = mockkClass(ReadableMap::class)
    private val primaryAccountDetailsMock = mockkClass(ReadableMap::class)
    private val sut = mockkClass(ReadableMap::class)

    private val name = "name"
    private val accountNumber = "accountNumber"
    private val dateOfBirth = "dateOfBirth"
    private val postCode = "postCode"

    @Before
    fun before() {
        every { primaryAccountDetailsMock.getString("name") } returns name
        every { primaryAccountDetailsMock.getString("accountNumber") } returns accountNumber
        every { primaryAccountDetailsMock.getString("dateOfBirth") } returns dateOfBirth
        every { primaryAccountDetailsMock.getString("postCode") } returns postCode
        every { primaryAccountDetailsMock.hasKey("name") } returns true
        every { primaryAccountDetailsMock.hasKey("accountNumber") } returns true
        every { primaryAccountDetailsMock.hasKey("dateOfBirth") } returns true
        every { primaryAccountDetailsMock.hasKey("postCode") } returns true

        every { configMock.hasKey("primaryAccountDetails") } returns true
        every { configMock.getMap("primaryAccountDetails") } returns primaryAccountDetailsMock

        every { sut.getMap("configuration") } returns configMock
    }

    @Test
    fun `Given configuration object contains primaryAccountDetails when invoking name then the name string should be returned`() {
        assertEquals(sut.name, name)
    }

    @Test
    fun `Given configuration object contains primaryAccountDetails when invoking accountNumber then the accountNumber string should be returned`() {
        assertEquals(sut.accountNumber, accountNumber)
    }

    @Test
    fun `Given configuration object contains primaryAccountDetails when invoking dateOfBirth then the dateOfBirth string should be returned`() {
        assertEquals(sut.dateOfBirth, dateOfBirth)
    }

    @Test
    fun `Given configuration object contains primaryAccountDetails when invoking postCode then the postCode string should be returned`() {
        assertEquals(sut.postCode, postCode)
    }

    @Test
    fun `Given primaryAccountDetails object has no name when invoking name then null should be returned`() {
        every { primaryAccountDetailsMock.hasKey("name") } returns false

        assertNull(sut.name)
    }

    @Test
    fun `Given primaryAccountDetails object has no accountNumber when invoking accountNumber then null should be returned`() {
        every { primaryAccountDetailsMock.hasKey("accountNumber") } returns false

        assertNull(sut.accountNumber)
    }

    @Test
    fun `Given primaryAccountDetails object has no dateOfBirth when invoking dateOfBirth then null should be returned`() {
        every { primaryAccountDetailsMock.hasKey("dateOfBirth") } returns false

        assertNull(sut.dateOfBirth)
    }

    @Test
    fun `Given primaryAccountDetails object has no postCode when invoking postCode then null should be returned`() {
        every { primaryAccountDetailsMock.hasKey("postCode") } returns false

        assertNull(sut.postCode)
    }

    @Test
    fun `Given configuration object has no primaryAccountDetails when invoking primaryAccountDetails properties then null should be returned for each one`() {
        every { configMock.hasKey("primaryAccountDetails") } returns false

        assertNull(sut.name)
        assertNull(sut.accountNumber)
        assertNull(sut.dateOfBirth)
        assertNull(sut.postCode)
    }
}
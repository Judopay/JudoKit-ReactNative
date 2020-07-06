package com.reactlibrary

import com.facebook.react.bridge.ReactApplicationContext
import io.mockk.justRun
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertSame
import junit.framework.TestCase.assertTrue
import org.junit.Before
import org.junit.Test

class JudoReactNativePackageTest {

    private val reactContextMock: ReactApplicationContext = mockkClass(ReactApplicationContext::class)
    private lateinit var sut: JudoReactNativePackage

    @Before
    fun setUp() {
        sut = JudoReactNativePackage()
        justRun { reactContextMock.addActivityEventListener(any()) }
    }

    @Test
    fun `Given a JudoReactNativePackage instance is created when invoking createNativeModules on it then an array containing only one instance of JudoReactNativeModule should be returned`() {
        val modules = sut.createNativeModules(reactContextMock)

        assertEquals(modules.size, 1)
        assertSame(modules.first()::class.java, JudoReactNativeModule::class.java)
    }

    @Test
    fun `Given a JudoReactNativePackage instance is created when invoking createViewManagers on it then an empty array should be returned`() {
        val managers = sut.createViewManagers(reactContextMock)

        assertTrue(managers.isEmpty())
    }

}
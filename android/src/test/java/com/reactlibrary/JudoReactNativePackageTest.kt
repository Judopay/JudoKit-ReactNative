package com.reactlibrary

import com.facebook.react.bridge.ReactApplicationContext
import io.mockk.every
import io.mockk.justRun
import io.mockk.mockk
import io.mockk.mockkClass
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertSame
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@DisplayName("Testing JudoReactNativePackage class")
class JudoReactNativePackageTest {

    private val reactContextMock: ReactApplicationContext = mockkClass(ReactApplicationContext::class) {
        every { applicationContext } returns mockk(relaxed = true)
    }
    private lateinit var sut: JudoReactNativePackage

    @BeforeEach
    fun setUp() {
        sut = JudoReactNativePackage()
        justRun { reactContextMock.addActivityEventListener(any()) }
    }

    @Nested
    @DisplayName("Given a JudoReactNativePackage instance is created")
    inner class JudoReactNativePackageInstanceCreated {

        @Test
        @DisplayName("when invoking createNativeModules on it then an array containing only one instance of JudoReactNativeModule should be returned")
        fun returnOneInstanceOfJudoReactNativeModuleWhenInvokingCreateNativeModules() {
            val modules = sut.createNativeModules(reactContextMock)

            assertEquals(modules.size, 1)
            assertSame(modules.first()::class.java, JudoReactNativeModule::class.java)
        }
    }
}

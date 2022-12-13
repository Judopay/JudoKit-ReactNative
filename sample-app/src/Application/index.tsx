import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

import 'react-native-gesture-handler'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Theme } from '@react-navigation/native/lib/typescript/src/types'
import ApplicationRouter from './ApplicationRouter'

const Application = () => {
  const scheme = useColorScheme()
  const [theme, setTheme] = useState<Theme>(DefaultTheme)

  useEffect(() => {
    setTheme(scheme === 'dark' ? DarkTheme : DefaultTheme)
  }, [scheme])

  return (
    <ThemeProvider value={theme}>
      <ApplicationRouter theme={theme} />
    </ThemeProvider>
  )
}

export default Application

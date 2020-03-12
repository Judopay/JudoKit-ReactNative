// @flow
import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen'

enableScreens()

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
})

const AppContainer = createAppContainer(AppNavigator)

export default () => {
  return <AppContainer />
}

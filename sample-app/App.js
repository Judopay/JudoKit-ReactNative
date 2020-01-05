// @flow
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
})

const AppContainer = createAppContainer(AppNavigator)

export default () => {
  return <AppContainer />
}

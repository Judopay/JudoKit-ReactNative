import React from 'react'
import { TouchableHighlight, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home/Home'
import Settings from './screens/Settings/Settings'
import Receipt from './screens/Receipt/Receipt'
import TokenPayments from './screens/TokenPayments/TokenPayments'
import PayByBankApp from './screens/PayByBankApp/PayByBankApp'
import TransactionDetails from './screens/TransactionDetails/TransactionDetails'
import {
  JudoAuthorization,
  JudoConfiguration,
  JudoResponse,
} from '../types/JudoTypes'

export type RootStackParamList = {
  Home: undefined
  Settings: undefined
  Receipt: { receipt: JudoResponse }
  PayByBankApp: {
    authorization: JudoAuthorization
    configuration: JudoConfiguration
    isSandboxed: boolean
  }
  TokenPayments: {
    authorization: JudoAuthorization
    configuration: JudoConfiguration
    isSandboxed: boolean
  }
  TransactionDetails: {
    authorization: JudoAuthorization
    isSandboxed: boolean
  }
}

const RootStack = createStackNavigator<RootStackParamList>()

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: '#5623e4',
              },
              headerTintColor: '#fff',
              headerRight: () => (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => navigation.navigate('Settings')}
                  style={{ marginRight: 10 }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignItems: 'center',
                      padding: 10,
                    }}
                    source={require('./resources/ic_settings.png')}
                  />
                </TouchableHighlight>
              ),
            })}
          />
          <RootStack.Screen
            name="Settings"
            component={Settings}
            options={() => ({
              headerStyle: {
                backgroundColor: '#5623e4',
              },
              headerTintColor: '#fff',
            })}
          />
          <RootStack.Screen
            name="Receipt"
            component={Receipt}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: '#5623e4',
              },
              headerTintColor: '#fff',
              headerLeft: () => (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => navigation.popToTop()}
                  style={{ marginLeft: 10, marginRight: 20 }}
                >
                  <Text
                    style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}
                  >
                    Home
                  </Text>
                </TouchableHighlight>
              ),
            })}
          />
          <RootStack.Screen
            name="PayByBankApp"
            component={PayByBankApp}
            options={() => ({
              title: 'Pay By Bank App',
              headerStyle: {
                backgroundColor: '#5623e4',
              },
              headerTintColor: '#fff',
            })}
          />
          <RootStack.Screen
            name="TokenPayments"
            component={TokenPayments}
            options={() => ({
              title: 'Token Payments',
              headerStyle: {
                backgroundColor: '#5623e4',
              },
              headerTintColor: '#fff',
            })}
          />
          <RootStack.Screen
            name="TransactionDetails"
            component={TransactionDetails}
            options={() => ({
              title: 'Transaction Details',
              headerStyle: {
                backgroundColor: '#5623e4',
              },
              headerTintColor: '#fff',
            })}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

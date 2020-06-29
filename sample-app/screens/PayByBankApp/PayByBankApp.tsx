import React, { Component } from 'react'
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native'
import JudoPay, { JudoPBBAButton } from 'judo-react-native'
import { isIos } from '../../helpers/utils'
import { TouchableOpacity } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-community/async-storage'
import { lastUsedFeatureKey } from '../../helpers/AsyncStore'

export default class PayByBankApp extends Component {
  constructor(props: any) {
    super(props)
    this.invokePayByBankApp = this.invokePayByBankApp.bind(this)
  }

  componentDidMount() {
    AsyncStorage.setItem(lastUsedFeatureKey, 'PayByBankApp')
  }

  componentWillUnmount() {
    AsyncStorage.removeItem(lastUsedFeatureKey)
  }

  async invokePayByBankApp() {
    const token = this.props.route.params.token
    const secret = this.props.route.params.secret
    const configuration = this.props.route.params.configuration
    try {
      const judo = new JudoPay(token, secret)
      const response = await judo.invokePayByBankApp(configuration)
      this.props.navigation.navigate('Receipt', { receipt: response })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.pbbaButton}
            onPress={this.invokePayByBankApp}
          >
            <JudoPBBAButton style={{ flex: 1 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pbbaButton: {
    height: 50,
    width: isIos ? 310 : 200,
  },
})

import React, { Component } from 'react'
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import JudoPay, { JudoPBBAButton } from 'judo-react-native'
import { isIos } from '../../helpers/utils'
import { TouchableOpacity as AndroidTouchableOpacity } from 'react-native-gesture-handler'

export default class PayByBankApp extends Component {
  constructor(props: any) {
    super(props)
    this.invokePayByBankApp = this.invokePayByBankApp.bind(this)
  }

  async invokePayByBankApp() {
    const { token, secret, configuration } = this.props.route.params

    try {
      const judo = new JudoPay(token, secret)
      const response = await judo.invokePayByBankApp(configuration)
      if (!response) return

      this.props.navigation.navigate('Receipt', { receipt: response })
    } catch (error) {
      console.log(error)
    }
  }

  pbbaButton() {
    return isIos ? (
      <TouchableOpacity
        style={styles.pbbaButton}
        onPress={this.invokePayByBankApp}
      >
        <JudoPBBAButton style={{ flex: 1 }} />
      </TouchableOpacity>
    ) : (
      <AndroidTouchableOpacity
        style={styles.pbbaButton}
        onPress={this.invokePayByBankApp}
      >
        <JudoPBBAButton style={{ flex: 1 }} />
      </AndroidTouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>{this.pbbaButton()}</View>
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

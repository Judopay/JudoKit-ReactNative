// @flow
import React, { Component } from 'react'
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import {
  Judopay,
  JudoApplePayButton,
  JudoGooglePayButton,
  JudoTransactionType,
  JudoPaymentMethods,
  JudoPaymentParams,
} from 'judo-react-native'
import { judoOptions, applePayOptions, googlePayOptions } from './DefaultConfig'
import { showMessage, isAndroid, isIos } from '../utils'
import AsyncStorage from '@react-native-community/async-storage'
import { storageKey, store } from './SettingsConfig'

export default class Home extends Component {
  state = {
    canUseApplePay: false,
    canUseGooglePay: false,
    judoOptions: judoOptions,
    googlePayOptions: googlePayOptions,
    applePayOptions: applePayOptions
  }

  componentDidMount() {
    console.log("get jud " + JSON.stringify(this.state.judoOptions))
    console.log("googl " + JSON.stringify(this.state.googlePayOptions))
    console.log("canUseGooglePay " + JSON.stringify(this.state.canUseGooglePay))
    console.log("canUseApplePay " + JSON.stringify(this.state.canUseApplePay))
    this.getData()
    store.subscribe(() => this.getData())
  }

  async getData() {
    console.log("data ")
    try {
      const value = await AsyncStorage.getItem(storageKey)
      if (value !== null) {
        const settings = JSON.parse(value)
        var judoOptions = this.state.judoOptions
        judoOptions.isSandbox = settings.list[0].data[0].value as boolean
        judoOptions.judoId = settings.list[0].data[1].value as string
        judoOptions.siteId = settings.list[0].data[2].value as string
        judoOptions.token = settings.list[0].data[3].value as string
        judoOptions.secret = settings.list[0].data[4].value as string
        judoOptions.amount = settings.list[1].data[0].value as string
        judoOptions.currency = settings.list[1].data[1].valueArray[0] as string
        var googlePayOptions = this.state.googlePayOptions
        googlePayOptions.googlePayTestEnvironment = settings.list[2].data[0].value as boolean
        googlePayOptions.requireShippingDetails = settings.list[2].data[3].value as boolean
        googlePayOptions.requireContactDetails = settings.list[2].data[5].value as boolean
        var canUseGooglePay = false
        var canUseApplePay = false
        if (isIos) {
          canUseApplePay = await Judopay.canUseApplePay()
        } else if (isAndroid) {
          canUseGooglePay = await Judopay.canUseGooglePay(googlePayOptions)
        }
        this.setState({
          judoOptions: judoOptions,
          googlePayOptions: googlePayOptions,
          canUseGooglePay: canUseGooglePay,
          canUseApplePay: canUseApplePay
        })
        console.log("get jud " + JSON.stringify(this.state.judoOptions))
        console.log("googl " + JSON.stringify(this.state.googlePayOptions))
        console.log("canUseGooglePay " + JSON.stringify(this.state.canUseGooglePay))
        console.log("canUseApplePay " + JSON.stringify(this.state.canUseApplePay))
      }
    } catch(e) {
      console.log("data " + e)
     }
  }

  async makePayment() {
    //TODO check if state object changes
    this.state.judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    try {
      const response = await Judopay.makePayment({
        ...this.state.judoOptions
      })

      if (response && response.result === 'Success') {
        await showMessage(
          'Payment successful',
          `ReceiptId: ${response.receiptId}`,
        )
      } else {
        await showMessage('Payment error', (response && response.result) || '')
      }
    } catch (e) {
      this.handleException(e, 'Payment')
    }
  }

  async makePreAuth() {
    //TODO check if state object changes
    this.state.judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    try {
      const response = await Judopay.makePreAuth({
        ...this.state.judoOptions
      })
      if (response && response.result === 'Success') {
        await showMessage(
          'Pre-auth successful',
          `ReceiptId: ${response.receiptId}`,
        )
      } else {
        await showMessage('Pre-auth error', (response && response.result) || '')
      }
    } catch (e) {
      this.handleException(e, 'Pre-auth')
    }
  }

  async selectPaymentMethod() {
    //TODO check if state object changes
    this.state.judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    const params: JudoPaymentParams = {
      judoConfig: this.state.judoOptions,
      judoApplePayConfig: this.state.applePayOptions,
      judoGooglePayConfig: this.state.googlePayOptions,
      judoPaymentMethodsConfig: {
        paymentMethods: JudoPaymentMethods.all
      }
    }
    try {
      const response = await Judopay.showPaymentMethods({
        ...params
      })
      if (response && response.result === 'Success') {
        await showMessage(`Successful`, `ReceiptId: ${response.receiptId}`)
      } else {
        await showMessage(
          'Select payment method error',
          (response && response.result) || '',
        )
      }
    } catch (e) {
      this.handleException(e, 'Something')
    }
  }

  async makeIDEALPayment() {
    //TODO check if state object changes
    this.state.judoOptions.paymentReference = `myPaymentReference${Date.now()}` // MEMO: max length = 40
    try {
      const response = await Judopay.makeIDEALPayment({
        ...this.state.judoOptions
      })
      if (response && response.orderStatus === 'SUCCEEDED') {
        await showMessage(`Successful`, `orderId: ${response.orderId || ''}`)
      } else {
        await showMessage(
          'iDEAL payment error',
          (response && response.orderFailureReason) || '',
        )
      }
    } catch (e) {
      this.handleException(e, 'iDEAL transaction')
    }
  }

  async makeApplePayPayment() {
    //TODO check if state object changes
    this.state.judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    const params: JudoPaymentParams = {
      judoConfig: this.state.judoOptions,
      judoApplePayConfig: this.state.applePayOptions
    }
    const title =
      this.state.applePayOptions.transactionType === JudoTransactionType.payment
        ? 'Apple Pay payment'
        : 'Apple Pay pre-auth'
    try {
      const response = await Judopay.makeApplePayPayment({
        ...params
      })
      if (response && response.result === 'Success') {
        await showMessage(
          `${title} successful`,
          `ReceiptId: ${response.receiptId}`,
        )
      } else {
        await showMessage(`${title} error`, (response && response.result) || '')
      }
    } catch (e) {
      this.handleException(e, title)
    }
  }

  async makeGooglePayPayment() {
    //TODO check if state object changes
    this.state.judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    const params: JudoPaymentParams = {
      judoConfig: this.state.judoOptions,
      judoGooglePayConfig: this.state.googlePayOptions
    }
    const title =
      this.state.googlePayOptions.transactionType == JudoTransactionType.payment
        ? 'Google Pay payment'
        : 'Google Pay pre-auth'
    try {
      const response = await Judopay.makeGooglePayPayment({
        ...params
      })
      if (response && response.result === 'Success') {
        await showMessage(
          `${title} successful`,
          `ReceiptId: ${response.receiptId}`,
        )
      } else {
        await showMessage(`${title} error`, (response && response.result) || '')
      }
    } catch (e) {
      this.handleException(e, title)
    }
  }

  async handleException(e: any, title: string) {
    if (e.code === 'JUDO_USER_CANCELLED') {
      // do nothing when the user cancels
    } else if (
      e.code === 'JUDO_ERROR' &&
      e.userInfo &&
      e.userInfo.result === 'Declined'
    ) {
      await showMessage(
        `${title} failed`,
        'Card declined. Please try again and make sure the card details are correct.',
      )
    } else {
      const message = e.message || 'Something went wrong. Please try again later.'
      await showMessage('Oops...', message)
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {`Welcome to the\nJudopay sample app!`}
          </Text>
          <View style={styles.buttons}>
            <OptionButton title="Make payment" onPress={() => this.makePayment()} />
            <OptionButton title="Make pre-auth" onPress={() => this.makePreAuth()} />
            <OptionButton
              title="Select payment method"
              onPress={() => this.selectPaymentMethod()}
            />
            <OptionButton
              title="iDEAL payment"
              onPress={() => this.makeIDEALPayment()}
            />
            {isIos && this.state.canUseApplePay && (
              <JudoApplePayButton
                style={styles.payButtonStyle}
                isDark={true}
                onPayPress={() => this.makeApplePayPayment()}
              />
            )}
            {isAndroid && this.state.canUseGooglePay && (
              <JudoGooglePayButton
                style={styles.payButtonStyle}
                isDark={false}
                onPayPress={() => this.makeGooglePayPayment()}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const OptionButton = ({
  disabled,
  onPress,
  title,
}: {
  disabled?: boolean,
  onPress: () => any,
  title: string,
}) => {
  return (
    <View style={styles.button}>
      <Button disabled={disabled} title={title} onPress={() => onPress()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    margin: 32,
  },
  welcome: {
    fontSize: 21,
    marginBottom: 32,
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  payButtonStyle: {
    alignSelf: 'center',
    height: 30,
    width: 100,
    marginTop: 16,
    marginBottom: 16,
  },
})

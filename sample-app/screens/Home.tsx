// @flow
import React, { Component } from 'react'
import {
  Button,
  StatusBar,
  StyleSheet,
  SectionList,
  TouchableHighlight,
  Text,
  View
} from 'react-native'
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
import { storageKey, store, HomeScreenData, HomeListItem, HomeListType } from './DataConfig'

export default class Home extends Component {
  state = {
    judoOptions: judoOptions,
    googlePayOptions: googlePayOptions,
    applePayOptions: applePayOptions,
    paymentMethods: JudoPaymentMethods.card
  }

  componentDidMount() {
    store.dispatch({ type: '' })
    store.subscribe(() => {
      this.getData()
    })
  }

  async getData() {
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
        this.setState({
          judoOptions: judoOptions,
          googlePayOptions: googlePayOptions
        })
      }
    } catch(e) {
      console.log("getData() error " + e)
    }
  }

  async makePayment() {
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
    const params: JudoPaymentParams = {
      judoConfig: this.state.judoOptions,
      judoApplePayConfig: this.state.applePayOptions,
      judoGooglePayConfig: this.state.googlePayOptions,
      judoPaymentMethodsConfig: {
        paymentMethods: this.state.paymentMethods
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

  handleListItemPressed(item: HomeListItem) {
    this.setState({
      judoOptions: {
        ...this.state.judoOptions,
        paymentReference: `myPaymentReference${Date.now()}`
      }
    }, () => {
      switch (item.type) {
        case HomeListType.cardPay:
          this.makePayment()
          break
        case HomeListType.cardPreAuth:
          this.makePreAuth()
          break
        case HomeListType.cardRegister:
          //TODO
          break
        case HomeListType.cardCheck:
          //TODO
          break
        case HomeListType.cardSave:
          //TODO
          break
        case HomeListType.ideal:
          this.makeIDEALPayment()
          break
        case HomeListType.googlePayment:
          this.setState({
            googlePayOptions: {
              ...this.state.googlePayOptions,
              transactionType: JudoTransactionType.payment
            }
          }, () => this.makeGooglePayPayment())
          break
        case HomeListType.googlePreAuth:
          this.setState({
            googlePayOptions: {
              ...this.state.googlePayOptions,
              transactionType: JudoTransactionType.preAuth
            }
          }, () => this.makeGooglePayPayment())
          break
        case HomeListType.applePayment:
          this.setState({
            applePayOptions: {
              ...this.state.applePayOptions,
              transactionType: JudoTransactionType.payment
            }
          }, () => this.makeApplePayPayment())
          break
        case HomeListType.applePreAuth:
          this.setState({
            applePayOptions: {
              ...this.state.applePayOptions,
              transactionType: JudoTransactionType.preAuth
            }
          }, () => this.makeApplePayPayment())
          break
        case HomeListType.methods:
          this.selectPaymentMethod()
          break
        case HomeListType.methodsPreAuth:
          //TODO
          break
      }
    })
  }

  getListItem(item: HomeListItem) {
    if (isIos && (item.type === HomeListType.googlePayment || item.type === HomeListType.googlePreAuth)
      || isAndroid && (item.type === HomeListType.applePayment || item.type === HomeListType.applePreAuth)) {
          return <View />
        }
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={() => {this.handleListItemPressed(item)}}
      >
        <View style={styles.listItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>
          <SectionList
            sections={HomeScreenData.list}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({ item }) => this.getListItem(item)}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#e9e9e9'
  },
  listItem: {
    marginTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#000',
    width: 250,
    marginStart: 10,
    marginEnd: 10,
  },
  subtitle: {
    fontSize: 14,
    width: 300,
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10
  }
})

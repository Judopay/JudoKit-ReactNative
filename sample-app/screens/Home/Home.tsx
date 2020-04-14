
import React, { Component } from 'react'
import { store, storageKey } from '../../helpers/AsyncStore'
import { HomeScreenData } from './HomeData'
import { HomeListItem, HomeListType } from './HomeProps'
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'

import {
  StatusBar,
  StyleSheet,
  SectionList,
  TouchableHighlight,
  Text,
  View,
  SafeAreaView,
} from 'react-native'

import JudoPay, {
  JudoTransactionType,
  JudoTransactionMode,
  JudoPaymentMethod,
  JudoCardNetwork
} from 'judo-react-native'
import configuration from '../../helpers/JudoDefaults';

export default class Home extends Component {

  state = {
    configuration: configuration,
    token: '<TOKEN>',
    secret: '<SECRET>',
    isSandboxed: true,
    spinner: false
  };

  componentDidMount() {
    store.subscribe(() => {
      this.getData()
    })
    this.getData()
  }

  async getData() {
    this.setState({ spinner: true })
    try {
      const value = await AsyncStorage.getItem(storageKey)
      if (value !== null) {
        const settings = JSON.parse(value)
        console.log("settings " + JSON.stringify(settings)) //TODO REMOVE
        var isSandboxed = this.state.isSandboxed
        var token = this.state.token
        var secret = this.state.secret
        var configuration = this.state.configuration
        isSandboxed = settings.list[0].data[0].value as boolean
        let tokenValue = settings.list[0].data[3].value as string
        if (tokenValue) {
          token = tokenValue
        }
        let secretValue = settings.list[0].data[4].value as string
        if (secretValue) {
          secret = secretValue
        }
        configuration.judoId = settings.list[0].data[1].value as string
        configuration.siteId = settings.list[0].data[2].value as string
        configuration.amount.value = settings.list[1].data[0].value as string
        configuration.amount.currency = settings.list[1].data[1].value as string

        configuration.paymentMethods = this.parsePaymentMethods(settings.list[2].data[1].valueArray)
        configuration.supportedCardNetworks = this.parseCardNetworks(settings.list[2].data[2].valueArray)
        this.setState({
          configuration: configuration,
          secret: secret,
          token: token,
          isSandbox: isSandboxed
        }, () => {
          this.setState({ spinner: false })
        })
      } else {
        this.setState({ spinner: false })
      }
    } catch(e) {
      console.log("getData() error " + e)
      this.setState({ spinner: false })
    }
  }

  parsePaymentMethods(values: Array<String>): JudoPaymentMethod {
    var paymentMethods = JudoPaymentMethod.All
    if (values.includes('CARD')) paymentMethods |= JudoPaymentMethod.Card
    if (values.includes('APPLE_PAY')) paymentMethods |= JudoPaymentMethod.ApplePay
    if (values.includes('GOOGLE_PAY')) paymentMethods |= JudoPaymentMethod.GooglePay
    if (values.includes('IDEAL')) paymentMethods |= JudoPaymentMethod.iDEAL
    return paymentMethods
  }

  parseCardNetworks(values: Array<String>): JudoCardNetwork {
    var cardNetworks = JudoCardNetwork.All
    if (values.includes('AMEX')) cardNetworks |= JudoCardNetwork.Amex
    if (values.includes('CHINA_UNION_PAY')) cardNetworks |= JudoCardNetwork.ChinaUnionPay
    if (values.includes('DINERS_CLUB')) cardNetworks |= JudoCardNetwork.DinersClub
    if (values.includes('DISCOVER')) cardNetworks |= JudoCardNetwork.Discover
    if (values.includes('JCB')) cardNetworks |= JudoCardNetwork.JCB
    if (values.includes('MAESTRO')) cardNetworks |= JudoCardNetwork.Maestro
    if (values.includes('MASTERCARD')) cardNetworks |= JudoCardNetwork.Mastercard
    if (values.includes('VISA')) cardNetworks |= JudoCardNetwork.Visa
    return cardNetworks
  }

  async invokePayment() {
    this.invokeTransaction(JudoTransactionType.Payment);
  }

  async invokePreAuth() {
    this.invokeTransaction(JudoTransactionType.PreAuth);
  }

  async invokeRegisterCard() {
    this.invokeTransaction(JudoTransactionType.RegisterCard);
  }

  async invokeCheckCard() {
    this.invokeTransaction(JudoTransactionType.CheckCard);
  }

  async invokeSaveCard() {
    this.invokeTransaction(JudoTransactionType.SaveCard);
  }

  async invokeApplePay() {
    this.displayApplePaySheet(JudoTransactionMode.Payment);
  }

  async invokeApplePreAuth() {
    this.displayApplePaySheet(JudoTransactionMode.PreAuth);
  }

  async invokeGooglePay() {
    this.displayGooglePaySheet(JudoTransactionMode.Payment);
  }

  async invokeGooglePreAuth() {
    this.displayGooglePaySheet(JudoTransactionMode.PreAuth);
  }

  async invokePaymentMethods() {
    this.displayPaymentMethod(JudoTransactionMode.Payment);
  }

  async invokePreAuthMethods() {
    this.displayPaymentMethod(JudoTransactionMode.PreAuth);
  }

  async invokeTransaction(type: JudoTransactionType) {
    try {
      const judo = new JudoPay(this.state.token, this.state.secret);
      judo.isSandboxed = this.state.isSandboxed
      const response = await judo.invokeTransaction(type, this.state.configuration);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  async displayApplePaySheet(mode: JudoTransactionMode) {
    try {
      const judo = new JudoPay(this.state.token, this.state.secret);
      judo.isSandboxed = this.state.isSandboxed
      const response = await judo.invokeApplePay(mode, this.state.configuration);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  async displayGooglePaySheet(mode: JudoTransactionMode) {
    try {
      const judo = new JudoPay(this.state.token, this.state.secret);
      judo.isSandboxed = this.state.isSandboxed
      const response = await judo.invokeGooglePay(mode, this.state.configuration);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  async displayPaymentMethod(mode: JudoTransactionMode) {
    try {
      const judo = new JudoPay(this.state.token, this.state.secret);
      judo.isSandboxed = this.state.isSandboxed
      const response = await judo.invokePaymentMethodScreen(mode, this.state.configuration);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  handleListItemPressed(item: HomeListItem) {
    {
      switch (item.type) {
        case HomeListType.Payment:
          this.invokePayment()
          break
        case HomeListType.PreAuth:
          this.invokePreAuth()
          break
        case HomeListType.RegisterCard:
          this.invokeRegisterCard()
          break
        case HomeListType.CheckCard:
          this.invokeCheckCard()
          break
        case HomeListType.SaveCard:
          this.invokeSaveCard()
          break
        case HomeListType.ApplePay:
          this.invokeApplePay()
          break
        case HomeListType.ApplePreAuth:
          this.invokeApplePreAuth()
          break
        case HomeListType.GooglePay:
          this.invokeGooglePay()
          break
        case HomeListType.GooglePreAuth:
          this.invokeGooglePreAuth()
          break
        case HomeListType.PaymentMethods:
          this.invokePaymentMethods()
          break
        case HomeListType.PreAuthMethods:
          this.invokePreAuthMethods()
          break
      }
    }
  }

  getListItem(item: HomeListItem) {
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={() => { this.handleListItemPressed(item) }}
      >
        <View style={styles.listItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
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
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
})

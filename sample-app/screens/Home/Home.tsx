
import React, { Component } from 'react'
import { store } from '../../helpers/AsyncStore'
import { HomeScreenData, getStoredData } from './HomeData'
import { HomeListItem, HomeListType } from './HomeProps'
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
  JudoTransactionMode
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
       this.getConfiguration()
    })
    this.getConfiguration()
  }

  componentWillUnmount() {
    store.dispatch({ type: '' })
  }

  async getConfiguration() {
    this.setState({ spinner: true })
    let configuration = await getStoredData(this.state)
    this.setState(configuration, () => {
      this.setState({ spinner: false })
    })
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

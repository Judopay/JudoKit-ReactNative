import React, { Component } from 'react'
import { HomeScreenData } from './HomeData'
import { HomeListItem, HomeListType } from './HomeProps'

import {
  StatusBar,
  StyleSheet,
  SectionList,
  TouchableHighlight,
  Text,
  View,
  SafeAreaView,
} from 'react-native'

import JudoPay, { JudoTransactionType, JudoTransactionMode } from 'judo-react-native'
import configuration from '../../helpers/JudoDefaults';

export default class Home extends Component {

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

  async invokePaymentMethods() {
    this.displayPaymentMethod(JudoTransactionMode.Payment);
  }

  async invokePreAuthMethods() {
    this.displayPaymentMethod(JudoTransactionMode.PreAuth);
  }

  async invokeTransaction(type: JudoTransactionType) {
    const judo = new JudoPay('token', 'secret');
    const response = await judo.invokeTransaction(type, configuration);
  }

  async displayPaymentMethod(mode: JudoTransactionMode) {
    const judo = new JudoPay('token', 'secret');
    const response = await judo.invokePaymentMethodScreen(mode, configuration);
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

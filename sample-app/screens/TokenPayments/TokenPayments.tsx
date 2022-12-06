import React, { Component } from 'react'
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import JudoPay, {
  JudoTransactionType,
  JudoTransactionMode,
} from 'judo-react-native'
import TokenPaymentsProps from './TokenPaymentsProps'
import { showMessage } from '../../helpers/utils'

interface State {
  cardToken: string | undefined
  securityCode: string | undefined
  cardholderName: string | undefined
  cardScheme: string | undefined
}

export default class TokenPayments extends Component<
  TokenPaymentsProps,
  State
> {
  state: State

  constructor(props: TokenPaymentsProps) {
    super(props)
    this.state = {
      cardToken: undefined,
      securityCode: '341',
      cardholderName: 'CHALLENGE',
      cardScheme: 'visa',
    }
    this.invokeSaveCard = this.invokeSaveCard.bind(this)
    this.completeTransaction = this.completeTransaction.bind(this)
  }

  async invokeSaveCard() {
    const { authorization, configuration, isSandboxed } =
      this.props.route.params

    try {
      const judo = new JudoPay(authorization)
      judo.isSandboxed = isSandboxed

      const response = await judo.invokeTransaction(
        JudoTransactionType.SaveCard,
        configuration,
      )

      this.setState({ ...this.state, ...(response.cardDetails || {}) })
    } catch (error) {
      let message = 'Unknown error'
      if (error instanceof Error) message = error.message
      await showMessage('Error', message)
    }
  }

  async completeTransaction(mode: JudoTransactionMode) {
    const { authorization, configuration, isSandboxed } =
      this.props.route.params

    try {
      const judo = new JudoPay(authorization)
      judo.isSandboxed = isSandboxed

      if (this.state.cardToken === undefined) return

      const response = await judo.performTokenTransaction(
        mode,
        configuration,
        this.state.cardToken || '',
        this.state.securityCode || '',
        this.state.cardholderName || '',
        this.state.cardScheme || '',
      )

      if (response != null) {
        this.props.navigation.navigate('Receipt', { receipt: response })
      }
    } catch (error) {
      let message = 'Unknown error'
      if (error instanceof Error) message = error.message
      await showMessage('Error', message)
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            Step 1: Perform a Save Card transaction to create a card token
          </Text>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.enabled]}
            onPress={this.invokeSaveCard}
          >
            <Text style={styles.buttonTitleStyle}>Save Card</Text>
          </TouchableOpacity>
          <Text style={[styles.textStyle, styles.spacer]}>
            Step 2: Complete the transaction with the stored card token
          </Text>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              this.state.cardToken === undefined
                ? styles.disabled
                : styles.enabled,
            ]}
            disabled={this.state.cardToken === undefined}
            onPress={() =>
              this.completeTransaction(JudoTransactionMode.Payment)
            }
          >
            <Text style={styles.buttonTitleStyle}>Token Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              this.state.cardToken === undefined
                ? styles.disabled
                : styles.enabled,
            ]}
            disabled={this.state.cardToken === undefined}
            onPress={() =>
              this.completeTransaction(JudoTransactionMode.PreAuth)
            }
          >
            <Text style={styles.buttonTitleStyle}>Token PreAuth</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'stretch',
    flex: 1,
  },
  textStyle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  buttonStyle: {
    marginTop: 15,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonTitleStyle: {
    color: '#fff',
    fontSize: 16,
  },
  spacer: {
    marginTop: 50,
  },
  disabled: {
    backgroundColor: '#aaa',
  },
  enabled: {
    backgroundColor: '#000',
  },
})

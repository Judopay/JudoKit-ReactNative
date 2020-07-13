import React, { Component } from 'react'
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { JudoTransactionType, JudoTransactionMode } from 'judo-react-native'
import TokenPaymentProps from './TokenPaymentsProps'
import JudoPay from 'judo-react-native'
import { showMessage } from '../../helpers/utils'

interface IState {
  cardToken: string | undefined;
}

export default class TokenPayments extends Component<
  TokenPaymentProps,
  IState,
> {
  state: IState

  constructor(props: TokenPaymentProps) {
    super(props)
    this.state = { cardToken: undefined }
    this.invokeSaveCard = this.invokeSaveCard.bind(this)
    this.completeTransaction = this.completeTransaction.bind(this)
  }

  async invokeSaveCard() {
    const { authorization, configuration } = this.props.route.params

    try {
      const judo = new JudoPay(authorization)

      const response = await judo.invokeTransaction(
        JudoTransactionType.SaveCard,
        configuration,
      )

      this.setState({ cardToken: response.cardDetails.cardToken })
    } catch (error) {
      showMessage(error.message)
    }
  }

  async completeTransaction(mode: JudoTransactionMode) {
    const { authorization, configuration } = this.props.route.params

    try {
      const judo = new JudoPay(authorization)

      if (this.state.cardToken == undefined) return

      const response = await judo.performTokenTransaction(
        mode,
        configuration,
        this.state.cardToken,
      )

      if (response != null) {
        this.props.navigation.navigate('Receipt', { receipt: response })
      }
    } catch (error) {
      showMessage(error.message)
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
              this.state.cardToken == undefined
                ? styles.disabled
                : styles.enabled,
            ]}
            disabled={this.state.cardToken == undefined}
            onPress={() =>
              this.completeTransaction(JudoTransactionMode.Payment)
            }
          >
            <Text style={styles.buttonTitleStyle}>Token Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              this.state.cardToken == undefined
                ? styles.disabled
                : styles.enabled,
            ]}
            disabled={this.state.cardToken == undefined}
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

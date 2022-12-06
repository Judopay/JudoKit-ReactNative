import React, { Component } from 'react'
import TransactionDetailsProps from './TransactionDetailsProps'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native'

interface State {
  receiptId: string | undefined
}

export default class TransactionDetails extends Component<
  TransactionDetailsProps,
  State
> {
  state: State

  constructor(props: TransactionDetailsProps) {
    super(props)
    this.state = { receiptId: undefined }
  }

  textInputDidChange(text: string) {
    this.setState({
      receiptId: text.length > 0 ? text : undefined,
    })
  }

  async getTransactionDetails() {
    // TODO: Add the transaction details functionality once it's implemented on Android
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <Text>Enter your Receipt ID in the field below:</Text>
        <TextInput
          placeholder="Ex: 638373033878224896"
          placeholderTextColor="#a0a0a0"
          onChangeText={text => this.textInputDidChange(text)}
          style={styles.textInput}
        />
        <TouchableHighlight
          disabled={this.state.receiptId === undefined}
          onPress={() => this.getTransactionDetails()}
          style={[
            styles.button,
            this.state.receiptId === undefined
              ? styles.disabled
              : styles.enabled,
          ]}
        >
          <Text style={styles.buttonText}>Get transaction details</Text>
        </TouchableHighlight>
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
  textInput: {
    marginTop: 10,
    borderColor: '#a0a0a0',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 200,
  },
  button: {
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  enabled: {
    backgroundColor: '#5623e4',
  },
  disabled: {
    backgroundColor: '#aaa',
  },
})

import React, { Component } from 'react'
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native'
import JudoPay from 'judo-react-native'

export default class PayByBankApp extends Component {
  constructor(props: any) {
    super(props)
    this.invokePayByBankApp = this.invokePayByBankApp.bind(this)
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
          <TouchableHighlight
            style={styles.pbbaButton}
            onPress={this.invokePayByBankApp}
          >
            <Text>Very custom PBBA Button</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  pbbaButton: {
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
})

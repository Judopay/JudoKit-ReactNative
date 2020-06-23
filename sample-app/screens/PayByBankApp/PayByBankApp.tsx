import React, { Component } from 'react'
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'
import JudoPay, { JudoPBBAButton } from 'judo-react-native'
import { isIos } from '../../helpers/utils'

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

  pbbaButton = () => {
    return isIos ? (
      <JudoPBBAButton />
    ) : (
      <Text
        style={{
          backgroundColor: 'orange',
          padding: 10,
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Very custom Android PBBA button
      </Text>
    )
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.pbbaButton}
            onPress={this.invokePayByBankApp}
          >
            {this.pbbaButton()}
          </TouchableOpacity>
        </View>
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
    width: 310,
  },
})

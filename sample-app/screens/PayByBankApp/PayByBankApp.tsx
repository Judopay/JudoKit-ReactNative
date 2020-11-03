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
import { TouchableOpacity as AndroidTouchableOpacity } from 'react-native-gesture-handler'
import PayByBankAppProps from "./PayByBankAppProps";

interface State {
  isBankingAppAvailable: boolean | undefined;
}

export default class PayByBankApp extends Component<PayByBankAppProps, State> {
  state: State

  constructor(props: any) {
    super(props)
    this.state = {isBankingAppAvailable: undefined}
    this.invokePayByBankApp = this.invokePayByBankApp.bind(this)
  }

  async componentDidMount() {
    const {authorization} = this.props.route.params
    const judo = new JudoPay(authorization)
    this.setState({isBankingAppAvailable: await judo.isBankingAppAvailable()})
  }

  async invokePayByBankApp() {
    const { authorization, configuration } = this.props.route.params

    try {
      const judo = new JudoPay(authorization)
      const response = await judo.invokePayByBankApp(configuration)
      if (!response) return

      this.props.navigation.pop()
    } catch (error) {
      console.log(error)
    }
  }

  pbbaButton() {
    return isIos ? (
      <TouchableOpacity
        style={styles.pbbaButton}
        onPress={this.invokePayByBankApp}
      >
        <JudoPBBAButton style={{ flex: 1 }} />
      </TouchableOpacity>
    ) : (
      <AndroidTouchableOpacity
        style={styles.pbbaButton}
        onPress={this.invokePayByBankApp}
      >
        <JudoPBBAButton style={{ flex: 1 }} />
      </AndroidTouchableOpacity>
    )
  }

  noBankApp() {
    return <Text style={styles.textStyle}>No banking app available</Text>
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>{this.state.isBankingAppAvailable ? this.pbbaButton() : this.noBankApp()}</View>
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
    width: isIos ? 310 : 200,
  },
  textStyle: {
    fontSize: 16,
    color: '#000',
  },
})

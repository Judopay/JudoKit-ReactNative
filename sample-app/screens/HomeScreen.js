// @flow
import React from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { showMessage } from "../utils";
import {
  RNJudo,
  type JudoOptions,
  type JudoApplePayOptions
} from "judo-react-native";

type Props = {};
type State = {
  canUseApplePay: boolean
};

const judoOptions: JudoOptions = {
  token: "<API_TOKEN>",
  secret: "<API_SECRET>",
  judoId: "<JUDO_ID>",
  isSandbox: true,
  amount: "0.01",
  currency: "GBP",
  consumerReference: "myCustomerReference"
};

const applePayOptions: JudoApplePayOptions = {
  merchantId: "<MERCHANT_ID>",
  countryCode: "GB",
  summaryLabel: "<MERCHANT_NAME>",
  isPayment: true
};

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Judopay Sample App"
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      canUseApplePay: false
    };
  }

  async componentDidMount() {
    if (Platform.OS === "ios") {
      const canUseApplePay = await RNJudo.canUseApplePay();
      this.setState({ canUseApplePay });
    }
  }

  async makePayment() {
    try {
      let response = await RNJudo.makePayment(judoOptions);
      if (response.result === "Success") {
        await showMessage(
          "Payment successful",
          `ReceiptId: ${response.receiptId}`
        );
      } else {
        await showMessage("Payment error", response.result);
      }
    } catch (e) {
      if (e.code === "JUDO_USER_CANCELLED") {
        // do nothing when the user cancels
        return;
      } else if (e.code === "JUDO_ERROR" && e.userInfo.result === "Declined") {
        await showMessage(
          "Payment failed",
          "Card declined. Please try again and make sure the card details are correct."
        );
      } else {
        let message =
          e.message ?? "Something went wrong. Please try again later.";
        await showMessage("Oops...", message);
      }
    }
  }

  async makePreAuth() {
    try {
      let response = await RNJudo.makePreAuth(judoOptions);
      if (response.result === "Success") {
        await showMessage(
          "Pre-auth successful",
          `ReceiptId: ${response.receiptId}`
        );
      } else {
        await showMessage("Pre-auth error", response.result);
      }
    } catch (e) {
      if (e.code === "JUDO_USER_CANCELLED") {
        // do nothing when the user cancels
        return;
      } else if (e.code === "JUDO_ERROR" && e.userInfo.result === "Declined") {
        await showMessage(
          "Pre-auth failed",
          "Card declined. Please try again and make sure the card details are correct."
        );
      } else {
        let message =
          e.message ?? "Something went wrong. Please try again later.";
        await showMessage("Oops...", message);
      }
    }
  }

  async makeApplePayPayment(isPayment: boolean = true) {
    const title = isPayment ? "Apple Pay payment" : "Apple Pay pre-auth";

    try {
      let response = await RNJudo.makeApplePayPayment(
        Object.assign({}, judoOptions, applePayOptions, { isPayment })
      );
      if (response.result === "Success") {
        await showMessage(
          `${title} successful`,
          `ReceiptId: ${response.receiptId}`
        );
      } else {
        await showMessage(`${title} error`, response.result);
      }
    } catch (e) {
      if (e.code === "JUDO_ERROR" && e.userInfo.result === "Declined") {
        await showMessage(
          `${title} failed`,
          "Card declined. Please try again and make sure the card details are correct."
        );
      } else {
        let message =
          e.message ?? "Something went wrong. Please try again later.";
        await showMessage("Oops...", message);
      }
    }
  }

  render() {
    const { canUseApplePay } = this.state;
    const isIos = Platform.OS === "ios";

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {`Welcome to the\nJudopay sample app!`}
        </Text>
        <View style={styles.buttons}>
          <Button title="Make payment" onPress={() => this.makePayment()} />
          <View style={styles.spacing} />
          <Button title="Make pre-auth" onPress={() => this.makePreAuth()} />
          <View style={styles.spacing} />
          {isIos ? (
            <Button
              disabled={!canUseApplePay}
              title="Make Apple Pay payment"
              onPress={() => this.makeApplePayPayment()}
            />
          ) : (
            <Button title="Make Google Pay payment" onPress={() => {}} />
          )}
          <View style={styles.spacing} />
          {isIos ? (
            <Button
              disabled={!canUseApplePay}
              title="Make Apple Pay pre-auth"
              onPress={() => this.makeApplePayPayment(false)}
            />
          ) : (
            <Button title="Make Google Pay pre-auth" onPress={() => {}} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 16
  },
  buttons: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  spacing: {
    height: 16
  }
});

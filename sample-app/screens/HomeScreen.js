// @flow

import React from "react";
import { Platform, StyleSheet, Button, Alert, Text, View } from "react-native";
import { showMessage } from "../utils";
import RNJudo from "judo-react-native";

type Props = {};

export default class HomeScreen extends React.Component<Props> {
  static navigationOptions = {
    title: "Judopay Sample App"
  };

  async makePayment() {
    const options = {
      token: "<API_TOKEN>",
      secret: "<API_SECRET>",
      judoId: "<JUDO_ID>",
      isSandbox: true,
      amount: "0.01",
      currency: "GBP",
      consumerReference: "myCustomerReference"
    };

    try {
      let response = await RNJudo.makePayment(options);
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {`Welcome to the\nJudopay sample app!`}
        </Text>
        <Button title="Make payment" onPress={() => this.makePayment()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 16
  }
});

// @flow
import { NativeModules } from "react-native";

const { RNJudo } = NativeModules;

export { RNJudo };

export type JudoOptions = {
  token: string,
  secret: string,
  judoId: string,
  isSandbox: boolean,
  amount: string,
  currency: string,
  consumerReference: string
};

export type JudoApplePayOptions = {
  merchantId: string,
  countryCode: string,
  summaryLabel: string,
  isPayment: boolean
};

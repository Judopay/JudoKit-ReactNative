// @flow
import React from "react";
import { NativeModules, requireNativeComponent } from "react-native";

type JudopayAPI = {
  makePayment(JudoConfig): Promise<?JudoResponse>,
  makePreAuth(JudoConfig): Promise<?JudoResponse>,
  canUseApplePay(): Promise<boolean>,
  makeApplePayPayment({|
    ...JudoConfig,
    ...JudoApplePayConfig
  |}): Promise<?JudoResponse>,
  canUseGooglePay(JudoGooglePayConfig): Promise<boolean>,
  makeGooglePayPayment({|
    ...JudoConfig,
    ...JudoGooglePayConfig
  |}): Promise<?JudoResponse>,
  showPaymentMethods({
    ...JudoConfig,
    ...JudoApplePayConfig,
    ...JudoGooglePayConfig,
    ...JudoPaymentMethodsConfig
  }): Promise<?JudoResponse>,
  makeIDEALPayment(JudoConfig): Promise<?JudoIDEALResponse>
};

export type JudoResponse = {
  receiptId: string,
  yourPaymentReference: string,
  type: string,
  createdAt: string,
  result: string,
  message?: string,
  judoId: string,
  merchantName: string,
  appearsOnStatementAs: string,
  originalAmount?: string,
  netAmount?: string,
  amount?: string,
  currency?: string,
  cardDetails?: any,
  consumer?: any,
  risks?: any,
  device?: any,
  paymentToken?: any
};

export type JudoIDEALResponse = {
  siteId: string,
  paymentMethod: string,
  merchantPaymentReference: string,
  merchantConsumerReference: string,
  orderDetails: JudoIDEALOrderDetails
};

export type JudoIDEALOrderDetails = {
  orderStatus: string,
  currency: string,
  orderId: string,
  timestamp: string,
  amount: number,
  refundedAmount: number,
  orderFailureReason?: string
};

const Judopay = (NativeModules.RNJudo: JudopayAPI);

const RNApplePayButton = requireNativeComponent("RNApplePayButton");
type JudoApplePayButtonProps = {
  isDark: boolean,
  onPayPress: () => any
};
const JudoApplePayButton = ({
  isDark,
  onPayPress,
  ...rest
}: JudoApplePayButtonProps) => (
  <RNApplePayButton isDark={isDark} onPayPress={onPayPress} {...rest} />
);

const RNGooglePayButton = requireNativeComponent("RNGooglePayButton");
type JudoGooglePayButtonProps = JudoApplePayButtonProps;
const JudoGooglePayButton = ({
  isDark, // not supported yet
  onPayPress,
  ...rest
}: JudoGooglePayButtonProps) => (
  <RNGooglePayButton isDark={isDark} onPayPress={onPayPress} {...rest} />
);

export { Judopay, JudoApplePayButton, JudoGooglePayButton };

export type JudoConfig = {|
  token: string,
  secret: string,
  judoId: string,
  isSandbox: boolean,
  amount: string,
  currency: string,
  consumerReference: string,
  paymentReference: string,
  metaData?: { [string]: string },
  theme?: JudoTheme
|};

// iOS only. On Android theming works by overriding style definitions
export type JudoTheme = {|
  tintColor?: ?number,
  avsEnabled?: boolean,
  showSecurityMessage?: boolean,
  paymentButtonTitle?: string,
  backButtonTitle?: string,
  paymentTitle?: string,
  loadingIndicatorProcessingTitle?: string,
  inputFieldHeight?: number,
  securityMessageString?: string,
  securityMessageTextSize?: number,
  textColor?: ?number,
  navigationBarTitleColor?: ?number,
  inputFieldTextColor?: ?number,
  contentViewBackgroundColor?: ?number,
  buttonColor?: ?number,
  buttonTitleColor?: ?number,
  loadingBackgroundColor?: ?number,
  errorColor?: ?number,
  loadingBlockViewColor?: ?number,
  inputFieldBackgroundColor?: ?number,
  buttonCornerRadius?: number,
  buttonHeight?: number,
  buttonSpacing?: number
|};

export const JudoTransactionType = {
  payment: 0,
  preAuth: 1
};

export const JudoPaymentMethods = {
  card: 1,
  applePay: 2,
  googlePay: 2,
  all: 3
};

export type JudoPaymentMethodsConfig = {|
  paymentMethods: 1 | 2 | 3 // JudoPaymentMethods
|};

export const JudoApplePayButtonStyle = {
  light: 0,
  dark: 1
};

export type JudoGooglePayConfig = {|
  googlePayTestEnvironment: boolean,
  transactionType: 0 | 1, // JudoTransactionType
  requireBillingDetails?: boolean,
  requireContactDetails?: boolean,
  requireShippingDetails?: boolean
|};

export const JudoPaymentSummaryItemType = {
  final: 0,
  pending: 1
};

export type JudoApplePayShippingMethod = {|
  identifier: string,
  detail: string,
  label: string,
  amount: string,
  paymentSummaryItemType: 0 | 1 // JudoPaymentSummaryItemType
|};

export const JudoPaymentShippingType = {
  shipping: 0,
  delivery: 1,
  storePickup: 2,
  servicePickup: 3
};

export type JudoApplePayConfig = {|
  merchantId: string,
  countryCode: string,
  transactionType: 0 | 1, // JudoTransactionType
  shippingType: 0 | 1 | 2 | 3, // JudoPaymentShippingType
  shippingMethods: [JudoApplePayShippingMethod] | [],
  requireBillingDetails?: boolean,
  requireShippingDetails?: boolean,
  summaryItems: [{| label: string, amount: string |}]
|};

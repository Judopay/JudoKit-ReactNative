// @flow
import React from "react";
import { NativeModules, requireNativeComponent } from "react-native";

interface JudopayAPI {
  makePayment(config: JudoConfig): Promise<JudoResponse | null>;
  makePreAuth(config: JudoConfig): Promise<JudoResponse | null>;
  canUseApplePay(): Promise<boolean>,
  makeApplePayPayment(config: JudoPaymentParams): Promise<JudoResponse | null>; //pass JudoConfig and JudoApplePayConfig objects
  canUseGooglePay(config: JudoGooglePayConfig): Promise<boolean>;
  makeGooglePayPayment(config: JudoPaymentParams): Promise<JudoResponse | null>; //pass JudoConfig and JudoGooglePayConfig objects
  showPaymentMethods(config: JudoPaymentParams): Promise<JudoResponse | null>; // pass JudoConfig, JudoApplePayConfig, JudoGooglePayConfig and JudoPaymentMethodsConfig objects
  makeIDEALPayment(config: JudoConfig): Promise<JudoIDEALResponse | null>;
};

export type JudoResponse = {
  receiptId: string,
  yourPaymentReference: string,
  type: string,
  createdAt: string,
  result: string,
  message?: string,
  judoId: string,
  siteId: string,
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
  orderId?: string,
  orderStatus?: string,
  orderFailureReason?: string,
  timestamp?: string
};

const Judopay = (NativeModules.RNJudo as JudopayAPI);

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

export interface JudoConfig {
  token: string,
  secret: string,
  judoId: string,
  siteId: string,
  isSandbox: boolean,
  amount: string,
  currency: string,
  consumerReference: string,
  paymentReference: string,
  metaData?: { [string: string]: string },
  theme?: JudoTheme
};

export interface JudoPaymentParams {
  judoConfig?: JudoConfig,
  judoApplePayConfig?: JudoApplePayConfig,
  judoGooglePayConfig?: JudoGooglePayConfig,
  judoPaymentMethodsConfig?: JudoPaymentMethodsConfig
}

// iOS only. On Android theming works by overriding style definitions
interface JudoTheme {
  tintColor?: number | null,
  avsEnabled?: boolean,
  showSecurityMessage?: boolean,
  paymentButtonTitle?: string,
  backButtonTitle?: string,
  paymentTitle?: string,
  loadingIndicatorProcessingTitle?: string,
  inputFieldHeight?: number,
  securityMessageString?: string,
  securityMessageTextSize?: number,
  textColor?: number | null,
  navigationBarTitleColor?: number | null,
  inputFieldTextColor?: number | null,
  contentViewBackgroundColor?: number | null,
  buttonColor?: number | null,
  buttonTitleColor?: number | null,
  loadingBackgroundColor?: number | null,
  errorColor?: number | null,
  loadingBlockViewColor?: number | null,
  inputFieldBackgroundColor?: number | null,
  buttonCornerRadius?: number,
  buttonHeight?: number,
  buttonSpacing?: number
};

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

interface JudoPaymentMethodsConfig {
  paymentMethods: 1 | 2 | 3 // JudoPaymentMethods
};

interface JudoApplePayButtonStyle {
  light: 0,
  dark: 1
};

export interface JudoGooglePayConfig {
  googlePayTestEnvironment: boolean,
  transactionType: 0 | 1, // JudoTransactionType
  requireBillingDetails?: boolean,
  requireContactDetails?: boolean,
  requireShippingDetails?: boolean
};

export const JudoPaymentSummaryItemType = {
  final: 0,
  pending: 1
};

interface JudoApplePayShippingMethod {
  identifier: string,
  detail: string,
  label: string,
  amount: string,
  paymentSummaryItemType: 0 | 1 // JudoPaymentSummaryItemType
};

export const JudoPaymentShippingType = {
  shipping: 0,
  delivery: 1,
  storePickup: 2,
  servicePickup: 3
};

export interface JudoApplePayConfig {
  merchantId: string,
  countryCode: string,
  transactionType: 0 | 1, // JudoTransactionType
  shippingType: 0 | 1 | 2 | 3, // JudoPaymentShippingType
  shippingMethods: [JudoApplePayShippingMethod] | [],
  requireBillingDetails?: boolean,
  requireShippingDetails?: boolean,
  summaryItems: [{ label: string, amount: string }]
};

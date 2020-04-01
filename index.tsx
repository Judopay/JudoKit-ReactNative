// @flow
import React from "react";
import {
  NativeModules,
  requireNativeComponent,
  StyleProp,
  ViewStyle
} from "react-native";

interface JudopayAPI {
  makePayment(config: JudoConfig): Promise<JudoResponse | null>;
  makePreAuth(config: JudoConfig): Promise<JudoResponse | null>;
  canUseApplePay(): Promise<boolean>,
  makeApplePayPayment(config: JudoPaymentParams): Promise<JudoResponse | null>;
  canUseGooglePay(config: JudoGooglePayConfig): Promise<boolean>;
  makeGooglePayPayment(config: JudoPaymentParams): Promise<JudoResponse | null>;
  showPaymentMethods(config: JudoPaymentParams): Promise<JudoResponse | null>;
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
  onPayPress: () => any,
  style: StyleProp<ViewStyle>
};
const JudoApplePayButton = ({
  isDark,
  onPayPress,
  style
}: JudoApplePayButtonProps) => (
  <RNApplePayButton isDark={isDark} onPayPress={onPayPress} style={style} />
);

const RNGooglePayButton = requireNativeComponent("RNGooglePayButton");
type JudoGooglePayButtonProps = JudoApplePayButtonProps;
const JudoGooglePayButton = ({
  isDark, // not supported yet
  onPayPress,
  style
}: JudoGooglePayButtonProps) => (
  <RNGooglePayButton isDark={isDark} onPayPress={onPayPress} style={style} />
);

export { Judopay, JudoApplePayButton, JudoGooglePayButton };

export interface JudoConfig {
  token: string;
  secret: string;
  judoId: string;
  siteId: string;
  isSandbox: boolean;
  amount: string;
  currency: string;
  consumerReference: string;
  paymentReference: string;
  metaData?: { [string: string]: string };
  theme?: JudoTheme;
};

export interface JudoPaymentParams {
  judoConfig: JudoConfig;
  judoApplePayConfig?: JudoApplePayConfig;
  judoGooglePayConfig?: JudoGooglePayConfig;
  judoPaymentMethodsConfig?: JudoPaymentMethodsConfig;
}

// iOS only. On Android theming works by overriding style definitions
interface JudoTheme {
  tintColor?: number | null;
  avsEnabled?: boolean;
  showSecurityMessage?: boolean;
  paymentButtonTitle?: string;
  backButtonTitle?: string;
  paymentTitle?: string;
  loadingIndicatorProcessingTitle?: string;
  inputFieldHeight?: number;
  securityMessageString?: string;
  securityMessageTextSize?: number;
  textColor?: number | null;
  navigationBarTitleColor?: number | null;
  inputFieldTextColor?: number | null;
  contentViewBackgroundColor?: number | null;
  buttonColor?: number | null;
  buttonTitleColor?: number | null;
  loadingBackgroundColor?: number | null;
  errorColor?: number | null;
  loadingBlockViewColor?: number | null;
  inputFieldBackgroundColor?: number | null;
  buttonCornerRadius?: number;
  buttonHeight?: number;
  buttonSpacing?: number;
};

export enum JudoTransactionType {
  Payment = 0,
  PreAuth = 1
};

export enum JudoPaymentMethods {
  Card = 1,
  ApplePay = 2,
  GooglePay = 2,
  All = 3
};

export interface JudoPaymentMethodsConfig {
  paymentMethods: JudoPaymentMethods;
};

interface JudoApplePayButtonStyle {
  light: 0;
  dark: 1;
};

export interface JudoGooglePayConfig {
  googlePayTestEnvironment: boolean;
  transactionType: JudoTransactionType;
  requireBillingDetails?: boolean;
  requireContactDetails?: boolean;
  requireShippingDetails?: boolean;
};

export enum JudoPaymentSummaryItemType {
  Final = 0,
  Pending = 1
};

interface JudoApplePayShippingMethod {
  identifier: string;
  detail: string;
  label: string;
  amount: string;
  paymentSummaryItemType: JudoPaymentSummaryItemType;
};

export enum JudoPaymentShippingType {
  Shipping = 0,
  Delivery = 1,
  StorePickup = 2,
  ServicePickup = 3
};

export interface JudoApplePayConfig {
  merchantId: string;
  countryCode: string;
  transactionType: JudoTransactionType;
  shippingType: JudoPaymentShippingType;
  shippingMethods: [JudoApplePayShippingMethod] | [];
  requireBillingDetails?: boolean;
  requireShippingDetails?: boolean;
  summaryItems: [{ label: string, amount: string }];
};

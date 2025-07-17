import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

type JudoAmount = {
  value: string;
  currency: string;
};

type JudoReference = {
  consumerReference: string;
  paymentReference?: string;
};

type JudoAddress = {
  line1?: string;
  line2?: string;
  line3?: string;
  postCode?: string;
  town?: string;
  countryCode?: number;
  state?: string;
};

type JudoAccountDetails = {
  name?: string;
  accountNumber?: string;
  dateOfBirth?: string;
  postCode?: string;
};

type JudoApplePayConfiguration = {
  paymentSummaryItems?: Array<{
    label: string;
    amount: string;
    type?: string;
  }>;
  merchantId: string;
  countryCode: string;
};

type JudoGooglePayConfiguration = {
  merchantId: string;
  environment: string;
};

type JudoRecommendationConfiguration = {
  url: string;
  rsaPublicKey: string;
  timeout?: number;
  haltTransactionInCaseOfAnyError?: boolean;
};

type NetworkTimeout = {
  connectTimeout?: number;
  readTimeout?: number;
  writeTimeout?: number;
};

type JudoAuthorization = {
  token: string,
  secret?: string,
  paymentSession?: string,
}

type JudoConfiguration = {
  judoId: string;
  amount: JudoAmount;
  reference: JudoReference;
  cardAddress?: JudoAddress;
  uiConfiguration?: JudoUIConfiguration;
  paymentMethods?: number;
  supportedCardNetworks?: number;
  primaryAccountDetails?: JudoAccountDetails;
  applePayConfiguration?: JudoApplePayConfiguration;
  googlePayConfiguration?: JudoGooglePayConfiguration;
  isInitialRecurringPayment?: boolean;
  networkTimeout?: NetworkTimeout;
  challengeRequestIndicator?: string;
  scaExemption?: string;
  mobileNumber?: string;
  phoneCountryCode?: string;
  emailAddress?: string;
  threeDSTwoMaxTimeout?: number;
  threeDSTwoMessageVersion?: string;
  isDelayedAuthorisation?: boolean;
  isAllowIncrement?: boolean;
  recommendationConfiguration?: JudoRecommendationConfiguration;
};

type JudoThreeDSToolbarCustomization = {
  backgroundColor?: string;
  headerText?: string;
  buttonText?: string;
  textFontName?: string;
  textColor?: string;
  textFontSize?: number;
};

type JudoThreeDSLabelCustomization = {
  headingTextFontName?: string;
  headingTextColor?: string;
  headingTextFontSize?: number;
  textFontName?: string;
  textColor?: string;
  textFontSize?: number;
};

type JudoThreeDSTextBoxCustomization = {
  borderWidth?: number;
  borderColor?: string;
  cornerRadius?: number;
  textFontName?: string;
  textColor?: string;
  textFontSize?: number;
};

type JudoThreeDSButtonCustomization = {
  backgroundColor?: string;
  cornerRadius?: number;
  textFontName?: string;
  textColor?: string;
  textFontSize?: number;
};

type JudoThreeDSUIConfiguration = {
  buttonCustomizations?: {
    SUBMIT?: JudoThreeDSButtonCustomization;
    CONTINUE?: JudoThreeDSButtonCustomization;
    NEXT?: JudoThreeDSButtonCustomization;
    CANCEL?: JudoThreeDSButtonCustomization;
    RESEND?: JudoThreeDSButtonCustomization;
  };
  toolbarCustomization?: JudoThreeDSToolbarCustomization;
  labelCustomization?: JudoThreeDSLabelCustomization;
  textBoxCustomization?: JudoThreeDSTextBoxCustomization;
};

type JudoTheme = {
  largeTitleFont: string;
  largeTitleSize: number;
  titleFont: string;
  titleSize: number;
  headlineFont: string;
  headlineSize: number;
  headlineLightFont: string;
  headlineLightSize: number;
  bodyFont: string;
  bodySize: number;
  bodyBoldFont: string;
  bodyBoldSize: number;
  captionFont: string;
  captionSize: number;
  captionBoldFont: string;
  captionBoldSize: number;
  jpBlackColor: string;
  jpDarkGrayColor: string;
  jpGrayColor: string;
  jpLightGrayColor: string;
  jpRedColor: string;
  jpWhiteColor: string;
  buttonColor: string;
  buttonTitleColor: string;
  backButtonImage: string;
  buttonCornerRadius: number;
};

type JudoUIConfiguration = {
  isAVSEnabled?: boolean;
  shouldPaymentMethodsDisplayAmount?: boolean;
  shouldPaymentButtonDisplayAmount?: boolean;
  shouldPaymentMethodsVerifySecurityCode?: boolean;
  shouldAskForBillingInformation?: boolean;
  theme?: JudoTheme;
  threeDSUIConfiguration?: JudoThreeDSUIConfiguration;
  shouldAskForCSC?: boolean;
  shouldAskForCardholderName?: boolean;
};

type JudoCardDetails = {
  cardLastFour?: string;
  cardToken?: string;
  cardNetwork?: number;
  cardHolderName?: string;
};

type JudoConsumer = {
  consumerReference?: string;
};

type JudoResponse = {
  receiptId?: string;
  yourPaymentReference?: string;
  type?: number;
  result?: number;
  message?: string;
  judoId?: string;
  merchantName?: string;
  amount?: string;
  currency?: string;
  cardDetails?: JudoCardDetails;
  consumerResponse?: JudoConsumer;
};

enum JudoTransactionType {
  Transaction = 0,
  ApplePay = 1,
  PaymentMethods = 2,
  TokenTransaction = 3,
}

export interface Spec extends TurboModule {

  invokeTransaction(params: {
    configuration: JudoConfiguration;
    transactionType: number;
    authorization: JudoAuthorization;
    sandboxed: boolean;
    packageVersion: string;
  }): Promise<JudoResponse>;

  // isApplePayAvailableWithConfiguration(configuration: JudoConfiguration): Promise<boolean>;

  // isApplePayAvailableWithConfiguration(configuration: UnsafeObject<JudoConfiguration>): Promise<boolean>;

  // fetchTransactionDetails(params: {
  //   authorization: { token: string; secret?: string; paymentSession?: string };
  //   sandboxed: boolean;
  //   receiptId: string;
  //   packageVersion: string;
  // }): Promise<JudoResponse>;

  // performTokenTransaction(params: {
  //   configuration: JudoConfiguration;
  //   transactionMode: number;
  //   authorization: { token: string; secret?: string; paymentSession?: string };
  //   sandboxed: boolean;
  //   cardToken: string;
  //   securityCode?: string;
  //   cardholderName?: string;
  //   cardScheme: string;
  //   packageVersion: string;
  // }): Promise<JudoResponse>;

  // invokeApplePay(params: {
  //   configuration: JudoConfiguration;
  //   transactionMode: number;
  //   authorization: { token: string; secret?: string; paymentSession?: string };
  //   sandboxed: boolean;
  //   packageVersion: string;
  // }): Promise<JudoResponse>;

  // invokeGooglePay(params: {
  //   configuration: JudoConfiguration;
  //   transactionMode: number;
  //   authorization: { token: string; secret?: string; paymentSession?: string };
  //   sandboxed: boolean;
  //   packageVersion: string;
  // }): Promise<JudoResponse>;

  // invokePaymentMethodScreen(params: {
  //   configuration: JudoConfiguration;
  //   transactionMode: number;
  //   authorization: { token: string; secret?: string; paymentSession?: string };
  //   sandboxed: boolean;
  //   packageVersion: string;
  // }): Promise<JudoResponse>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('JudoKitReactNative');
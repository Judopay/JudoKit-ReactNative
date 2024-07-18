import { JudoApplePayConfiguration } from './judo-apple-pay-configuration';
import { JudoGooglePayConfiguration } from './judo-google-pay-configuration';

export interface JudoConfiguration {
  judoId: string;
  amount: JudoAmount;
  reference: JudoReference;
  cardAddress?: JudoAddress;
  uiConfiguration?: JudoUIConfiguration;
  paymentMethods?: JudoPaymentMethod;
  supportedCardNetworks?: JudoCardNetwork;
  primaryAccountDetails?: JudoAccountDetails;
  applePayConfiguration?: JudoApplePayConfiguration;
  googlePayConfiguration?: JudoGooglePayConfiguration;
  isInitialRecurringPayment?: boolean;
  networkTimeout?: NetworkTimeout;
  challengeRequestIndicator?: ChallengeRequestIndicator;
  scaExemption?: ScaExemption;
  mobileNumber?: string;
  phoneCountryCode?: string;
  emailAddress?: string;
  threeDSTwoMaxTimeout?: number;
  threeDSTwoMessageVersion?: string;
  isDelayedAuthorisation?: boolean;
  isAllowIncrement?: boolean;
  recommendationConfiguration?: JudoRecommendationConfiguration;
}

export interface JudoRecommendationConfiguration {
  url: string;
  rsaPublicKey: string;
  timeout?: number;
  haltTransactionInCaseOfAnyError?: boolean;
}

export enum ChallengeRequestIndicator {
  NoPreference = 'noPreference',
  NoChallenge = 'noChallenge',
  ChallengePreferred = 'challengePreferred',
  ChallengeAsMandate = 'challengeAsMandate',
}

export enum ScaExemption {
  LowValue = 'lowValue',
  SecureCorporate = 'secureCorporate',
  TrustedBeneficiary = 'trustedBeneficiary',
  TransactionRiskAnalysis = 'transactionRiskAnalysis',
}

export interface NetworkTimeout {
  connectTimeout?: number;
  readTimeout?: number;
  writeTimeout?: number;
}

export enum JudoTransactionType {
  Payment = 1,
  PreAuth = 2,
  /**
   * @deprecated Register Card functionality has been deprecated and will be
   * removed in a future version. Please use Check Card feature instead.
   */
  RegisterCard = 3,
  CheckCard = 4,
  SaveCard = 5,
  Unknown = -1,
}

export enum JudoTransactionMode {
  Payment,
  PreAuth,
  ServerToServer,
}

export enum JudoTransactionResult {
  Error,
  Success,
  Declined,
  Unknown = -1,
}

export interface JudoAmount {
  value: string;
  currency: string;
}

export interface JudoReference {
  consumerReference: string;
  paymentReference?: string;
  metadata?: Record<string, string>;
}

export interface JudoAddress {
  line1?: string;
  line2?: string;
  line3?: string;
  postCode?: string;
  town?: string;
  countryCode?: number;
  state?: string;
}

export interface JudoThreeDSToolbarCustomization {
  backgroundColor?: string;
  headerText?: string;
  buttonText?: string;
  textFontName?: string;
  textColor?: string;
  textFontSize?: number;
}

export interface JudoThreeDSLabelCustomization {
  headingTextFontName?: string;
  headingTextColor?: string;
  headingTextFontSize?: number;
  textFontName?: string;
  textColor?: string;
  textFontSize?: number;
}

export interface JudoThreeDSTextBoxCustomization {
  borderWidth?: number;
  borderColor?: string;
  cornerRadius?: number;
  textFontName?: string;
  textColor?: string;
  textFontSize?: number;
}

export enum JudoThreeDSButtonType {
  SUBMIT = 'SUBMIT',
  CONTINUE = 'CONTINUE',
  NEXT = 'NEXT',
  CANCEL = 'CANCEL',
  RESEND = 'RESEND',
}

export interface JudoThreeDSButtonCustomization {
  backgroundColor?: string;
  cornerRadius?: number;
  textFontName?: string;
  textColor?: string;
  textFontSize?: number;
}

export interface JudoThreeDSUIConfiguration {
  buttonCustomizations?: Partial<
    Record<JudoThreeDSButtonType, JudoThreeDSButtonCustomization>
  >;
  toolbarCustomization?: JudoThreeDSToolbarCustomization;
  labelCustomization?: JudoThreeDSLabelCustomization;
  textBoxCustomization?: JudoThreeDSTextBoxCustomization;
}

export interface JudoUIConfiguration {
  isAVSEnabled?: boolean;
  shouldPaymentMethodsDisplayAmount?: boolean;
  shouldPaymentButtonDisplayAmount?: boolean;
  /**
   * @deprecated This export is deprecated. Please use `shouldAskForCSC` instead.
   */
  shouldPaymentMethodsVerifySecurityCode?: boolean;
  shouldAskForBillingInformation?: boolean;
  theme?: JudoTheme;
  threeDSUIConfiguration?: JudoThreeDSUIConfiguration;
  shouldAskForCSC?: boolean;
  shouldAskForCardholderName?: boolean;
}

export interface JudoTheme {
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
}

export enum JudoPaymentMethod {
  Card = 1 << 0,
  ApplePay = 1 << 1,
  GooglePay = 1 << 2,
  iDEAL = 1 << 3,
  All = 1 << 5,
}

export enum JudoCardNetwork {
  Visa = 1 << 0,
  Mastercard = 1 << 1,
  Maestro = 1 << 2,
  Amex = 1 << 3,
  ChinaUnionPay = 1 << 4,
  JCB = 1 << 5,
  Discover = 1 << 6,
  DinersClub = 1 << 7,
  All = 1 << 8,
}

export interface JudoAccountDetails {
  name?: string;
  accountNumber?: string;
  dateOfBirth?: string;
  postCode?: string;
}

export interface JudoCardDetails {
  cardLastFour?: string;
  endDate?: string;
  cardToken?: string;
  cardNetwork?: JudoCardNetwork;
  bank?: string;
  cardCategory?: string;
  cardCountry?: string;
  cardFunding?: string;
  cardScheme?: string;
  cardHolderName?: string;
}

export interface JudoConsumer {
  consumerReference?: string;
  /**
   * @deprecated Consumer Token is deprecated and will be removed in a future version.
   */
  consumerToken?: string;
}

export interface JudoResponse {
  receiptId?: string;
  yourPaymentReference?: string;
  type?: JudoTransactionType;
  createdAt?: string;
  result?: JudoTransactionResult;
  message?: string;
  judoId?: string;
  merchantName?: string;
  appearsOnStatementAs?: string;
  originalAmount?: string;
  netAmount?: string;
  amount?: string;
  currency?: string;
  cardDetails?: JudoCardDetails;
  consumerResponse?: JudoConsumer;
}

export interface JudoAuthorization {
  token: string;
  /**
   * @deprecated This authentication method is deprecated, please use payment session instead.
   */
  secret?: string;
  paymentSession?: string;
}

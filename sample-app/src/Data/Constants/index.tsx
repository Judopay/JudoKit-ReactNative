import { DemoFeature, DemoFeatureType, SettingsData } from '../TypeDefinitions'
import { Platform, SectionListData } from 'react-native'

export const STORAGE_SETTINGS_KEY = '@storage_settings_key'

export const DEFAULT_SETTINGS_DATA: SettingsData = {
  apiConfiguration: {
    isSandboxed: true,
    judoId: '',
  },
  authorization: {
    isUsingPaymentSession: false,
    isUsingTokenAndSecret: false,
    token: '',
    secret: '',
    paymentSession: '',
  },
  reference: {
    consumerReference: '',
    paymentReference: '',
  },
  others: {
    isAddressVerificationServiceOn: false,
    isAmountLabelInPaymentMethodsOn: true,
    isAmountLabelInPaymentButtonOn: false,
    isSecurityCodeOn: true,
    isInitialRecurringPaymentOn: false,
    isDelayedAuthorisationOn: false,
  },
  amount: {
    currency: 'GBP',
    value: '0.15',
  },
  paymentMethods: {
    isCardOn: true,
    isiDealOn: true,
    isApplePayOn: false,
    isGooglePayOn: false,
    isPayByBankAppOn: false,
  },
  supportedCardNetworks: {
    isVisaOn: true,
    isMastercardOn: true,
    isAmexOn: true,
    isMaestroOn: false,
    isChinaUnionPayOn: false,
    isJCBOn: true,
    isDiscoverOn: true,
    isDinersClubOn: false,
  },
  networkTimeouts: {
    connectTimeout: '',
    readTimeout: '',
    writeTimeout: '',
  },
  cardAddress: {
    isEnabled: true,
    line1: 'My house',
    line2: 'My street',
    line3: 'My area',
    town: 'My town',
    postCode: 'TR14 8PA',
    countryCode: '826',
    state: '',
    phoneCountryCode: '44',
    mobileNumber: '0799999999',
    emailAddress: 'email@address.com',
  },
  primaryAccountDetails: {
    isEnabled: false,
    name: 'test-account-name',
    accountNumber: '4015434234',
    dateOfBirth: '1970-10-11',
    postCode: 'EC2A',
  },
  applePay: {
    merchantId: '',
    requiredBillingContactFields: {
      isPostalAddressOn: false,
      isPhoneOn: false,
      isEmailOn: false,
      isNameOn: false,
    },
    requiredShippingContactFields: {
      isPostalAddressOn: false,
      isPhoneOn: false,
      isEmailOn: false,
      isNameOn: false,
    },
    returnedContactInfo: {
      isBillingContactsOn: false,
      isShippingContactsOn: false,
    },
  },
  googlePay: {
    isProductionEnvironmentOn: false,
    merchantName: '',
    countryCode: 'GB',
    billingAddressFields: 'NONE',
    isBillingAddressPhoneNumberOn: false,
    isShippingAddressOn: false,
    shippingAddressAllowedCountries: 'GB, US',
    isShippingAddressPhoneNumberOn: false,
    isEmailAddressOn: false,
    allowPrepaidCards: true,
    allowCreditCards: true,
    transactionId: '',
    totalPriceStatus: 'FINAL',
    totalPriceLabel: '',
    checkoutOption: 'DEFAULT',
  },
  threeDSTwo: {
    isBillingInformationScreenEnabled: false,
    challengeRequestIndicator: 'dontSet',
    SCAExemption: 'dontSet',
    maxTimeout: '30',
    protocolMessageVersion: '',
    uiCustomization: {
      isEnabled: false,
      toolbarCustomization: {
        textFontName: 'Helvetica',
        textColor: '#FFFFFF',
        textFontSize: '16',
        backgroundColor: '#6A4EE1',
        headerText: 'SECURE CHECKOUT',
        buttonText: 'Cancel',
      },
      labelCustomization: {
        textFontName: 'Helvetica',
        textColor: '#262626',
        textFontSize: '16',
        headingTextFontName: 'Helvetica',
        headingTextColor: '#262626',
        headingTextFontSize: '24',
      },
      textBoxCustomization: {
        textFontName: 'Helvetica',
        textColor: '#262626',
        textFontSize: '16',
        borderWidth: '0',
        borderColor: '#F6F6F6',
        cornerRadius: '6',
      },
      submitButtonCustomization: {
        textFontName: 'Helvetica',
        textColor: '#FFFFFF',
        textFontSize: '16',
        backgroundColor: '#262626',
        cornerRadius: '4',
      },
      nextButtonCustomization: {
        textFontName: 'Helvetica',
        textColor: '#FFFFFF',
        textFontSize: '16',
        backgroundColor: '#262626',
        cornerRadius: '4',
      },
      continueButtonCustomization: {
        textFontName: 'Helvetica',
        textColor: '#FFFFFF',
        textFontSize: '16',
        backgroundColor: '#262626',
        cornerRadius: '4',
      },
      cancelButtonCustomization: {
        textFontName: 'Helvetica',
        textColor: '#FFFFFF',
        textFontSize: '16',
        backgroundColor: '#262626',
        cornerRadius: '4',
      },
      resendButtonCustomization: {
        textFontName: 'Helvetica',
        textColor: '#FFFFFF',
        textFontSize: '16',
        backgroundColor: '#262626',
        cornerRadius: '4',
      },
    },
  },
}

export const CURRENCY_OPTIONS = [
  {
    id: 'GBP',
    title: 'British pound (GBP)',
  },
  {
    id: 'USD',
    title: 'United States dollar (USD)',
  },
  {
    id: 'EUR',
    title: 'Euro (EUR)',
  },
  {
    id: 'AUD',
    title: 'Australian dollar (AUD)',
  },
  {
    id: 'SEK',
    title: 'Swedish krona (SEK)',
  },
  {
    id: 'CAD',
    title: 'Canadian dollar (CAD)',
  },
  {
    id: 'NOK',
    title: 'Norwegian krone (NOK)',
  },
  {
    id: 'BRL',
    title: 'Brazilian real (BRL)',
  },
  {
    id: 'CHF',
    title: 'Swiss franc (CHF)',
  },
  {
    id: 'CZK',
    title: 'Czech koruna (CZK)',
  },
  {
    id: 'DKK',
    title: 'Danish krone (DKK)',
  },
  {
    id: 'HKD',
    title: 'Hong Kong dollar (HKD)',
  },
  {
    id: 'HUF',
    title: 'Hungarian forint (HUF)',
  },
  {
    id: 'JPY',
    title: 'Japanese yen (JPY)',
  },
  {
    id: 'NZD',
    title: 'New Zealand dollar (NZD)',
  },
  {
    id: 'PLN',
    title: 'Polish złoty (PLN)',
  },
  {
    id: 'ZAR',
    title: 'South African rand (ZAR)',
  },
  {
    id: 'ARS',
    title: 'Argentine peso (ARS)',
  },
  {
    id: 'BHD',
    title: 'Bahraini dinar (BHD)',
  },
  {
    id: 'MMK',
    title: 'Burmese kyat (MMK)',
  },
  {
    id: 'KYD',
    title: 'Cayman Islands dollar (KYD)',
  },
  {
    id: 'CLP',
    title: 'Chilean peso (CLP)',
  },
  {
    id: 'CNY',
    title: 'Chinese yuan (CNY)',
  },
  {
    id: 'COP',
    title: 'Colombian peso (COP)',
  },
  {
    id: 'ISK',
    title: 'Icelandic króna (ISK)',
  },
  {
    id: 'INR',
    title: 'Indian rupee (INR)',
  },
  {
    id: 'IDR',
    title: 'Indonesian rupiah (IDR)',
  },
  {
    id: 'JOD',
    title: 'Jordanian dinar (JOD)',
  },
  {
    id: 'KWD',
    title: 'Kuwaiti dinar (KWD)',
  },
  {
    id: 'OMR',
    title: 'Omani rial (OMR)',
  },
  {
    id: 'NGN',
    title: 'Nigerian naira (NGN)',
  },
  {
    id: 'PKR',
    title: 'Pakistani rupee (PKR)',
  },
  {
    id: 'NIO',
    title: 'Nicaraguan córdoba (NIO)',
  },
  {
    id: 'PAB',
    title: 'Panamanian balboa (PAB)',
  },
  {
    id: 'PHP',
    title: 'Philippine peso (PHP)',
  },
  {
    id: 'QAR',
    title: 'Qatari riyal (QAR)',
  },
  {
    id: 'RUB',
    title: 'Russian ruble (RUB)',
  },
  {
    id: 'SAR',
    title: 'Saudi riyal (SAR)',
  },
  {
    id: 'SGD',
    title: 'Singapore dollar (SGD)',
  },
  {
    id: 'VND',
    title: 'Vietnamese đồng (VND)',
  },
  {
    id: 'AED',
    title: 'United Arab Emirates dirham (AED)',
  },
  {
    id: 'RSD',
    title: 'Serbian dinar (RSD)',
  },
  {
    id: 'RON',
    title: 'Romanian leu (RON)',
  },
  {
    id: 'MXN',
    title: 'Mexican peso (MXN)',
  },
  {
    id: 'UAH',
    title: 'Ukrainian hryvnia (UAH)',
  },
]

export const CHALLENGE_REQUEST_INDICATOR_OPTIONS = [
  {
    id: 'dontSet',
    title: "Don't set",
  },
  {
    id: 'noPreference',
    title: 'No preference',
  },
  {
    id: 'noChallenge',
    title: 'No challenge',
  },
  {
    id: 'challengePreferred',
    title: 'Challenge preferred',
  },
  {
    id: 'challengeAsMandate',
    title: 'Challenge as mandate',
  },
]

export const SCA_EXEMPTION_OPTIONS = [
  {
    id: 'dontSet',
    title: "Don't set",
  },
  {
    id: 'lowValue',
    title: 'Low value',
  },
  {
    id: 'secureCorporate',
    title: 'Secure corporate',
  },
  {
    id: 'trustedBeneficiary',
    title: 'Trusted beneficiary',
  },
  {
    id: 'transactionRiskAnalysis',
    title: 'Transaction risk analysis',
  },
]

export const GOOGLE_PAY_BILLING_ADDRESS_FIELD_OPTIONS = [
  {
    id: 'NONE',
    title: 'Not required',
  },
  {
    id: 'MIN',
    title: 'MIN: Name, country code, and postal code.',
  },
  {
    id: 'FULL',
    title:
      'FULL: Name, street address, locality, region, country code, and postal code.',
  },
]

export const GOOGLE_PAY_PRICE_STATUS_OPTIONS = [
  {
    id: 'FINAL',
    title: 'Final',
  },
  {
    id: 'ESTIMATED',
    title: 'Estimated',
  },
  {
    id: 'NOT_CURRENTLY_KNOWN',
    title: 'Not currently known',
  },
]

export const GOOGLE_PAY_CHECKOUT_OPTION_OPTIONS = [
  {
    id: 'DEFAULT',
    title: 'Default',
  },
  {
    id: 'COMPLETE_IMMEDIATE_PURCHASE',
    title: 'Complete immediate purchase',
  },
]

export const IS_IOS = Platform.OS === 'ios'
export const IS_ANDROID = Platform.OS === 'android'

const FEATURES_DATA: ReadonlyArray<DemoFeature> = [
  {
    type: DemoFeatureType.PAYMENT,
    title: 'Pay with card',
    details: 'by entering card details',
  },
  {
    type: DemoFeatureType.PRE_AUTH,
    title: 'Pre-auth with card',
    details: 'by entering card details',
  },
  {
    type: DemoFeatureType.CREATE_CARD_TOKEN,
    title: 'Register card',
    details: 'to be stored for future transactions',
  },
  {
    type: DemoFeatureType.CHECK_CARD,
    title: 'Check card',
    details: 'to validate a card',
  },
  {
    type: DemoFeatureType.SAVE_CARD,
    title: 'Save card',
    details: 'to be stored for future transactions',
  },
  {
    type: IS_IOS
      ? DemoFeatureType.APPLE_PAY_PAYMENT
      : DemoFeatureType.GOOGLE_PAY_PAYMENT,
    title: IS_IOS ? 'Apple Pay payment' : 'Google Pay payment',
    details: 'with a wallet card',
  },
  {
    type: IS_IOS
      ? DemoFeatureType.APPLE_PAY_PRE_AUTH
      : DemoFeatureType.GOOGLE_PAY_PRE_AUTH,
    title: IS_IOS ? 'Apple Pay preAuth' : 'Google Pay preAuth',
    details: 'with a wallet card',
  },
  {
    type: DemoFeatureType.PAYMENT_METHODS,
    title: 'Payment methods',
    details: 'with default payment methods',
  },
  {
    type: DemoFeatureType.PRE_AUTH_METHODS,
    title: 'PreAuth methods',
    details: 'with default pre-auth methods',
  },
  {
    type: DemoFeatureType.SERVER_TO_SERVER,
    title: 'Server-to-Server payment methods',
    details: 'with default Server-to-Server payment methods',
  },
  {
    type: DemoFeatureType.PAY_BY_BANK_APP,
    title: 'Pay By Bank',
    details: 'by using your existing Bank app',
  },
  {
    type: DemoFeatureType.TOKEN_PAYMENTS,
    title: 'Token Payments',
    details: 'Token Payments (no UI)',
  },
  // TODO: uncomment when implementation is in place
  // {
  //   type: DemoFeatureType.NO_UI_PAYMENTS,
  //   title: 'No UI Payments',
  //   details: 'Custom UI payments (no UI)',
  // },
  {
    type: DemoFeatureType.GET_TRANSACTION_DETAILS,
    title: 'Get Transaction',
    details: 'Get Transaction for Receipt ID',
  },
]

export const FEATURES: ReadonlyArray<SectionListData<DemoFeature>> = [
  {
    header: 'FEATURES',
    footer:
      'To view test card details:\nSign in to judo and go to Developer/Tools.',
    data: FEATURES_DATA,
  },
]

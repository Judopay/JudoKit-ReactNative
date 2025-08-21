import { DemoFeature, DemoFeatureType } from '../TypeDefinitions';
import { Platform, SectionListData } from 'react-native';

export const IS_STORAGE_INITIATED_WITH_DEFAULTS_KEY =
  'is_storage_initiated_with_defaults_key';

// API Configuration keys
export const API_CONFIGURATION_KEYS = {
  IS_SANDBOXED: 'apiConfiguration.isSandboxed',
  JUDO_ID: 'apiConfiguration.judoId',
} as const;

// Authorization keys
export const AUTHORIZATION_KEYS = {
  IS_USING_PAYMENT_SESSION: 'authorization.isUsingPaymentSession',
  IS_USING_TOKEN_AND_SECRET: 'authorization.isUsingTokenAndSecret',
  TOKEN: 'authorization.token',
  SECRET: 'authorization.secret',
  PAYMENT_SESSION: 'authorization.paymentSession',
} as const;

// Reference keys
export const REFERENCE_KEYS = {
  CONSUMER_REFERENCE: 'reference.consumerReference',
  PAYMENT_REFERENCE: 'reference.paymentReference',
} as const;

// Others keys
export const OTHERS_KEYS = {
  IS_ADDRESS_VERIFICATION_SERVICE_ON: 'others.isAddressVerificationServiceOn',
  IS_AMOUNT_LABEL_IN_PAYMENT_METHODS_ON:
    'others.isAmountLabelInPaymentMethodsOn',
  IS_AMOUNT_LABEL_IN_PAYMENT_BUTTON_ON: 'others.isAmountLabelInPaymentButtonOn',
  IS_SECURITY_CODE_ON: 'others.isSecurityCodeOn',
  IS_INITIAL_RECURRING_PAYMENT_ON: 'others.isInitialRecurringPaymentOn',
  IS_DELAYED_AUTHORISATION_ON: 'others.isDelayedAuthorisationOn',
  IS_ALLOW_INCREMENT_ON: 'others.isAllowIncrementOn',
} as const;

// Amount keys
export const AMOUNT_KEYS = {
  CURRENCY: 'amount.currency',
  VALUE: 'amount.value',
} as const;

// Payment Methods keys
export const PAYMENT_METHODS_KEYS = {
  IS_CARD_ON: 'paymentMethods.isCardOn',
  IS_APPLE_PAY_ON: 'paymentMethods.isApplePayOn',
  IS_GOOGLE_PAY_ON: 'paymentMethods.isGooglePayOn',
} as const;

// Supported Card Networks keys
export const SUPPORTED_CARD_NETWORKS_KEYS = {
  IS_VISA_ON: 'supportedCardNetworks.isVisaOn',
  IS_MASTERCARD_ON: 'supportedCardNetworks.isMastercardOn',
  IS_AMEX_ON: 'supportedCardNetworks.isAmexOn',
  IS_MAESTRO_ON: 'supportedCardNetworks.isMaestroOn',
  IS_CHINA_UNION_PAY_ON: 'supportedCardNetworks.isChinaUnionPayOn',
  IS_JCB_ON: 'supportedCardNetworks.isJCBOn',
  IS_DISCOVER_ON: 'supportedCardNetworks.isDiscoverOn',
  IS_DINERS_CLUB_ON: 'supportedCardNetworks.isDinersClubOn',
} as const;

// Network Timeouts keys
export const NETWORK_TIMEOUTS_KEYS = {
  CONNECT_TIMEOUT: 'networkTimeouts.connectTimeout',
  READ_TIMEOUT: 'networkTimeouts.readTimeout',
  WRITE_TIMEOUT: 'networkTimeouts.writeTimeout',
} as const;

// Card Address keys
export const CARD_ADDRESS_KEYS = {
  IS_ENABLED: 'cardAddress.isEnabled',
  LINE1: 'cardAddress.line1',
  LINE2: 'cardAddress.line2',
  LINE3: 'cardAddress.line3',
  TOWN: 'cardAddress.town',
  POST_CODE: 'cardAddress.postCode',
  COUNTRY_CODE: 'cardAddress.countryCode',
  STATE: 'cardAddress.state',
  PHONE_COUNTRY_CODE: 'cardAddress.phoneCountryCode',
  MOBILE_NUMBER: 'cardAddress.mobileNumber',
  EMAIL_ADDRESS: 'cardAddress.emailAddress',
} as const;

// Primary Account Details keys
export const PRIMARY_ACCOUNT_DETAILS_KEYS = {
  IS_ENABLED: 'primaryAccountDetails.isEnabled',
  NAME: 'primaryAccountDetails.name',
  ACCOUNT_NUMBER: 'primaryAccountDetails.accountNumber',
  DATE_OF_BIRTH: 'primaryAccountDetails.dateOfBirth',
  POST_CODE: 'primaryAccountDetails.postCode',
} as const;

// Apple Pay keys
export const APPLE_PAY_KEYS = {
  MERCHANT_ID: 'applePay.merchantId',
  REQUIRED_BILLING_CONTACT_FIELDS: {
    IS_POSTAL_ADDRESS_ON:
      'applePay.requiredBillingContactFields.isPostalAddressOn',
    IS_PHONE_ON: 'applePay.requiredBillingContactFields.isPhoneOn',
    IS_EMAIL_ON: 'applePay.requiredBillingContactFields.isEmailOn',
    IS_NAME_ON: 'applePay.requiredBillingContactFields.isNameOn',
  },
  REQUIRED_SHIPPING_CONTACT_FIELDS: {
    IS_POSTAL_ADDRESS_ON:
      'applePay.requiredShippingContactFields.isPostalAddressOn',
    IS_PHONE_ON: 'applePay.requiredShippingContactFields.isPhoneOn',
    IS_EMAIL_ON: 'applePay.requiredShippingContactFields.isEmailOn',
    IS_NAME_ON: 'applePay.requiredShippingContactFields.isNameOn',
  },
  RETURNED_CONTACT_INFO: {
    IS_BILLING_CONTACTS_ON: 'applePay.returnedContactInfo.isBillingContactsOn',
    IS_SHIPPING_CONTACTS_ON:
      'applePay.returnedContactInfo.isShippingContactsOn',
  },
  RECURRING_PAYMENT_REQUEST: {
    IS_ON: 'applePay.recurringPaymentRequest.isOn',
    PAYMENT_DESCRIPTION: 'applePay.recurringPaymentRequest.paymentDescription',
    MANAGEMENT_URL: 'applePay.recurringPaymentRequest.managementURL',
    REGULAR_BILLING: {
      IS_ON: 'applePay.recurringPaymentRequest.regularBilling.isOn',
      LABEL: 'applePay.recurringPaymentRequest.regularBilling.label',
      AMOUNT: 'applePay.recurringPaymentRequest.regularBilling.amount',
      START_DATE: 'applePay.recurringPaymentRequest.regularBilling.startDate',
      END_DATE: 'applePay.recurringPaymentRequest.regularBilling.endDate',
      INTERVAL_UNIT:
        'applePay.recurringPaymentRequest.regularBilling.intervalUnit',
      INTERVAL_COUNT:
        'applePay.recurringPaymentRequest.regularBilling.intervalCount',
    },
    BILLING_AGREEMENT: 'applePay.recurringPaymentRequest.billingAgreement',
  },
} as const;

// Google Pay keys
export const GOOGLE_PAY_KEYS = {
  IS_PRODUCTION_ENVIRONMENT_ON: 'googlePay.isProductionEnvironmentOn',
  MERCHANT_NAME: 'googlePay.merchantName',
  COUNTRY_CODE: 'googlePay.countryCode',
  BILLING_ADDRESS_FIELDS: 'googlePay.billingAddressFields',
  IS_BILLING_ADDRESS_PHONE_NUMBER_ON: 'googlePay.isBillingAddressPhoneNumberOn',
  IS_SHIPPING_ADDRESS_ON: 'googlePay.isShippingAddressOn',
  SHIPPING_ADDRESS_ALLOWED_COUNTRIES:
    'googlePay.shippingAddressAllowedCountries',
  IS_SHIPPING_ADDRESS_PHONE_NUMBER_ON:
    'googlePay.isShippingAddressPhoneNumberOn',
  IS_EMAIL_ADDRESS_ON: 'googlePay.isEmailAddressOn',
  ALLOW_PREPAID_CARDS: 'googlePay.allowPrepaidCards',
  ALLOW_CREDIT_CARDS: 'googlePay.allowCreditCards',
  TRANSACTION_ID: 'googlePay.transactionId',
  TOTAL_PRICE_STATUS: 'googlePay.totalPriceStatus',
  TOTAL_PRICE_LABEL: 'googlePay.totalPriceLabel',
  CHECKOUT_OPTION: 'googlePay.checkoutOption',
} as const;

// 3DS Two keys
export const THREE_DS_TWO_KEYS = {
  IS_BILLING_INFORMATION_SCREEN_ENABLED:
    'threeDSTwo.isBillingInformationScreenEnabled',
  CHALLENGE_REQUEST_INDICATOR: 'threeDSTwo.challengeRequestIndicator',
  SCA_EXEMPTION: 'threeDSTwo.SCAExemption',
  MAX_TIMEOUT: 'threeDSTwo.maxTimeout',
  PROTOCOL_MESSAGE_VERSION: 'threeDSTwo.protocolMessageVersion',
  UI_CUSTOMIZATION: {
    IS_ENABLED: 'threeDSTwo.uiCustomization.isEnabled',
    TOOLBAR_CUSTOMIZATION: {
      TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.toolbarCustomization.textFontName',
      TEXT_COLOR: 'threeDSTwo.uiCustomization.toolbarCustomization.textColor',
      TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.toolbarCustomization.textFontSize',
      BACKGROUND_COLOR:
        'threeDSTwo.uiCustomization.toolbarCustomization.backgroundColor',
      HEADER_TEXT: 'threeDSTwo.uiCustomization.toolbarCustomization.headerText',
      BUTTON_TEXT: 'threeDSTwo.uiCustomization.toolbarCustomization.buttonText',
    },
    LABEL_CUSTOMIZATION: {
      TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.labelCustomization.textFontName',
      TEXT_COLOR: 'threeDSTwo.uiCustomization.labelCustomization.textColor',
      TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.labelCustomization.textFontSize',
      HEADING_TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.labelCustomization.headingTextFontName',
      HEADING_TEXT_COLOR:
        'threeDSTwo.uiCustomization.labelCustomization.headingTextColor',
      HEADING_TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.labelCustomization.headingTextFontSiz',
    },
    TEXT_BOX_CUSTOMIZATION: {
      TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.textBoxCustomization.textFontName',
      TEXT_COLOR: 'threeDSTwo.uiCustomization.textBoxCustomization.textColor',
      TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.textBoxCustomization.textFontSize',
      BORDER_WIDTH:
        'threeDSTwo.uiCustomization.textBoxCustomization.borderWidth',
      BORDER_COLOR:
        'threeDSTwo.uiCustomization.textBoxCustomization.borderColor',
      CORNER_RADIUS:
        'threeDSTwo.uiCustomization.textBoxCustomization.cornerRadius',
    },
    SUBMIT_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.submitButtonCustomization.textFontName',
      TEXT_COLOR:
        'threeDSTwo.uiCustomization.submitButtonCustomization.textColor',
      TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.submitButtonCustomization.textFontSize',
      BACKGROUND_COLOR:
        'threeDSTwo.uiCustomization.submitButtonCustomization.backgroundColor',
      CORNER_RADIUS:
        'threeDSTwo.uiCustomization.submitButtonCustomization.cornerRadius',
    },
    NEXT_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.nextButtonCustomization.textFontName',
      TEXT_COLOR:
        'threeDSTwo.uiCustomization.nextButtonCustomization.textColor',
      TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.nextButtonCustomization.textFontSize',
      BACKGROUND_COLOR:
        'threeDSTwo.uiCustomization.nextButtonCustomization.backgroundColor',
      CORNER_RADIUS:
        'threeDSTwo.uiCustomization.nextButtonCustomization.cornerRadius',
    },
    CONTINUE_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.continueButtonCustomization.textFontName',
      TEXT_COLOR:
        'threeDSTwo.uiCustomization.continueButtonCustomization.textColor',
      TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.continueButtonCustomization.textFontSize',
      BACKGROUND_COLOR:
        'threeDSTwo.uiCustomization.continueButtonCustomization.backgroundColor',
      CORNER_RADIUS:
        'threeDSTwo.uiCustomization.continueButtonCustomization.cornerRadius',
    },
    CANCEL_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.cancelButtonCustomization.textFontName',
      TEXT_COLOR:
        'threeDSTwo.uiCustomization.cancelButtonCustomization.textColor',
      TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.cancelButtonCustomization.textFontSize',
      BACKGROUND_COLOR:
        'threeDSTwo.uiCustomization.cancelButtonCustomization.backgroundColor',
      CORNER_RADIUS:
        'threeDSTwo.uiCustomization.cancelButtonCustomization.cornerRadius',
    },
    RESEND_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME:
        'threeDSTwo.uiCustomization.resendButtonCustomization.textFontName',
      TEXT_COLOR:
        'threeDSTwo.uiCustomization.resendButtonCustomization.textColor',
      TEXT_FONT_SIZE:
        'threeDSTwo.uiCustomization.resendButtonCustomization.textFontSize',
      BACKGROUND_COLOR:
        'threeDSTwo.uiCustomization.resendButtonCustomization.backgroundColor',
      CORNER_RADIUS:
        'threeDSTwo.uiCustomization.resendButtonCustomization.cornerRadius',
    },
  },
} as const;

// Token Payments keys
export const TOKEN_PAYMENTS_KEYS = {
  SHOULD_ASK_FOR_CSC: 'tokenPayments.shouldAskForCSC',
  SHOULD_ASK_FOR_CARDHOLDER_NAME: 'tokenPayments.shouldAskForCardholderName',
} as const;

// Recommendation keys
export const RECOMMENDATION_KEYS = {
  IS_ON: 'recommendation.isOn',
  URL: 'recommendation.url',
  RSA_PUBLIC_KEY: 'recommendation.rsaPublicKey',
  TIMEOUT: 'recommendation.timeout',
  HALT_TRANSACTION_IN_CASE_OF_ANY_ERROR:
    'recommendation.haltTransactionInCaseOfAnyError',
} as const;

export const DEFAULT_SETTINGS_DATA: Record<string, string | boolean> = {
  [IS_STORAGE_INITIATED_WITH_DEFAULTS_KEY]: true,

  // apiConfiguration
  [API_CONFIGURATION_KEYS.IS_SANDBOXED]: true,
  [API_CONFIGURATION_KEYS.JUDO_ID]: '',

  // authorization
  [AUTHORIZATION_KEYS.IS_USING_PAYMENT_SESSION]: false,
  [AUTHORIZATION_KEYS.IS_USING_TOKEN_AND_SECRET]: false,
  [AUTHORIZATION_KEYS.TOKEN]: '',
  [AUTHORIZATION_KEYS.SECRET]: '',
  [AUTHORIZATION_KEYS.PAYMENT_SESSION]: '',

  // reference
  [REFERENCE_KEYS.CONSUMER_REFERENCE]: '',
  [REFERENCE_KEYS.PAYMENT_REFERENCE]: '',

  // others
  [OTHERS_KEYS.IS_ADDRESS_VERIFICATION_SERVICE_ON]: false,
  [OTHERS_KEYS.IS_AMOUNT_LABEL_IN_PAYMENT_METHODS_ON]: true,
  [OTHERS_KEYS.IS_AMOUNT_LABEL_IN_PAYMENT_BUTTON_ON]: false,
  [OTHERS_KEYS.IS_SECURITY_CODE_ON]: true,
  [OTHERS_KEYS.IS_INITIAL_RECURRING_PAYMENT_ON]: false,
  [OTHERS_KEYS.IS_DELAYED_AUTHORISATION_ON]: false,
  [OTHERS_KEYS.IS_ALLOW_INCREMENT_ON]: false,

  // amount
  [AMOUNT_KEYS.CURRENCY]: 'GBP',
  [AMOUNT_KEYS.VALUE]: '0.15',

  // paymentMethods
  [PAYMENT_METHODS_KEYS.IS_CARD_ON]: true,
  [PAYMENT_METHODS_KEYS.IS_APPLE_PAY_ON]: false,
  [PAYMENT_METHODS_KEYS.IS_GOOGLE_PAY_ON]: false,

  // supportedCardNetworks
  [SUPPORTED_CARD_NETWORKS_KEYS.IS_VISA_ON]: true,
  [SUPPORTED_CARD_NETWORKS_KEYS.IS_MASTERCARD_ON]: true,
  [SUPPORTED_CARD_NETWORKS_KEYS.IS_AMEX_ON]: true,
  [SUPPORTED_CARD_NETWORKS_KEYS.IS_MAESTRO_ON]: false,
  [SUPPORTED_CARD_NETWORKS_KEYS.IS_CHINA_UNION_PAY_ON]: false,
  [SUPPORTED_CARD_NETWORKS_KEYS.IS_JCB_ON]: false,
  [SUPPORTED_CARD_NETWORKS_KEYS.IS_DISCOVER_ON]: false,
  [SUPPORTED_CARD_NETWORKS_KEYS.IS_DINERS_CLUB_ON]: false,

  // networkTimeouts
  [NETWORK_TIMEOUTS_KEYS.CONNECT_TIMEOUT]: '',
  [NETWORK_TIMEOUTS_KEYS.READ_TIMEOUT]: '',
  [NETWORK_TIMEOUTS_KEYS.WRITE_TIMEOUT]: '',

  // cardAddress
  [CARD_ADDRESS_KEYS.IS_ENABLED]: false,
  [CARD_ADDRESS_KEYS.LINE1]: 'My house',
  [CARD_ADDRESS_KEYS.LINE2]: 'My street',
  [CARD_ADDRESS_KEYS.LINE3]: 'My area',
  [CARD_ADDRESS_KEYS.TOWN]: 'My town',
  [CARD_ADDRESS_KEYS.POST_CODE]: 'TR14 8PA',
  [CARD_ADDRESS_KEYS.COUNTRY_CODE]: '826',
  [CARD_ADDRESS_KEYS.STATE]: '',
  [CARD_ADDRESS_KEYS.PHONE_COUNTRY_CODE]: '44',
  [CARD_ADDRESS_KEYS.MOBILE_NUMBER]: '0799999999',
  [CARD_ADDRESS_KEYS.EMAIL_ADDRESS]: 'email@address.com',

  // primaryAccountDetails
  [PRIMARY_ACCOUNT_DETAILS_KEYS.IS_ENABLED]: false,
  [PRIMARY_ACCOUNT_DETAILS_KEYS.NAME]: 'test-account-name',
  [PRIMARY_ACCOUNT_DETAILS_KEYS.ACCOUNT_NUMBER]: '4015434234',
  [PRIMARY_ACCOUNT_DETAILS_KEYS.DATE_OF_BIRTH]: '1970-10-11',
  [PRIMARY_ACCOUNT_DETAILS_KEYS.POST_CODE]: 'EC2A',

  // applePay
  [APPLE_PAY_KEYS.MERCHANT_ID]: '',

  [APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS.IS_POSTAL_ADDRESS_ON]: false,
  [APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS.IS_PHONE_ON]: false,
  [APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS.IS_EMAIL_ON]: false,
  [APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS.IS_NAME_ON]: false,

  [APPLE_PAY_KEYS.REQUIRED_SHIPPING_CONTACT_FIELDS.IS_POSTAL_ADDRESS_ON]: false,
  [APPLE_PAY_KEYS.REQUIRED_SHIPPING_CONTACT_FIELDS.IS_PHONE_ON]: false,
  [APPLE_PAY_KEYS.REQUIRED_SHIPPING_CONTACT_FIELDS.IS_EMAIL_ON]: false,
  [APPLE_PAY_KEYS.REQUIRED_SHIPPING_CONTACT_FIELDS.IS_NAME_ON]: false,

  [APPLE_PAY_KEYS.RETURNED_CONTACT_INFO.IS_BILLING_CONTACTS_ON]: false,
  [APPLE_PAY_KEYS.RETURNED_CONTACT_INFO.IS_SHIPPING_CONTACTS_ON]: false,

  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.IS_ON]: false,
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.PAYMENT_DESCRIPTION]: '',
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.MANAGEMENT_URL]: '',

  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.IS_ON]: false,
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.LABEL]: '',
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.AMOUNT]: '',
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.START_DATE]: '',
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.END_DATE]: '',
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.INTERVAL_UNIT]: '',
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.INTERVAL_COUNT]: '',
  [APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.BILLING_AGREEMENT]: '',

  // googlePay
  [GOOGLE_PAY_KEYS.IS_PRODUCTION_ENVIRONMENT_ON]: false,
  [GOOGLE_PAY_KEYS.MERCHANT_NAME]: '',
  [GOOGLE_PAY_KEYS.COUNTRY_CODE]: 'GB',
  [GOOGLE_PAY_KEYS.BILLING_ADDRESS_FIELDS]: 'NONE',
  [GOOGLE_PAY_KEYS.IS_BILLING_ADDRESS_PHONE_NUMBER_ON]: false,
  [GOOGLE_PAY_KEYS.IS_SHIPPING_ADDRESS_ON]: false,
  [GOOGLE_PAY_KEYS.SHIPPING_ADDRESS_ALLOWED_COUNTRIES]: 'GB, US',
  [GOOGLE_PAY_KEYS.IS_SHIPPING_ADDRESS_PHONE_NUMBER_ON]: false,
  [GOOGLE_PAY_KEYS.IS_EMAIL_ADDRESS_ON]: false,
  [GOOGLE_PAY_KEYS.ALLOW_PREPAID_CARDS]: true,
  [GOOGLE_PAY_KEYS.ALLOW_CREDIT_CARDS]: true,
  [GOOGLE_PAY_KEYS.TRANSACTION_ID]: '',
  [GOOGLE_PAY_KEYS.TOTAL_PRICE_STATUS]: 'FINAL',
  [GOOGLE_PAY_KEYS.TOTAL_PRICE_LABEL]: '',
  [GOOGLE_PAY_KEYS.CHECKOUT_OPTION]: 'DEFAULT',

  [THREE_DS_TWO_KEYS.IS_BILLING_INFORMATION_SCREEN_ENABLED]: false,
  [THREE_DS_TWO_KEYS.CHALLENGE_REQUEST_INDICATOR]: 'dontSet',
  [THREE_DS_TWO_KEYS.SCA_EXEMPTION]: 'dontSet',
  [THREE_DS_TWO_KEYS.MAX_TIMEOUT]: '30',
  [THREE_DS_TWO_KEYS.PROTOCOL_MESSAGE_VERSION]: '',

  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.IS_ENABLED]: false,
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.TEXT_FONT_NAME]:
    'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.TEXT_COLOR]:
    '#FFFFFF',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.TEXT_FONT_SIZE]:
    '16',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.BACKGROUND_COLOR]:
    '#6A4EE1',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.HEADER_TEXT]:
    'SECURE CHECKOUT',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.BUTTON_TEXT]:
    'Cancel',

  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION.TEXT_FONT_NAME]:
    'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION.TEXT_COLOR]:
    '#262626',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION.TEXT_FONT_SIZE]: '16',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
    .HEADING_TEXT_FONT_NAME]: 'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION.HEADING_TEXT_COLOR]:
    '#262626',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
    .HEADING_TEXT_FONT_SIZE]: '24',

  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.TEXT_FONT_NAME]:
    'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.TEXT_COLOR]:
    '#262626',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.TEXT_FONT_SIZE]:
    '16',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.BORDER_WIDTH]: '0',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.BORDER_COLOR]:
    '#F6F6F6',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.CORNER_RADIUS]:
    '6',

  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
    .TEXT_FONT_NAME]: 'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION.TEXT_COLOR]:
    '#FFFFFF',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
    .TEXT_FONT_SIZE]: '16',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
    .BACKGROUND_COLOR]: '#262626',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
    .CORNER_RADIUS]: '4',

  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION.TEXT_FONT_NAME]:
    'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION.TEXT_COLOR]:
    '#FFFFFF',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION.TEXT_FONT_SIZE]:
    '16',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION
    .BACKGROUND_COLOR]: '#262626',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION.CORNER_RADIUS]:
    '4',

  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
    .TEXT_FONT_NAME]: 'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION.TEXT_COLOR]:
    '#FFFFFF',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
    .TEXT_FONT_SIZE]: '16',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
    .BACKGROUND_COLOR]: '#262626',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
    .CORNER_RADIUS]: '4',

  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
    .TEXT_FONT_NAME]: 'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION.TEXT_COLOR]:
    '#FFFFFF',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
    .TEXT_FONT_SIZE]: '16',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
    .BACKGROUND_COLOR]: '#262626',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
    .CORNER_RADIUS]: '4',

  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
    .TEXT_FONT_NAME]: 'Helvetica',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION.TEXT_COLOR]:
    '#FFFFFF',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
    .TEXT_FONT_SIZE]: '16',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
    .BACKGROUND_COLOR]: '#262626',
  [THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
    .CORNER_RADIUS]: '4',

  // tokenPayments
  [TOKEN_PAYMENTS_KEYS.SHOULD_ASK_FOR_CSC]: false,
  [TOKEN_PAYMENTS_KEYS.SHOULD_ASK_FOR_CARDHOLDER_NAME]: false,

  // recommendation
  [RECOMMENDATION_KEYS.IS_ON]: false,
  [RECOMMENDATION_KEYS.URL]: '',
  [RECOMMENDATION_KEYS.RSA_PUBLIC_KEY]: '',
  [RECOMMENDATION_KEYS.TIMEOUT]: '',
  [RECOMMENDATION_KEYS.HALT_TRANSACTION_IN_CASE_OF_ANY_ERROR]: false,
};

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
];

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
];

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
];

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
];

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
];

export const GOOGLE_PAY_CHECKOUT_OPTION_OPTIONS = [
  {
    id: 'DEFAULT',
    title: 'Default',
  },
  {
    id: 'COMPLETE_IMMEDIATE_PURCHASE',
    title: 'Complete immediate purchase',
  },
];

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

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
    type: DemoFeatureType.TOKEN_PAYMENTS,
    title: 'Token Payments',
    details: 'Token Payments (no UI)',
  },
  // TODO: uncomment when implementation is in place
  // {
  //   type: DemoFeatureType.NO_UI_PAYMENTS,
  //   title: "No UI Payments",
  //   details: "Custom UI payments (no UI)",
  // },
  {
    type: DemoFeatureType.GET_TRANSACTION_DETAILS,
    title: 'Get Transaction',
    details: 'Get Transaction for Receipt ID',
  },
];

export const FEATURES: ReadonlyArray<SectionListData<DemoFeature>> = [
  {
    header: 'FEATURES',
    footer:
      'To view test card details:\nSign in to judo and go to Developer/Tools.',
    data: FEATURES_DATA,
  },
];

export const INTERVAL_UNIT_OPTIONS = [
  {
    title: 'Year',
    id: 'year',
  },
  {
    title: 'Month',
    id: 'month',
  },
  {
    title: 'Day',
    id: 'day',
  },
  {
    title: 'Hour',
    id: 'hour',
  },
  {
    title: 'Minute',
    id: 'minute',
  },
];

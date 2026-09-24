import { DemoFeature, DemoFeatureType } from '../TypeDefinitions';
import { Platform, SectionListData } from 'react-native';

export const IS_STORAGE_INITIATED_WITH_DEFAULTS_KEY =
  'is_storage_initiated_with_defaults_key';

export const SETTINGS_IMPORT_REVISION_KEY = 'settings_import_revision';

// API Configuration keys
export const API_CONFIGURATION_KEYS = {
  IS_SANDBOXED: 'is_sandboxed',
  JUDO_ID: 'judo_id',
} as const;

// Authorization keys
export const AUTHORIZATION_KEYS = {
  IS_USING_PAYMENT_SESSION: 'is_payment_session_enabled',
  IS_USING_TOKEN_AND_SECRET: 'is_using_token_and_secret',
  TOKEN: 'token',
  SECRET: 'secret',
  PAYMENT_SESSION: 'payment_session',
} as const;

// Reference keys
export const REFERENCE_KEYS = {
  CONSUMER_REFERENCE: 'consumer_reference',
  PAYMENT_REFERENCE: 'payment_reference',
} as const;

// Others keys
export const OTHERS_KEYS = {
  IS_ADDRESS_VERIFICATION_SERVICE_ON: 'is_avs_enabled',
  IS_AMOUNT_LABEL_IN_PAYMENT_METHODS_ON:
    'should_payment_methods_display_amount',
  IS_AMOUNT_LABEL_IN_PAYMENT_BUTTON_ON: 'should_payment_button_display_amount',
  IS_SECURITY_CODE_ON: 'should_payment_methods_verify_security_code',
  IS_INITIAL_RECURRING_PAYMENT_ON: 'is_initial_recurring_payment',
  IS_DELAYED_AUTHORISATION_ON: 'is_delayed_authorisation_on',
  IS_ALLOW_INCREMENT_ON: 'is_allow_increment_on',
} as const;

// Amount keys
export const AMOUNT_KEYS = {
  CURRENCY: 'currency',
  VALUE: 'amount',
} as const;

// Payment Methods keys
export const PAYMENT_METHODS_KEYS = {
  IS_CARD_ON: 'is_card_on',
  IS_APPLE_PAY_ON: 'is_apple_pay_on',
  IS_GOOGLE_PAY_ON: 'is_google_pay_on',
} as const;

// Supported Card Networks keys
export const SUPPORTED_CARD_NETWORKS_KEYS = {
  IS_VISA_ON: 'is_visa_on',
  IS_MASTERCARD_ON: 'is_mastercard_on',
  IS_AMEX_ON: 'is_amex_on',
  IS_MAESTRO_ON: 'is_maestro_on',
  IS_CHINA_UNION_PAY_ON: 'is_china_union_pay_on',
  IS_JCB_ON: 'is_jcb_on',
  IS_DISCOVER_ON: 'is_discover_on',
  IS_DINERS_CLUB_ON: 'is_diners_club_on',
} as const;

// Network Timeouts keys
export const NETWORK_TIMEOUTS_KEYS = {
  CONNECT_TIMEOUT: 'connect_timeout',
  READ_TIMEOUT: 'read_timeout',
  WRITE_TIMEOUT: 'write_timeout',
} as const;

// Card Address keys
export const CARD_ADDRESS_KEYS = {
  IS_ENABLED: 'is_address_enabled',
  LINE1: 'address_line_1',
  LINE2: 'address_line_2',
  LINE3: 'address_line_3',
  TOWN: 'address_town',
  POST_CODE: 'address_post_code',
  COUNTRY_CODE: 'address_country_code',
  STATE: 'address_administrative_division',
  PHONE_COUNTRY_CODE: 'address_phone_country_code',
  MOBILE_NUMBER: 'address_mobile_number',
  EMAIL_ADDRESS: 'address_email_address',
} as const;

// Primary Account Details keys
export const PRIMARY_ACCOUNT_DETAILS_KEYS = {
  IS_ENABLED: 'is_primary_account_details_enabled',
  NAME: 'primary_account_name',
  ACCOUNT_NUMBER: 'primary_account_account_number',
  DATE_OF_BIRTH: 'primary_account_date_of_birth',
  POST_CODE: 'primary_account_post_code',
} as const;

// Apple Pay keys
export const APPLE_PAY_KEYS = {
  MERCHANT_ID: 'apple_pay_merchant_id',
  REQUIRED_BILLING_CONTACT_FIELDS: {
    IS_POSTAL_ADDRESS_ON: 'is_billing_contact_field_postal_address_required',
    IS_PHONE_ON: 'is_billing_contact_field_phone_required',
    IS_EMAIL_ON: 'is_billing_contact_field_email_required',
    IS_NAME_ON: 'is_billing_contact_field_name_required',
  },
  REQUIRED_SHIPPING_CONTACT_FIELDS: {
    IS_POSTAL_ADDRESS_ON: 'is_shipping_contact_field_postal_address_required',
    IS_PHONE_ON: 'is_shipping_contact_field_phone_required',
    IS_EMAIL_ON: 'is_shipping_contact_field_email_required',
    IS_NAME_ON: 'is_shipping_contact_field_name_required',
  },
  RETURNED_CONTACT_INFO: {
    IS_BILLING_CONTACTS_ON: 'is_apple_pay_billing_contact_info_required',
    IS_SHIPPING_CONTACTS_ON: 'is_apple_pay_shipping_contact_info_required',
  },
  RECURRING_PAYMENT_REQUEST: {
    IS_ON: 'is_recurring_payment_enabled',
    PAYMENT_DESCRIPTION: 'recurring_payment_description',
    MANAGEMENT_URL: 'recurring_payment_management_url',
    REGULAR_BILLING: {
      IS_ON: 'is_recurring_payment_regular_billing_on',
      LABEL: 'recurring_payment_label',
      AMOUNT: 'recurring_payment_amount',
      START_DATE: 'recurring_payment_start_date',
      END_DATE: 'recurring_payment_end_date',
      INTERVAL_UNIT: 'recurring_payment_interval_unit',
      INTERVAL_COUNT: 'recurring_payment_interval_count',
    },
    BILLING_AGREEMENT: 'recurring_payment_billing_agreement',
  },
} as const;

// Google Pay keys
export const GOOGLE_PAY_KEYS = {
  IS_PRODUCTION_ENVIRONMENT_ON: 'is_google_pay_production_environment',
  MERCHANT_NAME: 'google_pay_merchant_name',
  COUNTRY_CODE: 'google_pay_country_code',
  BILLING_ADDRESS_FIELDS: 'billing_address',
  IS_BILLING_ADDRESS_PHONE_NUMBER_ON:
    'is_billing_address_phone_number_required',
  IS_SHIPPING_ADDRESS_ON: 'is_shipping_address_required',
  SHIPPING_ADDRESS_ALLOWED_COUNTRIES:
    'google_pay_shipping_address_allowed_countries',
  IS_SHIPPING_ADDRESS_PHONE_NUMBER_ON:
    'is_shipping_address_phone_number_required',
  IS_EMAIL_ADDRESS_ON: 'is_email_address_required',
  ALLOW_PREPAID_CARDS: 'allow_prepaid_cards',
  ALLOW_CREDIT_CARDS: 'allow_credit_cards',
  TRANSACTION_ID: 'google_pay_transaction_id',
  TOTAL_PRICE_STATUS: 'google_pay_total_price_status',
  TOTAL_PRICE_LABEL: 'google_pay_total_price_label',
  CHECKOUT_OPTION: 'google_pay_checkout_option',
} as const;

// 3DS Two keys
export const THREE_DS_TWO_KEYS = {
  IS_BILLING_INFORMATION_SCREEN_ENABLED: 'should_ask_for_billing_information',
  CHALLENGE_REQUEST_INDICATOR: 'challenge_request_indicator',
  SCA_EXEMPTION: 'sca_exemption',
  MAX_TIMEOUT: 'three_ds_two_max_timeout',
  PROTOCOL_MESSAGE_VERSION: 'three_ds_two_message_version',
  UI_CUSTOMIZATION: {
    IS_ENABLED: 'three_ds_is_ui_customisation_enabled',
    TOOLBAR_CUSTOMIZATION: {
      TEXT_FONT_NAME: 'three_ds_toolbar_text_font_name',
      TEXT_COLOR: 'three_ds_toolbar_text_color',
      TEXT_FONT_SIZE: 'three_ds_toolbar_text_font_size',
      BACKGROUND_COLOR: 'three_ds_toolbar_background_color',
      HEADER_TEXT: 'three_ds_toolbar_header_text',
      BUTTON_TEXT: 'three_ds_toolbar_button_text',
    },
    LABEL_CUSTOMIZATION: {
      TEXT_FONT_NAME: 'three_ds_label_text_font_name',
      TEXT_COLOR: 'three_ds_label_text_color',
      TEXT_FONT_SIZE: 'three_ds_label_text_font_size',
      HEADING_TEXT_FONT_NAME: 'three_ds_label_heading_text_font_name',
      HEADING_TEXT_COLOR: 'three_ds_label_heading_text_color',
      HEADING_TEXT_FONT_SIZE: 'three_ds_label_heading_text_font_size',
    },
    TEXT_BOX_CUSTOMIZATION: {
      TEXT_FONT_NAME: 'three_ds_text_box_text_font_name',
      TEXT_COLOR: 'three_ds_text_box_text_color',
      TEXT_FONT_SIZE: 'three_ds_text_box_text_font_size',
      BORDER_WIDTH: 'three_ds_text_box_border_width',
      BORDER_COLOR: 'three_ds_text_box_border_color',
      CORNER_RADIUS: 'three_ds_text_box_corner_radius',
    },
    SUBMIT_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME: 'three_ds_submit_button_text_font_name',
      TEXT_COLOR: 'three_ds_submit_button_text_color',
      TEXT_FONT_SIZE: 'three_ds_submit_button_text_font_size',
      BACKGROUND_COLOR: 'three_ds_submit_button_background_color',
      CORNER_RADIUS: 'three_ds_submit_button_corner_radius',
    },
    NEXT_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME: 'three_ds_next_button_text_font_name',
      TEXT_COLOR: 'three_ds_next_button_text_color',
      TEXT_FONT_SIZE: 'three_ds_next_button_text_font_size',
      BACKGROUND_COLOR: 'three_ds_next_button_background_color',
      CORNER_RADIUS: 'three_ds_next_button_corner_radius',
    },
    CONTINUE_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME: 'three_ds_continue_button_text_font_name',
      TEXT_COLOR: 'three_ds_continue_button_text_color',
      TEXT_FONT_SIZE: 'three_ds_continue_button_text_font_size',
      BACKGROUND_COLOR: 'three_ds_continue_button_background_color',
      CORNER_RADIUS: 'three_ds_continue_button_corner_radius',
    },
    CANCEL_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME: 'three_ds_cancel_button_text_font_name',
      TEXT_COLOR: 'three_ds_cancel_button_text_color',
      TEXT_FONT_SIZE: 'three_ds_cancel_button_text_font_size',
      BACKGROUND_COLOR: 'three_ds_cancel_button_background_color',
      CORNER_RADIUS: 'three_ds_cancel_button_corner_radius',
    },
    RESEND_BUTTON_CUSTOMIZATION: {
      TEXT_FONT_NAME: 'three_ds_resend_button_text_font_name',
      TEXT_COLOR: 'three_ds_resend_button_text_color',
      TEXT_FONT_SIZE: 'three_ds_resend_button_text_font_size',
      BACKGROUND_COLOR: 'three_ds_resend_button_background_color',
      CORNER_RADIUS: 'three_ds_resend_button_corner_radius',
    },
  },
} as const;

// Token Payments keys
export const TOKEN_PAYMENTS_KEYS = {
  SHOULD_ASK_FOR_CSC: 'should_ask_for_csc',
  SHOULD_ASK_FOR_CARDHOLDER_NAME: 'should_ask_for_cardholder_name',
} as const;

// Recommendation keys
export const RECOMMENDATION_KEYS = {
  IS_ON: 'is_recommendation_enabled',
  URL: 'recommendation_url',
  RSA_PUBLIC_KEY: 'rsa_key',
  TIMEOUT: 'recommendation_timeout',
  HALT_TRANSACTION_IN_CASE_OF_ANY_ERROR:
    'is_recommendation_halt_transaction_enabled',
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

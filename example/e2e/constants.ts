export enum TestData {
  CARD_NUMBER = '4976 3500 0000 6891',
  FAILED_CARD_NUMBER = '4111 1111 1111 1111',
  CARDHOLDER_NAME = 'Test User',
  EXPIRY_DATE = '1225',
  SECURITY_CODE = '341',
  DECLINED_CODE = '123',
  PAY_WITH_TOKEN = 'PAY WITH TOKEN',
  PAY_WITH_PREAUTH_TOKEN = 'PREAUTH WITH TOKEN',
  FRICTIONLESS = 'Frictionless Successful',
  FRICTIONLESS_NOMETHOD = 'Frictionless NoMethod',
  FRICTIONLESS_AUTHFAILED = 'Frictionless AuthFailed',
  VALID_EMAIL = 'testuser@me.com',
  VALID_PHONE = '07123456789',
  ADDRESS_ONE = '12 Mayfield Street',
  VALID_CITY = 'London',
  VALID_POST_CODE = 'NW1 3RP',
  VALID_COUNTRY = 'United Kingdom',
  INVALID_POST_CODE = '38GL112',
}

export enum Selectors {
  // Settings
  SETTINGS_BUTTON = 'settings-button',
  AUTH_TOGGLE = 'using-token-and-secret-toggle',
  BACK_BUTTON = 'back-button',
  CHALLENGE_REQUEST_SETTINGS = 'Challenge request indicator',
  NO_PREFERENCE = 'No preference',
  ASK_FOR_CSC = 'should-ask-for-csc',
  ASK_FOR_NAME = 'should-ask-for-cardholder-name',
  SETTINGS_LISTVIEW = 'settings-list',
  BILLING_INFO_TOGGLE = 'billing-info-screen-toggle',

  // Inputs
  JUDO_ID_INPUT = 'judo-id-input',
  TOKEN_INPUT = 'token-input-field',
  SECRET_INPUT = 'secret-input-field',
  CARD_NUMBER_INPUT = 'Card Number Field',
  CARDHOLDER_NAME_INPUT = 'Cardholder Name Field',
  EXPIRY_DATE_INPUT = 'Expiry Date Field',
  SECURITY_CODE_INPUT = 'Security Code Field',
  TOKEN_CVV_CODE = 'card-token-security-code',

  // Payment Buttons
  PAY_NOW_BUTTON = 'Submit Button',
  PAY_WITH_CARD = 'Pay with card',
  PAY_WITH_PREAUTH = 'Pre-auth with card',
  REGISTER_CARD = 'Register card',
  CHECK_CARD = 'Check card',
  SAVE_CARD = 'Save card',
  ADD_CARD_BUTTON = 'ADD CARD',
  PAY_WITH_TOKEN = 'pay-with-token-button',
  PREAUTH_WITH_TOKEN = 'preauth-with-token-button',

  // Android Specific
  ANDROID_CARD = 'cardNumberInputField',
  ANDROID_NAME = 'cardHolderNameField',
  ANDROID_EXPIRY = 'expiryDateField',
  ANDROID_CODE = 'securityCodeField',
  ANDROID_METHODS_PAY_NOW = 'paymentMethodsPayNowButton',
  ANDROID_PAY_NOW = 'cardEntrySubmitButton',
  ANDROID_PAY_NOW_LABEL = 'Pay Now',
  ERROR_LABEL = 'errorLabel',

  // iOS Specific
  IOS_PAY_NOW = 'PAY NOW',

  // 3DS2
  THREEDS2_COMPLETE_BUTTON = 'COMPLETE',
  THREEDS2_SCREEN_HEADER = 'SECURE CHECKOUT',
  THREEDS2_TITLE_ANDROID = 'Payment verification',
  CANCEL_3DS2 = 'Cancel',

  // Result
  RESULT_HEADER = 'Result',
  RESULT_RECEIPT_ID = 'receiptId-value',
  RESULT_TYPE = 'type-value',
  RESULT_VALUE = 'result-value',
  RESULT_MESSAGE = 'message-value',

  // Token
  TOKEN_PAYMENTS = 'Token Payments',
  TOKENIZE_NEW_CARD = 'TOKENIZE A NEW CARD',
  TOKEN_SCROLL_VIEW = 'token-scroll-view',

  // iOS Billing Info Fields
  EMAIL_FIELD = 'Cardholder Email Field',
  PHONE_FIELD = 'Cardholder phone number Field',
  ADDRESS_ONE_FIELD = 'Cardholder address line 1 code Field',
  ADDRESS_TWO_FIELD = 'Cardholder address line 2 Field',
  ADDRESS_THREE_FIELD = 'Cardholder address line 3 Field',
  CITY_FIELD = 'Cardholder city Field',
  POST_CODE_FIELD = 'Post Code Field',
  STATE_FIELD = 'State Field',
  COUNTRY_FIELD = 'Country Field',
  ADD_ADDRESS_LINE_BUTTON = 'Add address line Button',

  // Error Labels
  FIELD_ERROR_LABEL = 'Error Floating Label',

  // Android Billing Info Fields
  EMAIL_ENTRY_FIELD = 'emailEntryField',
  COUNTRY_ENTRY_FIELD = 'countryEntryField',
  STATE_ENTRY_FIELD = 'stateEntryField',
  PHONE_COUNTRY_CODE_ENTRY_FIELD = 'phoneCountryCodeEntryField',
  PHONE_ENTRY_FIELD = 'phoneEntryField',
  ADDRESS_ONE_ENTRY_FIELD = 'addressOneEntryField',
  ADDRESS_TWO_ENTRY_FIELD = 'addressTwoEntryField',
  ADDRESS_THREE_ENTRY_FIELD = 'addressThreeEntryField',
  CITY_ENTRY_FIELD = 'cityEntryField',
  POST_CODE_ENTRY_FIELD = 'postCodeEntryField',
  ADD_ADDRESS_LINE_BUTTON_ANDROID = 'addAddressLineButton',

  // Miscellaneous
  FEATURE_LIST = 'home-screen-section-list',
  EXISTING_CARD = 'Visa Ending 6891 ',
  DELETE_CARD = 'Delete',
  PAYMENT_METHODS = 'Payment methods',
  PREAUTH_METHODS = 'PreAuth methods',
  HELPER_TEXT = 'help-steps-list',
}

export enum UserFeedback {
  THREEDS2_CANCELLED = 'Unable to process transaction. Card authentication failed with 3DS Server.',
  INVALID_POSTCODE_ERROR = 'Invalid postcode entered',
}

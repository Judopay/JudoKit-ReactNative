import { SectionListData } from 'react-native'
import { ResultItem } from '../../Application/ApplicationRouter/Screens/ResultScreen'

export interface SettingsData {
  apiConfiguration: {
    isSandboxed: boolean
    judoId: string
  }
  authorization: {
    isUsingPaymentSession: boolean
    isUsingTokenAndSecret: boolean
    token: string
    secret?: string
    paymentSession?: string
  }
  reference: {
    consumerReference: string
    paymentReference: string
  }
  others: {
    isAddressVerificationServiceOn: boolean
    isAmountLabelInPaymentMethodsOn: boolean
    isAmountLabelInPaymentButtonOn: boolean
    isSecurityCodeOn: boolean
    isInitialRecurringPaymentOn: boolean
    isDelayedAuthorisationOn: boolean
  }
  amount: {
    currency: string
    value: string
  }
  paymentMethods: {
    isCardOn: boolean
    isiDealOn: boolean
    isApplePayOn: boolean
    isGooglePayOn: boolean
  }
  supportedCardNetworks: {
    isVisaOn: boolean
    isMastercardOn: boolean
    isAmexOn: boolean
    isMaestroOn: boolean
    isChinaUnionPayOn: boolean
    isJCBOn: boolean
    isDiscoverOn: boolean
    isDinersClubOn: boolean
  }
  networkTimeouts: {
    connectTimeout: string
    readTimeout: string
    writeTimeout: string
  }
  cardAddress: {
    isEnabled: boolean
    line1: string
    line2: string
    line3: string
    town: string
    postCode: string
    countryCode: string
    state: string
    phoneCountryCode: string
    mobileNumber: string
    emailAddress: string
  }
  primaryAccountDetails: {
    isEnabled: boolean
    name: string
    accountNumber: string
    dateOfBirth: string
    postCode: string
  }
  applePay: {
    merchantId: string
    requiredBillingContactFields: {
      isPostalAddressOn: boolean
      isPhoneOn: boolean
      isEmailOn: boolean
      isNameOn: boolean
    }
    requiredShippingContactFields: {
      isPostalAddressOn: boolean
      isPhoneOn: boolean
      isEmailOn: boolean
      isNameOn: boolean
    }
    returnedContactInfo: {
      isBillingContactsOn: boolean
      isShippingContactsOn: boolean
    }
  }
  googlePay: {
    isProductionEnvironmentOn: boolean
    merchantName: string
    countryCode: string
    billingAddressFields: string
    isBillingAddressPhoneNumberOn: boolean
    isShippingAddressOn: boolean
    shippingAddressAllowedCountries: string
    isShippingAddressPhoneNumberOn: boolean
    isEmailAddressOn: boolean
    allowPrepaidCards: boolean
    allowCreditCards: boolean
    transactionId: string
    totalPriceStatus: string
    totalPriceLabel: string
    checkoutOption: string
  }
  threeDSTwo: {
    isBillingInformationScreenEnabled: boolean
    challengeRequestIndicator: string
    SCAExemption: string
    maxTimeout: string
    protocolMessageVersion: string
    uiCustomization: {
      isEnabled: boolean
      toolbarCustomization: {
        textFontName: string
        textColor: string
        textFontSize: string
        backgroundColor: string
        headerText: string
        buttonText: string
      }
      labelCustomization: {
        textFontName: string
        textColor: string
        textFontSize: string
        headingTextFontName: string
        headingTextColor: string
        headingTextFontSize: string
      }
      textBoxCustomization: {
        textFontName: string
        textColor: string
        textFontSize: string
        borderWidth: string
        borderColor: string
        cornerRadius: string
      }
      submitButtonCustomization: {
        textFontName: string
        textColor: string
        textFontSize: string
        backgroundColor: string
        cornerRadius: string
      }
      nextButtonCustomization: {
        textFontName: string
        textColor: string
        textFontSize: string
        backgroundColor: string
        cornerRadius: string
      }
      continueButtonCustomization: {
        textFontName: string
        textColor: string
        textFontSize: string
        backgroundColor: string
        cornerRadius: string
      }
      cancelButtonCustomization: {
        textFontName: string
        textColor: string
        textFontSize: string
        backgroundColor: string
        cornerRadius: string
      }
      resendButtonCustomization: {
        textFontName: string
        textColor: string
        textFontSize: string
        backgroundColor: string
        cornerRadius: string
      }
    }
  }
}

export enum SettingsItemDataType {
  BOOLEAN,
  TEXT,
  SINGLE_SELECTION,
  CHILD_PANE,
}

export interface SettingsItemOption {
  id: string
  title: string
}

export interface SettingsItem {
  path: string
  dataType: SettingsItemDataType
  title: string
  value: string | boolean | number
  options?: Array<SettingsItemOption>
}

export enum Screen {
  HOME = 'Home',
  SETTINGS = 'SettingsMain',
  THREE_DS_UI_SETTINGS = 'SettingsThreeDSUI',
  SINGLE_SELECTION = 'SettingsSingleSelection',
  RESULT = 'Result',
  TOKEN_PAYMENTS = 'TokenPayments',
  NO_UI_PAYMENTS = 'NoUiPayments',
  GET_TRANSACTION_DETAILS = 'GetTransactionDetails',
}

export interface SingleSelectionTableItem {
  id: string
  title: string
}

export interface SingleSelectionTableParams {
  path: string
  name: string
  sectionListData: Array<SectionListData<SingleSelectionTableItem>>
  selectedItemId: string
}

export interface ResultParams {
  items: Array<ResultItem>
}

export type RootStackParamList = {
  GetTransactionDetails: undefined
  Home: undefined
  NoUiPayments: undefined
  Result: ResultParams
  SettingsMain: undefined
  SettingsSingleSelection: SingleSelectionTableParams
  SettingsThreeDSUI: undefined
  TokenPayments: undefined
}

export enum DemoFeatureType {
  PAYMENT = 1,
  PRE_AUTH,
  CREATE_CARD_TOKEN,
  SAVE_CARD,
  CHECK_CARD,
  APPLE_PAY_PAYMENT,
  APPLE_PAY_PRE_AUTH,
  GOOGLE_PAY_PAYMENT,
  GOOGLE_PAY_PRE_AUTH,
  PAYMENT_METHODS,
  PRE_AUTH_METHODS,
  SERVER_TO_SERVER,
  PAY_BY_BANK_APP,
  TOKEN_PAYMENTS,
  NO_UI_PAYMENTS,
  GET_TRANSACTION_DETAILS,
}

export interface DemoFeature {
  title: string
  details: string
  type: DemoFeatureType
}

export interface AlertFunctionProps {
  title?: string
  message: string
  onPressOK?: () => void
}

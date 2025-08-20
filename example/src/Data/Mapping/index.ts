import {
  ChallengeRequestIndicator,
  JudoAddressFormat,
  JudoAuthorization,
  JudoBillingAddressParameters,
  JudoCardNetwork,
  JudoConfiguration,
  JudoContactField,
  JudoGooglePayConfiguration,
  JudoGooglePayEnvironment,
  JudoMerchantCapability,
  JudoPaymentMethod,
  JudoPaymentSummaryItem,
  JudoPaymentSummaryItemType,
  JudoReturnedInfo,
  JudoShippingAddressParameters,
  JudoShippingMethod,
  JudoShippingType,
  JudoThreeDSButtonCustomization,
  JudoThreeDSButtonType,
  JudoThreeDSLabelCustomization,
  JudoThreeDSTextBoxCustomization,
  JudoThreeDSToolbarCustomization,
  JudoThreeDSUIConfiguration,
  ScaExemption,
  JudoApplePayRecurringPaymentRequest,
  JudoCalendarUnit,
} from 'judokit-react-native';
import {
  JudoCheckoutOption,
  JudoGooglePayPriceStatus,
} from 'judokit-react-native';
import { appStorage } from '../../Application';
import {
  AMOUNT_KEYS,
  API_CONFIGURATION_KEYS,
  APPLE_PAY_KEYS,
  AUTHORIZATION_KEYS,
  CARD_ADDRESS_KEYS,
  GOOGLE_PAY_KEYS,
  NETWORK_TIMEOUTS_KEYS,
  OTHERS_KEYS,
  PAYMENT_METHODS_KEYS,
  PRIMARY_ACCOUNT_DETAILS_KEYS,
  RECOMMENDATION_KEYS,
  REFERENCE_KEYS,
  SUPPORTED_CARD_NETWORKS_KEYS,
  THREE_DS_TWO_KEYS,
  TOKEN_PAYMENTS_KEYS,
} from '../Constants';

export const getBoolOrFalse = (key: string) => {
  const { getBool } = appStorage;

  const value = getBool(key);
  return typeof value === 'boolean' ? value : false;
};

export const getBoolOrUndefined = (key: string) => {
  const { getBool } = appStorage;

  const value = getBool(key);
  return typeof value === 'boolean' ? value : undefined;
};

export const getStringOrUndefined = (key: string) => {
  const { getString } = appStorage;

  const value = getString(key);
  return typeof value === 'string' ? value : undefined;
};

export const getStringOrEmpty = (key: string) => {
  const { getString } = appStorage;

  const value = getString(key);
  return typeof value === 'string' ? value : '';
};

export const getNumberOrUndefined = (key: string) => {
  const value = getStringOrEmpty(key);

  if (value.length > 0) {
    try {
      return Number(value);
    } catch (error) {
      // noop
    }
  }

  return undefined;
};

// ============================================================================
// AUTHORIZATION HELPERS
// ============================================================================

export const judoAuthorizationFromSettingsData = (): JudoAuthorization => {
  if (getBoolOrFalse(AUTHORIZATION_KEYS.IS_USING_TOKEN_AND_SECRET)) {
    return {
      token: getStringOrEmpty(AUTHORIZATION_KEYS.TOKEN),
      secret: getStringOrEmpty(AUTHORIZATION_KEYS.SECRET),
    };
  }

  if (getBoolOrFalse(AUTHORIZATION_KEYS.IS_USING_PAYMENT_SESSION)) {
    return {
      paymentSession: getStringOrEmpty(AUTHORIZATION_KEYS.PAYMENT_SESSION),
      token: getStringOrEmpty(AUTHORIZATION_KEYS.TOKEN),
    };
  }

  return {} as JudoAuthorization;
};

// ============================================================================
// CARD NETWORK HELPERS
// ============================================================================

const buildSupportedCardNetworks = (): JudoCardNetwork => {
  let cardNetworks: JudoCardNetwork = 0 as JudoCardNetwork;

  const networkMappings = [
    {
      key: SUPPORTED_CARD_NETWORKS_KEYS.IS_VISA_ON,
      network: JudoCardNetwork.Visa,
    },
    {
      key: SUPPORTED_CARD_NETWORKS_KEYS.IS_MASTERCARD_ON,
      network: JudoCardNetwork.Mastercard,
    },
    {
      key: SUPPORTED_CARD_NETWORKS_KEYS.IS_AMEX_ON,
      network: JudoCardNetwork.Amex,
    },
    {
      key: SUPPORTED_CARD_NETWORKS_KEYS.IS_MAESTRO_ON,
      network: JudoCardNetwork.Maestro,
    },
    {
      key: SUPPORTED_CARD_NETWORKS_KEYS.IS_DISCOVER_ON,
      network: JudoCardNetwork.Discover,
    },
    {
      key: SUPPORTED_CARD_NETWORKS_KEYS.IS_DINERS_CLUB_ON,
      network: JudoCardNetwork.DinersClub,
    },
    {
      key: SUPPORTED_CARD_NETWORKS_KEYS.IS_CHINA_UNION_PAY_ON,
      network: JudoCardNetwork.ChinaUnionPay,
    },
    {
      key: SUPPORTED_CARD_NETWORKS_KEYS.IS_JCB_ON,
      network: JudoCardNetwork.JCB,
    },
  ];

  networkMappings.forEach(({ key, network }) => {
    if (getBoolOrFalse(key)) {
      cardNetworks |= network;
    }
  });

  return cardNetworks;
};

// ============================================================================
// PAYMENT METHODS HELPERS
// ============================================================================

const buildPaymentMethods = (): JudoPaymentMethod => {
  let methods = 0;

  const methodMappings = [
    { key: PAYMENT_METHODS_KEYS.IS_CARD_ON, method: JudoPaymentMethod.Card },
    {
      key: PAYMENT_METHODS_KEYS.IS_APPLE_PAY_ON,
      method: JudoPaymentMethod.ApplePay,
    },
    {
      key: PAYMENT_METHODS_KEYS.IS_GOOGLE_PAY_ON,
      method: JudoPaymentMethod.GooglePay,
    },
  ];

  methodMappings.forEach(({ key, method }) => {
    if (getBoolOrFalse(key)) {
      methods |= method;
    }
  });

  return methods;
};

// ============================================================================
// THREE DS HELPERS
// ============================================================================

const getChallengeRequestIndicator = ():
  | ChallengeRequestIndicator
  | undefined => {
  const value = getStringOrUndefined(
    THREE_DS_TWO_KEYS.CHALLENGE_REQUEST_INDICATOR
  );

  if (!value) return undefined;

  const indicatorMap: Record<string, ChallengeRequestIndicator> = {
    noPreference: ChallengeRequestIndicator.NoPreference,
    noChallenge: ChallengeRequestIndicator.NoChallenge,
    challengePreferred: ChallengeRequestIndicator.ChallengePreferred,
    challengeAsMandate: ChallengeRequestIndicator.ChallengeAsMandate,
  };

  return indicatorMap[value] || undefined;
};

const getScaExemption = (): ScaExemption | undefined => {
  const value = getStringOrUndefined(THREE_DS_TWO_KEYS.SCA_EXEMPTION);

  if (!value) return undefined;

  const exemptionMap: Record<string, ScaExemption> = {
    lowValue: ScaExemption.LowValue,
    secureCorporate: ScaExemption.SecureCorporate,
    trustedBeneficiary: ScaExemption.TrustedBeneficiary,
    transactionRiskAnalysis: ScaExemption.TransactionRiskAnalysis,
  };

  return exemptionMap[value] || undefined;
};

// ============================================================================
// THREE DS UI CUSTOMIZATION HELPERS
// ============================================================================

const buildButtonCustomization = (
  // @ts-ignore
  buttonType: JudoThreeDSButtonType,
  customizationKeys: any
): JudoThreeDSButtonCustomization => {
  return {
    textFontName: getStringOrUndefined(customizationKeys.TEXT_FONT_NAME),
    textColor: getStringOrUndefined(customizationKeys.TEXT_COLOR),
    backgroundColor: getStringOrUndefined(customizationKeys.BACKGROUND_COLOR),
    textFontSize: getNumberOrUndefined(customizationKeys.TEXT_FONT_SIZE),
    cornerRadius: getNumberOrUndefined(customizationKeys.CORNER_RADIUS),
  };
};

const buildThreeDSUIConfiguration = ():
  | JudoThreeDSUIConfiguration
  | undefined => {
  if (!getBoolOrFalse(THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.IS_ENABLED)) {
    return undefined;
  }

  const buttonCustomizations: Partial<
    Record<JudoThreeDSButtonType, JudoThreeDSButtonCustomization>
  > = {};

  // Build button customizations for each button type
  const buttonTypes = [
    {
      type: JudoThreeDSButtonType.SUBMIT,
      keys: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION,
    },
    {
      type: JudoThreeDSButtonType.CONTINUE,
      keys: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION,
    },
    {
      type: JudoThreeDSButtonType.NEXT,
      keys: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION,
    },
    {
      type: JudoThreeDSButtonType.CANCEL,
      keys: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION,
    },
    {
      type: JudoThreeDSButtonType.RESEND,
      keys: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION,
    },
  ];

  buttonTypes.forEach(({ type, keys }) => {
    buttonCustomizations[type] = buildButtonCustomization(type, keys);
  });

  const toolbarCustomization: JudoThreeDSToolbarCustomization = {
    textFontName: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.TEXT_FONT_NAME
    ),
    textFontSize: getNumberOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.TEXT_FONT_SIZE
    ),
    textColor: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.TEXT_COLOR
    ),
    backgroundColor: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.BACKGROUND_COLOR
    ),
    headerText: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.HEADER_TEXT
    ),
    buttonText: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION.BUTTON_TEXT
    ),
  };

  const labelCustomization: JudoThreeDSLabelCustomization = {
    textFontName: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION.TEXT_FONT_NAME
    ),
    textFontSize: getNumberOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION.TEXT_FONT_SIZE
    ),
    textColor: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION.TEXT_COLOR
    ),
    headingTextFontSize: getNumberOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
        .HEADING_TEXT_FONT_SIZE
    ),
    headingTextFontName: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
        .HEADING_TEXT_FONT_NAME
    ),
    headingTextColor: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION.HEADING_TEXT_COLOR
    ),
  };

  const textBoxCustomization: JudoThreeDSTextBoxCustomization = {
    textFontName: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.TEXT_FONT_NAME
    ),
    textColor: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.TEXT_COLOR
    ),
    textFontSize: getNumberOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.TEXT_FONT_SIZE
    ),
    cornerRadius: getNumberOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.CORNER_RADIUS
    ),
    borderColor: getStringOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.BORDER_COLOR
    ),
    borderWidth: getNumberOrUndefined(
      THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION.BORDER_WIDTH
    ),
  };

  return {
    buttonCustomizations,
    toolbarCustomization,
    labelCustomization,
    textBoxCustomization,
  };
};

// ============================================================================
// APPLE PAY HELPERS
// ============================================================================

const buildApplePayPaymentSummaryItems = (): JudoPaymentSummaryItem[] => {
  const itemOne: JudoPaymentSummaryItem = {
    label: 'Item 1',
    amount: '0.01',
  };

  const itemTwo: JudoPaymentSummaryItem = {
    label: 'Item 2',
    amount: '0.02',
    type: JudoPaymentSummaryItemType.Final,
  };

  const total: JudoPaymentSummaryItem = {
    label: 'Tim Apple',
    amount: '0.03',
  };

  return [itemOne, itemTwo, total];
};

const buildApplePayShippingMethods = (): JudoShippingMethod[] => {
  const delivery: JudoShippingMethod = {
    identifier: 'delivery-id',
    label: 'Deliver',
    detail: 'Deliver to your home address',
    amount: '0.01',
    type: JudoPaymentSummaryItemType.Final,
  };

  return [delivery];
};

const getApplePayReturnedInfo = (): JudoReturnedInfo | undefined => {
  const isBillingContactsOn = getBoolOrFalse(
    APPLE_PAY_KEYS.RETURNED_CONTACT_INFO.IS_BILLING_CONTACTS_ON
  );
  const isShippingContactsOn = getBoolOrFalse(
    APPLE_PAY_KEYS.RETURNED_CONTACT_INFO.IS_SHIPPING_CONTACTS_ON
  );

  if (isBillingContactsOn && isShippingContactsOn) {
    return JudoReturnedInfo.All;
  } else if (isBillingContactsOn) {
    return JudoReturnedInfo.BillingDetails;
  } else if (isShippingContactsOn) {
    return JudoReturnedInfo.ShippingDetails;
  }

  return undefined;
};

const buildApplePayContactFields = (): {
  requiredBillingContactFields?: JudoContactField;
  requiredShippingContactFields?: JudoContactField;
} => {
  const buildContactFields = (fieldKeys: any): JudoContactField[] => {
    const fields: JudoContactField[] = [];

    if (getBoolOrFalse(fieldKeys.IS_POSTAL_ADDRESS_ON)) {
      fields.push(JudoContactField.PostalAddress);
    }
    if (getBoolOrFalse(fieldKeys.IS_PHONE_ON)) {
      fields.push(JudoContactField.Phone);
    }
    if (getBoolOrFalse(fieldKeys.IS_NAME_ON)) {
      fields.push(JudoContactField.Name);
    }
    if (getBoolOrFalse(fieldKeys.IS_EMAIL_ON)) {
      fields.push(JudoContactField.Email);
    }

    return fields;
  };

  const billingFields = buildContactFields(
    APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS
  );
  const shippingFields = buildContactFields(
    APPLE_PAY_KEYS.REQUIRED_SHIPPING_CONTACT_FIELDS
  );

  const reduceCallbackFn = (
    previousValue: JudoContactField,
    currentValue: JudoContactField
  ) => {
    if (previousValue) {
      return previousValue | currentValue;
    }
    return currentValue;
  };

  return {
    requiredBillingContactFields:
      billingFields.length > 0
        ? billingFields.reduce(reduceCallbackFn)
        : undefined,
    requiredShippingContactFields:
      shippingFields.length > 0
        ? shippingFields.reduce(reduceCallbackFn)
        : undefined,
  };
};

const buildApplePayRecurringPaymentRequest = ():
  | JudoApplePayRecurringPaymentRequest
  | undefined => {
  if (!getBoolOrFalse(APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.IS_ON)) {
    return undefined;
  }

  const getIntervalUnit = (
    intervalUnitString: string
  ): JudoCalendarUnit | undefined => {
    const unitMap: Record<string, JudoCalendarUnit> = {
      year: JudoCalendarUnit.Year,
      month: JudoCalendarUnit.Month,
      day: JudoCalendarUnit.Day,
      hour: JudoCalendarUnit.Hour,
      minute: JudoCalendarUnit.Minute,
    };
    return unitMap[intervalUnitString];
  };

  const regularBillingIsOn = getBoolOrFalse(
    APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.IS_ON
  );

  const paymentDescription = getStringOrUndefined(
    APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.PAYMENT_DESCRIPTION
  );
  const managementURL = getStringOrUndefined(
    APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.MANAGEMENT_URL
  );
  const billingAgreement = getStringOrUndefined(
    APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.BILLING_AGREEMENT
  );

  if (!paymentDescription || !managementURL) {
    return undefined;
  }

  const regularBillingData = regularBillingIsOn
    ? {
        label:
          getStringOrUndefined(
            APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.LABEL
          ) || 'Recurring Payment',
        amount:
          getStringOrUndefined(
            APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.AMOUNT
          ) || '0.00',
        startDate: getStringOrUndefined(
          APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.START_DATE
        ),
        endDate: getStringOrUndefined(
          APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.END_DATE
        ),
        intervalUnit: getIntervalUnit(
          getStringOrEmpty(
            APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING
              .INTERVAL_UNIT
          )
        ),
        intervalCount: getNumberOrUndefined(
          APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING
            .INTERVAL_COUNT
        ),
      }
    : {
        label: 'Recurring Payment',
        amount: '0.00',
      };

  return {
    paymentDescription,
    managementURL,
    billingAgreement: billingAgreement || undefined,
    regularBilling: regularBillingData,
  };
};

// ============================================================================
// GOOGLE PAY HELPERS
// ============================================================================

const buildGooglePayBillingParameters = ():
  | JudoBillingAddressParameters
  | undefined => {
  const billingAddressFields = getStringOrEmpty(
    GOOGLE_PAY_KEYS.BILLING_ADDRESS_FIELDS
  );

  if (billingAddressFields !== 'MIN' && billingAddressFields !== 'FULL') {
    return undefined;
  }

  return {
    addressFormat:
      billingAddressFields === 'MIN'
        ? JudoAddressFormat.MIN
        : JudoAddressFormat.FULL,
    isPhoneNumberRequired: getBoolOrFalse(
      GOOGLE_PAY_KEYS.IS_BILLING_ADDRESS_PHONE_NUMBER_ON
    ),
  };
};

const buildGooglePayShippingParameters = (): JudoShippingAddressParameters => {
  const allowedCountryCodes = getStringOrEmpty(
    GOOGLE_PAY_KEYS.SHIPPING_ADDRESS_ALLOWED_COUNTRIES
  )
    .split(',')
    .map((code) => code.trim());

  return {
    allowedCountryCodes,
    isPhoneNumberRequired: getBoolOrFalse(
      GOOGLE_PAY_KEYS.IS_SHIPPING_ADDRESS_PHONE_NUMBER_ON
    ),
  };
};

const getGooglePayCheckoutOption = (): JudoCheckoutOption | undefined => {
  const value = getStringOrUndefined(GOOGLE_PAY_KEYS.CHECKOUT_OPTION);

  if (!value) return undefined;

  const optionMap: Record<string, JudoCheckoutOption> = {
    DEFAULT: JudoCheckoutOption.DEFAULT,
    COMPLETE_IMMEDIATE_PURCHASE: JudoCheckoutOption.COMPLETE_IMMEDIATE_PURCHASE,
  };

  return optionMap[value];
};

const getGooglePayTotalPriceStatus = (): JudoGooglePayPriceStatus => {
  const value = getStringOrEmpty(GOOGLE_PAY_KEYS.TOTAL_PRICE_STATUS);

  if (!value) return JudoGooglePayPriceStatus.FINAL;

  const statusMap: Record<string, JudoGooglePayPriceStatus> = {
    ESTIMATED: JudoGooglePayPriceStatus.ESTIMATED,
    NOT_CURRENTLY_KNOWN: JudoGooglePayPriceStatus.NOT_CURRENTLY_KNOWN,
  };

  return statusMap[value] || JudoGooglePayPriceStatus.FINAL;
};

// ============================================================================
// MAIN CONFIGURATION BUILDER
// ============================================================================

export const judoConfigurationFromSettingsData = (): JudoConfiguration => {
  // Build base configuration
  let configuration: JudoConfiguration = {
    judoId: getStringOrEmpty(API_CONFIGURATION_KEYS.JUDO_ID),
    amount: {
      currency: getStringOrEmpty(AMOUNT_KEYS.CURRENCY),
      value: getStringOrEmpty(AMOUNT_KEYS.VALUE),
    },
    reference: {
      consumerReference: getStringOrEmpty(REFERENCE_KEYS.CONSUMER_REFERENCE),
      paymentReference: getStringOrUndefined(REFERENCE_KEYS.PAYMENT_REFERENCE),
    },
  };

  // Add card address if enabled
  if (getBoolOrFalse(CARD_ADDRESS_KEYS.IS_ENABLED)) {
    configuration = {
      ...configuration,
      phoneCountryCode: getStringOrUndefined(
        CARD_ADDRESS_KEYS.PHONE_COUNTRY_CODE
      ),
      mobileNumber: getStringOrUndefined(CARD_ADDRESS_KEYS.MOBILE_NUMBER),
      emailAddress: getStringOrUndefined(CARD_ADDRESS_KEYS.EMAIL_ADDRESS),
      cardAddress: {
        line1: getStringOrUndefined(CARD_ADDRESS_KEYS.LINE1),
        line2: getStringOrUndefined(CARD_ADDRESS_KEYS.LINE2),
        line3: getStringOrUndefined(CARD_ADDRESS_KEYS.LINE3),
        countryCode: getNumberOrUndefined(CARD_ADDRESS_KEYS.COUNTRY_CODE),
        postCode: getStringOrUndefined(CARD_ADDRESS_KEYS.POST_CODE),
        state: getStringOrUndefined(CARD_ADDRESS_KEYS.STATE),
        town: getStringOrUndefined(CARD_ADDRESS_KEYS.TOWN),
      },
    };
  }

  // Add supported card networks
  configuration = {
    ...configuration,
    supportedCardNetworks: buildSupportedCardNetworks(),
  };

  // Add primary account details if enabled
  if (getBoolOrFalse(PRIMARY_ACCOUNT_DETAILS_KEYS.IS_ENABLED)) {
    configuration = {
      ...configuration,
      primaryAccountDetails: {
        name: getStringOrUndefined(PRIMARY_ACCOUNT_DETAILS_KEYS.NAME),
        postCode: getStringOrUndefined(PRIMARY_ACCOUNT_DETAILS_KEYS.POST_CODE),
        dateOfBirth: getStringOrUndefined(
          PRIMARY_ACCOUNT_DETAILS_KEYS.DATE_OF_BIRTH
        ),
        accountNumber: getStringOrUndefined(
          PRIMARY_ACCOUNT_DETAILS_KEYS.ACCOUNT_NUMBER
        ),
      },
    };
  }

  // Add network timeouts if all are provided
  const [connectTimeout, writeTimeout, readTimeout] = [
    getStringOrEmpty(NETWORK_TIMEOUTS_KEYS.CONNECT_TIMEOUT),
    getStringOrEmpty(NETWORK_TIMEOUTS_KEYS.WRITE_TIMEOUT),
    getStringOrEmpty(NETWORK_TIMEOUTS_KEYS.READ_TIMEOUT),
  ];

  if (
    connectTimeout?.length > 0 &&
    writeTimeout?.length > 0 &&
    readTimeout?.length > 0
  ) {
    configuration = {
      ...configuration,
      networkTimeout: {
        connectTimeout: Number(connectTimeout),
        writeTimeout: Number(writeTimeout),
        readTimeout: Number(readTimeout),
      },
    };
  }

  // Add payment methods
  configuration = {
    ...configuration,
    paymentMethods: buildPaymentMethods(),
  };

  // Add Three DS configuration
  const threeDSUIConfiguration = buildThreeDSUIConfiguration();
  const maxTimeout = getStringOrEmpty(THREE_DS_TWO_KEYS.MAX_TIMEOUT);
  const threeDSTwoMaxTimeout =
    maxTimeout.length > 0 ? Number(maxTimeout) : undefined;
  const protocolMessageVersion = getStringOrEmpty(
    THREE_DS_TWO_KEYS.PROTOCOL_MESSAGE_VERSION
  );
  const messageVersion =
    protocolMessageVersion.length > 0 ? protocolMessageVersion : undefined;

  // Add recommendation configuration
  const timeout = getStringOrEmpty(RECOMMENDATION_KEYS.TIMEOUT);
  const recommendationConfiguration = getBoolOrFalse(RECOMMENDATION_KEYS.IS_ON)
    ? {
        url: getStringOrEmpty(RECOMMENDATION_KEYS.URL),
        rsaPublicKey: getStringOrEmpty(RECOMMENDATION_KEYS.RSA_PUBLIC_KEY),
        timeout: timeout.length > 0 ? Number(timeout) : undefined,
        haltTransactionInCaseOfAnyError: getBoolOrFalse(
          RECOMMENDATION_KEYS.HALT_TRANSACTION_IN_CASE_OF_ANY_ERROR
        ),
      }
    : undefined;

  // Add other configuration options
  configuration = {
    ...configuration,
    isInitialRecurringPayment: getBoolOrUndefined(
      OTHERS_KEYS.IS_INITIAL_RECURRING_PAYMENT_ON
    ),
    isDelayedAuthorisation: getBoolOrUndefined(
      OTHERS_KEYS.IS_DELAYED_AUTHORISATION_ON
    ),
    isAllowIncrement: getBoolOrUndefined(OTHERS_KEYS.IS_ALLOW_INCREMENT_ON),
    challengeRequestIndicator: getChallengeRequestIndicator(),
    scaExemption: getScaExemption(),
    threeDSTwoMessageVersion: messageVersion,
    threeDSTwoMaxTimeout,
    uiConfiguration: {
      isAVSEnabled: getBoolOrUndefined(
        OTHERS_KEYS.IS_ADDRESS_VERIFICATION_SERVICE_ON
      ),
      shouldAskForBillingInformation: getBoolOrUndefined(
        THREE_DS_TWO_KEYS.IS_BILLING_INFORMATION_SCREEN_ENABLED
      ),
      shouldPaymentButtonDisplayAmount: getBoolOrUndefined(
        OTHERS_KEYS.IS_AMOUNT_LABEL_IN_PAYMENT_BUTTON_ON
      ),
      shouldPaymentMethodsDisplayAmount: getBoolOrUndefined(
        OTHERS_KEYS.IS_AMOUNT_LABEL_IN_PAYMENT_METHODS_ON
      ),
      shouldPaymentMethodsVerifySecurityCode: getBoolOrUndefined(
        OTHERS_KEYS.IS_SECURITY_CODE_ON
      ),
      threeDSUIConfiguration,
      shouldAskForCSC: getBoolOrUndefined(
        TOKEN_PAYMENTS_KEYS.SHOULD_ASK_FOR_CSC
      ),
      shouldAskForCardholderName: getBoolOrUndefined(
        TOKEN_PAYMENTS_KEYS.SHOULD_ASK_FOR_CARDHOLDER_NAME
      ),
    },
    recommendationConfiguration,
  };

  // Add Apple Pay configuration
  const { requiredBillingContactFields, requiredShippingContactFields } =
    buildApplePayContactFields();

  configuration = {
    ...configuration,
    applePayConfiguration: {
      merchantId: getStringOrEmpty(APPLE_PAY_KEYS.MERCHANT_ID),
      countryCode: 'GB',
      paymentSummaryItems: buildApplePayPaymentSummaryItems(),
      merchantCapabilities: JudoMerchantCapability.ThreeDS,
      requiredBillingContactFields,
      requiredShippingContactFields,
      shippingMethods: buildApplePayShippingMethods(),
      shippingType: JudoShippingType.Delivery,
      returnedInfo: getApplePayReturnedInfo(),
      recurringPaymentRequest: buildApplePayRecurringPaymentRequest(),
    },
  };

  // Add Google Pay configuration
  const environment = getBoolOrFalse(
    GOOGLE_PAY_KEYS.IS_PRODUCTION_ENVIRONMENT_ON
  )
    ? JudoGooglePayEnvironment.PRODUCTION
    : JudoGooglePayEnvironment.TEST;

  const merchantName = getStringOrEmpty(GOOGLE_PAY_KEYS.MERCHANT_NAME);
  const transactionId = getStringOrEmpty(GOOGLE_PAY_KEYS.TRANSACTION_ID);
  const totalPriceLabel = getStringOrEmpty(GOOGLE_PAY_KEYS.TOTAL_PRICE_LABEL);

  const googlePayConfiguration: JudoGooglePayConfiguration = {
    countryCode: getStringOrEmpty(GOOGLE_PAY_KEYS.COUNTRY_CODE),
    environment,
    isEmailRequired: getBoolOrFalse(GOOGLE_PAY_KEYS.IS_EMAIL_ADDRESS_ON),
    billingAddressParameters: buildGooglePayBillingParameters(),
    shippingAddressParameters: buildGooglePayShippingParameters(),
    isBillingAddressRequired: true,
    isShippingAddressRequired: getBoolOrFalse(
      GOOGLE_PAY_KEYS.IS_SHIPPING_ADDRESS_ON
    ),
    merchantName: merchantName.length === 0 ? undefined : merchantName,
    allowCreditCards: getBoolOrFalse(GOOGLE_PAY_KEYS.ALLOW_CREDIT_CARDS),
    allowPrepaidCards: getBoolOrFalse(GOOGLE_PAY_KEYS.ALLOW_PREPAID_CARDS),
    transactionId: transactionId.length === 0 ? undefined : transactionId,
    totalPriceStatus: getGooglePayTotalPriceStatus(),
    totalPriceLabel: totalPriceLabel.length === 0 ? undefined : totalPriceLabel,
    checkoutOption: getGooglePayCheckoutOption(),
  };

  configuration = {
    ...configuration,
    googlePayConfiguration,
  };

  return configuration;
};

import {
  AUTHORIZATION_KEYS,
  DEFAULT_SETTINGS_DATA,
  IS_IOS,
  PAYMENT_METHODS_KEYS,
  SUPPORTED_CARD_NETWORKS_KEYS,
} from '../Constants';

export class SettingsImportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SettingsImportError';
  }
}

type JsonValue = string | boolean | number | JsonValue[] | JsonObject | null;
type JsonObject = { [key: string]: JsonValue };
type SettingsPatch = Record<string, string | boolean>;
type StoredValue = string | boolean | undefined;
type ValueReader = (storageKey: string) => StoredValue;

const PAYMENT_SESSION_ENABLED_JSON_KEY = 'is_payment_session_enabled';
const SUPPORTED_NETWORKS_JSON_KEY = 'supported_networks';
const PAYMENT_METHODS_JSON_KEY = 'payment_methods';

const CHALLENGE_REQUEST_INDICATOR_IMPORT_VALUES: Record<string, string> = {
  DON_T_SET: 'dontSet',
  NO_PREFERENCE: 'noPreference',
  NO_CHALLENGE: 'noChallenge',
  CHALLENGE_PREFERRED: 'challengePreferred',
  CHALLENGE_AS_MANDATE: 'challengeAsMandate',
};

const SCA_EXEMPTION_IMPORT_VALUES: Record<string, string> = {
  DON_T_SET: 'dontSet',
  LOW_VALUE: 'lowValue',
  SECURE_CORPORATE: 'secureCorporate',
  TRUSTED_BENEFICIARY: 'trustedBeneficiary',
  TRANSACTION_RISK_ANALYSIS: 'transactionRiskAnalysis',
};

const invertMap = (map: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(map).map(([key, value]) => [value, key]));

const CHALLENGE_REQUEST_INDICATOR_EXPORT_VALUES = invertMap(
  CHALLENGE_REQUEST_INDICATOR_IMPORT_VALUES
);
const SCA_EXEMPTION_EXPORT_VALUES = invertMap(SCA_EXEMPTION_IMPORT_VALUES);

const BOOLEAN_STORAGE_KEYS = new Set(
  Object.entries(DEFAULT_SETTINGS_DATA)
    .filter(([, value]) => typeof value === 'boolean')
    .map(([key]) => key)
);

const CARD_NETWORK_STORAGE_KEYS: Record<string, string> = {
  VISA: SUPPORTED_CARD_NETWORKS_KEYS.IS_VISA_ON,
  MASTERCARD: SUPPORTED_CARD_NETWORKS_KEYS.IS_MASTERCARD_ON,
  MAESTRO: SUPPORTED_CARD_NETWORKS_KEYS.IS_MAESTRO_ON,
  AMEX: SUPPORTED_CARD_NETWORKS_KEYS.IS_AMEX_ON,
  CHINA_UNION_PAY: SUPPORTED_CARD_NETWORKS_KEYS.IS_CHINA_UNION_PAY_ON,
  JCB: SUPPORTED_CARD_NETWORKS_KEYS.IS_JCB_ON,
  DISCOVER: SUPPORTED_CARD_NETWORKS_KEYS.IS_DISCOVER_ON,
  DINERS_CLUB: SUPPORTED_CARD_NETWORKS_KEYS.IS_DINERS_CLUB_ON,
};

const EXPORT_SECTIONS: Array<{ name: string; keys: string[] }> = [
  {
    name: 'api',
    keys: [
      'is_sandboxed',
      'is_using_fabrick_3ds_service',
      'judo_id',
      'token',
      'secret',
      PAYMENT_SESSION_ENABLED_JSON_KEY,
      'payment_session',
      'payment_reference',
      'consumer_reference',
    ],
  },
  {
    name: 'recommendation',
    keys: [
      'is_recommendation_enabled',
      'recommendation_url',
      'rsa_key',
      'recommendation_timeout',
      'is_recommendation_halt_transaction_enabled',
    ],
  },
  {
    name: 'three_ds',
    keys: [
      'should_ask_for_billing_information',
      'challenge_request_indicator',
      'sca_exemption',
      'three_ds_two_max_timeout',
      'connect_timeout',
      'read_timeout',
      'write_timeout',
      'three_ds_two_message_version',
    ],
  },
  {
    name: 'three_ds_ui_customisation',
    keys: [
      'three_ds_is_ui_customisation_enabled',
      'three_ds_toolbar_text_font_name',
      'three_ds_toolbar_text_color',
      'three_ds_toolbar_text_font_size',
      'three_ds_toolbar_background_color',
      'three_ds_toolbar_header_text',
      'three_ds_toolbar_button_text',
      'three_ds_label_text_font_name',
      'three_ds_label_text_color',
      'three_ds_label_text_font_size',
      'three_ds_label_heading_text_font_name',
      'three_ds_label_heading_text_color',
      'three_ds_label_heading_text_font_size',
      'three_ds_text_box_text_font_name',
      'three_ds_text_box_text_color',
      'three_ds_text_box_text_font_size',
      'three_ds_text_box_border_width',
      'three_ds_text_box_border_color',
      'three_ds_text_box_corner_radius',
      'three_ds_submit_button_text_font_name',
      'three_ds_submit_button_text_color',
      'three_ds_submit_button_text_font_size',
      'three_ds_submit_button_background_color',
      'three_ds_submit_button_corner_radius',
      'three_ds_next_button_text_font_name',
      'three_ds_next_button_text_color',
      'three_ds_next_button_text_font_size',
      'three_ds_next_button_background_color',
      'three_ds_next_button_corner_radius',
      'three_ds_continue_button_text_font_name',
      'three_ds_continue_button_text_color',
      'three_ds_continue_button_text_font_size',
      'three_ds_continue_button_background_color',
      'three_ds_continue_button_corner_radius',
      'three_ds_cancel_button_text_font_name',
      'three_ds_cancel_button_text_color',
      'three_ds_cancel_button_text_font_size',
      'three_ds_cancel_button_background_color',
      'three_ds_cancel_button_corner_radius',
      'three_ds_resend_button_text_font_name',
      'three_ds_resend_button_text_color',
      'three_ds_resend_button_text_font_size',
      'three_ds_resend_button_background_color',
      'three_ds_resend_button_corner_radius',
    ],
  },
  { name: 'amount', keys: ['amount', 'currency'] },
  {
    name: 'address',
    keys: [
      'is_address_enabled',
      'address_line_1',
      'address_line_2',
      'address_line_3',
      'address_town',
      'address_post_code',
      'address_billing_country',
      'address_country_code',
      'address_administrative_division',
      'address_phone_country_code',
      'address_mobile_number',
      'address_email_address',
    ],
  },
  {
    name: 'primary_account',
    keys: [
      'is_primary_account_details_enabled',
      'primary_account_name',
      'primary_account_account_number',
      'primary_account_date_of_birth',
      'primary_account_post_code',
    ],
  },
  {
    name: 'google_pay',
    keys: [
      'is_google_pay_production_environment',
      'google_pay_merchant_name',
      'google_pay_country_code',
      'billing_address',
      'is_billing_address_phone_number_required',
      'is_shipping_address_required',
      'google_pay_shipping_address_allowed_countries',
      'is_shipping_address_phone_number_required',
      'is_email_address_required',
      'allow_prepaid_cards',
      'allow_credit_cards',
      'google_pay_transaction_id',
      'google_pay_total_price_status',
      'google_pay_total_price_label',
      'google_pay_checkout_option',
    ],
  },
  {
    name: 'apple_pay',
    keys: [
      'apple_pay_merchant_id',
      'is_apple_pay_billing_contact_info_required',
      'is_apple_pay_shipping_contact_info_required',
      'is_billing_contact_field_postal_address_required',
      'is_billing_contact_field_phone_required',
      'is_billing_contact_field_email_required',
      'is_billing_contact_field_name_required',
      'is_shipping_contact_field_postal_address_required',
      'is_shipping_contact_field_phone_required',
      'is_shipping_contact_field_email_required',
      'is_shipping_contact_field_name_required',
      'is_recurring_payment_enabled',
      'recurring_payment_description',
      'recurring_payment_billing_agreement',
      'recurring_payment_management_url',
      'recurring_payment_label',
      'recurring_payment_amount',
      'recurring_payment_interval_unit',
      'recurring_payment_interval_count',
      'recurring_payment_start_date',
      'recurring_payment_end_date',
    ],
  },
  {
    name: 'others',
    keys: [
      'is_avs_enabled',
      'should_payment_methods_verify_security_code',
      'should_payment_methods_display_amount',
      'should_payment_button_display_amount',
      'is_initial_recurring_payment',
      'is_delayed_authorisation_on',
      'is_allow_increment_on',
      SUPPORTED_NETWORKS_JSON_KEY,
      PAYMENT_METHODS_JSON_KEY,
      'is_disable_network_tokenisation_on',
    ],
  },
  {
    name: 'token_payments',
    keys: ['should_ask_for_csc', 'should_ask_for_cardholder_name'],
  },
];

const ALL_SECTION_KEYS = new Set(EXPORT_SECTIONS.flatMap(({ keys }) => keys));

const isPlainObject = (value: unknown): value is JsonObject =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const asStringArray = (value: JsonValue): string[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined;
  }
  return value.filter((item) => item !== null).map((item) => `${item}`);
};

const toStoredString = (jsonKey: string, value: string): string => {
  if (jsonKey === 'challenge_request_indicator') {
    return CHALLENGE_REQUEST_INDICATOR_IMPORT_VALUES[value] ?? value;
  }
  if (jsonKey === 'sca_exemption') {
    return SCA_EXEMPTION_IMPORT_VALUES[value] ?? value;
  }
  return value;
};

const applyLeaf = (
  patch: SettingsPatch,
  jsonKey: string,
  value: JsonValue
): void => {
  if (value === null) {
    return;
  }

  if (jsonKey === PAYMENT_SESSION_ENABLED_JSON_KEY) {
    if (typeof value === 'boolean') {
      patch[AUTHORIZATION_KEYS.IS_USING_PAYMENT_SESSION] = value;
      patch[AUTHORIZATION_KEYS.IS_USING_TOKEN_AND_SECRET] = !value;
    }
    return;
  }

  if (jsonKey === SUPPORTED_NETWORKS_JSON_KEY) {
    const networks = asStringArray(value);
    if (!networks) {
      return;
    }
    const selected = new Set(networks.map((network) => network.toUpperCase()));
    Object.entries(CARD_NETWORK_STORAGE_KEYS).forEach(([name, storageKey]) => {
      patch[storageKey] = selected.has(name);
    });
    return;
  }

  if (jsonKey === PAYMENT_METHODS_JSON_KEY) {
    const methods = asStringArray(value);
    if (!methods) {
      return;
    }
    const selected = new Set(methods.map((method) => method.toUpperCase()));
    const walletOn = selected.has('APPLE_PAY') || selected.has('GOOGLE_PAY');
    patch[PAYMENT_METHODS_KEYS.IS_CARD_ON] = selected.has('CARD');
    patch[PAYMENT_METHODS_KEYS.IS_APPLE_PAY_ON] = walletOn;
    patch[PAYMENT_METHODS_KEYS.IS_GOOGLE_PAY_ON] = walletOn;
    return;
  }

  if (jsonKey === 'address_billing_country') {
    if (typeof value === 'string' || typeof value === 'number') {
      patch.address_country_code = `${value}`;
    }
    return;
  }

  if (!ALL_SECTION_KEYS.has(jsonKey) && !BOOLEAN_STORAGE_KEYS.has(jsonKey)) {
    return;
  }

  if (jsonKey === 'challenge_request_indicator' && typeof value === 'string') {
    patch[jsonKey] = toStoredString(jsonKey, value);
    return;
  }

  if (jsonKey === 'sca_exemption' && typeof value === 'string') {
    patch[jsonKey] = toStoredString(jsonKey, value);
    return;
  }

  if (typeof value === 'boolean') {
    patch[jsonKey] = value;
    return;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    if (BOOLEAN_STORAGE_KEYS.has(jsonKey)) {
      return;
    }
    patch[jsonKey] = `${value}`;
  }
};

export const isSharedSettingsDialect = (
  value: unknown
): value is JsonObject => {
  if (!isPlainObject(value)) {
    return false;
  }
  const sectionNames = new Set(EXPORT_SECTIONS.map(({ name }) => name));
  return Object.keys(value).some((key) => sectionNames.has(key));
};

export const parseSettingsImport = (json: string): SettingsPatch => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (error) {
    throw new SettingsImportError(
      `Invalid JSON: ${error instanceof Error ? error.message : error}`
    );
  }

  if (!isPlainObject(parsed)) {
    throw new SettingsImportError('Expected a JSON object at the root');
  }

  const patch: SettingsPatch = {};
  Object.entries(parsed).forEach(([key, child]) => {
    if (isPlainObject(child)) {
      Object.entries(child).forEach(([childKey, childValue]) => {
        applyLeaf(patch, childKey, childValue);
      });
      return;
    }
    applyLeaf(patch, key, child);
  });

  return patch;
};

const enabledNetworkNames = (readValue: ValueReader): string[] | undefined => {
  const present = Object.entries(CARD_NETWORK_STORAGE_KEYS).filter(
    ([, storageKey]) => typeof readValue(storageKey) === 'boolean'
  );
  if (present.length === 0) {
    return undefined;
  }
  return present
    .filter(([, storageKey]) => readValue(storageKey) === true)
    .map(([name]) => name)
    .sort();
};

const enabledPaymentMethods = (
  readValue: ValueReader
): string[] | undefined => {
  const card = readValue(PAYMENT_METHODS_KEYS.IS_CARD_ON);
  const applePay = readValue(PAYMENT_METHODS_KEYS.IS_APPLE_PAY_ON);
  const googlePay = readValue(PAYMENT_METHODS_KEYS.IS_GOOGLE_PAY_ON);
  if (
    typeof card !== 'boolean' &&
    typeof applePay !== 'boolean' &&
    typeof googlePay !== 'boolean'
  ) {
    return undefined;
  }

  const methods: string[] = [];
  if (card === true) {
    methods.push('CARD');
  }
  if (applePay === true || googlePay === true) {
    methods.push(IS_IOS ? 'APPLE_PAY' : 'GOOGLE_PAY');
  }
  return methods.sort();
};

const exportValue = (
  jsonKey: string,
  readValue: ValueReader
): JsonValue | undefined => {
  if (jsonKey === PAYMENT_SESSION_ENABLED_JSON_KEY) {
    const value = readValue(AUTHORIZATION_KEYS.IS_USING_PAYMENT_SESSION);
    return typeof value === 'boolean' ? value : undefined;
  }
  if (jsonKey === SUPPORTED_NETWORKS_JSON_KEY) {
    return enabledNetworkNames(readValue);
  }
  if (jsonKey === PAYMENT_METHODS_JSON_KEY) {
    return enabledPaymentMethods(readValue);
  }
  if (jsonKey === 'challenge_request_indicator') {
    const value = readValue(jsonKey);
    if (typeof value !== 'string') {
      return undefined;
    }
    return CHALLENGE_REQUEST_INDICATOR_EXPORT_VALUES[value] ?? value;
  }
  if (jsonKey === 'sca_exemption') {
    const value = readValue(jsonKey);
    if (typeof value !== 'string') {
      return undefined;
    }
    return SCA_EXEMPTION_EXPORT_VALUES[value] ?? value;
  }
  if (jsonKey === 'address_billing_country') {
    const value = readValue('address_country_code');
    return typeof value === 'string' ? value : undefined;
  }

  const value = readValue(jsonKey);
  if (value === undefined) {
    return undefined;
  }
  return value;
};

export const buildSettingsExport = (readValue: ValueReader): string => {
  const root: JsonObject = {};

  EXPORT_SECTIONS.forEach(({ name, keys }) => {
    const section: JsonObject = {};
    keys.forEach((jsonKey) => {
      const value = exportValue(jsonKey, readValue);
      if (value !== undefined) {
        section[jsonKey] = value;
      }
    });
    if (Object.keys(section).length > 0) {
      root[name] = section;
    }
  });

  return JSON.stringify(root, null, 2);
};

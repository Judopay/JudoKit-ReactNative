import { AUTHORIZATION_KEYS, IS_IOS, PAYMENT_METHODS_KEYS } from '../Constants';
import {
  EXPORT_SECTIONS,
  PAYMENT_METHODS_JSON_KEY,
  PAYMENT_SESSION_ENABLED_JSON_KEY,
  SUPPORTED_NETWORKS_JSON_KEY,
} from './exportSections';
import {
  CARD_NETWORK_STORAGE_KEYS,
  CHALLENGE_REQUEST_INDICATOR_EXPORT_VALUES,
  SCA_EXEMPTION_EXPORT_VALUES,
} from './importMaps';
import { JsonObject, JsonValue, ValueReader } from './types';

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

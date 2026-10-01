import { AUTHORIZATION_KEYS, PAYMENT_METHODS_KEYS } from '../Constants';
import {
  ALL_SECTION_KEYS,
  PAYMENT_METHODS_JSON_KEY,
  PAYMENT_SESSION_ENABLED_JSON_KEY,
  SUPPORTED_NETWORKS_JSON_KEY,
} from './exportSections';
import {
  BOOLEAN_STORAGE_KEYS,
  CARD_NETWORK_STORAGE_KEYS,
  toStoredString,
} from './importMaps';
import {
  asStringArray,
  isPlainObject,
  JsonValue,
  SettingsImportError,
  SettingsPatch,
} from './types';

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

import {
  DEFAULT_SETTINGS_DATA,
  SUPPORTED_CARD_NETWORKS_KEYS,
} from '../Constants';

const invertMap = (map: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(map).map(([key, value]) => [value, key]));

export const CHALLENGE_REQUEST_INDICATOR_IMPORT_VALUES: Record<string, string> =
  {
    DON_T_SET: 'dontSet',
    NO_PREFERENCE: 'noPreference',
    NO_CHALLENGE: 'noChallenge',
    CHALLENGE_PREFERRED: 'challengePreferred',
    CHALLENGE_AS_MANDATE: 'challengeAsMandate',
  };

export const SCA_EXEMPTION_IMPORT_VALUES: Record<string, string> = {
  DON_T_SET: 'dontSet',
  LOW_VALUE: 'lowValue',
  SECURE_CORPORATE: 'secureCorporate',
  TRUSTED_BENEFICIARY: 'trustedBeneficiary',
  TRANSACTION_RISK_ANALYSIS: 'transactionRiskAnalysis',
};

export const CHALLENGE_REQUEST_INDICATOR_EXPORT_VALUES = invertMap(
  CHALLENGE_REQUEST_INDICATOR_IMPORT_VALUES
);
export const SCA_EXEMPTION_EXPORT_VALUES = invertMap(
  SCA_EXEMPTION_IMPORT_VALUES
);

export const BOOLEAN_STORAGE_KEYS = new Set(
  Object.entries(DEFAULT_SETTINGS_DATA)
    .filter(([, value]) => typeof value === 'boolean')
    .map(([key]) => key)
);

export const CARD_NETWORK_STORAGE_KEYS: Record<string, string> = {
  VISA: SUPPORTED_CARD_NETWORKS_KEYS.IS_VISA_ON,
  MASTERCARD: SUPPORTED_CARD_NETWORKS_KEYS.IS_MASTERCARD_ON,
  MAESTRO: SUPPORTED_CARD_NETWORKS_KEYS.IS_MAESTRO_ON,
  AMEX: SUPPORTED_CARD_NETWORKS_KEYS.IS_AMEX_ON,
  CHINA_UNION_PAY: SUPPORTED_CARD_NETWORKS_KEYS.IS_CHINA_UNION_PAY_ON,
  JCB: SUPPORTED_CARD_NETWORKS_KEYS.IS_JCB_ON,
  DISCOVER: SUPPORTED_CARD_NETWORKS_KEYS.IS_DISCOVER_ON,
  DINERS_CLUB: SUPPORTED_CARD_NETWORKS_KEYS.IS_DINERS_CLUB_ON,
};

export const toStoredString = (jsonKey: string, value: string): string => {
  if (jsonKey === 'challenge_request_indicator') {
    return CHALLENGE_REQUEST_INDICATOR_IMPORT_VALUES[value] ?? value;
  }
  if (jsonKey === 'sca_exemption') {
    return SCA_EXEMPTION_IMPORT_VALUES[value] ?? value;
  }
  return value;
};

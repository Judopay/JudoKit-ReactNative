export enum JudoGooglePayEnvironment {
  TEST,
  PRODUCTION,
}

export enum JudoAddressFormat {
  MIN,
  FULL,
}

export interface JudoBillingAddressParameters {
  addressFormat: JudoAddressFormat;
  isPhoneNumberRequired: boolean;
}

export interface JudoShippingAddressParameters {
  allowedCountryCodes?: string[];
  isPhoneNumberRequired: boolean;
}

export enum JudoGooglePayPriceStatus {
  FINAL,
  ESTIMATED,
  NOT_CURRENTLY_KNOWN,
}

export enum JudoCheckoutOption {
  DEFAULT,
  COMPLETE_IMMEDIATE_PURCHASE,
}

export enum JudoGooglePayDisplayItemType {
  DISCOUNT,
  LINE_ITEM,
  SHIPPING_OPTION,
  SUBTOTAL,
  TAX,
}

export enum JudoGooglePayDisplayItemStatus {
  FINAL,
  PENDING,
}

export interface JudoGooglePayDisplayItem {
  label: string;
  type: JudoGooglePayDisplayItemType;
  price: string;
  status?: JudoGooglePayDisplayItemStatus;
}

export enum JudoGooglePayRecurrencePeriod {
  YEAR,
  MONTH,
  WEEK,
  DAY,
}

export interface JudoGooglePayIntroductoryPeriodInfo {
  introductoryPeriodStartDateTime?: string;
  introductoryPeriodEndDateTime: string;
  label: string;
  totalPrice: string;
  displayItems?: JudoGooglePayDisplayItem[];
}

export interface JudoGooglePayRecurrencePeriodItem {
  billingInitialDateTime?: string;
  billingFinalDateTime?: string;
  label: string;
  price?: string;
  priceStatus: JudoGooglePayPriceStatus;
  displayItems?: JudoGooglePayDisplayItem[];
  recurrencePeriod: JudoGooglePayRecurrencePeriod;
  recurrencePeriodCount: number;
}

export interface JudoGooglePayDeferredParameters {
  immediateTotalPrice: string;
  billingDateTime: string;
  priceStatus: JudoGooglePayPriceStatus;
  price?: string;
  label: string;
  immediateDisplayItems?: JudoGooglePayDisplayItem[];
  displayItems?: JudoGooglePayDisplayItem[];
  managementUrl?: string;
  billingAgreement?: string;
}

export interface JudoGooglePayRecurringParameters {
  immediateTotalPrice: string;
  recurrenceItems: JudoGooglePayRecurrencePeriodItem[];
  introductoryPeriodInfo?: JudoGooglePayIntroductoryPeriodInfo;
  immediateDisplayItems?: JudoGooglePayDisplayItem[];
  managementUrl?: string;
  billingAgreement?: string;
}

export interface JudoGooglePayConfiguration {
  environment: JudoGooglePayEnvironment;
  merchantName?: string;
  countryCode: string;
  transactionId?: string;
  totalPriceStatus: JudoGooglePayPriceStatus;
  totalPriceLabel?: string;
  checkoutOption?: JudoCheckoutOption;
  isEmailRequired?: boolean;
  isBillingAddressRequired: boolean;
  billingAddressParameters?: JudoBillingAddressParameters;
  isShippingAddressRequired: boolean;
  shippingAddressParameters?: JudoShippingAddressParameters;
  allowPrepaidCards?: boolean;
  allowCreditCards?: boolean;
  deferredParameters?: JudoGooglePayDeferredParameters;
  recurringParameters?: JudoGooglePayRecurringParameters;
}

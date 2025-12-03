export enum JudoPaymentSummaryItemType {
  Final,
  Pending,
}

export interface JudoPaymentSummaryItem {
  label: string;
  amount: string;
  type?: JudoPaymentSummaryItemType;
}

export enum JudoMerchantCapability {
  ThreeDS = 1 << 0,
  EMV = 1 << 1,
  Credit = 1 << 2,
  Debit = 1 << 3,
  All = 1 << 4,
}

export enum JudoContactField {
  PostalAddress = 1 << 0,
  Phone = 1 << 1,
  Email = 1 << 2,
  Name = 1 << 3,
  All = 1 << 4,
}

export interface JudoShippingMethod {
  identifier: string;
  detail: string;
  label: string;
  amount: string;
  type: JudoPaymentSummaryItemType;
}

export enum JudoShippingType {
  Shipping,
  Delivery,
  StorePickup,
  ServicePickup,
}

export enum JudoReturnedInfo {
  BillingDetails = 1 << 0,
  ShippingDetails = 1 << 1,
  All = 1 << 2,
}

export enum JudoCalendarUnit {
  Year = 1,
  Month,
  Day,
  Hour,
  Minute,
}

export interface JudoRecurringPaymentSummaryItem extends JudoPaymentSummaryItem {
  startDate?: string;
  endDate?: string;
  intervalUnit?: JudoCalendarUnit;
  intervalCount?: number;
}

export interface JudoApplePayRecurringPaymentRequest {
  paymentDescription: string;
  managementURL: string;
  regularBilling: JudoRecurringPaymentSummaryItem;
  /**
   * Reserved for future use. Currently not implemented.
   */
  trialBilling?: JudoRecurringPaymentSummaryItem;
  billingAgreement?: string;
  /**
   * Reserved for future use. Currently not implemented.
   */
  tokenNotificationURL?: string;
}

export interface JudoApplePayConfiguration {
  merchantId: string;
  countryCode: string;
  paymentSummaryItems: JudoPaymentSummaryItem[];
  merchantCapabilities?: JudoMerchantCapability;
  requiredBillingContactFields?: JudoContactField;
  requiredShippingContactFields?: JudoContactField;
  shippingMethods?: JudoShippingMethod[];
  shippingType?: JudoShippingType;
  returnedInfo?: JudoReturnedInfo;
  recurringPaymentRequest?: JudoApplePayRecurringPaymentRequest;
}

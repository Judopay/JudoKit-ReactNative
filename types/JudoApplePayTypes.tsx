
export interface JudoApplePayConfiguration {
    merchantId: string,
    countryCode: string,
    paymentSummaryItems: JudoPaymentSummaryItem[],
    merchantCapabilities?: JudoMerchantCapability[],
    requiredBillingContactFields?: JudoContactField,
    requiredShippingContactFields?: JudoContactField,
    shippingMethods?: JudoShippingMethod[],
    shippingType?: JudoShippingType
    returnedInfo?: JudoReturnedInfo,
}

export enum JudoPaymentSummaryItemType {
    Final,
    Pending,
}

export interface JudoPaymentSummaryItem {
    label: string,
    amount: string,
    type?: JudoPaymentSummaryItemType,
}

export enum JudoMerchantCapability {
    ThreeDS,
    EMV,
    Credit,
    Debit,
}

export enum JudoContactField {
    None = 0,
    PostalAddress = 1 << 0,
    Phone = 1 << 1,
    Email = 1 << 2,
    Name = 1 << 3,
    All = 1 << 4,
}

export interface JudoShippingMethod {
    identifier: string,
    detail: string,
    label: string,
    amount: string,
    type: JudoPaymentSummaryItemType
}

export enum JudoShippingType {
    Shipping,
    Delivery,
    StorePickup,
    ServicePickup,
}

export enum JudoReturnedInfo {
    None = 0,
    BillingDetails = 1 << 0,
    ShippingDetails = 1 << 1,
    All = 1 << 2,
}
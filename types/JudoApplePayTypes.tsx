
export interface JudoApplePayConfiguration {
    merchantId: string,
    countryCode: string,
    paymentSummaryItems: [JudoPaymentSummaryItem],
    merchantCapabilities?: [JudoMerchantCapability],
    requiredBillingContactFields?: [JudoContactField],
    requiredShippingContactFields?: [JudoContactField],
    shippingMethods?: [JudoShippingMethod],
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
    None,
    PostalAddress,
    Phone, Email,
    Name,
    All
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
    None,
    BillingDetails,
    ShippingDetails,
    All,
}
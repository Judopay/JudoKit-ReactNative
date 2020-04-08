import { JudoApplePayConfiguration } from './JudoApplePayTypes'

export interface JudoConfiguration {
    judoId: string,
    amount: JudoAmount,
    reference: JudoReference,
    siteId?: string,
    cardAddress?: JudoAddress,
    uiConfiguration?: JudoUIConfiguration,
    paymentMethods?: JudoPaymentMethod[],
    supportedCardNetworks?: JudoCardNetwork[],
    primaryAccountDetails?: JudoAccountDetails,
    applePayConfiguration?: JudoApplePayConfiguration,
}

export enum JudoTransactionType {
    Payment,
    PreAuth,
    RegisterCard,
    CheckCard,
    SaveCard,
}

export interface JudoAmount {
    value: string,
    currency: string,
}

export interface JudoReference {
    consumerReference: string,
    paymentReference: string,
    metadata?: any,
}

export interface JudoAddress {
    line1?: string,
    line2?: string,
    line3?: string,
    postCode?: string,
    town?: string,
    country?: string,
}

export interface JudoUIConfiguration {
    isAVSEnabled: boolean,
    shouldDisplayAmount: boolean,
    theme?: JudoTheme,
}

export interface JudoTheme {
    // TODO: Add theming options
}

export enum JudoPaymentMethod {
    Card,
    ApplePay,
    iDEAL,
}

export enum JudoCardNetwork {
    Visa,
    Mastercard,
    Amex,
    ChinaUnionPay,
    JCB,
    Discover,
    DinersClub,
}

export interface JudoAccountDetails {
    name?: string,
    accountNumber?: string,
    dateOfBirth?: string,
    postCode?: string,
}

export interface JudoResponse {
    receiptId: string,
    yourPaymentReference: string,
    type: string,
    createdAt: string,
    result: string,
    message?: string,
    judoId: string,
    siteId: string,
    merchantName: string,
    appearsOnStatementAs: string,
    originalAmount?: string,
    netAmount?: string,
    amount?: string,
    currency?: string,
    cardDetails?: any,
    consumer?: any,
    risks?: any,
    device?: any,
    paymentToken?: any
};
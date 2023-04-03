export enum JudoGooglePayEnvironment {
    TEST,
    PRODUCTION
}

export enum JudoAddressFormat {
    MIN,
    FULL
}

export interface JudoBillingAddressParameters {
    addressFormat: JudoAddressFormat
    isPhoneNumberRequired: boolean
}

export interface JudoShippingAddressParameters {
    allowedCountryCodes?: string[]
    isPhoneNumberRequired: boolean
}

export enum JudoGooglePayPriceStatus {
    FINAL,
    ESTIMATED,
    NOT_CURRENTLY_KNOWN
}

export enum JudoCheckoutOption {
    DEFAULT,
    COMPLETE_IMMEDIATE_PURCHASE
}

export interface JudoGooglePayConfiguration {
    environment: JudoGooglePayEnvironment
    merchantName?: string
    countryCode: string
    transactionId?: string
    totalPriceStatus: JudoGooglePayPriceStatus
    totalPriceLabel?: string
    checkoutOption?: JudoCheckoutOption
    isEmailRequired?: boolean
    isBillingAddressRequired: boolean
    billingAddressParameters?: JudoBillingAddressParameters
    isShippingAddressRequired: boolean
    shippingAddressParameters?: JudoShippingAddressParameters
    allowPrepaidCards?: boolean
    allowCreditCards?: boolean
}

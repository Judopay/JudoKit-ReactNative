export enum JudoGooglePayEnvironment {
    TEST,
    PRODUCTION
}

export enum JudoAddressFormat {
    MINIMAL,
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

export interface JudoGooglePayConfiguration {
    countryCode: string
    environment: JudoGooglePayEnvironment
    isEmailRequired: boolean
    isBillingAddressRequired: boolean
    billingAddressParameters?: JudoBillingAddressParameters
    isShippingAddressRequired: boolean
    shippingAddressParameters?: JudoShippingAddressParameters
}

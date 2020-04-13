export enum JudoGooglePayEnvironment {
    TEST,
    PRODUCTION,
}

export enum JudoAddressFormat {
    MINIMAL,
    FULL
}

export interface JudoBillingAddressParameters {
    addressFormat: JudoAddressFormat,
    isPhoneNumberRequired: Boolean,
}

export interface JudoShippingAddressParameters {
    allowedCountryCodes?: string[],
    isPhoneNumberRequired: Boolean,
}

export interface JudoGooglePayConfiguration {
    countryCode: string,
    environment: JudoGooglePayEnvironment,
    isEmailRequired: Boolean,
    isBillingAddressRequired: Boolean,
    billingAddressParameters?: JudoBillingAddressParameters,
    isShippingAddressRequired: Boolean,
    shippingAddressParameters?: JudoShippingAddressParameters,
}
import {
    JudoGooglePayConfiguration,
    JudoGooglePayEnvironment,
    JudoAddressFormat,
    JudoBillingAddressParameters,
    JudoShippingAddressParameters
} from 'judo-react-native'

const billingParameters: JudoBillingAddressParameters = {
    addressFormat: JudoAddressFormat.MINIMAL,
    isPhoneNumberRequired: true,
}

const shippingParameters: JudoShippingAddressParameters = {
    allowedCountryCodes: ["GB", "US"],
    isPhoneNumberRequired: false,
}

export const googlePayConfiguration: JudoGooglePayConfiguration = {
    countryCode: 'GB',
    environment: JudoGooglePayEnvironment.TEST,
    isEmailRequired: true,
    isBillingAddressRequired: true,
    billingAddressParameters: billingParameters,
    isShippingAddressRequired: true,
    shippingAddressParameters: shippingParameters
}
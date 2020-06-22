import 'react-native'

import {
  JudoGooglePayConfiguration,
  JudoGooglePayEnvironment,
  JudoBillingAddressParameters,
  JudoShippingAddressParameters,
  JudoAddressFormat
} from '../types/JudoGooglePayTypes'

const billingAddressParams: JudoBillingAddressParameters = {
  addressFormat: JudoAddressFormat.FULL,
  isPhoneNumberRequired: true
}

const shippingAddressParams: JudoShippingAddressParameters = {
  allowedCountryCodes: ["code1", "code2"],
  isPhoneNumberRequired: false
}

test('check JudoAddressFormat model fields', () => {
  expect(Object.keys(JudoAddressFormat)).toStrictEqual(["0", "1", "MINIMAL", "FULL"])
});

test('check JudoGooglePayEnvironment model fields', () => {
  expect(Object.keys(JudoGooglePayEnvironment)).toStrictEqual(["0", "1", "TEST", "PRODUCTION"])
});

test('check JudoBillingAddressParameters model fields', () => {
  expect(Object.keys(billingAddressParams).length).toBe(2)
});

test('check JudoShippingAddressParameters model fields', () => {
  expect(Object.keys(shippingAddressParams).length).toBe(2)
});

test('check JudoGooglePayConfiguration model fields', () => {
  const judoResponse: JudoGooglePayConfiguration = {
    countryCode: "Code",
    environment: JudoGooglePayEnvironment.PRODUCTION,
    isEmailRequired: false,
    isBillingAddressRequired: false,
    billingAddressParameters: billingAddressParams,
    isShippingAddressRequired: true,
    shippingAddressParameters: shippingAddressParams
  }

  expect(Object.keys(judoResponse).length).toBe(7)
});

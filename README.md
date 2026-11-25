# JudoKit-ReactNative

[![npm version](https://badge.fury.io/js/judokit-react-native.svg)](https://www.npmjs.com/package/judokit-react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-%3E%3D0.86-blue.svg)](https://reactnative.dev)
[![npm unpacked size](https://img.shields.io/npm/unpacked-size/judokit-react-native)](https://www.npmjs.com/package/judokit-react-native)
[![GitHub Actions](https://github.com/Judopay/JudoKit-ReactNative/actions/workflows/build-test-sdk.yml/badge.svg)](https://github.com/Judopay/JudoKit-ReactNative/actions/workflows/build-test-sdk.yml)

[![NPM](https://nodei.co/npm/judokit-react-native.png?downloads=true&mini=true)](https://nodei.co/npm/judokit-react-native/)

A React Native module for the Judopay native [JudoKit-iOS](https://github.com/Judopay/JudoKit-iOS) and [JudoKit-Android](https://github.com/Judopay/JudoKit-Android) to process payments on iOS and Android.

## Requirements

| | Minimum |
| --- | --- |
| React Native | 0.86 |
| iOS | 15.1 (the React Native `min_ios_version_supported`) |
| Android | API 24 (`minSdkVersion`), `compileSdkVersion` 37 |
| Node.js | 22.11 |

Under the hood the module uses [JudoKit-iOS](https://github.com/Judopay/JudoKit-iOS) 6.6.0 and [JudoKit-Android](https://github.com/Judopay/JudoKit-Android) 7.4.0.

> Expo Go is not supported, because the module contains native code. Use a development build instead.

## Installation

```sh
yarn add judokit-react-native
# or
npm install judokit-react-native
```

### iOS

Install the native dependencies:

```sh
cd ios && bundle exec pod install
```

### Android

No extra setup is needed; the module is autolinked.

If your app is on Android Gradle Plugin 9 (the React Native 0.88 template default), keep these opt-outs from the template in `android/gradle.properties`:

```properties
android.builtInKotlin=false
android.newDsl=false
```

## Sandbox vs. production

`JudoPay` runs against the **sandbox** environment by default. Switch it off before going live:

```ts
judoKit.isSandboxed = false;
```

## Usage
```ts
import JudoPay, {JudoTransactionType} from 'judokit-react-native';

const judoKit = new JudoPay({
  token: 'your-judo-token',
  paymentSession: 'your-payment-session',
});

judoKit
  .invokeTransaction(JudoTransactionType.Payment, {
    judoId: '123456',
    amount: {
      value: '1.50',
      currency: 'GBP',
    },
    reference: {
      paymentReference: 'your-payment-reference',
      consumerReference: 'your-consumer-reference',
    },
  })
  .then(
    response => {
      console.log(response);
    },
    error => {
      console.error(error);
    },
  );

```

### Available methods

| Method | Description |
| --- | --- |
| `invokeTransaction(type, configuration)` | Opens the card entry UI for a payment, pre-auth, register card, save card or check card. |
| `performTokenTransaction(mode, configuration, cardToken, securityCode, cardholderName, cardScheme)` | Makes a payment or pre-auth with a saved card token. |
| `invokeApplePay(mode, configuration)` | Starts an Apple Pay payment or pre-auth (iOS). Needs `applePayConfiguration`. |
| `isApplePayAvailableWithConfiguration(configuration)` | Checks whether Apple Pay can be used with the given configuration (iOS). |
| `invokeGooglePay(mode, configuration)` | Starts a Google Pay payment or pre-auth (Android). Needs `googlePayConfiguration`. |
| `invokePaymentMethodScreen(mode, configuration)` | Opens the payment method screen (cards, Apple Pay or Google Pay). |
| `fetchTransactionDetails(receiptId)` | Fetches the details of a transaction by its receipt ID. |

All methods return a `Promise` that resolves with a `JudoResponse`; `isApplePayAvailableWithConfiguration` resolves with a `boolean`.

## Example
Below is a simple example to showcase the basic usage of the library.
```tsx
import JudoPay, {
  JudoAmount,
  JudoAuthorization,
  JudoConfiguration,
  JudoReference,
  JudoTransactionType,
} from 'judokit-react-native';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

const authorization: JudoAuthorization = {
  token: 'your-judo-token',
  paymentSession: 'your-payment-session',
};

const judoKit = new JudoPay(authorization);

function App(): React.JSX.Element {
  const invokeJudoKit = () => {
    const amount: JudoAmount = {value: '1.50', currency: 'GBP'};
    const reference: JudoReference = {
      paymentReference: 'your-payment-reference',
      consumerReference: 'your-consumer-reference',
    };

    const configuration: JudoConfiguration = {
      amount,
      judoId: '123456',
      reference,
    };

    judoKit.invokeTransaction(JudoTransactionType.Payment, configuration).then(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      },
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Invoke JudoKit" onPress={invokeJudoKit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

```

## Contributing
If you want to contribute to this project, follow instructions from [CONTRIBUTING](https://github.com/Judopay/JudoKit-ReactNative/blob/master/CONTRIBUTING.md) file.

## See also

- [JudoKit-ReactNative documentation](https://docs.judopay.com/Content/Mobile/React_Native.htm)
- [Judopay Transaction API documentation](https://docs.judopay.com/api-reference/index.html)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Judopay/JudoKit-ReactNative/blob/master/LICENSE) file for details.

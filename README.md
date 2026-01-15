# JudoKit-ReactNative

[![npm version](https://badge.fury.io/js/judokit-react-native.svg)](https://www.npmjs.com/package/judokit-react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-%3E%3D0.70-blue.svg)](https://facebook.github.io/react-native/)
[![install size](https://packagephobia.com/badge?p=judokit-react-native)](https://packagephobia.com/result?p=judokit-react-native)
[![GitHub Actions](https://github.com/Judopay/JudoKit-ReactNative/actions/workflows/build-test-sdk.yml/badge.svg)](https://github.com/Judopay/JudoKit-ReactNative/actions/workflows/build-test-sdk.yml)

[![NPM](https://nodei.co/npm/judokit-react-native.png?downloads=true&mini=true)](https://nodei.co/npm/judokit-react-native/)

A React Native module for the Judopay native [JudoKit-iOS](https://github.com/Judopay/JudoKit-iOS) and [JudoKit-Android](https://github.com/Judopay/JudoKit-Android) to process payments on iOS and Android.

## Installation

```sh
yarn add judokit-react-native
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

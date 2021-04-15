# JudoPay React Native module

JudoPay's React Native module and sample app. This module is a wrapper around the JudoKit-iOS library on iOS and the JudoKit-Android library on Android.

## Features

- Card transactions *(Payment, PreAuth, Save Card, Register Card, Check Card)*;
- Token payments/pre-auths;
- Apple Pay;
- Google Pay;
- iDEAL;
- Pay By Bank App;
- 3DS;
- Server-to-server transactions;
- Payment Method Selection screen;

## Getting started

-   `yarn add judokit-react-native`

    or if you use npm: `npm install judokit-react-native --save`

### iOS

-   Make sure that the minimum deployment target is set to `11.0` or higher in your `ios/Podfile` :

    `platform :ios, '11.0'`

-   Install Cocopods

    `cd ios && pod install`

### Android

-   Make sure that `minSdkVersion` is set to 19 or higher in your `android/build.gradle`:

    ```
    buildscript {
        ext {
            buildToolsVersion = "29.0.3"
            minSdkVersion = 19
            compileSdkVersion = 29
            targetSdkVersion = 29
        }
        ...
    }
    ```

-   Add the Judopay maven repository to `allprojects / repositories` in your `android/build.gradle`:

    ```
    allprojects {
        repositories {
            mavenLocal()
            google()
            jcenter()
            maven { url 'https://jitpack.io' }
            maven {
                // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
                url("$rootDir/../node_modules/react-native/android")
            }
            maven {
                // Android JSC is installed from npm
                url("$rootDir/../node_modules/jsc-android/dist")
            }
        }
    }

    ```

## Update an existing project

`yarn upgrade judokit-react-native`

### iOS

-   Update Cocoapods

    `cd ios && pod update JudoKit-iOS`

### Android

- Rebuild your project

## Usage

For a detailed description of all features, visit [our documentation](https://docs.judopay.com/) or try out the sample app attached to the package.

```ts

import Judo, {
  JudoAuthorization,
  JudoTransactionType,
} from 'judokit-react-native'

// 1. Create a Judo session by providing an authorization object (basic or session)
const auth: JudoAuthorization = {token: 'YOUR-TOKEN', secret: 'YOUR_SECRET'}
const judo = new Judo(auth)

// 2. Set the Judo session to sandbox mode for testing
judo.isSandboxed = true

// 3. Create a Judo configuration to setup your payment flow
const amount: JudoAmount = {
    value: '0.01',
    currency: 'GBP',
}

const reference: JudoReference = {
    consumerReference: 'MY-CONSUMER-REFERENCE',
    paymentReference: 'MY-PAYMENT-REFERENCE'
}

const configuration: JudoConfiguration = {
    judoId: 'MY-JUDO-ID',
    amount: amount,
    reference: reference
}

// 4. Invoke a payment transaction and handle the result
judo.invokeTransaction(JudoTransactionType.Payment, configuration)
    .then((response) => {
        // Handle response
    })
    .catch((error) => {
       // Handle error
    });
```

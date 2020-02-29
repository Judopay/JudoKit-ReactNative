# Judopay React Native module

Judopay's React Native module and sample app. This module is a wrapper around the JudoKitObjC library on iOS and the Judo-Android library on Android.

## Getting started

- `yarn add judo-react-native`

    or if you use npm: `npm install judo-react-native --save`

### iOS

- Make sure that the minimum deployment target is set to `11.0` or higher in your `ios/Podfile` :

    `platform :ios, '11.0'`

- Install Cocopods

    `cd ios && pod install`

### Android

- Make sure that `minSdkVersion` is set to 19 or higher in your `android/build.gradle`:

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

-  Add the Judopay maven repository to `allprojects / repositories` in your `android/build.gradle`:

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
            maven { url 'http://dl.bintray.com/judopay/maven' }
        }
    }

    ```

## Update an existing project

`yarn upgrade judo-react-native`

### iOS

- Update Cocoapods

    `cd ios && pod update JudoKitObjC`

### Android

- Rebuild your project

## Usage

with Flow

```javascript
// @flow
import { Judopay, type JudoConfig } from "judo-react-native";

async makePayment() {
    const options: JudoConfig = {
        token: "<API_TOKEN>",
        secret: "<API_SECRET>",
        judoId: "<JUDO_ID>",
        siteId: "<SITE_ID>",
        isSandbox: true,
        amount: "0.01",
        currency: "GBP",
        consumerReference: "myCustomerReference"
	};

    try {
        let response = await Judopay.makePayment({
            ...options,
            paymentReference: "myUniquePaymentReference"
        });

        if (response.result === "Success") {
            console.log(`Payment successful. ReceiptId: ${response.receiptId}`);
        } else {
            console.log("Payment error");
        }
    } catch (e) {
        if (e.code === "JUDO_USER_CANCELLED") {
            // do nothing
            return;
        } else if (e.code === "JUDO_ERROR" && e.userInfo && e.userInfo.result === "Declined") {
            console.log("Card declined. Please try again and make sure the card details are correct.");
        } else {
            const message = e.message || "Something went wrong. Please try again later.";
            console.log(`Oops... ${message}`);
        }
    }
};
```

with TypeScript

Coming soon...

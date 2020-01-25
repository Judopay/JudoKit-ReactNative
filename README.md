# Judopay React Native module

Judopay's React Native module and sample app. This module is a wrapper around the JudoKitObjC library on iOS and the Judo-Android library on Android.

## Getting started

`yarn add judo-react-native`

or

`npm install judo-react-native --save`

### Mostly automatic installation

`react-native link judo-react-native`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `judo-react-native` and add `RNJudo.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNJudo.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

 - Add `import com.reactlibrary.JudoReactNativePackage;` to the imports at the top of the file
 - Add `new JudoReactNativePackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':judo-react-native'
   project(':judo-react-native').projectDir = new File(rootProject.projectDir, 	'../node_modules/judo-react-native/android')
   ```

3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     compile project(':judo-react-native')
   ```

## Usage

```javascript
// @flow
import { Judopay, type JudoConfig } from "judo-react-native";

async makePayment() {
    const options: JudoConfig = {
        token: "<API_TOKEN>",
        secret: "<API_SECRET>",
        judoId: "<JUDO_ID>",
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

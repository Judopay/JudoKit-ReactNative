# Judopay React Native module

Judopay's React Native module and sample app. This module is a wrapper around the JudoKitObjC library on iOS and the Judo-Android library on Android.

## Getting started

`$ npm install judo-react-native --save`

### Mostly automatic installation

`$ react-native link judo-react-native`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `judo-react-native` and add `RNJudo.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNJudo.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

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
import RNJudo from "judo-react-native";
import { showMessage } from "../utils";

async makePayment() {
	const options = {
		token: "<API_TOKEN>",
		secret: "<API_SECRET>",
		judoId: "<JUDO_ID>",
		isSandbox: true,
		amount: "0.01",
		currency: "GBP",
		consumerReference: "myCustomerReference"
	};

	try {
		let response = await RNJudo.makePayment(options);
		if (response.result === "Success") {
			await showMessage("Payment successful", `ReceiptId: ${response.receiptId}`);
		} else {
			await showMessage("Payment error", response.result);
		}
	} catch (e) {
		if (e.code === "JUDO_USER_CANCELLED") {
			// do nothing when the user cancels
			return;
		} else if (e.code === "JUDO_ERROR" && e.userInfo.result === "Declined") {
			await showMessage(
				"Payment failed",
				"Card declined. Please try again and make sure the card details are correct."
			);
		} else {
			let message = e.message ?? "Something went wrong. Please try again later.";
			await showMessage("Oops...", message);
		}
	}
}
```

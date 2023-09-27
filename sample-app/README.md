# Sample App & UI Tests
The sample app is a great tool to test the various integrations on offer and get a flavour of how the components perform on a real device using React Native.

## Running the app
The sample app is a React Native app and can be run on both iOS and Android.

Install all dependencies with:
```
yarn install
```
followed by:
```
cd ios && pod install && cd ..
```
also update Pods with:
```
npm run update-ios
```
finally start the app with:
```
yarn start
```

### iOS
Open the `sample-app/ios/sampleapp.xcworkspace` workspace in XCode and run the app.

### Android
Open the `sample-app/android` folder in Android Studio and run the app.

## Running the UI tests
The UI tests are written in [Detox](https://wix.github.io/Detox/) and can be run on both iOS and Android. They cover most of the functionality of the sample app and are a great way to see how the components work in practice.

Having setup the sample app as above, you should already have all the required dependencies installed. For whichever platform you're executing the tests against, make sure you have a simulator open and ready to go. To execute the tests, simply run:

```
detox test --configuration ios.sim.debug
```
for iOS or 
```
detox test --configuration android.sim.debug
```
for Android.

You can also add `--record-videos failing --take-screenshots failing` to the CLI command which will save screenshots and videos to the `/artifacts` folder for any failing tests.

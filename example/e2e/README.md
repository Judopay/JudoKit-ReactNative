# Getting started

Follow the example app setup instructions in the main `/example` directory to get both iOS and Android apps up and running on your local machine.

## Running the tests

**Build the apps**

```bash
# iOS
detox build --configuration ios.sim.debug

# Android
detox build --configuration android.emu.debug
```

**Run the tests**

```bash
# iOS
detox test --configuration ios.sim.debug 

# Android
detox test --configuration android.emu.debug 
```

## Configuration changes

You can change the build commands, simulators and other settings in `.detoxrc.js` Detox config.

```javascript
...
devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_34',
      },
    },
  },
...
```

## Using custom settings for the sample app

As Detox cannot see or interact directly with the example app codebase, there is a mechanism in place to pass variables via Detox's [launchArguments](https://wix.github.io/Detox/docs/guide/launch-args), and read these in the app using the [react-native-launch-arguments](https://github.com/iamolegga/react-native-launch-arguments) package. This is used to preconfigure settings for the app prior to each test.

```javascript
// functional.test.ts
await launchApp(defaultConfig);

// helpers.ts
export async function launchApp(config: string) {
  await device.launchApp({
    launchArgs: {
      customSettings: config,
    },
  });
}
```

Usable settings JSONs can be found in `/configs`, these are Base64 encoded and then decoded when read by the app in `/example/src/Application/index.tsx`

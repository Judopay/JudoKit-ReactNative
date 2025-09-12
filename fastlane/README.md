fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### clean

```sh
[bundle exec] fastlane clean
```

Cleanup generated files

### install

```sh
[bundle exec] fastlane install
```

Install SDK and Sample App dependencies

### lint

```sh
[bundle exec] fastlane lint
```

Lint SDK

### format

```sh
[bundle exec] fastlane format
```

Auto format code

### build

```sh
[bundle exec] fastlane build
```

Build SDK

### test

```sh
[bundle exec] fastlane test
```

Run SDK tests

### publish

```sh
[bundle exec] fastlane publish
```

Publish SDK

### build_sample_apps

```sh
[bundle exec] fastlane build_sample_apps
```

Build Sample Apps

### test_sample_apps

```sh
[bundle exec] fastlane test_sample_apps
```

Test Sample Apps

### test_sample_apps_simulator

```sh
[bundle exec] fastlane test_sample_apps_simulator
```

Run instrumented tests for sample apps on simulators

### publish_sample_apps

```sh
[bundle exec] fastlane publish_sample_apps
```

Publish Sample Apps

----


## iOS

### ios build_sample_app

```sh
[bundle exec] fastlane ios build_sample_app
```

[iOS] Build Sample App

### ios test_sample_app

```sh
[bundle exec] fastlane ios test_sample_app
```

[iOS] Test Sample App

### ios test_sample_app_simulator

```sh
[bundle exec] fastlane ios test_sample_app_simulator
```

[iOS] Run instrumented tests for a sample app on a simulator

### ios publish_sample_app

```sh
[bundle exec] fastlane ios publish_sample_app
```

[iOS] Publish Sample App

----


## Android

### android build_sample_app

```sh
[bundle exec] fastlane android build_sample_app
```

[Android] Build Sample App

### android test_sample_app_simulator

```sh
[bundle exec] fastlane android test_sample_app_simulator
```

[Android] Run instrumented tests for a sample app on a simulator

### android publish_sample_app

```sh
[bundle exec] fastlane android publish_sample_app
```

[Android] Publish Sample App

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).

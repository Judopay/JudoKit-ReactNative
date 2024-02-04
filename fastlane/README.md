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

### release

```sh
[bundle exec] fastlane release
```

Release SDK

### distribute_sample_apps

```sh
[bundle exec] fastlane distribute_sample_apps
```

Distribute Sample Apps

----


## iOS

### ios build_sample_app

```sh
[bundle exec] fastlane ios build_sample_app
```

[iOS] Build Sample App

### ios distribute_sample_app

```sh
[bundle exec] fastlane ios distribute_sample_app
```

[iOS] Distribute Sample App

----


## Android

### android build_sample_app

```sh
[bundle exec] fastlane android build_sample_app
```

[Android] Build Sample App

### android distribute_sample_app

```sh
[bundle exec] fastlane android distribute_sample_app
```

[Android] Distribute Sample App

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).

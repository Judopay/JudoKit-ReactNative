import React, { useEffect, useState } from 'react';
import { Alert, useColorScheme } from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import 'react-native-gesture-handler';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';
import ApplicationRouter from './ApplicationRouter';
import { MMKVLoader } from 'react-native-mmkv-storage';
import {
  IS_IOS,
  IS_STORAGE_INITIATED_WITH_DEFAULTS_KEY,
} from '../Data/Constants';
import { LaunchArguments } from '@adeptus_artifex/react-native-launch-arguments';
import {
  getSettingsFromEnv,
  MyExpectedArgs,
  resetAppSettingsToDefaults,
} from '../Functions';
import { getBoolOrFalse } from '../Data/Mapping';

const args = LaunchArguments.value<MyExpectedArgs>();
export const appStorage = new MMKVLoader().initialize();

const Application = () => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(DefaultTheme);

  useEffect(() => {
    setTheme(scheme === 'dark' ? DarkTheme : DefaultTheme);
  }, [scheme]);

  const requestPostNotificationsPermissionsIfNeeded = () => {
    const title = 'Permissions needed';
    const message =
      'Post notification permissions needed for the network request debug tool.';
    const buttonNegative = 'Cancel';
    const buttonPositive = 'OK';

    // @ts-ignore
    check('android.permission.POST_NOTIFICATIONS')
      .then((result) => {
        if (result === RESULTS.DENIED) {
          // @ts-ignore
          request(`android.permission.POST_NOTIFICATIONS`, {
            buttonNegative,
            buttonPositive,
            title,
            message,
          })
            .then((status) => {
              if (status === RESULTS.BLOCKED || status === RESULTS.LIMITED) {
                Alert.alert(title, message, [
                  { text: buttonPositive, onPress: () => openSettings() },
                ]);
              }
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  const requestiOSCameraAndLocationPermissionsIfNeeded = () => {
    const title = 'Permissions needed';
    const message =
      'Camera and location permissions needed for the scan card and device details.';
    const buttonNegative = 'Cancel';
    const buttonPositive = 'OK';

    check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        if (result === RESULTS.DENIED) {
          request(PERMISSIONS.IOS.CAMERA, {
            buttonNegative,
            buttonPositive,
            title,
            message,
          })
            .then((status) => {
              if (status === RESULTS.BLOCKED || status === RESULTS.LIMITED) {
                Alert.alert(title, message, [
                  { text: buttonPositive, onPress: () => openSettings() },
                ]);
              }
            })
            .catch(console.error);
        }
      })
      .catch(console.error);

    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        if (result === RESULTS.DENIED) {
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, {
            buttonNegative,
            buttonPositive,
            title,
            message,
          })
            .then((status) => {
              if (status === RESULTS.BLOCKED || status === RESULTS.LIMITED) {
                Alert.alert(title, message, [
                  { text: buttonPositive, onPress: () => openSettings() },
                ]);
              }
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (IS_IOS) {
      requestiOSCameraAndLocationPermissionsIfNeeded();
      return;
    }

    requestPostNotificationsPermissionsIfNeeded();
  }, []);

  useEffect(() => {
    const customDefaults = getSettingsFromEnv(args);
    if (customDefaults) {
      resetAppSettingsToDefaults(customDefaults);

      // so that the settings are not reset on every app launch
      appStorage.setBool(IS_STORAGE_INITIATED_WITH_DEFAULTS_KEY, true);
      return;
    }

    if (!getBoolOrFalse(IS_STORAGE_INITIATED_WITH_DEFAULTS_KEY)) {
      resetAppSettingsToDefaults();
    }
  }, []);

  return (
    <ThemeProvider value={theme}>
      <ApplicationRouter theme={theme} />
    </ThemeProvider>
  );
};

export default Application;

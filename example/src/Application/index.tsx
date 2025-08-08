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
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import {
  IS_IOS,
  DEFAULT_SETTINGS_DATA,
  STORAGE_SETTINGS_KEY,
} from '../Data/Constants';
import { LaunchArguments } from 'react-native-launch-arguments';
import { getSettingsFromEnv, MyExpectedArgs } from '../Functions';

const args = LaunchArguments.value<MyExpectedArgs>();
export const appStorage = new MMKVLoader().initialize();

const Application = () => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(DefaultTheme);
  const [_, setSettingsModel] = useMMKVStorage(
    STORAGE_SETTINGS_KEY,
    appStorage,
    DEFAULT_SETTINGS_DATA
  );

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
    const loadSettings = async () => {
      const settings = getSettingsFromEnv(args);
      if (settings) {
        setSettingsModel(settings);
      }
    };

    loadSettings().catch(console.error);
  }, [setSettingsModel]);

  return (
    <ThemeProvider value={theme}>
      <ApplicationRouter theme={theme} />
    </ThemeProvider>
  );
};

export default Application;

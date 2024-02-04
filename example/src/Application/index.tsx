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
import { IS_IOS } from '../Data/Constants';

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

    check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
      .then((result) => {
        if (result === RESULTS.DENIED) {
          request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS, {
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
      return;
    }

    requestPostNotificationsPermissionsIfNeeded();
  }, []);

  return (
    <ThemeProvider value={theme}>
      <ApplicationRouter theme={theme} />
    </ThemeProvider>
  );
};

export default Application;

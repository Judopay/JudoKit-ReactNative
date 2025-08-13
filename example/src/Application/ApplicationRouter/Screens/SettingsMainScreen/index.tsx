import React, { FC, useEffect, useState } from 'react';
import SettingsTable from '../../../../Components/SettingsTable';
import { buildSettingsSections } from '../../../../Data/SettingsSections';
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions';
import { useTheme } from '@react-navigation/native';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { encode as btoa } from 'base-64';
import { onErrorSnackbar, onSuccessSnackbar } from '../../../../Functions';
import {
  DEFAULT_SETTINGS_DATA,
  STORAGE_SETTINGS_KEY,
} from '../../../../Data/Constants';
import { appStorage } from '../../../index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMMKVStorage } from 'react-native-mmkv-storage';

const generateRandomString = (length: number = 36) => {
  const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const random = Array.from(
    { length },
    () => char[Math.floor(Math.random() * char.length)]
  );
  return random.join('');
};

const SettingsMainScreen: FC<
  NativeStackScreenProps<RootStackParamList, Screen.SETTINGS>
> = ({ navigation }) => {
  const { goBack, canGoBack } = navigation;
  const [isLoading, setIsLoading] = useState(false);
  const {
    colors: { background: backgroundColor, primary },
  } = useTheme();
  const [settings, setSettings] = useMMKVStorage(
    STORAGE_SETTINGS_KEY,
    appStorage,
    DEFAULT_SETTINGS_DATA
  );

  const generatePaymentSession = () => {
    setIsLoading(true);

    fetchAndPersistSession()
      .then(() => {
        onSuccessSnackbar('Payment session created.');
        if (canGoBack()) {
          goBack();
        }
      })
      .catch(onErrorSnackbar)
      .finally(() => setIsLoading(false));
  };

  const fetchAndPersistSession = async () => {
    const {
      authorization: { token = '', secret = '' },
      amount: { currency = '', value: amount = '' },
      apiConfiguration: { isSandboxed = true, judoId = '' },
      reference: { consumerReference: yourConsumerReference = '' },
    } = settings;

    if (token.length === 0) {
      throw new Error('Token is not set.');
    }

    if (secret.length === 0) {
      throw new Error('Secret is not set.');
    }

    if (judoId.length === 0) {
      throw new Error('Judo ID is not set.');
    }

    if (amount.length === 0) {
      throw new Error('Amount is not set.');
    }

    if (currency.length === 0) {
      throw new Error('Currency is not set.');
    }

    if (yourConsumerReference.length === 0) {
      throw new Error('Consumer reference is not set.');
    }

    const apiHost = isSandboxed ? 'api-sandbox.judopay.com' : 'api.judopay.com';

    const yourPaymentReference = generateRandomString();

    const body = JSON.stringify({
      judoId,
      amount,
      currency,
      yourConsumerReference,
      yourPaymentReference,
    });

    const result = await fetch(`https://${apiHost}/webpayments/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Version': '6.22.0',
        'Authorization': `Basic ${btoa(`${token}:${secret}`)}`,
      },
      body,
    });

    if (result.ok) {
      const response = (await result.json()) as Record<'reference', string>;

      const updatedSettings = {
        ...settings,
        reference: {
          ...settings.reference,
          paymentReference: yourPaymentReference,
        },
        authorization: {
          ...settings.authorization,
          isUsingPaymentSession: true,
          isUsingTokenAndSecret: false,
          paymentSession: response.reference,
        },
      };

      setSettings(updatedSettings);
    } else {
      throw new Error('Failed to create payment session.');
    }
  };

  const headerRight = () => {
    return isLoading ? (
      <ActivityIndicator
        size={28}
        color={primary}
        style={{
          marginRight: 18,
        }}
      />
    ) : (
      <TouchableOpacity
        disabled={isLoading}
        testID="generateSessionButton"
        onPress={() => {
          generatePaymentSession();
        }}
      >
        <Ionicons name="color-wand-outline" size={28} color={primary} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({ headerRight });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isLoading]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <SettingsTable transformationFunction={buildSettingsSections} />
    </SafeAreaView>
  );
};

export default SettingsMainScreen;

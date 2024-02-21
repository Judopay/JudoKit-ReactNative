import React, { FC, useEffect, useState } from 'react';
import SettingsTable from '../../../../Components/SettingsTable';
import { buildSettingsSections } from '../../../../Data/SettingsSections';
import { StackScreenProps } from '@react-navigation/stack';
import {
  RootStackParamList,
  Screen,
  SettingsData,
} from '../../../../Data/TypeDefinitions';
import { useTheme } from '@react-navigation/native';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { encode as btoa } from 'base-64';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { STORAGE_SETTINGS_KEY } from '../../../../Data/Constants';
import { onErrorSnackbar, onSuccessSnackbar } from '../../../../Functions';

const generateRandomString = (length: number = 36) => {
  const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const random = Array.from(
    { length },
    () => char[Math.floor(Math.random() * char.length)]
  );
  return random.join('');
};

const SettingsMainScreen: FC<
  StackScreenProps<RootStackParamList, Screen.SETTINGS>
> = ({ navigation }) => {
  const { setItem, getItem } = useAsyncStorage(STORAGE_SETTINGS_KEY);
  const { goBack, canGoBack } = navigation;
  const [isLoading, setIsLoading] = useState(false);
  const {
    colors: { background: backgroundColor, primary },
  } = useTheme();

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
    const settings = await getItem();
    const parsedSettings: SettingsData = JSON.parse(settings || '{}');

    if (Object.keys(parsedSettings).length === 0) {
      throw new Error('Failed to read stored settings.');
    }

    const {
      authorization: { token = '', secret = '' },
      amount: { currency = '', value: amount = '' },
      apiConfiguration: { isSandboxed = true, judoId = '' },
      reference: { consumerReference: yourConsumerReference = '' },
    } = parsedSettings;

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
        'Api-Version': '6.20.0',
        'Authorization': `Basic ${btoa(`${token}:${secret}`)}`,
      },
      body,
    });

    if (result.ok) {
      const response = await result.json();

      const updatedSettings = {
        ...parsedSettings,
        reference: {
          ...parsedSettings.reference,
          paymentReference: yourPaymentReference,
        },
        authorization: {
          ...parsedSettings.authorization,
          isUsingPaymentSession: true,
          isUsingTokenAndSecret: false,
          paymentSession: response.reference,
        },
      };

      const stringifySettings = JSON.stringify(updatedSettings);
      await setItem(stringifySettings);
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
      <Icon.Button
        disabled={isLoading}
        name="color-wand-outline"
        size={28}
        color={primary}
        backgroundColor="transparent"
        selectionColor="transparent"
        underlayColor="transparent"
        onPress={() => {
          generatePaymentSession();
        }}
      />
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

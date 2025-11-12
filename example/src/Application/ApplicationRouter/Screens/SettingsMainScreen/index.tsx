import React, { FC, useEffect, useState } from 'react';
import SettingsTable from '../../../../Components/SettingsTable';
import { buildSettingsSections } from '../../../../Data/SettingsSections';
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions';
import { useTheme } from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { encode as btoa } from 'base-64';
import {
  onErrorSnackbar,
  onSuccessSnackbar,
  resetAppSettingsToDefaults,
} from '../../../../Functions';
import {
  AMOUNT_KEYS,
  API_CONFIGURATION_KEYS,
  AUTHORIZATION_KEYS,
  REFERENCE_KEYS,
} from '../../../../Data/Constants';
import { appStorage } from '../../../index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { HStack } from '../../../../Components/HStack';

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

  const [token] = useMMKVStorage(AUTHORIZATION_KEYS.TOKEN, appStorage, '');
  const [secret] = useMMKVStorage(AUTHORIZATION_KEYS.SECRET, appStorage, '');
  const [judoId] = useMMKVStorage(
    API_CONFIGURATION_KEYS.JUDO_ID,
    appStorage,
    ''
  );
  const [amount] = useMMKVStorage(AMOUNT_KEYS.VALUE, appStorage, '');
  const [currency] = useMMKVStorage(AMOUNT_KEYS.CURRENCY, appStorage, '');
  const [isSandboxed] = useMMKVStorage(
    API_CONFIGURATION_KEYS.IS_SANDBOXED,
    appStorage,
    false
  );
  const [yourConsumerReference] = useMMKVStorage(
    REFERENCE_KEYS.CONSUMER_REFERENCE,
    appStorage,
    ''
  );

  const [, setPaymentReference] = useMMKVStorage<string>(
    REFERENCE_KEYS.PAYMENT_REFERENCE,
    appStorage
  );
  const [, setIsUsingPaymentSession] = useMMKVStorage<boolean>(
    AUTHORIZATION_KEYS.IS_USING_PAYMENT_SESSION,
    appStorage
  );
  const [, setIsUsingTokenAndSecret] = useMMKVStorage<boolean>(
    AUTHORIZATION_KEYS.IS_USING_TOKEN_AND_SECRET,
    appStorage
  );
  const [, setPaymentSession] = useMMKVStorage<string>(
    AUTHORIZATION_KEYS.PAYMENT_SESSION,
    appStorage
  );

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all app settings to their default values? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetAppSettingsToDefaults();
            onSuccessSnackbar('Settings reset to defaults successfully.');
          },
        },
      ]
    );
  };

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

      setPaymentReference(yourPaymentReference);
      setIsUsingPaymentSession(true);
      setIsUsingTokenAndSecret(false);
      setPaymentSession(response.reference);
    } else {
      throw new Error('Failed to create payment session.');
    }
  };

  const headerRight = () => (
    <HStack spacing={16} style={{ justifyContent: 'space-between' }}>
      <TouchableOpacity
        disabled={isLoading}
        testID="resetSettingsButton"
        onPress={handleResetSettings}
      >
        <Ionicons name="refresh-circle-outline" size={28} color={primary} />
      </TouchableOpacity>
      {isLoading ? (
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
      )}
    </HStack>
  );

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

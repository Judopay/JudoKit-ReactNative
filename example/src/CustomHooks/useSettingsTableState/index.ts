import { useEffect, useState } from 'react';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { appStorage } from '../../Application';
import {
  AUTHORIZATION_KEYS,
  RECOMMENDATION_KEYS,
  CARD_ADDRESS_KEYS,
  PRIMARY_ACCOUNT_DETAILS_KEYS,
  THREE_DS_TWO_KEYS,
  APPLE_PAY_KEYS,
} from '../../Data/Constants';

export const useSettingsTableState = <T>(transformationFunction: () => T) => {
  // values that should trigger a re-render of the settings table to display or hide certain settings items
  const [isTokenAndSecretOn, setIsTokenAndSecretOn] = useMMKVStorage<boolean>(
    AUTHORIZATION_KEYS.IS_USING_TOKEN_AND_SECRET,
    appStorage
  );
  const [isPaymentSessionOn, setIsPaymentSessionOn] = useMMKVStorage<boolean>(
    AUTHORIZATION_KEYS.IS_USING_PAYMENT_SESSION,
    appStorage
  );

  const [isRecommendationOn] = useMMKVStorage<boolean>(
    RECOMMENDATION_KEYS.IS_ON,
    appStorage
  );
  const [isCardAddressOn] = useMMKVStorage<boolean>(
    CARD_ADDRESS_KEYS.IS_ENABLED,
    appStorage
  );
  const [isPrimaryAccountDetailsOn] = useMMKVStorage<boolean>(
    PRIMARY_ACCOUNT_DETAILS_KEYS.IS_ENABLED,
    appStorage
  );
  const [is3DSUICustomizationOn] = useMMKVStorage<boolean>(
    THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.IS_ENABLED,
    appStorage
  );
  const [isRecurringPaymentOn] = useMMKVStorage<boolean>(
    APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.IS_ON,
    appStorage
  );
  const [isRecurringPaymentRegularBillingOn] = useMMKVStorage<boolean>(
    APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING.IS_ON,
    appStorage
  );

  // Handle mutual exclusivity between token/secret and payment session
  useEffect(() => {
    if (isTokenAndSecretOn) {
      setIsPaymentSessionOn(false);
    }
  }, [isTokenAndSecretOn, setIsPaymentSessionOn]);

  useEffect(() => {
    if (isPaymentSessionOn) {
      setIsTokenAndSecretOn(false);
    }
  }, [isPaymentSessionOn, setIsTokenAndSecretOn]);

  const regenerateSections = () => {
    setSettingsSections(transformationFunction());
  };

  const [settingsSections, setSettingsSections] = useState<T>(
    transformationFunction()
  );

  // Regenerate sections when any of the watched values change
  useEffect(() => {
    regenerateSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isTokenAndSecretOn,
    isPaymentSessionOn,
    isRecommendationOn,
    isCardAddressOn,
    isPrimaryAccountDetailsOn,
    is3DSUICustomizationOn,
    isRecurringPaymentOn,
    isRecurringPaymentRegularBillingOn,
  ]);

  return {
    // State values
    isTokenAndSecretOn,
    setIsTokenAndSecretOn,
    isPaymentSessionOn,
    setIsPaymentSessionOn,
    isRecommendationOn,
    isCardAddressOn,
    isPrimaryAccountDetailsOn,
    is3DSUICustomizationOn,
    isRecurringPaymentOn,
    isRecurringPaymentRegularBillingOn,

    // Settings sections
    settingsSections,

    // Actions
    regenerateSections,
  };
};

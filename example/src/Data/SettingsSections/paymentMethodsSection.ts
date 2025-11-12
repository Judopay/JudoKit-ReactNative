import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { IS_IOS, PAYMENT_METHODS_KEYS } from '../Constants';

const paymentMethodsSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'PAYMENT METHODS',
    data: [
      {
        path: PAYMENT_METHODS_KEYS.IS_CARD_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Card',
      },
      {
        path: IS_IOS
          ? PAYMENT_METHODS_KEYS.IS_APPLE_PAY_ON
          : PAYMENT_METHODS_KEYS.IS_GOOGLE_PAY_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: IS_IOS ? 'Apple Pay' : 'Google Pay',
      },
    ],
  };
};

export default paymentMethodsSection;

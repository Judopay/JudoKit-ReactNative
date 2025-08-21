import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { APPLE_PAY_KEYS } from '../Constants';

const applePayMainSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'APPLE PAY',
    data: [
      {
        path: APPLE_PAY_KEYS.MERCHANT_ID,
        dataType: SettingsItemDataType.TEXT,
        title: 'Merchant ID',
      },
    ],
  };
};

export default applePayMainSection;

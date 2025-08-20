import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { AMOUNT_KEYS, CURRENCY_OPTIONS } from '../Constants';

const amountSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'AMOUNT',
    data: [
      {
        path: AMOUNT_KEYS.VALUE,
        dataType: SettingsItemDataType.TEXT,
        title: 'Amount',
      },
      {
        path: AMOUNT_KEYS.CURRENCY,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        title: 'Currency',
        options: CURRENCY_OPTIONS,
      },
    ],
  };
};

export default amountSection;

import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { CARD_ADDRESS_KEYS } from '../Constants';
import { getBoolOrFalse } from '../Mapping';

const cardAddressSection = (): SectionListData<SettingsItem> => {
  const isEnabled = getBoolOrFalse(CARD_ADDRESS_KEYS.IS_ENABLED);

  return {
    header: 'ADDRESS',
    data: [
      {
        path: CARD_ADDRESS_KEYS.IS_ENABLED,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable card address',
      },
      ...(isEnabled
        ? [
            {
              path: CARD_ADDRESS_KEYS.LINE1,
              dataType: SettingsItemDataType.TEXT,
              title: 'Line 1',
            },
            {
              path: CARD_ADDRESS_KEYS.LINE2,
              dataType: SettingsItemDataType.TEXT,
              title: 'Line 2',
            },
            {
              path: CARD_ADDRESS_KEYS.LINE3,
              dataType: SettingsItemDataType.TEXT,
              title: 'Line 3',
            },
            {
              path: CARD_ADDRESS_KEYS.TOWN,
              dataType: SettingsItemDataType.TEXT,
              title: 'Town',
            },
            {
              path: CARD_ADDRESS_KEYS.POST_CODE,
              dataType: SettingsItemDataType.TEXT,
              title: 'Post code',
            },
            {
              path: CARD_ADDRESS_KEYS.COUNTRY_CODE,
              dataType: SettingsItemDataType.TEXT,
              title: 'Country code',
            },
            {
              path: CARD_ADDRESS_KEYS.STATE,
              dataType: SettingsItemDataType.TEXT,
              title: 'State',
            },
            {
              path: CARD_ADDRESS_KEYS.PHONE_COUNTRY_CODE,
              dataType: SettingsItemDataType.TEXT,
              title: 'Phone country code',
            },
            {
              path: CARD_ADDRESS_KEYS.MOBILE_NUMBER,
              dataType: SettingsItemDataType.TEXT,
              title: 'Mobile number',
            },
            {
              path: CARD_ADDRESS_KEYS.EMAIL_ADDRESS,
              dataType: SettingsItemDataType.TEXT,
              title: 'Email address',
            },
          ]
        : []),
    ],
  };
};

export default cardAddressSection;

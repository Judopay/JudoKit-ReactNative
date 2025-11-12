import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { PRIMARY_ACCOUNT_DETAILS_KEYS } from '../Constants';
import { getBoolOrFalse } from '../Mapping';

const primaryAccountDetailsSection = (): SectionListData<SettingsItem> => {
  const isEnabled = getBoolOrFalse(PRIMARY_ACCOUNT_DETAILS_KEYS.IS_ENABLED);

  return {
    header: 'PRIMARY ACCOUNT DETAILS',
    data: [
      {
        path: PRIMARY_ACCOUNT_DETAILS_KEYS.IS_ENABLED,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable primary account details',
      },
      ...(isEnabled
        ? [
            {
              path: PRIMARY_ACCOUNT_DETAILS_KEYS.NAME,
              dataType: SettingsItemDataType.TEXT,
              title: 'Name',
            },
            {
              path: PRIMARY_ACCOUNT_DETAILS_KEYS.ACCOUNT_NUMBER,
              dataType: SettingsItemDataType.TEXT,
              title: 'Account number',
            },
            {
              path: PRIMARY_ACCOUNT_DETAILS_KEYS.DATE_OF_BIRTH,
              dataType: SettingsItemDataType.TEXT,
              title: 'Date of birth',
            },
            {
              path: PRIMARY_ACCOUNT_DETAILS_KEYS.POST_CODE,
              dataType: SettingsItemDataType.TEXT,
              title: 'Post code',
            },
          ]
        : []),
    ],
  };
};

export default primaryAccountDetailsSection;

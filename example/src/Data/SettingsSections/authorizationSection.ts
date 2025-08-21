import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { AUTHORIZATION_KEYS } from '../Constants';
import { getBoolOrFalse } from '../Mapping';

const authorizationSection = (): SectionListData<SettingsItem> => {
  const isUsingPaymentSession =
    getBoolOrFalse(AUTHORIZATION_KEYS.IS_USING_PAYMENT_SESSION) ?? false;
  const isUsingTokenAndSecret =
    getBoolOrFalse(AUTHORIZATION_KEYS.IS_USING_TOKEN_AND_SECRET) ?? false;

  return {
    header: 'AUTHORIZATION',
    data: [
      {
        path: AUTHORIZATION_KEYS.IS_USING_PAYMENT_SESSION,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Using payment session',
      },
      ...(isUsingPaymentSession
        ? [
            {
              path: AUTHORIZATION_KEYS.TOKEN,
              dataType: SettingsItemDataType.TEXT,
              title: 'Token',
            },
            {
              path: AUTHORIZATION_KEYS.PAYMENT_SESSION,
              dataType: SettingsItemDataType.TEXT,
              title: 'Payment Session',
            },
          ]
        : []),
      {
        path: AUTHORIZATION_KEYS.IS_USING_TOKEN_AND_SECRET,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Using token and secret',
        testID: 'using-token-and-secret-toggle',
      },
      ...(isUsingTokenAndSecret
        ? [
            {
              path: AUTHORIZATION_KEYS.TOKEN,
              dataType: SettingsItemDataType.TEXT,
              title: 'Token',
              testID: 'token-input-field',
            },
            {
              path: AUTHORIZATION_KEYS.SECRET,
              dataType: SettingsItemDataType.TEXT,
              title: 'Secret',
              testID: 'secret-input-field',
            },
          ]
        : []),
    ],
  };
};

export default authorizationSection;

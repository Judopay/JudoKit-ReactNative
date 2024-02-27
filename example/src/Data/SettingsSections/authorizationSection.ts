import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const authorizationSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const isUsingPaymentSessionPath = 'authorization.isUsingPaymentSession';
  const isUsingTokenAndSecretPath = 'authorization.isUsingTokenAndSecret';
  const tokenPath = 'authorization.token';
  const secretPath = 'authorization.secret';
  const paymentSessionPath = 'authorization.paymentSession';

  let isUsingPaymentSession = _.get(data, isUsingPaymentSessionPath);
  let isUsingTokenAndSecret = _.get(data, isUsingTokenAndSecretPath);

  return {
    header: 'AUTHORIZATION',
    data: [
      {
        path: isUsingPaymentSessionPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Using payment session',
        value: isUsingPaymentSession,
      },
      ...(isUsingPaymentSession
        ? [
            {
              path: tokenPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Token',
              value: _.get(data, tokenPath),
            },
            {
              path: paymentSessionPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Payment Session',
              value: _.get(data, paymentSessionPath),
            },
          ]
        : []),
      {
        path: isUsingTokenAndSecretPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Using token and secret',
        value: isUsingTokenAndSecret,
        testID: 'using-token-and-secret-toggle',
      },
      ...(isUsingTokenAndSecret
        ? [
            {
              path: tokenPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Token',
              value: _.get(data, tokenPath),
              testID: 'token-input-field',
            },
            {
              path: secretPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Secret',
              value: _.get(data, secretPath),
              testID: 'secret-input-field',
            },
          ]
        : []),
    ],
  };
};

export default authorizationSection;

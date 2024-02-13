import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const applePayMainSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const merchantIdPath = 'applePay.merchantId';
  const merchantId = _.get(data, merchantIdPath);

  return {
    header: 'APPLE PAY',
    data: [
      {
        path: merchantIdPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Merchant ID',
        value: merchantId,
      },
    ],
  };
};

export default applePayMainSection;

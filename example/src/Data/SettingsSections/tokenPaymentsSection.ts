import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const tokenPaymentsSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const shouldAskForCSCPath = 'tokenPayments.shouldAskForCSC';
  const shouldAskForCardholderNamePath =
    'tokenPayments.shouldAskForCardholderName';

  return {
    header: 'TOKEN PAYMENTS',
    data: [
      {
        path: shouldAskForCSCPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Should ask for CSC',
        value: _.get(data, shouldAskForCSCPath),
        testID: 'should-ask-for-csc',
      },
      {
        path: shouldAskForCardholderNamePath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Should ask for cardholder name',
        value: _.get(data, shouldAskForCardholderNamePath),
        testID: 'should-ask-for-cardholder-name',
      },
    ],
  };
};

export default tokenPaymentsSection;

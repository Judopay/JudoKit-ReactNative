import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { IS_IOS } from '../Constants';
import _ from 'lodash';

const paymentMethodsSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const isCardOnPath = 'paymentMethods.isCardOn';
  const isApplePayOnPath = 'paymentMethods.isApplePayOn';
  const isGooglePayOnPath = 'paymentMethods.isGooglePayOn';

  return {
    header: 'PAYMENT METHODS',
    data: [
      {
        path: isCardOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Card',
        value: _.get(data, isCardOnPath),
      },
      {
        path: IS_IOS ? isApplePayOnPath : isGooglePayOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: IS_IOS ? 'Apple Pay' : 'Google Pay',
        value: IS_IOS
          ? _.get(data, isApplePayOnPath)
          : _.get(data, isGooglePayOnPath),
      },
    ],
  };
};

export default paymentMethodsSection;

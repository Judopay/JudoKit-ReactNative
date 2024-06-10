import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const othersSection = (data: SettingsData): SectionListData<SettingsItem> => {
  const isAddressVerificationServiceOnPath =
    'others.isAddressVerificationServiceOn';
  const isAmountLabelInPaymentMethodsOnPath =
    'others.isAmountLabelInPaymentMethodsOn';
  const isAmountLabelInPaymentButtonOnPath =
    'others.isAmountLabelInPaymentButtonOn';
  const isSecurityCodeOnPath = 'others.isSecurityCodeOn';
  const isInitialRecurringPaymentOnPath = 'others.isInitialRecurringPaymentOn';
  const isDelayedAuthorisationOnPath = 'others.isDelayedAuthorisationOn';
  const isAllowIncrementOnPath = 'others.isAllowIncrementOn';

  return {
    header: 'OTHERS',
    data: [
      {
        path: isAddressVerificationServiceOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Address Verification Service',
        value: _.get(data, isAddressVerificationServiceOnPath),
      },
      {
        path: isAmountLabelInPaymentMethodsOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Amount label in Payment Methods',
        value: _.get(data, isAmountLabelInPaymentMethodsOnPath),
      },
      {
        path: isAmountLabelInPaymentButtonOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Amount label in Payment Button',
        value: _.get(data, isAmountLabelInPaymentButtonOnPath),
      },
      {
        path: isSecurityCodeOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Security code',
        value: _.get(data, isSecurityCodeOnPath),
      },
      {
        path: isInitialRecurringPaymentOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Initial recurring payment',
        value: _.get(data, isInitialRecurringPaymentOnPath),
      },
      {
        path: isDelayedAuthorisationOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Delayed authorisation',
        value: _.get(data, isDelayedAuthorisationOnPath),
      },
      {
        path: isAllowIncrementOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Allow increment',
        value: _.get(data, isAllowIncrementOnPath),
      },
    ],
  };
};

export default othersSection;

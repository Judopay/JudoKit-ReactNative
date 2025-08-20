import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { OTHERS_KEYS } from '../Constants';

const othersSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'OTHERS',
    data: [
      {
        path: OTHERS_KEYS.IS_ADDRESS_VERIFICATION_SERVICE_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Address Verification Service',
      },
      {
        path: OTHERS_KEYS.IS_AMOUNT_LABEL_IN_PAYMENT_METHODS_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Amount label in Payment Methods',
      },
      {
        path: OTHERS_KEYS.IS_AMOUNT_LABEL_IN_PAYMENT_BUTTON_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Amount label in Payment Button',
      },
      {
        path: OTHERS_KEYS.IS_SECURITY_CODE_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Security code',
      },
      {
        path: OTHERS_KEYS.IS_INITIAL_RECURRING_PAYMENT_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Initial recurring payment',
      },
      {
        path: OTHERS_KEYS.IS_DELAYED_AUTHORISATION_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Delayed authorisation',
      },
      {
        path: OTHERS_KEYS.IS_ALLOW_INCREMENT_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Allow increment',
      },
    ],
  };
};

export default othersSection;

import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { REFERENCE_KEYS } from '../Constants';

const referenceSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'REFERENCE',
    footer: 'If let empty, payment reference will be generated automatically.',
    data: [
      {
        path: REFERENCE_KEYS.PAYMENT_REFERENCE,
        dataType: SettingsItemDataType.TEXT,
        title: 'Payment reference',
      },
      {
        path: REFERENCE_KEYS.CONSUMER_REFERENCE,
        dataType: SettingsItemDataType.TEXT,
        title: 'Consumer reference',
      },
    ],
  };
};

export default referenceSection;

import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { SUPPORTED_CARD_NETWORKS_KEYS } from '../Constants';

const supportedCardNetworksSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'SUPPORTED CARD NETWORKS',
    data: [
      {
        path: SUPPORTED_CARD_NETWORKS_KEYS.IS_VISA_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Visa',
      },
      {
        path: SUPPORTED_CARD_NETWORKS_KEYS.IS_MASTERCARD_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'MasterCard',
      },
      {
        path: SUPPORTED_CARD_NETWORKS_KEYS.IS_AMEX_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'AMEX',
      },
      {
        path: SUPPORTED_CARD_NETWORKS_KEYS.IS_MAESTRO_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Maestro',
      },
      {
        path: SUPPORTED_CARD_NETWORKS_KEYS.IS_CHINA_UNION_PAY_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'China Union Pay',
      },
      {
        path: SUPPORTED_CARD_NETWORKS_KEYS.IS_JCB_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'JCB',
      },
      {
        path: SUPPORTED_CARD_NETWORKS_KEYS.IS_DISCOVER_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Discover',
      },
      {
        path: SUPPORTED_CARD_NETWORKS_KEYS.IS_DINERS_CLUB_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Diners Club',
      },
    ],
  };
};

export default supportedCardNetworksSection;

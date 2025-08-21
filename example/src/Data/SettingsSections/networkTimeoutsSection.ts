import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { NETWORK_TIMEOUTS_KEYS } from '../Constants';

const networkTimeoutsSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'NETWORK TIMEOUTS',
    data: [
      {
        path: NETWORK_TIMEOUTS_KEYS.CONNECT_TIMEOUT,
        dataType: SettingsItemDataType.TEXT,
        title: 'Connect timeout',
      },
      {
        path: NETWORK_TIMEOUTS_KEYS.READ_TIMEOUT,
        dataType: SettingsItemDataType.TEXT,
        title: 'Read timeout',
      },
      {
        path: NETWORK_TIMEOUTS_KEYS.WRITE_TIMEOUT,
        dataType: SettingsItemDataType.TEXT,
        title: 'Write timeout',
      },
    ],
  };
};

export default networkTimeoutsSection;

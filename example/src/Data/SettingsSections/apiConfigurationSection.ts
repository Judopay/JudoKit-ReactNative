import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { API_CONFIGURATION_KEYS } from '../Constants';

const apiConfigurationSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'API CONFIGURATIONS',
    data: [
      {
        path: API_CONFIGURATION_KEYS.IS_SANDBOXED,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Sandboxed',
      },
      {
        path: API_CONFIGURATION_KEYS.JUDO_ID,
        dataType: SettingsItemDataType.TEXT,
        title: 'Judo ID',
        testID: 'judo-id-input',
      },
    ],
  };
};

export default apiConfigurationSection;

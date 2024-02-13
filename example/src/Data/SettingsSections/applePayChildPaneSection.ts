import { Screen, SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';

const applePayChildPaneSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'APPLE PAY SETTINGS',
    data: [
      {
        path: 'applePay',
        dataType: SettingsItemDataType.CHILD_PANE,
        title: 'Apple Pay',
        value: Screen.APPLE_PAY_SETTINGS,
      },
    ],
  };
};

export default applePayChildPaneSection;

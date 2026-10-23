import { Screen, SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';

const googlePayChildPaneSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'GOOGLE PAY SETTINGS',
    data: [
      {
        path: 'googlePay',
        dataType: SettingsItemDataType.CHILD_PANE,
        title: 'Google Pay',
        value: Screen.GOOGLE_PAY_SETTINGS,
      },
    ],
  };
};

export default googlePayChildPaneSection;

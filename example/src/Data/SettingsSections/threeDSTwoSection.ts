import { Screen, SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import {
  CHALLENGE_REQUEST_INDICATOR_OPTIONS,
  SCA_EXEMPTION_OPTIONS,
  THREE_DS_TWO_KEYS,
} from '../Constants';

const threeDSTwoSection = (): SectionListData<SettingsItem> => {
  return {
    header: '3DS 2.0',
    data: [
      {
        path: THREE_DS_TWO_KEYS.IS_BILLING_INFORMATION_SCREEN_ENABLED,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable billing information screen',
        testID: 'billing-info-screen-toggle',
      },
      {
        path: THREE_DS_TWO_KEYS.CHALLENGE_REQUEST_INDICATOR,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        title: 'Challenge request indicator',
        options: CHALLENGE_REQUEST_INDICATOR_OPTIONS,
      },
      {
        path: THREE_DS_TWO_KEYS.SCA_EXEMPTION,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        title: 'SCA exemption',
        options: SCA_EXEMPTION_OPTIONS,
      },
      {
        path: THREE_DS_TWO_KEYS.MAX_TIMEOUT,
        dataType: SettingsItemDataType.TEXT,
        title: '3DS 2.0 max timeout',
      },
      {
        path: THREE_DS_TWO_KEYS.PROTOCOL_MESSAGE_VERSION,
        dataType: SettingsItemDataType.TEXT,
        title: 'Protocol message version',
      },
      {
        path: 'threeDSTwo.uiCustomization',
        dataType: SettingsItemDataType.CHILD_PANE,
        title: 'UI customization',
        value: Screen.THREE_DS_UI_SETTINGS,
      },
    ],
  };
};

export default threeDSTwoSection;

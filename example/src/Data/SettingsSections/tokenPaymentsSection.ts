import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { TOKEN_PAYMENTS_KEYS } from '../Constants';

const tokenPaymentsSection = (): SectionListData<SettingsItem> => {
  return {
    header: 'TOKEN PAYMENTS',
    data: [
      {
        path: TOKEN_PAYMENTS_KEYS.SHOULD_ASK_FOR_CSC,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Should ask for CSC',
        testID: 'should-ask-for-csc',
      },
      {
        path: TOKEN_PAYMENTS_KEYS.SHOULD_ASK_FOR_CARDHOLDER_NAME,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Should ask for cardholder name',
        testID: 'should-ask-for-cardholder-name',
      },
    ],
  };
};

export default tokenPaymentsSection;

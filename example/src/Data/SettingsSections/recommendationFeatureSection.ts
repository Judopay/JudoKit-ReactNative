import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { RECOMMENDATION_KEYS } from '../Constants';
import { getBoolOrFalse } from '../Mapping';

const recommendationFeatureSection = (): SectionListData<SettingsItem> => {
  const isRecommendationFeatureOn = getBoolOrFalse(RECOMMENDATION_KEYS.IS_ON);

  return {
    header: 'RECOMMENDATION FEATURE',
    data: [
      {
        path: RECOMMENDATION_KEYS.IS_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable Recommendation',
      },
      ...(isRecommendationFeatureOn
        ? [
            {
              path: RECOMMENDATION_KEYS.URL,
              dataType: SettingsItemDataType.TEXT,
              title: 'URL',
            },
            {
              path: RECOMMENDATION_KEYS.RSA_PUBLIC_KEY,
              dataType: SettingsItemDataType.TEXT,
              title: 'RSA public key',
            },
            {
              path: RECOMMENDATION_KEYS.TIMEOUT,
              dataType: SettingsItemDataType.TEXT,
              title: 'Request timeout',
            },
            {
              path: RECOMMENDATION_KEYS.HALT_TRANSACTION_IN_CASE_OF_ANY_ERROR,
              dataType: SettingsItemDataType.BOOLEAN,
              title: 'Halt transaction in case of any error',
            },
          ]
        : []),
    ],
  };
};

export default recommendationFeatureSection;

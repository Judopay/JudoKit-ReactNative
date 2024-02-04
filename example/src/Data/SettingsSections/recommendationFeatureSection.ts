import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const recommendationFeatureSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const isRecommendationFeatureOnPath = 'recommendation.isOn';
  const urlPath = 'recommendation.url';
  const rsaPublicKeyPath = 'recommendation.rsaPublicKey';
  const timeoutPath = 'recommendation.timeout';

  const isRecommendationFeatureOn = _.get(data, isRecommendationFeatureOnPath);

  return {
    header: 'RECOMMENDATION FEATURE',
    data: [
      {
        path: isRecommendationFeatureOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable Recommendation',
        value: isRecommendationFeatureOn,
      },
      ...(isRecommendationFeatureOn
        ? [
            {
              path: urlPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'URL',
              value: _.get(data, urlPath),
            },
            {
              path: rsaPublicKeyPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'RSA public key',
              value: _.get(data, rsaPublicKeyPath),
            },
            {
              path: timeoutPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Request timeout',
              value: _.get(data, timeoutPath),
            },
          ]
        : []),
    ],
  };
};

export default recommendationFeatureSection;

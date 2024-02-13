import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const supportedCardNetworksSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const isVisaOnPath = 'supportedCardNetworks.isVisaOn';
  const isMastercardOnPath = 'supportedCardNetworks.isMastercardOn';
  const isAmexOnPath = 'supportedCardNetworks.isAmexOn';
  const isMaestroOnPath = 'supportedCardNetworks.isMaestroOn';
  const isChinaUnionPayOnPath = 'supportedCardNetworks.isChinaUnionPayOn';
  const isJCBOnPath = 'supportedCardNetworks.isJCBOn';
  const isDiscoverOnPath = 'supportedCardNetworks.isDiscoverOn';
  const isDinersClubOnPath = 'supportedCardNetworks.';

  return {
    header: 'SUPPORTED CARD NETWORKS',
    data: [
      {
        path: isVisaOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Visa',
        value: _.get(data, isVisaOnPath),
      },
      {
        path: isMastercardOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'MasterCard',
        value: _.get(data, isMastercardOnPath),
      },
      {
        path: isAmexOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'AMEX',
        value: _.get(data, isAmexOnPath),
      },
      {
        path: isMaestroOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Maestro',
        value: _.get(data, isMaestroOnPath),
      },
      {
        path: isChinaUnionPayOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'China Union Pay',
        value: _.get(data, isChinaUnionPayOnPath),
      },
      {
        path: isJCBOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'JCB',
        value: _.get(data, isJCBOnPath),
      },
      {
        path: isDiscoverOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Discover',
        value: _.get(data, isDiscoverOnPath),
      },
      {
        path: isDinersClubOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Diners Club',
        value: _.get(data, isDinersClubOnPath),
      },
    ],
  };
};

export default supportedCardNetworksSection;

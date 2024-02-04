import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const networkTimeoutsSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const connectTimeoutPath = 'networkTimeouts.connectTimeout';
  const readTimeoutPath = 'networkTimeouts.readTimeout';
  const writeTimeoutPath = 'networkTimeouts.writeTimeout';

  return {
    header: 'NETWORK TIMEOUTS',
    data: [
      {
        path: connectTimeoutPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Connect timeout',
        value: _.get(data, connectTimeoutPath),
      },
      {
        path: readTimeoutPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Read timeout',
        value: _.get(data, readTimeoutPath),
      },
      {
        path: writeTimeoutPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Write timeout',
        value: _.get(data, writeTimeoutPath),
      },
    ],
  };
};

export default networkTimeoutsSection;

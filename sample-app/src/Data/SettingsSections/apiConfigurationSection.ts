import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import * as _ from 'lodash'

const apiConfigurationSection = (
  data: SettingsData,
): SectionListData<SettingsItem> => {
  const sandboxPath = 'apiConfiguration.isSandboxed'
  const judoIdPath = 'apiConfiguration.judoId'

  return {
    header: 'API CONFIGURATIONS',
    data: [
      {
        path: sandboxPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Sandboxed',
        value: _.get(data, sandboxPath),
      },
      {
        path: judoIdPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Judo ID',
        value: _.get(data, judoIdPath),
        testID: 'judo-id-input',
      },
    ],
  }
}

export default apiConfigurationSection

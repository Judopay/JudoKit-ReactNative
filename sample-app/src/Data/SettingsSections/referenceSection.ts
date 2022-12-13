import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import * as _ from 'lodash'

const referenceSection = (
  data: SettingsData,
): SectionListData<SettingsItem> => {
  const consumerReferencePath = 'reference.consumerReference'
  const paymentReferencePath = 'reference.paymentReference'

  return {
    header: 'REFERENCE',
    footer: 'If let empty, payment reference will be generated automatically.',
    data: [
      {
        path: paymentReferencePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Payment reference',
        value: _.get(data, paymentReferencePath),
      },
      {
        path: consumerReferencePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Consumer reference',
        value: _.get(data, consumerReferencePath),
      },
    ],
  }
}

export default referenceSection

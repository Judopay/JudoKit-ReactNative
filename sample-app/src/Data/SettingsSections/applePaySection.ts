import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import * as _ from 'lodash'

const applePaySection = (data: SettingsData): SectionListData<SettingsItem> => {
  const merchantIdPath = 'applePay.merchantId'
  const merchantId = _.get(data, merchantIdPath)

  return {
    header: 'APPLE PAY',
    data: [
      {
        path: merchantIdPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Merchant ID',
        value: merchantId,
      },
    ],
  }
}

export default applePaySection

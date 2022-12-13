import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import { CURRENCY_OPTIONS } from '../Constants'
import * as _ from 'lodash'

const amountSection = (data: SettingsData): SectionListData<SettingsItem> => {
  const currencyPath = 'amount.currency'
  const valuePath = 'amount.value'

  return {
    header: 'AMOUNT',
    data: [
      {
        path: valuePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Amount',
        value: _.get(data, valuePath),
      },
      {
        path: currencyPath,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        title: 'Currency',
        value: _.get(data, currencyPath),
        options: CURRENCY_OPTIONS,
      },
    ],
  }
}

export default amountSection

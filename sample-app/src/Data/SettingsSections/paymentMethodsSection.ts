import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import { IS_IOS } from '../Constants'
import * as _ from 'lodash'

const paymentMethodsSection = (
  data: SettingsData,
): SectionListData<SettingsItem> => {
  const isCardOnPath = 'paymentMethods.isCardOn'
  const isApplePayOnPath = 'paymentMethods.isApplePayOn'
  const isGooglePayOnPath = 'paymentMethods.isGooglePayOn'
  const isiDealOnPath = 'paymentMethods.isiDealOn'
  const isPayByBankAppOnPath = 'paymentMethods.isPayByBankAppOn'

  return {
    header: 'PAYMENT METHODS',
    data: [
      {
        path: isCardOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Card',
        value: _.get(data, isCardOnPath),
      },
      {
        path: IS_IOS ? isApplePayOnPath : isGooglePayOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: IS_IOS ? 'Apple Pay' : 'Google Pay',
        value: IS_IOS
          ? _.get(data, isApplePayOnPath)
          : _.get(data, isGooglePayOnPath),
      },
      {
        path: isiDealOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'iDeal',
        value: _.get(data, isiDealOnPath),
      },
      {
        path: isPayByBankAppOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'PbBA',
        value: _.get(data, isPayByBankAppOnPath),
      },
    ],
  }
}

export default paymentMethodsSection

import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import * as _ from 'lodash'

const applePayRequiredShippingContactFieldsSection = (
  data: SettingsData,
): SectionListData<SettingsItem> => {
  const postalAddressIsOnPath =
    'applePay.requiredShippingContactFields.isPostalAddressOn'
  const phoneIsOnPath = 'applePay.requiredShippingContactFields.isPhoneOn'
  const emailIsOnPath = 'applePay.requiredShippingContactFields.isEmailOn'
  const nameIsOnPath = 'applePay.requiredShippingContactFields.isNameOn'

  const postalAddressIsOn = _.get(data, postalAddressIsOnPath)
  const phoneIsOn = _.get(data, phoneIsOnPath)
  const emailIsOn = _.get(data, emailIsOnPath)
  const nameIsOn = _.get(data, nameIsOnPath)

  return {
    header: 'APPLE PAY REQUIRED SHIPPING CONTACT FIELDS',
    data: [
      {
        path: postalAddressIsOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Postal Address',
        value: postalAddressIsOn,
      },
      {
        path: phoneIsOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Phone',
        value: phoneIsOn,
      },
      {
        path: emailIsOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Email',
        value: emailIsOn,
      },
      {
        path: nameIsOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Name',
        value: nameIsOn,
      },
    ],
  }
}

export default applePayRequiredShippingContactFieldsSection

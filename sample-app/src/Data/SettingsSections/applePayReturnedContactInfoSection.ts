import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import * as _ from 'lodash'

const applePayReturnedContactInfoSection = (
  data: SettingsData,
): SectionListData<SettingsItem> => {
  const isBillingContactsOnPath =
    'applePay.returnedContactInfo.isBillingContactsOn'
  const isShippingContactsOnPath =
    'applePay.returnedContactInfo.isShippingContactsOn'

  const isBillingContactsOn = _.get(data, isBillingContactsOnPath)
  const isShippingContactsOn = _.get(data, isShippingContactsOnPath)

  return {
    header: 'APPLE PAY RETURNED CONTACT INFO (IN JPRESPONSE CALLBACK)',
    data: [
      {
        path: isBillingContactsOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Billing Contacts',
        value: isBillingContactsOn,
      },
      {
        path: isShippingContactsOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Shipping Contacts',
        value: isShippingContactsOn,
      },
    ],
  }
}

export default applePayReturnedContactInfoSection

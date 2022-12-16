import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import { GOOGLE_PAY_BILLING_ADDRESS_FIELD_OPTIONS } from '../Constants'
import * as _ from 'lodash'

const googlePaySection = (
  data: SettingsData,
): SectionListData<SettingsItem> => {
  const isProductionEnvironmentOnPath = 'googlePay.isProductionEnvironmentOn'
  const countryCodePath = 'googlePay.countryCode'
  const billingAddressFieldsPath = 'googlePay.billingAddressFields'
  const isBillingAddressPhoneNumberOnPath =
    'googlePay.isBillingAddressPhoneNumberOn'
  const isShippingAddressOnPath = 'googlePay.isShippingAddressOn'
  const isShippingAddressPhoneNumberOnPath =
    'googlePay.isShippingAddressPhoneNumberOn'
  const isEmailAddressOnPath = 'googlePay.isEmailAddressOnPath'

  const isProductionEnvironmentOn = _.get(data, isProductionEnvironmentOnPath)
  const countryCode = _.get(data, countryCodePath)
  const billingAddressFields = _.get(data, billingAddressFieldsPath)
  const isBillingAddressPhoneNumberOn = _.get(
    data,
    isBillingAddressPhoneNumberOnPath,
  )
  const isShippingAddressOn = _.get(data, isShippingAddressOnPath)
  const isShippingAddressPhoneNumberOn = _.get(
    data,
    isShippingAddressPhoneNumberOnPath,
  )
  const isEmailAddressOn = _.get(data, isEmailAddressOnPath)

  return {
    header: 'GOOGLE PAY',
    data: [
      {
        path: isProductionEnvironmentOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Production environment',
        value: isProductionEnvironmentOn,
      },
      {
        path: countryCodePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Country code',
        value: countryCode,
      },
      {
        path: billingAddressFieldsPath,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        options: GOOGLE_PAY_BILLING_ADDRESS_FIELD_OPTIONS,
        title: 'Billing address',
        value: billingAddressFields,
      },
      {
        path: isBillingAddressPhoneNumberOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Billing address phone number',
        value: isBillingAddressPhoneNumberOn,
      },
      {
        path: isShippingAddressOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Shipping address',
        value: isShippingAddressOn,
      },
      {
        path: isShippingAddressPhoneNumberOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Shipping address phone number',
        value: isShippingAddressPhoneNumberOn,
      },
      {
        path: isEmailAddressOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Email address',
        value: isEmailAddressOn,
      },
    ],
  }
}

export default googlePaySection

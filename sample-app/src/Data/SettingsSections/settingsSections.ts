import { SettingsData, SettingsItem } from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import { IS_ANDROID, IS_IOS } from '../Constants'
import apiConfigurationSection from './apiConfigurationSection'
import authorizationSection from './authorizationSection'
import networkTimeoutsSection from './networkTimeoutsSection'
import amountSection from './amountSection'
import cardAddressSection from './cardAddressSection'
import primaryAccountDetailsSection from './primaryAccountDetailsSection'
import referenceSection from './referenceSection'
import googlePaySection from './googlePaySection'
import supportedCardNetworksSection from './supportedCardNetworksSection'
import paymentMethodsSection from './paymentMethodsSection'
import othersSection from './othersSection'
import threeDSTwoSection from './threeDSTwoSection'
import applePayRequiredShippingContactFieldsSection from './applePayRequiredShippingContactFieldsSection'
import applePayRequiredBillingContactFieldsSection from './applePayRequiredBillingContactFieldsSection'
import applePayReturnedContactInfoSection from './applePayReturnedContactInfoSection'
import applePaySection from './applePaySection'

const settingsSections = (
  data: SettingsData,
): ReadonlyArray<SectionListData<SettingsItem>> => {
  let sections: ReadonlyArray<SectionListData<SettingsItem>> = [
    apiConfigurationSection(data),
    authorizationSection(data),
    threeDSTwoSection(data),
    networkTimeoutsSection(data),
    referenceSection(data),
    amountSection(data),
    cardAddressSection(data),
    primaryAccountDetailsSection(data),
  ]

  if (IS_IOS) {
    sections = [
      ...sections,
      applePaySection(data),
      applePayRequiredBillingContactFieldsSection(data),
      applePayRequiredShippingContactFieldsSection(data),
      applePayReturnedContactInfoSection(data),
    ]
  }

  if (IS_ANDROID) {
    sections = [...sections, googlePaySection(data)]
  }

  return [
    ...sections,
    supportedCardNetworksSection(data),
    paymentMethodsSection(data),
    othersSection(data),
  ]
}

export default settingsSections

import { SettingsData, SettingsItem } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import applePayMainSection from './applePayMainSection';
import applePayRequiredBillingContactFieldsSection from './applePayRequiredBillingContactFieldsSection';
import applePayRequiredShippingContactFieldsSection from './applePayRequiredShippingContactFieldsSection';
import applePayReturnedContactInfoSection from './applePayReturnedContactInfoSection';
import applePayRecurringPaymentSection from './applePayRecurringPaymentSection';

const applePaySettingsSections = (
  data: SettingsData
): ReadonlyArray<SectionListData<SettingsItem>> => {
  return [
    applePayMainSection(data),
    applePayRequiredBillingContactFieldsSection(data),
    applePayRequiredShippingContactFieldsSection(data),
    applePayReturnedContactInfoSection(data),
    applePayRecurringPaymentSection(data),
  ];
};

export default applePaySettingsSections;

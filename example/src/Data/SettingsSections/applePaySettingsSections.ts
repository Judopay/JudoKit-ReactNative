import { SettingsItem } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import applePayMainSection from './applePayMainSection';
import applePayRequiredBillingContactFieldsSection from './applePayRequiredBillingContactFieldsSection';
import applePayRequiredShippingContactFieldsSection from './applePayRequiredShippingContactFieldsSection';
import applePayReturnedContactInfoSection from './applePayReturnedContactInfoSection';
import applePayRecurringPaymentSection from './applePayRecurringPaymentSection';

const applePaySettingsSections = (): ReadonlyArray<
  SectionListData<SettingsItem>
> => {
  return [
    applePayMainSection(),
    applePayRequiredBillingContactFieldsSection(),
    applePayRequiredShippingContactFieldsSection(),
    applePayReturnedContactInfoSection(),
    applePayRecurringPaymentSection(),
  ];
};

export default applePaySettingsSections;

import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { APPLE_PAY_KEYS } from '../Constants';

const applePayRequiredBillingContactFieldsSection =
  (): SectionListData<SettingsItem> => {
    return {
      header: 'APPLE PAY REQUIRED BILLING CONTACT FIELDS',
      data: [
        {
          path: APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS
            .IS_POSTAL_ADDRESS_ON,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Postal Address',
        },
        {
          path: APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS.IS_PHONE_ON,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Phone',
        },
        {
          path: APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS.IS_EMAIL_ON,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Email',
        },
        {
          path: APPLE_PAY_KEYS.REQUIRED_BILLING_CONTACT_FIELDS.IS_NAME_ON,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Name',
        },
      ],
    };
  };

export default applePayRequiredBillingContactFieldsSection;

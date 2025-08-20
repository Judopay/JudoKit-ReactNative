import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { APPLE_PAY_KEYS } from '../Constants';

const applePayReturnedContactInfoSection =
  (): SectionListData<SettingsItem> => {
    return {
      header: 'APPLE PAY RETURNED CONTACT INFO (IN JPRESPONSE CALLBACK)',
      data: [
        {
          path: APPLE_PAY_KEYS.RETURNED_CONTACT_INFO.IS_BILLING_CONTACTS_ON,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Billing Contacts',
        },
        {
          path: APPLE_PAY_KEYS.RETURNED_CONTACT_INFO.IS_SHIPPING_CONTACTS_ON,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Shipping Contacts',
        },
      ],
    };
  };

export default applePayReturnedContactInfoSection;

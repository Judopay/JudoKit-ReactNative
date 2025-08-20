import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import {
  GOOGLE_PAY_BILLING_ADDRESS_FIELD_OPTIONS,
  GOOGLE_PAY_CHECKOUT_OPTION_OPTIONS,
  GOOGLE_PAY_KEYS,
  GOOGLE_PAY_PRICE_STATUS_OPTIONS,
} from '../Constants';

const googlePaySection = (): SectionListData<SettingsItem> => {
  return {
    header: 'GOOGLE PAY',
    data: [
      {
        path: GOOGLE_PAY_KEYS.IS_PRODUCTION_ENVIRONMENT_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Production environment',
      },
      {
        path: GOOGLE_PAY_KEYS.MERCHANT_NAME,
        dataType: SettingsItemDataType.TEXT,
        title: 'Merchant name',
      },
      {
        path: GOOGLE_PAY_KEYS.COUNTRY_CODE,
        dataType: SettingsItemDataType.TEXT,
        title: 'Country code',
      },
      {
        path: GOOGLE_PAY_KEYS.BILLING_ADDRESS_FIELDS,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        options: GOOGLE_PAY_BILLING_ADDRESS_FIELD_OPTIONS,
        title: 'Billing address',
      },
      {
        path: GOOGLE_PAY_KEYS.IS_BILLING_ADDRESS_PHONE_NUMBER_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Billing address phone number',
      },
      {
        path: GOOGLE_PAY_KEYS.IS_SHIPPING_ADDRESS_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Shipping address',
      },
      {
        path: GOOGLE_PAY_KEYS.SHIPPING_ADDRESS_ALLOWED_COUNTRIES,
        dataType: SettingsItemDataType.TEXT,
        title: 'Shipping address allowed countries',
      },
      {
        path: GOOGLE_PAY_KEYS.IS_SHIPPING_ADDRESS_PHONE_NUMBER_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Shipping address phone number',
      },
      {
        path: GOOGLE_PAY_KEYS.IS_EMAIL_ADDRESS_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Email address',
      },
      {
        path: GOOGLE_PAY_KEYS.ALLOW_PREPAID_CARDS,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Allow prepaid cards',
      },
      {
        path: GOOGLE_PAY_KEYS.ALLOW_CREDIT_CARDS,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Allow credit cards',
      },
      {
        path: GOOGLE_PAY_KEYS.TRANSACTION_ID,
        dataType: SettingsItemDataType.TEXT,
        title: 'Transaction ID',
      },
      {
        path: GOOGLE_PAY_KEYS.TOTAL_PRICE_STATUS,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        options: GOOGLE_PAY_PRICE_STATUS_OPTIONS,
        title: 'Total price status',
      },
      {
        path: GOOGLE_PAY_KEYS.TOTAL_PRICE_LABEL,
        dataType: SettingsItemDataType.TEXT,
        title: 'Total price label',
      },
      {
        path: GOOGLE_PAY_KEYS.CHECKOUT_OPTION,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        options: GOOGLE_PAY_CHECKOUT_OPTION_OPTIONS,
        title: 'Checkout option',
      },
    ],
  };
};

export default googlePaySection;

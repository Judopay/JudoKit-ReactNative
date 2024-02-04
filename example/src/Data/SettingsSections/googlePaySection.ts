import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import {
  GOOGLE_PAY_BILLING_ADDRESS_FIELD_OPTIONS,
  GOOGLE_PAY_CHECKOUT_OPTION_OPTIONS,
  GOOGLE_PAY_PRICE_STATUS_OPTIONS,
} from '../Constants';
import _ from 'lodash';

const googlePaySection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const isProductionEnvironmentOnPath = 'googlePay.isProductionEnvironmentOn';
  const merchantNamePath = 'googlePay.merchantName';
  const countryCodePath = 'googlePay.countryCode';
  const billingAddressFieldsPath = 'googlePay.billingAddressFields';
  const isBillingAddressPhoneNumberOnPath =
    'googlePay.isBillingAddressPhoneNumberOn';
  const isShippingAddressOnPath = 'googlePay.isShippingAddressOn';
  const shippingAddressAllowedCountriesPath =
    'googlePay.shippingAddressAllowedCountries';
  const isShippingAddressPhoneNumberOnPath =
    'googlePay.isShippingAddressPhoneNumberOn';
  const isEmailAddressOnPath = 'googlePay.isEmailAddressOn';
  const allowPrepaidCardsPath = 'googlePay.allowPrepaidCards';
  const allowCreditCardsPath = 'googlePay.allowCreditCards';
  const transactionIdPath = 'googlePay.transactionId';
  const totalPriceStatusPath = 'googlePay.totalPriceStatus';
  const totalPriceLabelPath = 'googlePay.totalPriceLabel';
  const checkoutOptionPath = 'googlePay.checkoutOption';

  const isProductionEnvironmentOn = _.get(data, isProductionEnvironmentOnPath);
  const merchantName = _.get(data, merchantNamePath);
  const countryCode = _.get(data, countryCodePath);
  const billingAddressFields = _.get(data, billingAddressFieldsPath);
  const isBillingAddressPhoneNumberOn = _.get(
    data,
    isBillingAddressPhoneNumberOnPath
  );
  const isShippingAddressOn = _.get(data, isShippingAddressOnPath);
  const shippingAddressAllowedCountries = _.get(
    data,
    shippingAddressAllowedCountriesPath
  );
  const isShippingAddressPhoneNumberOn = _.get(
    data,
    isShippingAddressPhoneNumberOnPath
  );
  const isEmailAddressOn = _.get(data, isEmailAddressOnPath);
  const isAllowPrepaidCardsOn = _.get(data, allowPrepaidCardsPath);
  const isAllowCreditCardsOn = _.get(data, allowCreditCardsPath);
  const transactionId = _.get(data, transactionIdPath);
  const totalPriceStatus = _.get(data, totalPriceStatusPath);
  const totalPriceLabel = _.get(data, totalPriceLabelPath);
  const checkoutOption = _.get(data, checkoutOptionPath);

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
        path: merchantNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Merchant name',
        value: merchantName,
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
        path: shippingAddressAllowedCountriesPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Shipping address allowed countries',
        value: shippingAddressAllowedCountries,
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
      {
        path: allowPrepaidCardsPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Allow prepaid cards',
        value: isAllowPrepaidCardsOn,
      },
      {
        path: allowCreditCardsPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Allow credit cards',
        value: isAllowCreditCardsOn,
      },
      {
        path: transactionIdPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Transaction ID',
        value: transactionId,
      },
      {
        path: totalPriceStatusPath,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        options: GOOGLE_PAY_PRICE_STATUS_OPTIONS,
        title: 'Total price status',
        value: totalPriceStatus,
      },
      {
        path: totalPriceLabelPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Total price label',
        value: totalPriceLabel,
      },
      {
        path: checkoutOptionPath,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        options: GOOGLE_PAY_CHECKOUT_OPTION_OPTIONS,
        title: 'Checkout option',
        value: checkoutOption,
      },
    ],
  };
};

export default googlePaySection;

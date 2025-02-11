import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';
import { INTERVAL_UNIT_OPTIONS } from '../Constants';

const applePayRecurringPaymentSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const isApplePayRecurringPaymentOnPath =
    'applePay.recurringPaymentRequest.isOn';
  const isApplePayRecurringPaymentOn = _.get(
    data,
    isApplePayRecurringPaymentOnPath
  );

  const paymentDescriptionPath =
    'applePay.recurringPaymentRequest.paymentDescription';
  const managementURLPath = 'applePay.recurringPaymentRequest.managementURL';
  const billingAgreementPath =
    'applePay.recurringPaymentRequest.billingAgreement';

  const isRegularBillingOnPath =
    'applePay.recurringPaymentRequest.regularBilling.isOn';
  const isRegularBillingOn = _.get(data, isRegularBillingOnPath);
  const regularBillingLabelPath =
    'applePay.recurringPaymentRequest.regularBilling.label';
  const regularBillingAmountPath =
    'applePay.recurringPaymentRequest.regularBilling.amount';
  const regularBillingStartDatePath =
    'applePay.recurringPaymentRequest.regularBilling.startDate';
  const regularBillingEndDatePath =
    'applePay.recurringPaymentRequest.regularBilling.endDate';
  const regularBillingIntervalUnitPath =
    'applePay.recurringPaymentRequest.regularBilling.intervalUnit';
  const regularBillingIntervalCountPath =
    'applePay.recurringPaymentRequest.regularBilling.intervalCount';

  const regularBillingConfiguration = [
    {
      path: 'regularBilling',
      dataType: SettingsItemDataType.SECTION_SEPARATOR,
      title: 'REGULAR BILLING',
    },
    {
      path: isRegularBillingOnPath,
      dataType: SettingsItemDataType.BOOLEAN,
      title: 'Enable regular billing item',
      value: isRegularBillingOn,
    },
    ...(isRegularBillingOn
      ? [
          {
            path: regularBillingLabelPath,
            dataType: SettingsItemDataType.TEXT,
            title: 'Label',
            value: _.get(data, regularBillingLabelPath),
          },
          {
            path: regularBillingAmountPath,
            dataType: SettingsItemDataType.TEXT,
            title: 'Amount',
            value: _.get(data, regularBillingAmountPath),
          },
          {
            path: regularBillingStartDatePath,
            dataType: SettingsItemDataType.TEXT,
            title: 'Start date',
            value: _.get(data, regularBillingStartDatePath),
          },
          {
            path: regularBillingEndDatePath,
            dataType: SettingsItemDataType.TEXT,
            title: 'End date',
            value: _.get(data, regularBillingEndDatePath),
          },
          {
            path: regularBillingIntervalUnitPath,
            dataType: SettingsItemDataType.SINGLE_SELECTION,
            title: 'Interval unit',
            value: _.get(data, regularBillingIntervalUnitPath),
            options: INTERVAL_UNIT_OPTIONS,
          },
          {
            path: regularBillingIntervalCountPath,
            dataType: SettingsItemDataType.TEXT,
            title: 'Interval count',
            value: _.get(data, regularBillingIntervalCountPath),
          },
        ]
      : []),
  ];

  return {
    header: 'APPLE PAY RECURRING PAYMENT',
    data: [
      {
        path: isApplePayRecurringPaymentOnPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable recurring payment',
        value: isApplePayRecurringPaymentOn,
      },
      ...(isApplePayRecurringPaymentOn
        ? [
            {
              path: paymentDescriptionPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Payment description',
              value: _.get(data, paymentDescriptionPath),
            },
            {
              path: managementURLPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Management URL',
              value: _.get(data, managementURLPath),
            },
            {
              path: billingAgreementPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Billing agreement',
              value: _.get(data, billingAgreementPath),
            },
            ...regularBillingConfiguration,
          ]
        : []),
    ],
  };
};

export default applePayRecurringPaymentSection;

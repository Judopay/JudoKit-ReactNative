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
  const tokenNotificationURLPath =
    'applePay.recurringPaymentRequest.tokenNotificationURL';

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

  const isTrialBillingOnPath =
    'applePay.recurringPaymentRequest.trialBilling.isOn';
  const isTrialBillingOn = _.get(data, isTrialBillingOnPath);
  const trialBillingLabelPath =
    'applePay.recurringPaymentRequest.trialBilling.label';
  const trialBillingAmountPath =
    'applePay.recurringPaymentRequest.trialBilling.amount';
  const trialBillingStartDatePath =
    'applePay.recurringPaymentRequest.trialBilling.startDate';
  const trialBillingEndDatePath =
    'applePay.recurringPaymentRequest.trialBilling.endDate';
  const trialBillingIntervalUnitPath =
    'applePay.recurringPaymentRequest.trialBilling.intervalUnit';
  const trialBillingIntervalCountPath =
    'applePay.recurringPaymentRequest.trialBilling.intervalCount';

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

  const trialBillingConfiguration = [
    {
      path: 'trialBilling',
      dataType: SettingsItemDataType.SECTION_SEPARATOR,
      title: 'TRIAL BILLING',
    },
    {
      path: isTrialBillingOnPath,
      dataType: SettingsItemDataType.BOOLEAN,
      title: 'Enable trial billing item',
      value: isTrialBillingOn,
    },
    ...(isTrialBillingOn
      ? [
          {
            path: trialBillingLabelPath,
            dataType: SettingsItemDataType.TEXT,
            title: 'Label',
            value: _.get(data, trialBillingLabelPath),
          },
          {
            path: trialBillingAmountPath,
            dataType: SettingsItemDataType.TEXT,
            title: 'Amount',
            value: _.get(data, trialBillingAmountPath),
          },
          {
            path: trialBillingStartDatePath,
            dataType: SettingsItemDataType.TEXT,
            title: 'Start date',
            value: _.get(data, trialBillingStartDatePath),
          },
          {
            path: trialBillingEndDatePath,
            dataType: SettingsItemDataType.TEXT,
            title: 'End date',
            value: _.get(data, trialBillingEndDatePath),
          },
          {
            path: trialBillingIntervalUnitPath,
            dataType: SettingsItemDataType.SINGLE_SELECTION,
            title: 'Interval unit',
            value: _.get(data, trialBillingIntervalUnitPath),
            options: INTERVAL_UNIT_OPTIONS,
          },
          {
            path: trialBillingIntervalCountPath,
            dataType: SettingsItemDataType.TEXT,
            title: 'Interval count',
            value: _.get(data, trialBillingIntervalCountPath),
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
            {
              path: tokenNotificationURLPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Token notification URL',
              value: _.get(data, tokenNotificationURLPath),
            },
            ...regularBillingConfiguration,
            ...trialBillingConfiguration,
          ]
        : []),
    ],
  };
};

export default applePayRecurringPaymentSection;

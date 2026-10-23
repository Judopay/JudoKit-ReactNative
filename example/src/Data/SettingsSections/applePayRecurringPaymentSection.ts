import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { APPLE_PAY_KEYS, INTERVAL_UNIT_OPTIONS } from '../Constants';
import { getBoolOrFalse } from '../Mapping';

const applePayRecurringPaymentSection = (): SectionListData<SettingsItem> => {
  const isApplePayRecurringPaymentOn = getBoolOrFalse(
    APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.IS_ON
  );

  return {
    header: 'APPLE PAY RECURRING PAYMENT',
    data: [
      {
        path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.IS_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable recurring payment',
      },
      ...(isApplePayRecurringPaymentOn
        ? [
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST
                .PAYMENT_DESCRIPTION,
              dataType: SettingsItemDataType.TEXT,
              title: 'Payment description',
            },
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.BILLING_AGREEMENT,
              dataType: SettingsItemDataType.TEXT,
              title: 'Billing agreement',
            },
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.MANAGEMENT_URL,
              dataType: SettingsItemDataType.TEXT,
              title: 'Management URL',
            },
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING
                .LABEL,
              dataType: SettingsItemDataType.TEXT,
              title: 'Label',
            },
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING
                .AMOUNT,
              dataType: SettingsItemDataType.TEXT,
              title: 'Amount',
            },
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING
                .INTERVAL_UNIT,
              dataType: SettingsItemDataType.SINGLE_SELECTION,
              title: 'Interval unit',
              options: INTERVAL_UNIT_OPTIONS,
            },
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING
                .INTERVAL_COUNT,
              dataType: SettingsItemDataType.TEXT,
              title: 'Interval count',
            },
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING
                .START_DATE,
              dataType: SettingsItemDataType.TEXT,
              title: 'Start date',
            },
            {
              path: APPLE_PAY_KEYS.RECURRING_PAYMENT_REQUEST.REGULAR_BILLING
                .END_DATE,
              dataType: SettingsItemDataType.TEXT,
              title: 'End date',
            },
          ]
        : []),
    ],
  };
};

export default applePayRecurringPaymentSection;

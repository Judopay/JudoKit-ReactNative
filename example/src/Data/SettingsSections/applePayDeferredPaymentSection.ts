import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { APPLE_PAY_KEYS } from '../Constants';
import { getBoolOrFalse } from '../Mapping';

const applePayDeferredPaymentSection = (): SectionListData<SettingsItem> => {
  const isDeferredPaymentOn = getBoolOrFalse(
    APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST.IS_ON
  );

  return {
    header: 'APPLE PAY DEFERRED PAYMENT',
    data: [
      {
        path: APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST.IS_ON,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable deferred payment',
      },
      ...(isDeferredPaymentOn
        ? [
            {
              path: APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST.PAYMENT_DESCRIPTION,
              dataType: SettingsItemDataType.TEXT,
              title: 'Payment description',
            },
            {
              path: APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST.BILLING_AGREEMENT,
              dataType: SettingsItemDataType.TEXT,
              title: 'Billing agreement',
            },
            {
              path: APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST.MANAGEMENT_URL,
              dataType: SettingsItemDataType.TEXT,
              title: 'Management URL',
            },
            {
              path: APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST.LABEL,
              dataType: SettingsItemDataType.TEXT,
              title: 'Label',
            },
            {
              path: APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST.AMOUNT,
              dataType: SettingsItemDataType.TEXT,
              title: 'Amount',
            },
            {
              path: APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST.DEFERRED_DATE,
              dataType: SettingsItemDataType.TEXT,
              title: 'Deferred date',
            },
            {
              path: APPLE_PAY_KEYS.DEFERRED_PAYMENT_REQUEST
                .FREE_CANCELLATION_DATE,
              dataType: SettingsItemDataType.TEXT,
              title: 'Free cancellation date',
            },
          ]
        : []),
    ],
  };
};

export default applePayDeferredPaymentSection;

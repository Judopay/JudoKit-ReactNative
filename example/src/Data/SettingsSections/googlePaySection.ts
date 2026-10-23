import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import {
  GOOGLE_PAY_BILLING_ADDRESS_FIELD_OPTIONS,
  GOOGLE_PAY_CHECKOUT_OPTION_OPTIONS,
  GOOGLE_PAY_KEYS,
  GOOGLE_PAY_MIT_TYPE_OPTIONS,
  GOOGLE_PAY_PRICE_STATUS_OPTIONS,
  GOOGLE_PAY_RECURRENCE_PERIOD_OPTIONS,
} from '../Constants';
import { getBoolOrFalse, getStringOrEmpty } from '../Mapping';

const googlePaySettingsSections = (): SectionListData<SettingsItem>[] => {
  const mitType = getStringOrEmpty(GOOGLE_PAY_KEYS.MIT_TYPE) || 'NONE';
  const isStandardTransaction = mitType === 'NONE';
  const isDeferred = mitType === 'DEFERRED';
  const isRecurring = mitType === 'RECURRING';
  const isIntroductoryPeriodOn = getBoolOrFalse(
    GOOGLE_PAY_KEYS.IS_RECURRING_INTRODUCTORY_PERIOD_ENABLED
  );

  const generalSection: SectionListData<SettingsItem> = {
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
      ...(isStandardTransaction
        ? [
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
          ]
        : []),
    ],
  };

  const mitSection: SectionListData<SettingsItem> = {
    header: 'MERCHANT INITIATED TRANSACTIONS',
    data: [
      {
        path: GOOGLE_PAY_KEYS.MIT_TYPE,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        options: GOOGLE_PAY_MIT_TYPE_OPTIONS,
        title: 'MIT type',
      },
      ...(!isStandardTransaction
        ? [
            {
              path: GOOGLE_PAY_KEYS.MIT_MANAGEMENT_URL,
              dataType: SettingsItemDataType.TEXT,
              title: 'Management URL',
            },
            {
              path: GOOGLE_PAY_KEYS.MIT_BILLING_AGREEMENT,
              dataType: SettingsItemDataType.TEXT,
              title: 'Billing agreement',
            },
            {
              path: GOOGLE_PAY_KEYS.MIT_IMMEDIATE_TOTAL_PRICE,
              dataType: SettingsItemDataType.TEXT,
              title: 'Immediate total price',
            },
            {
              path: GOOGLE_PAY_KEYS.MIT_IMMEDIATE_DISPLAY_ITEMS,
              dataType: SettingsItemDataType.TEXT,
              title: 'Immediate display items',
            },
          ]
        : []),
    ],
  };

  const sections: SectionListData<SettingsItem>[] = [
    generalSection,
    mitSection,
  ];

  if (isDeferred) {
    sections.push({
      header: 'DEFERRED PAYMENT',
      data: [
        {
          path: GOOGLE_PAY_KEYS.DEFERRED_BILLING_DATE_TIME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Billing date time',
        },
        {
          path: GOOGLE_PAY_KEYS.DEFERRED_PRICE_STATUS,
          dataType: SettingsItemDataType.SINGLE_SELECTION,
          options: GOOGLE_PAY_PRICE_STATUS_OPTIONS,
          title: 'Price status',
        },
        {
          path: GOOGLE_PAY_KEYS.DEFERRED_PRICE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Price',
        },
        {
          path: GOOGLE_PAY_KEYS.DEFERRED_LABEL,
          dataType: SettingsItemDataType.TEXT,
          title: 'Label',
        },
        {
          path: GOOGLE_PAY_KEYS.DEFERRED_DISPLAY_ITEMS,
          dataType: SettingsItemDataType.TEXT,
          title: 'Deferred display items',
        },
      ],
    });
  }

  if (isRecurring) {
    sections.push({
      header: 'RECURRING PAYMENT',
      data: [
        {
          path: GOOGLE_PAY_KEYS.RECURRING_ITEM_LABEL,
          dataType: SettingsItemDataType.TEXT,
          title: 'Recurrence item label',
        },
        {
          path: GOOGLE_PAY_KEYS.RECURRING_ITEM_PRICE_STATUS,
          dataType: SettingsItemDataType.SINGLE_SELECTION,
          options: GOOGLE_PAY_PRICE_STATUS_OPTIONS,
          title: 'Recurrence item price status',
        },
        {
          path: GOOGLE_PAY_KEYS.RECURRING_ITEM_PRICE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Recurrence item price',
        },
        {
          path: GOOGLE_PAY_KEYS.RECURRING_ITEM_PERIOD,
          dataType: SettingsItemDataType.SINGLE_SELECTION,
          options: GOOGLE_PAY_RECURRENCE_PERIOD_OPTIONS,
          title: 'Recurrence period',
        },
        {
          path: GOOGLE_PAY_KEYS.RECURRING_ITEM_PERIOD_COUNT,
          dataType: SettingsItemDataType.TEXT,
          title: 'Recurrence period count',
        },
        {
          path: GOOGLE_PAY_KEYS.RECURRING_ITEM_BILLING_INITIAL_DATE_TIME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Billing initial date time',
        },
        {
          path: GOOGLE_PAY_KEYS.RECURRING_ITEM_BILLING_FINAL_DATE_TIME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Billing final date time',
        },
        {
          path: GOOGLE_PAY_KEYS.RECURRING_ITEM_DISPLAY_ITEMS,
          dataType: SettingsItemDataType.TEXT,
          title: 'Recurrence display items',
        },
        {
          path: GOOGLE_PAY_KEYS.IS_RECURRING_INTRODUCTORY_PERIOD_ENABLED,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Introductory period',
        },
        ...(isIntroductoryPeriodOn
          ? [
              {
                path: GOOGLE_PAY_KEYS.RECURRING_INTRODUCTORY_PERIOD_START_DATE_TIME,
                dataType: SettingsItemDataType.TEXT,
                title: 'Introductory period start',
              },
              {
                path: GOOGLE_PAY_KEYS.RECURRING_INTRODUCTORY_PERIOD_END_DATE_TIME,
                dataType: SettingsItemDataType.TEXT,
                title: 'Introductory period end',
              },
              {
                path: GOOGLE_PAY_KEYS.RECURRING_INTRODUCTORY_PERIOD_LABEL,
                dataType: SettingsItemDataType.TEXT,
                title: 'Introductory period label',
              },
              {
                path: GOOGLE_PAY_KEYS.RECURRING_INTRODUCTORY_PERIOD_TOTAL_PRICE,
                dataType: SettingsItemDataType.TEXT,
                title: 'Introductory period price',
              },
              {
                path: GOOGLE_PAY_KEYS.RECURRING_INTRODUCTORY_PERIOD_DISPLAY_ITEMS,
                dataType: SettingsItemDataType.TEXT,
                title: 'Introductory display items',
              },
            ]
          : []),
      ],
    });
  }

  return sections;
};

export default googlePaySettingsSections;

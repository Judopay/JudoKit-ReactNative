import 'react-native';

import {
  JudoPaymentSummaryItem,
  JudoPaymentSummaryItemType,
  JudoMerchantCapability,
  JudoContactField,
  JudoReturnedInfo,
  JudoShippingType,
} from '../types';

const paymentSummaryItem: JudoPaymentSummaryItem = {
  label: 'itemLabel',
  amount: '1000.0',
  type: JudoPaymentSummaryItemType.Final,
};

test('check JudoPaymentSummaryItem model fields', () => {
  expect(Object.keys(paymentSummaryItem).length).toBe(3);
});

test('check JudoShippingType model fields', () => {
  expect(Object.keys(JudoShippingType)).toStrictEqual([
    '0',
    '1',
    '2',
    '3',
    'Shipping',
    'Delivery',
    'StorePickup',
    'ServicePickup',
  ]);
});

test('check JudoPaymentSummaryItemType model fields', () => {
  expect(Object.keys(JudoPaymentSummaryItemType)).toStrictEqual([
    '0',
    '1',
    'Final',
    'Pending',
  ]);
});

test('check JudoMerchantCapability model fields', () => {
  expect(Object.keys(JudoMerchantCapability)).toStrictEqual([
    '1',
    '2',
    '4',
    '8',
    '16',
    'ThreeDS',
    'EMV',
    'Credit',
    'Debit',
    'All',
  ]);
});

test('check JudoContactField model fields', () => {
  expect(Object.keys(JudoContactField)).toStrictEqual([
    '1',
    '2',
    '4',
    '8',
    '16',
    'PostalAddress',
    'Phone',
    'Email',
    'Name',
    'All',
  ]);
});

test('check JudoReturnedInfo model fields', () => {
  expect(Object.keys(JudoReturnedInfo)).toStrictEqual([
    '1',
    '2',
    '4',
    'BillingDetails',
    'ShippingDetails',
    'All',
  ]);
});

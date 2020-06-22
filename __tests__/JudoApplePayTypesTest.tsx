import 'react-native'

import {
    JudoPaymentSummaryItem,
    JudoPaymentSummaryItemType,
    JudoMerchantCapability,
    JudoContactField,
    JudoShippingMethod,
    JudoReturnedInfo,
    JudoShippingType,
    JudoApplePayConfiguration
} from '../types/JudoApplePayTypes'

const paymentSummaryItem: JudoPaymentSummaryItem = {
    label: 'itemLabel',
    amount: '1000.0',
    type: JudoPaymentSummaryItemType.Final
}

const shippingMethod: JudoShippingMethod = {
    identifier: 'id1',
    detail: 'some details',
    label: 'label name',
    amount: '999.9',
    type: JudoPaymentSummaryItemType.Pending
}

test('check JudoPaymentSummaryItem model fields', () => {
    expect(Object.keys(paymentSummaryItem).length).toBe(3)
})

test('check JudoShippingType model fields', () => {
    expect(Object.keys(JudoShippingType)).toStrictEqual([
        '0',
        '1',
        '2',
        '3',
        'Shipping',
        'Delivery',
        'StorePickup',
        'ServicePickup'
    ])
})

test('check JudoPaymentSummaryItemType model fields', () => {
    expect(Object.keys(JudoPaymentSummaryItemType)).toStrictEqual([
        '0',
        '1',
        'Final',
        'Pending'
    ])
})

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
        'All'
    ])
})

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
        'All'
    ])
})

test('check JudoReturnedInfo model fields', () => {
    expect(Object.keys(JudoReturnedInfo)).toStrictEqual([
        '1',
        '2',
        '4',
        'BillingDetails',
        'ShippingDetails',
        'All'
    ])
})

test('check JudoApplePayConfiguration model fields', () => {
    const applePayConfiguration: JudoApplePayConfiguration = {
        merchantId: 'id777',
        countryCode: 'some code',
        paymentSummaryItems: [paymentSummaryItem],
        merchantCapabilities: JudoMerchantCapability.Credit,
        requiredBillingContactFields: JudoContactField.Email,
        requiredShippingContactFields: JudoContactField.Name,
        shippingMethods: [shippingMethod],
        shippingType: JudoShippingType.Delivery,
        returnedInfo: JudoReturnedInfo.BillingDetails
    }
})

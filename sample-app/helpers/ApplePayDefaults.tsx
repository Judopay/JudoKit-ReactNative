import { JudoApplePayConfiguration, JudoPaymentSummaryItem } from 'judo-react-native'

const itemOne: JudoPaymentSummaryItem = {
    label: 'Item 1',
    amount: '0.01',
}

const itemTwo: JudoPaymentSummaryItem = {
    label: 'Item 1',
    amount: '0.02',
}

const total: JudoPaymentSummaryItem = {
    label: 'Tim Apple',
    amount: '0.03',
}

const applePayConfiguration: JudoApplePayConfiguration = {
    merchantId: 'my-merchant-id',
    countryCode: 'my-country-code',
    paymentSummaryItems: [itemOne, itemTwo, total],
}
import { NativeModules } from 'react-native'
import { JudoResponse, JudoTransactionType, JudoTransactionResult } from '../types/JudoTypes'

const response: JudoResponse = {
    receiptId: 'receiptId',
    yourPaymentReference: 'paymentRef',
    type: JudoTransactionType.Payment,
    createdAt: '12345678',
    result: JudoTransactionResult.Success,
    merchantName: 'merchantName',
    appearsOnStatementAs: 'nothing',
    originalAmount: '1100.0',
    netAmount: '1100.0',
    amount: '1000.0',
    currency: 'USD'
}

NativeModules.RNJudo = {
    invokeTransaction: jest.fn(() => Promise.resolve(response)),
    invokeApplePay: jest.fn(() => Promise.resolve(response)),
    invokeGooglePay: jest.fn(() => Promise.resolve(response)),
    invokePaymentMethodScreen: jest.fn(() => Promise.resolve(response)),
    invokePayByBankApp: jest.fn(() => Promise.resolve(response)),
    performTokenTransaction: jest.fn(() => Promise.resolve(response)),
    isBankingAppAvailable: jest.fn(() => Promise.resolve(false))
}

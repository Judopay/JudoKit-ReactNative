import { NativeModules } from 'react-native';
import {
  JudoResponse,
  JudoTransactionType,
  JudoTransactionResult,
} from '../types';

export const mockResponse: JudoResponse = {
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
  currency: 'USD',
};

const JudoKitReactNative = {
  invokeTransaction: jest.fn(() => Promise.resolve(mockResponse)),
  invokeApplePay: jest.fn(() => Promise.resolve(mockResponse)),
  invokeGooglePay: jest.fn(() => Promise.resolve(mockResponse)),
  invokePaymentMethodScreen: jest.fn(() => Promise.resolve(mockResponse)),
  performTokenTransaction: jest.fn(() => Promise.resolve(mockResponse)),
  isApplePayAvailableWithConfiguration: jest.fn(() => Promise.resolve(false)),
  fetchTransactionDetails: jest.fn(() => Promise.resolve(mockResponse)),
};

NativeModules.JudoKitReactNative = JudoKitReactNative;

export default JudoKitReactNative;

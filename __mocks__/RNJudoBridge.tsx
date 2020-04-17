import { NativeModules } from 'react-native';
import {
    JudoResponse
} from '../types/JudoTypes';

const response: JudoResponse = {
  receiptId: "receiptId",
  yourPaymentReference: "paymentRef",
  type: "string",
  createdAt: "12345678",
  result: "response_result",
  message: "response_message",
  judoId: "yourJudoId",
  siteId: "yourSiteId",
  merchantName: 'merchantName',
  appearsOnStatementAs: 'nothing',
  originalAmount: "1100.0",
  netAmount: "1100.0",
  amount: "1000.0",
  currency: 'USD'
}

NativeModules.RNJudo = {
  invokeTransaction: jest.fn(() => Promise.resolve(response)),
};

import 'react-native'
import React from 'react'
import JudoPay from '../JudoPay'
import configuration from './JudoTestDefaults'
import { JudoTransactionType } from '../types/JudoTypes'

test('JudoPay after init has isSandboxed = true', () => {
  const judoPay = new JudoPay("token", "secret")

  expect(judoPay.isSandboxed).toBe(true);
});

test('invokeTransaction will return mocked JudoResponse', async () => {
  const judoPay = new JudoPay("token", "secret")

  const data = await judoPay.invokeTransaction(JudoTransactionType.Payment, configuration)

  expect(data.amount).toEqual("1000.0")
  expect(data.appearsOnStatementAs).toEqual("nothing")
  expect(data.createdAt).toEqual("12345678")
  expect(data.judoId).toEqual("yourJudoId")
  expect(data.merchantName).toEqual("merchantName")
  expect(data.siteId).toEqual("yourSiteId")
  expect(data.message).toEqual("response_message")
  expect(data.receiptId).toEqual("receiptId")
  expect(data.yourPaymentReference).toEqual("paymentRef")
  expect(data.type).toEqual("payment")
  expect(data.result).toEqual("response_result")
  expect(data.originalAmount).toEqual("1100.0")
  expect(data.netAmount).toEqual("1100.0")
  expect(data.currency).toEqual("USD")

  expect.assertions(14);
})

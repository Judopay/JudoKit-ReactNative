import 'react-native'
import React from 'react'
import JudoPay from '../JudoPay'
import configuration from './JudoTestDefaults'
import {
  NativeModules,
} from 'react-native';

import {
    JudoTransactionType
} from '../types/JudoTypes';

test('JudoPay after init has isSandboxed = true', () => {
  const judoPay = new JudoPay("token", "secret")

  expect(judoPay.isSandboxed).toBe(true);
});

test('invokeTransaction test', async () => {
  const judoPay = new JudoPay("token", "secret")

  const data = await judoPay.invokeTransaction(JudoTransactionType.Payment, configuration)

  expect(data.amount).toEqual("s")
  expect.assertions(1);
})

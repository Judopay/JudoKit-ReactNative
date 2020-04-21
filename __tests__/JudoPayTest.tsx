// @flow
import 'react-native'
import React from 'react'
import JudoPay from '../JudoPay';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


test('JudoPay after init has isSandboxed = true', () => {
  const judoPay = new JudoPay("ta", "atsh")
  expect(judoPay.isSandboxed).toBe(true);
});

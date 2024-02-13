import JudoKitReactNative from '../__mocks__/native-module.mock';
import configuration from '../__mocks__/defaults.mock';
import JudoPay from '../';
import {
  JudoAuthorization,
  JudoTransactionMode,
  JudoTransactionType,
  JudoTransactionResult,
} from '../types';

test('JudoPay after init has isSandboxed = true', () => {
  const authorization: JudoAuthorization = {
    token: 'token',
    secret: 'secret',
  };

  const judoPay = new JudoPay(authorization);

  expect(judoPay.isSandboxed).toBe(true);
});

test('isApplePayAvailableWithConfiguration will return false as mocked', async () => {
  const authorization: JudoAuthorization = {
    token: 'token',
    secret: 'secret',
  };

  const judoPay = new JudoPay(authorization);

  const response = await judoPay.isApplePayAvailableWithConfiguration(
    configuration
  );

  expect(response).toBeFalsy();
});

test('invokeTransaction will return mocked JudoResponse', async () => {
  const authorization: JudoAuthorization = {
    token: 'token',
    paymentSession: 'paymentSession',
  };

  const judoPay = new JudoPay(authorization);

  const data = await judoPay.invokeTransaction(
    JudoTransactionType.Payment,
    configuration
  );

  expect(data.amount).toEqual('1000.0');
  expect(data.appearsOnStatementAs).toEqual('nothing');
  expect(data.createdAt).toEqual('12345678');
  expect(data.merchantName).toEqual('merchantName');
  expect(data.receiptId).toEqual('receiptId');
  expect(data.yourPaymentReference).toEqual('paymentRef');
  expect(data.type).toEqual(JudoTransactionType.Payment);
  expect(data.result).toEqual(JudoTransactionResult.Success);
  expect(data.originalAmount).toEqual('1100.0');
  expect(data.netAmount).toEqual('1100.0');
  expect(data.currency).toEqual('USD');

  expect.assertions(11);
});

test('invokeApplePay will return mocked JudoResponse', async () => {
  const authorization: JudoAuthorization = {
    token: 'token',
    secret: 'secret',
  };

  const judoPay = new JudoPay(authorization);

  const data = await judoPay.invokeApplePay(
    JudoTransactionMode.Payment,
    configuration
  );

  expect(data.amount).toEqual('1000.0');
  expect(data.appearsOnStatementAs).toEqual('nothing');
  expect(data.createdAt).toEqual('12345678');
  expect(data.merchantName).toEqual('merchantName');
  expect(data.receiptId).toEqual('receiptId');
  expect(data.yourPaymentReference).toEqual('paymentRef');
  expect(data.type).toEqual(JudoTransactionType.Payment);
  expect(data.result).toEqual(JudoTransactionResult.Success);
  expect(data.originalAmount).toEqual('1100.0');
  expect(data.netAmount).toEqual('1100.0');
  expect(data.currency).toEqual('USD');

  expect.assertions(11);
});

test('invokeGooglePay will return mocked JudoResponse', async () => {
  const authorization: JudoAuthorization = {
    token: 'token',
    secret: 'secret',
  };

  const judoPay = new JudoPay(authorization);

  const data = await judoPay.invokeGooglePay(
    JudoTransactionMode.Payment,
    configuration
  );

  expect(data.amount).toEqual('1000.0');
  expect(data.appearsOnStatementAs).toEqual('nothing');
  expect(data.createdAt).toEqual('12345678');
  expect(data.merchantName).toEqual('merchantName');
  expect(data.receiptId).toEqual('receiptId');
  expect(data.yourPaymentReference).toEqual('paymentRef');
  expect(data.type).toEqual(JudoTransactionType.Payment);
  expect(data.result).toEqual(JudoTransactionResult.Success);
  expect(data.originalAmount).toEqual('1100.0');
  expect(data.netAmount).toEqual('1100.0');
  expect(data.currency).toEqual('USD');

  expect.assertions(11);
});

test('invokePaymentMethodScreen will return mocked JudoResponse', async () => {
  const authorization: JudoAuthorization = {
    token: 'token',
    secret: 'secret',
  };

  const judoPay = new JudoPay(authorization);

  const data = await judoPay.invokePaymentMethodScreen(
    JudoTransactionMode.Payment,
    configuration
  );

  expect(data.amount).toEqual('1000.0');
  expect(data.appearsOnStatementAs).toEqual('nothing');
  expect(data.createdAt).toEqual('12345678');
  expect(data.merchantName).toEqual('merchantName');
  expect(data.receiptId).toEqual('receiptId');
  expect(data.yourPaymentReference).toEqual('paymentRef');
  expect(data.type).toEqual(JudoTransactionType.Payment);
  expect(data.result).toEqual(JudoTransactionResult.Success);
  expect(data.originalAmount).toEqual('1100.0');
  expect(data.netAmount).toEqual('1100.0');
  expect(data.currency).toEqual('USD');

  expect.assertions(11);
});

test('performTokenTransaction will return mocked JudoResponse', async () => {
  const authorization: JudoAuthorization = {
    token: 'token',
    secret: 'secret',
  };

  const judoPay = new JudoPay(authorization);

  const data = await judoPay.performTokenTransaction(
    JudoTransactionMode.Payment,
    configuration,
    'sample-token',
    'security-code',
    'Cardholder Name',
    'card scheme'
  );

  const callArgs = (JudoKitReactNative.performTokenTransaction as jest.Mock)
    .mock.calls[0][0];

  expect(callArgs.cardToken).toEqual('sample-token');
  expect(callArgs.securityCode).toEqual('security-code');
  expect(callArgs.cardholderName).toEqual('Cardholder Name');
  expect(callArgs.cardScheme).toEqual('card scheme');

  expect(data.amount).toEqual('1000.0');
  expect(data.appearsOnStatementAs).toEqual('nothing');
  expect(data.createdAt).toEqual('12345678');
  expect(data.merchantName).toEqual('merchantName');
  expect(data.receiptId).toEqual('receiptId');
  expect(data.yourPaymentReference).toEqual('paymentRef');
  expect(data.type).toEqual(JudoTransactionType.Payment);
  expect(data.result).toEqual(JudoTransactionResult.Success);
  expect(data.originalAmount).toEqual('1100.0');
  expect(data.netAmount).toEqual('1100.0');
  expect(data.currency).toEqual('USD');

  expect.assertions(15);
});

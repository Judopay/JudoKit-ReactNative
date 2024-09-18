import { element } from 'detox';
import { Selectors, TestData } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  complete3DS2,
  fillPaymentDetailsSheet,
  defaultConfig,
  pressBackButton,
  disableSync,
  launchApp,
} from './helpers';

describe('E2E Basic Transactions Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { camera: 'YES', location: 'always' },
      launchArgs: {
        customSettings: defaultConfig,
      },
    });
    await clickSettingsButton();
    await pressBackButton();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should successfully complete a 3DS2 payment transaction', async () => {
    await disableSync();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully complete a 3DS2 pre-auth transaction', async () => {
    await launchApp(defaultConfig);
    await element(by.text(Selectors.PAY_WITH_PREAUTH)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await complete3DS2();
    await assertResultsScreen({ type: '2', result: '1' });
  });

  it('should successfully complete a 3DS2 register card transaction', async () => {
    await launchApp(defaultConfig);
    await element(by.text(Selectors.REGISTER_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await complete3DS2();
    await assertResultsScreen({ type: '3', result: '1' });
  });

  it('should successfully complete a 3DS2 check card transaction', async () => {
    await launchApp(defaultConfig);
    await element(by.text(Selectors.CHECK_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await complete3DS2();
    await assertResultsScreen({ type: '4', result: '1' });
  });
});

import { element, expect } from 'detox';
import { Selectors, TestData, UserFeedback } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  complete3DS2,
  fillPaymentDetailsSheet,
  isAndroid,
  defaultConfig,
  pressBackButton,
  launchApp,
  disableSync,
} from './helpers';

describe('E2E Negative Flow Tests', () => {
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

  it('should return error message upon a failed 3DS2 payment transaction', async () => {
    await launchApp(defaultConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.FAILED_CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '0' });
    await expect(
      element(by.text('The gateway reported an error'))
    ).toBeVisible();
  });

  it('should return error message upon a declined 3DS2 payment transaction', async () => {
    await launchApp(defaultConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.DECLINED_CODE,
    });
    await disableSync();
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '2' });
    await expect(element(by.text('Card declined: CV2 policy'))).toBeVisible();
  });

  it('should handle a 3DS2 payment transaction verification cancellation', async () => {
    await launchApp(defaultConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
      await waitFor(element(by.text(Selectors.THREEDS2_TITLE_ANDROID)))
        .toBeVisible()
        .withTimeout(30000);
    } else {
      await waitFor(element(by.text(Selectors.THREEDS2_SCREEN_HEADER)))
        .toBeVisible()
        .withTimeout(10000);
    }
    await element(by.text(Selectors.CANCEL_3DS2)).tap();
    await waitFor(element(by.text(UserFeedback.THREEDS2_CANCELLED)))
      .toExist()
      .withTimeout(10000);
  });
});

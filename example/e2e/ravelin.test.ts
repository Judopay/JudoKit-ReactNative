import { element, expect } from 'detox';
import { Selectors, TestData } from './constants';
import {
  clickSettingsButton,
  fillPaymentDetailsSheet,
  pressBackButton,
  disableSync,
  setupRavelinConfig,
  tapGenerateSessionButton,
  delay,
} from './helpers';

describe('E2E Ravelin Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { camera: 'YES', location: 'always' },
      launchArgs: {
        customSettings: await setupRavelinConfig('7'),
      },
    });
    await clickSettingsButton();
    await pressBackButton();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should successfully perform prevented transaction', async () => {
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await disableSync();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await delay(2500);
    await expect(
      element(
        by.text('The recommendation server has prevented this transaction.')
      )
    ).toBeVisible();
  });
});

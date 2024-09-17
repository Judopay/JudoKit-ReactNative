import { element } from 'detox';
import { Selectors, TestData, UserFeedback } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  fillPaymentDetailsSheet,
  pressBackButton,
  noPrefsConfig,
  disableSync,
} from './helpers';

describe('E2E Frictionless Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { camera: 'YES', location: 'always' },
      launchArgs: {
        customSettings: noPrefsConfig,
      },
    });
    await clickSettingsButton();
    await pressBackButton();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should successfully complete a 3DS2 payment frictionless no method transaction', async () => {
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS_NOMETHOD,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should return error upon a 3DS2 payment frictionless auth failed transaction', async () => {
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS_AUTHFAILED,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await waitFor(element(by.text(UserFeedback.THREEDS2_CANCELLED)))
      .toExist()
      .withTimeout(30000);
  });
});

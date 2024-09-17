import { element, expect } from 'detox';
import { Selectors, TestData } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  complete3DS2,
  fillPaymentDetailsSheet,
  delay,
  defaultConfig,
  pressBackButton,
  noPrefsConfig,
  launchApp,
  disableSync,
} from './helpers';

describe('E2E Step Up Tests', () => {
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

  it('should successfully complete a step up payment transaction', async () => {
    await launchApp(noPrefsConfig);
    await clickSettingsButton();
    await delay(2000);
    await pressBackButton();
    await disableSync();
    await delay(2000);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.DECLINED_CODE,
    });
    await disableSync();
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '2' });
    await expect(element(by.id(Selectors.RESULT_MESSAGE))).toHaveText(
      'Card declined: CV2 policy'
    );
  });

  it('should successfully complete a step up preauth transaction', async () => {
    await launchApp(noPrefsConfig);
    await element(by.text(Selectors.PAY_WITH_PREAUTH)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.DECLINED_CODE,
    });
    await disableSync();
    await complete3DS2();
    await assertResultsScreen({ type: '2', result: '2' });
    await expect(element(by.id(Selectors.RESULT_MESSAGE))).toHaveText(
      'Card declined: CV2 policy'
    );
  });
});

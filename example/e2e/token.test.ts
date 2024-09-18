import { element } from 'detox';
import { Selectors, TestData } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  complete3DS2,
  fillPaymentDetailsSheet,
  fillSecurityCodeSheet,
  tapPayNowButton,
  delay,
  isAndroid,
  defaultConfig,
  pressBackButton,
  disableSync,
  launchApp,
} from './helpers';

describe('E2E Token Payment Tests', () => {
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

  it('should successfully complete a 3DS2 token payment transaction', async () => {
    await element(by.id(Selectors.FEATURE_LIST)).scrollTo('bottom');
    await element(by.text(Selectors.TOKEN_PAYMENTS)).tap();
    await delay(2000);
    await disableSync();
    await element(by.id(Selectors.TOKEN_SCROLL_VIEW)).scrollTo('bottom');
    await element(by.text(Selectors.TOKENIZE_NEW_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await waitFor(element(by.id(Selectors.TOKEN_SCROLL_VIEW)))
      .toBeVisible()
      .withTimeout(30000);
    await element(by.id(Selectors.TOKEN_SCROLL_VIEW)).scrollTo('bottom');
    if (await isAndroid()) {
      await delay(1500);
      await device.disableSynchronization();
    }
    await element(by.id(Selectors.PAY_WITH_TOKEN)).tap();
    await fillSecurityCodeSheet();
    await tapPayNowButton();
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully complete a 3DS2 token pre-auth transaction', async () => {
    await launchApp(defaultConfig);
    await element(by.id(Selectors.FEATURE_LIST)).scrollTo('bottom');
    await element(by.text(Selectors.TOKEN_PAYMENTS)).tap();
    await delay(2000);
    await disableSync();
    await element(by.id(Selectors.TOKEN_SCROLL_VIEW)).scrollTo('bottom');
    await element(by.text(Selectors.TOKENIZE_NEW_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await waitFor(element(by.id(Selectors.TOKEN_SCROLL_VIEW)))
      .toBeVisible()
      .withTimeout(30000);
    await element(by.id(Selectors.TOKEN_SCROLL_VIEW)).scrollTo('bottom');
    if (await isAndroid()) {
      await delay(1500);
      await device.disableSynchronization();
    }
    await element(by.id(Selectors.PREAUTH_WITH_TOKEN)).tap();
    await fillSecurityCodeSheet();
    await tapPayNowButton();
    await complete3DS2();
    await assertResultsScreen({ type: '2', result: '1' });
  });
});

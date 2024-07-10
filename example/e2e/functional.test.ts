import { element, expect } from 'detox';
import { Selectors, TestData, UserFeedback } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  enterAuthDetails,
  addCardPaymentMethodAndPay,
  toggleAskForCSCSetting,
  complete3DS2,
  fillPaymentDetailsSheet,
  setNoPreferenceCRI,
  fillSecurityCodeSheet,
  tapPayNowButton,
  delay,
  isAndroid,
} from './helpers';

describe('E2E Functional Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { camera: 'YES', location: 'always' },
    });
    await clickSettingsButton();
    await enterAuthDetails();
  });

  beforeEach(async () => {
    await device.launchApp();
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should successfully complete a 3DS2 token payment transaction', async () => {
    await toggleAskForCSCSetting();
    await element(by.id(Selectors.FEATURE_LIST)).scrollTo('bottom');
    await element(by.text(Selectors.TOKEN_PAYMENTS)).tap();
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await element(by.id(Selectors.TOKEN_SCROLL_VIEW)).scrollTo('bottom');
    await element(by.text(Selectors.TOKENIZE_NEW_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
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
    await toggleAskForCSCSetting();
    await element(by.id(Selectors.FEATURE_LIST)).scrollTo('bottom');
    await element(by.text(Selectors.TOKEN_PAYMENTS)).tap();
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await element(by.id(Selectors.TOKEN_SCROLL_VIEW)).scrollTo('bottom');
    await element(by.text(Selectors.TOKENIZE_NEW_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
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

  it('should successfully complete a 3DS2 payment transaction', async () => {
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully complete a 3DS2 pre-auth transaction', async () => {
    await element(by.text(Selectors.PAY_WITH_PREAUTH)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await complete3DS2();
    await assertResultsScreen({ type: '2', result: '1' });
  });

  it('should successfully complete a 3DS2 register card transaction', async () => {
    await element(by.text(Selectors.REGISTER_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await complete3DS2();
    await assertResultsScreen({ type: '3', result: '1' });
  });

  it('should successfully complete a 3DS2 check card transaction', async () => {
    await element(by.text(Selectors.CHECK_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await complete3DS2();
    await assertResultsScreen({ type: '4', result: '1' });
  });

  it('should successfully complete a 3DS2 payment transaction via payment methods', async () => {
    await toggleAskForCSCSetting();
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await element(by.text(Selectors.PAYMENT_METHODS)).tap();
    await addCardPaymentMethodAndPay();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully complete a 3DS2 pre-auth transaction via payment methods', async () => {
    await toggleAskForCSCSetting();
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await element(by.text(Selectors.PREAUTH_METHODS)).tap();
    await addCardPaymentMethodAndPay();
    await assertResultsScreen({ type: '2', result: '1' });
  });

  it('should return error message upon a failed 3DS2 payment transaction', async () => {
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.FAILED_CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '0' });
    await expect(
      element(by.text('The gateway reported an error'))
    ).toBeVisible();
  });

  it('should return error message upon a declined 3DS2 payment transaction', async () => {
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.DECLINED_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '2' });
    await expect(
      element(
        by.text('Card declined: Additional customer authentication required')
      )
    ).toBeVisible();
  });

  it('should handle a 3DS2 payment transaction verification cancellation', async () => {
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

  it('should successfully complete a 3DS2 payment frictionless transaction', async () => {
    await setNoPreferenceCRI();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully complete a 3DS2 payment frictionless no method transaction', async () => {
    await setNoPreferenceCRI();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS_NOMETHOD,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should return error upon a 3DS2 payment frictionless auth failed transaction', async () => {
    await setNoPreferenceCRI();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS_AUTHFAILED,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await waitFor(element(by.text(UserFeedback.THREEDS2_CANCELLED)))
      .toExist()
      .withTimeout(30000);
  });

  it('should successfully complete a step up payment transaction', async () => {
    await setNoPreferenceCRI();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.DECLINED_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '2' });
    await expect(element(by.id(Selectors.RESULT_MESSAGE))).toHaveText(
      'Card declined: CV2 policy'
    );
  });

  it('should successfully complete a step up preauth transaction', async () => {
    await setNoPreferenceCRI();
    await element(by.text(Selectors.PAY_WITH_PREAUTH)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.FRICTIONLESS,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.DECLINED_CODE,
    });
    if (await isAndroid()) {
      await device.disableSynchronization();
    }
    await complete3DS2();
    await assertResultsScreen({ type: '2', result: '2' });
    await expect(element(by.id(Selectors.RESULT_MESSAGE))).toHaveText(
      'Card declined: CV2 policy'
    );
  });
});

import { element, expect } from 'detox';
import { Selectors, TestData, UserFeedback } from './constants';
import {
  clickSettingsButton,
  fillPaymentDetailsSheet,
  disableSync,
  setupRavelinConfigWithURL,
  tapGenerateSessionButton,
  delay,
  launchApp,
  complete3DS2,
  assertResultsScreen,
  pressBackButton,
} from './helpers';

describe('E2E Ravelin Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { camera: 'YES', location: 'always' },
      launchArgs: {
        customSettings: await setupRavelinConfigWithURL({ url: '7' }),
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
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
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
      element(by.text(UserFeedback.TRANSACTION_PREVENTED))
    ).toBeVisible();
  });

  it('should successfully perform review with challenge transaction', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '25' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
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

  it('should successfully perform allow no preference transaction', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '19' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
    await disableSync();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully perform review no challenge transaction', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '24' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
    await disableSync();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully perform allow challenge as mandate transaction', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '18' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
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

  it('should successfully perform transaction without sending CRI', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '35' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
    await disableSync();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully perform transaction without sending SCA', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '60' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
    await disableSync();
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await disableSync();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully perform transaction without sending both SCA and CRI', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '71' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
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

  it('should successfully perform transaction using SDK configuration', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '78' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
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

  it('should successfully prevent transaction with empty object', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({ url: '67' });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
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
      element(by.text(UserFeedback.TRANSACTION_PREVENTED))
    ).toBeVisible();
  });

  it('should successfully halt transaction with settings switch', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL({
      url: '5',
      haltTransaction: true,
    });
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
    await delay(1000);
    await waitFor(element(by.text(Selectors.SESSION_CREATED_TOAST)))
      .toBeVisible()
      .withTimeout(10000);
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
      element(by.text(UserFeedback.RECOMMENDATION_ERROR))
    ).toBeVisible();
  });
});

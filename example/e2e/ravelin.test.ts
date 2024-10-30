import { element, expect } from 'detox';
import { Selectors, TestData } from './constants';
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
} from './helpers';

describe('E2E Ravelin Tests', () => {
  afterEach(async () => {
    await device.terminateApp();
  });

  it('should successfully perform prevented transaction', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL('7');
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
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
      element(
        by.text('The recommendation server has prevented this transaction.')
      )
    ).toBeVisible();
  });

  it('should successfully perform review with challenge transaction', async () => {
    let ravelinConfig = await setupRavelinConfigWithURL('25');
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
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
    let ravelinConfig = await setupRavelinConfigWithURL('19');
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
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
    let ravelinConfig = await setupRavelinConfigWithURL('24');
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
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
    let ravelinConfig = await setupRavelinConfigWithURL('18');
    await launchApp(ravelinConfig);
    await clickSettingsButton();
    await tapGenerateSessionButton();
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
});

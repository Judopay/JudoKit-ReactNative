import { element, expect } from 'detox';
import { Selectors, TestData, UserFeedback } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  complete3DS2,
  fillPaymentDetailsSheet,
  tapPayNowButton,
  delay,
  isAndroid,
  fillBillingInfoFields,
  billingInfoCity,
  billingInfoPostCode,
  billingInfoCountry,
  getBillingInfoEmail,
  getBillingInfoPhone,
  getBillingInfoAddress,
  pressBackButton,
  billingInfoConfig,
  launchApp,
  disableSync,
  blurSelection,
  fillCountryAndStateFields,
} from './helpers';

describe('E2E Billing Info Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { camera: 'YES', location: 'always' },
      launchArgs: {
        customSettings: billingInfoConfig,
      },
    });
    await clickSettingsButton();
    await pressBackButton();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should successfully complete a transaction with billing details', async () => {
    await clickSettingsButton();
    await delay(2000);
    await pressBackButton();
    await disableSync();
    await delay(2000);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await fillBillingInfoFields({
      email: TestData.VALID_EMAIL,
      mobile: TestData.VALID_PHONE,
      addressOne: TestData.ADDRESS_ONE,
      city: TestData.VALID_CITY,
      postCode: TestData.VALID_POST_CODE,
    });
    await fillCountryAndStateFields('United States', 'California');
    await tapPayNowButton();
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should validate UK post code entry', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await device.disableSynchronization();
    await delay(1500);
    await element(by.id(await billingInfoCountry())).replaceText(
      'United Kingdom'
    );
    await delay(1500);
    await element(by.id(await billingInfoPostCode())).typeText(
      TestData.INVALID_POST_CODE
    );
    await element(by.id(await billingInfoCity())).tap();
    await delay(2000);
    await expect(
      element(by.text(UserFeedback.INVALID_POSTCODE_ERROR))
    ).toExist();
  });

  it('should validate US post code entry', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await device.disableSynchronization();
    await delay(1500);
    await element(by.id(await billingInfoPostCode())).typeText(
      TestData.INVALID_POST_CODE
    );
    await delay(1500);
    await blurSelection();
    await expect(
      element(by.text(UserFeedback.INVALID_ZIPCODE_ERROR))
    ).toExist();
  });

  it('should validate CA post code entry', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await device.disableSynchronization();
    await delay(2000);
    await element(by.id(await billingInfoCountry())).replaceText('Canada');
    await element(by.id(await billingInfoPostCode())).typeText(
      TestData.INVALID_POST_CODE
    );
    await delay(1500);
    await blurSelection();
    await expect(
      element(by.text(UserFeedback.INVALID_POSTCODE_ERROR))
    ).toExist();
  });

  it('should validate email entry', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await device.disableSynchronization();
    await delay(2000);
    await element(by.id(await getBillingInfoEmail())).typeText(
      TestData.CARDHOLDER_NAME
    );
    await blurSelection();
    await expect(element(by.text(UserFeedback.INVALID_EMAIL_LABEL))).toExist();
  });

  it('should validate phone number entry', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await device.disableSynchronization();
    await delay(2000);
    if (await isAndroid()) {
      await element(by.id(await billingInfoCountry())).replaceText(
        'United Kingdom'
      );
    }
    await element(by.id(await getBillingInfoPhone())).typeText(
      TestData.DECLINED_CODE
    );
    await element(by.id(await getBillingInfoEmail())).tap();
    await expect(element(by.text(UserFeedback.INVALID_PHONE_LABEL))).toExist();
  });

  it('should validate address entry', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await device.disableSynchronization();
    await delay(2000);
    if (await isAndroid()) {
      await element(by.id(await billingInfoCountry())).replaceText(
        'United Kingdom'
      );
    }
    await element(by.id(await getBillingInfoAddress())).typeText(
      TestData.SPECIAL_CHARACTERS
    );
    await blurSelection();
    await expect(
      element(by.text(UserFeedback.INVALID_ADDRESS_LABEL))
    ).toExist();
  });

  it('should validate city entry', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await device.disableSynchronization();
    await delay(2000);
    if (await isAndroid()) {
      await element(by.id(await billingInfoCountry())).replaceText(
        'United Kingdom'
      );
    }
    await element(by.id(await billingInfoCity())).typeText(
      TestData.SPECIAL_CHARACTERS
    );
    await blurSelection();
    await expect(element(by.text(UserFeedback.INVALID_CITY_LABEL))).toExist();
  });

  it('should successfully complete transaction with an India state', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await fillBillingInfoFields({
      email: TestData.VALID_EMAIL,
      mobile: TestData.VALID_PHONE,
      addressOne: TestData.ADDRESS_ONE,
      city: TestData.VALID_CITY,
      postCode: TestData.VALID_POST_CODE,
    });
    await fillCountryAndStateFields('India', 'Kerala');
    await tapPayNowButton();
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully complete transaction with an China state', async () => {
    await launchApp(billingInfoConfig);
    await element(by.text(Selectors.PAY_WITH_CARD)).tap();
    await fillPaymentDetailsSheet({
      number: TestData.CARD_NUMBER,
      name: TestData.CARDHOLDER_NAME,
      expiry: TestData.EXPIRY_DATE,
      code: TestData.SECURITY_CODE,
    });
    await fillBillingInfoFields({
      email: TestData.VALID_EMAIL,
      mobile: TestData.VALID_PHONE,
      addressOne: TestData.ADDRESS_ONE,
      city: TestData.VALID_CITY,
      postCode: TestData.VALID_POST_CODE,
    });
    await fillCountryAndStateFields('China', 'Henan Sheng');
    await tapPayNowButton();
    await complete3DS2();
    await assertResultsScreen({ type: '1', result: '1' });
  });
});

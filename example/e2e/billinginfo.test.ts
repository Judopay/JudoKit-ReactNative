import { element } from 'detox';
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
  assertErrorLabelText,
  billingInfoCity,
  billingInfoPostCode,
  billingInfoCountry,
  blurSelection,
  getBillingInfoEmail,
  getBillingInfoPhone,
  getBillingInfoAddress,
  defaultConfig,
  pressBackButton,
  billingInfoConfig,
  launchApp,
  disableSync,
} from './helpers';

describe('E2E Billing Info Tests', () => {
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

  it('should successfully complete a transaction with billing details', async () => {
    await launchApp(billingInfoConfig);
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
      country: TestData.VALID_COUNTRY,
      mobile: TestData.VALID_PHONE,
      addressOne: TestData.ADDRESS_ONE,
      city: TestData.VALID_CITY,
      postCode: TestData.VALID_POST_CODE,
    });
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
    await element(by.id(await billingInfoPostCode())).typeText(
      TestData.INVALID_POST_CODE
    );
    await element(by.id(await billingInfoCity())).tap();
    await delay(2000);
    await assertErrorLabelText(UserFeedback.INVALID_POSTCODE_ERROR);
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
    await element(by.id(await billingInfoCountry())).replaceText(
      'United States'
    );
    await element(by.id(await billingInfoPostCode())).typeText(
      TestData.INVALID_POST_CODE
    );
    await delay(1500);
    await blurSelection();
    await assertErrorLabelText(UserFeedback.INVALID_ZIPCODE_ERROR);
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
    await delay(2000);
    await blurSelection();
    await assertErrorLabelText(UserFeedback.INVALID_POSTCODE_ERROR);
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
    await assertErrorLabelText(UserFeedback.INVALID_EMAIL_LABEL);
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
    await assertErrorLabelText(UserFeedback.INVALID_PHONE_LABEL);
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
    await assertErrorLabelText(UserFeedback.INVALID_ADDRESS_LABEL);
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
    await assertErrorLabelText(UserFeedback.INVALID_CITY_LABEL);
  });
});

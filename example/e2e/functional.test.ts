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
  fillBillingInfoFields,
  toggleBillingInfoScreen,
  assertErrorLabelText,
  billingInfoCity,
  billingInfoPostCode,
  billingInfoCountry,
  blurSelection,
  getBillingInfoEmail,
  getBillingInfoPhone,
  getBillingInfoAddress,
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

  it('should successfully complete a transaction with billing details', async () => {
    await toggleBillingInfoScreen();
    await delay(1500);
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
    await toggleBillingInfoScreen();
    await delay(1500);
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
    await toggleBillingInfoScreen();
    await delay(1500);
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
    await toggleBillingInfoScreen();
    await delay(1500);
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
    await toggleBillingInfoScreen();
    await delay(2000);
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
    await toggleBillingInfoScreen();
    await delay(2000);
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
    await toggleBillingInfoScreen();
    await delay(2000);
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
    await toggleBillingInfoScreen();
    await delay(2000);
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

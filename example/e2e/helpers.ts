import { element, expect } from 'detox';
import { Selectors, TestData } from './constants';
import { expect as jestExpect } from '@jest/globals';
import { processJSONFile } from './processJSONFile';

const judoId = process.env.JUDO_ID || '';
const token = process.env.API_TEST_TOKEN || '';
const secret = process.env.API_TEST_SECRET || '';

export interface Props {
  type: string;
  result: string;
  message?: string;
}

export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  code: string;
}

export interface BillingDetails {
  email: string;
  country: string;
  mobile: string;
  addressOne: string;
  addressTwo?: string;
  city: string;
  postCode: string;
  state?: string;
}

let billingInfoEnabled = false;

export async function fillPaymentDetailsSheet(props: CardDetails) {
  if (await isIOS()) {
    await element(by.id(Selectors.CARD_NUMBER_INPUT)).typeText(props.number);
    await element(by.id(Selectors.CARDHOLDER_NAME_INPUT)).typeText(props.name);
    await element(by.id(Selectors.EXPIRY_DATE_INPUT)).typeText(props.expiry);
    await element(by.id(Selectors.SECURITY_CODE_INPUT)).typeText(props.code);
    await element(
      by.id(Selectors.PAY_NOW_BUTTON).and(by.traits(['button']))
    ).tap();
  } else {
    await waitFor(element(by.id(Selectors.ANDROID_CARD)))
      .toBeVisible()
      .withTimeout(30000);
    await element(by.id(Selectors.ANDROID_CARD)).replaceText(props.number);
    await element(by.id(Selectors.ANDROID_NAME)).replaceText(props.name);
    await element(by.id(Selectors.ANDROID_EXPIRY)).replaceText(props.expiry);
    await element(by.id(Selectors.ANDROID_CODE)).replaceText(props.code);
    await element(by.id(Selectors.ANDROID_PAY_NOW)).tap();
    await device.enableSynchronization();
  }
}

export async function assertResultsScreen(props: Props) {
  await waitFor(element(by.text(Selectors.RESULT_HEADER)))
    .toExist()
    .withTimeout(30000);
  await expect(element(by.id(Selectors.RESULT_RECEIPT_ID))).not.toHaveText('');
  await expect(element(by.id(Selectors.RESULT_TYPE))).toHaveText(props.type);
  await expect(element(by.id(Selectors.RESULT_VALUE))).toHaveText(props.result);
}

export async function complete3DS2() {
  if (await isAndroid()) {
    await device.disableSynchronization();
    await waitFor(element(by.text(Selectors.THREEDS2_TITLE_ANDROID)))
      .toBeVisible()
      .withTimeout(30000);
    await delay(1500);
    try {
      for (let i = 0; i < 3; i++) {
        await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress();
        await delay(1000);
      }
    } catch (exception) {}
  } else {
    await waitFor(element(by.text(Selectors.THREEDS2_SCREEN_HEADER)))
      .toBeVisible()
      .withTimeout(30000);
    await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress();
    await delay(5000);
    try {
      await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress();
    } catch (exception) {}
  }
}

export async function isCardAddedToPaymentMethods(): Promise<boolean> {
  try {
    await expect(element(by.label(Selectors.EXISTING_CARD))).toBeVisible();
    return true;
  } catch (exception) {
    return false;
  }
}

export async function addCardPaymentMethodAndPay() {
  let cardAdded = false;
  if (await isCardAddedToPaymentMethods()) {
    cardAdded = true;
    await element(by.label(Selectors.EXISTING_CARD)).swipe('left');
    await element(by.text(Selectors.DELETE_CARD)).tap();
    await delay(3000);
  }
  if (await isAndroid()) {
    await element(by.text(Selectors.ADD_CARD_BUTTON)).tap();
  } else {
    await delay(1500);
    if (cardAdded) {
      await element(by.text(Selectors.ADD_CARD_BUTTON)).atIndex(1).tap();
    } else {
      await element(by.text(Selectors.ADD_CARD_BUTTON)).tap();
    }
  }
  await fillPaymentDetailsSheet({
    number: TestData.CARD_NUMBER,
    name: TestData.CARDHOLDER_NAME,
    expiry: TestData.EXPIRY_DATE,
    code: TestData.SECURITY_CODE,
  });
  if (await isAndroid()) {
    await delay(5000);
    await device.disableSynchronization();
    await element(by.id(Selectors.ANDROID_METHODS_PAY_NOW)).tap();
  } else {
    await waitFor(element(by.text(Selectors.IOS_PAY_NOW)))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.text(Selectors.IOS_PAY_NOW)).tap();
  }
  await fillSecurityCodeSheet();
  await tapPayNowButton();
  await complete3DS2();
}

export async function clickSettingsButton() {
  await waitFor(element(by.id(Selectors.SETTINGS_BUTTON)))
    .toBeVisible()
    .withTimeout(10000);
  await element(by.id(Selectors.SETTINGS_BUTTON)).tap();
}

export async function enterAuthDetails() {
  await element(by.id(Selectors.JUDO_ID_INPUT)).replaceText(judoId);
  await element(by.id(Selectors.AUTH_TOGGLE)).longPress();
  await element(by.id(Selectors.TOKEN_INPUT)).replaceText(token);
  await element(by.id(Selectors.SECRET_INPUT)).replaceText(secret);
  await pressBackButton();
}

export async function dissmissKeyboardOnTokenScreen() {
  await element(by.id(Selectors.HELPER_TEXT)).tap();
}

export async function toggleAskForCSCSetting() {
  if (await isAndroid()) {
    await device.enableSynchronization();
  }
  await clickSettingsButton();
  await element(by.id(Selectors.SETTINGS_LISTVIEW)).scrollTo('bottom');
  if (await isAndroid()) {
    try {
      await expect(element(by.id(Selectors.ASK_FOR_CSC))).toHaveToggleValue(
        true
      );
    } catch (exception) {
      await element(by.id(Selectors.ASK_FOR_CSC)).tap();
    }
  } else {
    let askForCSCToggle = await element(
      by.id(Selectors.ASK_FOR_CSC)
    ).getAttributes();
    if ('value' in askForCSCToggle && askForCSCToggle.value === '0') {
      await element(by.id(Selectors.ASK_FOR_CSC)).tap();
    }
  }
  await element(by.id(Selectors.BACK_BUTTON)).longPress();
}

export async function fillSecurityCodeSheet() {
  if (await isAndroid()) {
    await delay(5000);
    await element(by.id(Selectors.ANDROID_CODE)).typeText(
      TestData.SECURITY_CODE
    );
    await device.disableSynchronization();
  } else {
    await element(by.id(Selectors.SECURITY_CODE_INPUT)).typeText(
      TestData.SECURITY_CODE
    );
  }
}

export async function fillCardholderNameSheet() {
  await element(by.id(Selectors.CARDHOLDER_NAME_INPUT)).typeText(
    TestData.CARDHOLDER_NAME
  );
}

export async function tapPayNowButton() {
  if (await isIOS()) {
    await element(
      by.id(Selectors.PAY_NOW_BUTTON).and(by.traits(['button']))
    ).tap();
  } else {
    await element(by.text(Selectors.ANDROID_PAY_NOW_LABEL)).tap();
  }
}

export async function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

export async function isIOS(): Promise<boolean> {
  return device.getPlatform() === 'ios';
}

export async function isAndroid(): Promise<boolean> {
  return device.getPlatform() === 'android';
}

export async function pressBackButton() {
  try {
    let backButton = await element(
      by.id(Selectors.BACK_BUTTON)
    ).getAttributes();
    if ('visible' in backButton && backButton.visible === true) {
      await element(by.id(Selectors.BACK_BUTTON)).longPress();
    }
  } catch (exception) {}
}

export async function fillBillingInfoFields(props: BillingDetails) {
  if (await isIOS()) {
    await element(by.id(Selectors.EMAIL_FIELD)).typeText(props.email);
    await element(by.id(Selectors.PHONE_FIELD)).typeText(props.mobile);
    await element(by.id(Selectors.ADDRESS_ONE_FIELD)).typeText(
      props.addressOne
    );
    await element(by.id(Selectors.CITY_FIELD)).typeText(props.city + '\n');
    await element(by.id(Selectors.POST_CODE_FIELD)).typeText(props.postCode);
  } else {
    await device.disableSynchronization();
    await delay(3000);
    await element(by.id(Selectors.EMAIL_ENTRY_FIELD)).replaceText(props.email);
    await element(by.id(Selectors.COUNTRY_ENTRY_FIELD)).replaceText(
      props.country
    );
    await element(by.id(Selectors.PHONE_ENTRY_FIELD)).replaceText(props.mobile);
    await element(by.id(Selectors.ADDRESS_ONE_ENTRY_FIELD)).replaceText(
      props.addressOne
    );
    await element(by.id(Selectors.CITY_ENTRY_FIELD)).replaceText(props.city);
    await element(by.id(Selectors.POST_CODE_ENTRY_FIELD)).replaceText(
      props.postCode
    );
  }
}

export async function toggleBillingInfoScreen() {
  if (!billingInfoEnabled) {
    await clickSettingsButton();
    await delay(2000);
    await element(by.id(Selectors.BILLING_INFO_TOGGLE)).tap();
    billingInfoEnabled = true;
    await pressBackButton();
  }
}

export async function assertErrorLabelText(expected: string) {
  let errorLabel;
  if (await isAndroid()) {
    let attributes = await element(
      by.id(await billingInfoErrorLabel())
    ).getAttributes();
    if ('text' in attributes) {
      errorLabel = attributes.text;
    }
    return jestExpect(errorLabel).toEqual(expected);
  } else {
    await expect(element(by.text(expected))).toExist();
  }
}

export async function blurSelection() {
  if (await isAndroid()) {
    await element(by.id(Selectors.PHONE_COUNTRY_CODE_ENTRY_FIELD)).tap();
  } else {
    await element(by.id(Selectors.PHONE_COUNTRY_CODE)).tap();
  }
}

export async function billingInfoPostCode(): Promise<string> {
  if (await isIOS()) {
    return Selectors.POST_CODE_FIELD;
  } else return Selectors.POST_CODE_ENTRY_FIELD;
}

export async function billingInfoCity(): Promise<string> {
  if (await isIOS()) {
    return Selectors.CITY_FIELD;
  } else return Selectors.CITY_ENTRY_FIELD;
}

export async function billingInfoErrorLabel(): Promise<string> {
  if (await isIOS()) {
    return Selectors.FIELD_ERROR_LABEL;
  } else return Selectors.ERROR_LABEL;
}

export async function billingInfoCountry(): Promise<string> {
  if (await isIOS()) {
    return Selectors.COUNTRY_FIELD;
  } else return Selectors.COUNTRY_ENTRY_FIELD;
}

export async function getBillingInfoEmail(): Promise<string> {
  if (await isIOS()) {
    return Selectors.EMAIL_FIELD;
  } else return Selectors.EMAIL_ENTRY_FIELD;
}

export async function getBillingInfoPhone(): Promise<string> {
  if (await isIOS()) {
    return Selectors.PHONE_FIELD;
  } else return Selectors.PHONE_ENTRY_FIELD;
}

export async function getBillingInfoAddress(): Promise<string> {
  if (await isIOS()) {
    return Selectors.ADDRESS_ONE_FIELD;
  } else return Selectors.ADDRESS_ONE_ENTRY_FIELD;
}

export async function toggleBillingInfoScreenOff() {
  if (billingInfoEnabled) {
    await clickSettingsButton();
    await delay(2000);
    await element(by.id(Selectors.BILLING_INFO_TOGGLE)).tap();
    billingInfoEnabled = false;
    await pressBackButton();
  }
}

export const defaultConfig = processJSONFile('./configs/default.json', {
  apiConfiguration: {
    judoId: process.env.JUDO_ID,
  },
  authorization: {
    token: process.env.API_TEST_TOKEN,
    secret: process.env.API_TEST_SECRET,
  },
});

export const noPrefsConfig = processJSONFile('./configs/noPreferenceCRI.json', {
  apiConfiguration: {
    judoId: process.env.JUDO_ID,
  },
  authorization: {
    token: process.env.API_TEST_TOKEN,
    secret: process.env.API_TEST_SECRET,
  },
});

export const billingInfoConfig = processJSONFile('./configs/billingInfo.json', {
  apiConfiguration: {
    judoId: process.env.JUDO_ID,
  },
  authorization: {
    token: process.env.API_TEST_TOKEN,
    secret: process.env.API_TEST_SECRET,
  },
});

export async function launchApp(config: string) {
  await device.launchApp({
    launchArgs: {
      customSettings: config,
    },
  });
  if (await isAndroid()) {
    await device.disableSynchronization();
  }
}

export async function disableSync() {
  if (await isAndroid()) {
    await device.disableSynchronization();
  }
}

export async function setupRavelinConfigWithURL(url: string) {
  const recommendationURL = process.env.RAVELIN_REC_URL;
  const ravelinConfig = processJSONFile('./configs/ravelin.json', {
    apiConfiguration: {
      judoId: process.env.JUDO_ID,
    },
    authorization: {
      token: process.env.API_TEST_TOKEN,
      secret: process.env.API_TEST_SECRET,
    },
    reference: {
      consumerReference: `RAVELIN-TRANSACTION-${crypto
        .randomUUID()
        .slice(0, 8)}`,
    },
    recommendation: {
      isOn: true,
      url: recommendationURL + url,
      rsaPublicKey: process.env.RAVELIN_RSA_KEY,
      haltTransactionInCaseOfAnyError: false,
    },
  });
  return ravelinConfig;
}

export async function tapGenerateSessionButton() {
  await element(by.id(Selectors.GENERATE_PAYMENT_SESSION)).tap();
}

export async function updateRecommendationURLWith() {
  await tapGenerateSessionButton();
}

import { element, expect } from 'detox';
import { Selectors, TestData } from './constants';

const judoId = process.env.JUDO_ID || '';
const token = process.env.API_TEST_TOKEN || '';
const secret = process.env.API_TEST_SECRET || '';

export interface Props {
  type: string;
  result: string;
}

export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  code: string;
}

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
    await element(by.id(Selectors.ANDROID_CARD)).replaceText(props.number);
    await element(by.id(Selectors.ANDROID_NAME)).replaceText(props.name);
    await element(by.id(Selectors.ANDROID_EXPIRY)).replaceText(props.expiry);
    await element(by.id(Selectors.ANDROID_CODE)).typeText(props.code);
    await element(by.id(Selectors.ANDROID_PAY_NOW)).tap();
    await device.enableSynchronization();
  }
}

export async function assertResultsScreen(props: Props) {
  await waitFor(element(by.text(Selectors.RESULT_HEADER)))
    .toExist()
    .withTimeout(15000);
  await expect(element(by.id(Selectors.RESULT_RECEIPT_ID))).not.toHaveText('');
  await expect(element(by.id(Selectors.RESULT_TYPE))).toHaveText(props.type);
  await expect(element(by.id(Selectors.RESULT_VALUE))).toHaveText(props.result);
}

export async function complete3DS2() {
  if (await isAndroid()) {
    await waitFor(element(by.text(Selectors.THREEDS2_TITLE_ANDROID)))
      .toBeVisible()
      .withTimeout(15000);
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
      .withTimeout(15000);
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
    await delay(2000);
    await device.disableSynchronization();
    await element(by.id(Selectors.ANDROID_METHODS_PAY_NOW)).tap();
  } else {
    await element(by.text(Selectors.IOS_PAY_NOW)).tap();
  }
  await fillSecurityCodeSheet();
  await tapPayNowButton();
  await complete3DS2();
}

export async function setNoPreferenceCRI() {
  if (await isAndroid()) {
    await device.enableSynchronization();
  }
  await element(by.id(Selectors.SETTINGS_BUTTON)).tap();
  await element(by.text(Selectors.CHALLENGE_REQUEST_SETTINGS)).tap();
  await element(by.text(Selectors.NO_PREFERENCE)).tap();
  if (await isAndroid()) {
    try {
      await expect(element(by.id(Selectors.AUTH_TOGGLE))).toHaveToggleValue(
        true
      );
    } catch (exception) {
      await enterAuthDetails();
    }
  } else {
    let tokenToggle = await element(
      by.id(Selectors.AUTH_TOGGLE)
    ).getAttributes();
    if ('value' in tokenToggle && tokenToggle.value === '0') {
      await enterAuthDetails();
    }
  }
  if (await isAndroid()) {
    await device.disableSynchronization();
  }
}

export async function clickSettingsButton() {
  await element(by.id(Selectors.SETTINGS_BUTTON)).tap();
}

export async function enterAuthDetails() {
  await element(by.id(Selectors.JUDO_ID_INPUT)).replaceText(judoId);
  await element(by.id(Selectors.AUTH_TOGGLE)).longPress();
  await element(by.id(Selectors.TOKEN_INPUT)).replaceText(token);
  await element(by.id(Selectors.SECRET_INPUT)).replaceText(secret);
  let backButton = await element(by.id(Selectors.BACK_BUTTON)).getAttributes();
  if ('visible' in backButton && backButton.visible === true) {
    await element(by.id(Selectors.BACK_BUTTON)).longPress();
  }
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
    await delay(1500);
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

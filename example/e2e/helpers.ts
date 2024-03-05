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
  if (device.getPlatform() === 'ios') {
    await element(by.id(Selectors.CARD_NUMBER_INPUT)).typeText(props.number);
    await element(by.id(Selectors.CARDHOLDER_NAME_INPUT)).typeText(props.name);
    await element(by.id(Selectors.EXPIRY_DATE_INPUT)).typeText(props.expiry);
    await element(by.id(Selectors.SECURITY_CODE_INPUT)).typeText(props.code);
    await element(
      by.id(Selectors.PAY_NOW_BUTTON).and(by.traits(['button']))
    ).tap();
  } else if (device.getPlatform() === 'android') {
    await element(by.id(Selectors.ANDROID_CARD)).replaceText(props.number);
    await element(by.id(Selectors.ANDROID_NAME)).replaceText(props.name);
    await element(by.id(Selectors.ANDROID_EXPIRY)).replaceText(props.expiry);
    await element(by.id(Selectors.ANDROID_CODE)).typeText(props.code);
    await element(by.id('cardEntrySubmitButton')).tap();
    await device.enableSynchronization();
  }
}

export async function assertResultsScreen(props: Props) {
  await waitFor(element(by.text('Result')))
    .toExist()
    .withTimeout(15000);
  await expect(element(by.id('receiptId-value'))).not.toHaveText('');
  await expect(element(by.id('type-value'))).toHaveText(props.type);
  await expect(element(by.id('result-value'))).toHaveText(props.result);
}

export async function complete3DS2() {
  if (device.getPlatform() === 'android') {
    await waitFor(element(by.text(Selectors.THREEDS2_TITLE_ANDROID)))
      .toBeVisible()
      .withTimeout(15000);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress();
    try {
      await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress();
    } catch (exception) {
      console.info(
        'Exception caught - unable to tap on complete button during 3DS2'
      );
    }
  } else {
    await waitFor(element(by.text(Selectors.THREEDS2_SCREEN_HEADER)))
      .toBeVisible()
      .withTimeout(15000);
    await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress();
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
  if (await isCardAddedToPaymentMethods()) {
    await element(by.label(Selectors.EXISTING_CARD)).swipe('left');
    await element(by.text('Delete')).tap();
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  if (device.getPlatform() === 'android') {
    await element(by.text(Selectors.ADD_CARD_BUTTON)).tap();
  } else {
    await element(by.text(Selectors.ADD_CARD_BUTTON)).atIndex(1).tap();
  }
  await fillPaymentDetailsSheet({
    number: TestData.CARD_NUMBER,
    name: TestData.CARDHOLDER_NAME,
    expiry: TestData.EXPIRY_DATE,
    code: TestData.SECURITY_CODE,
  });
  if (device.getPlatform() === 'android') {
    await device.enableSynchronization();
  }
  await waitFor(element(by.label(Selectors.EXISTING_CARD)))
    .toBeVisible()
    .withTimeout(3000);
  if (device.getPlatform() === 'android') {
    await element(by.text('Pay Now')).tap();
  } else {
    await element(by.text('PAY NOW')).tap();
  }
  await fillSecurityCodeSheet();
  await tapPayNowButton();
  await complete3DS2();
}

export async function setNoPreferenceCRI() {
  if (device.getPlatform() === 'android') {
    await device.enableSynchronization();
  }
  await element(by.id(Selectors.SETTINGS_BUTTON)).tap();
  await element(by.text(Selectors.CHALLENGE_REQUEST_SETTINGS)).tap();
  await element(by.text(Selectors.NO_PREFERENCE)).tap();
  let tokenToggle = await element(by.id(Selectors.AUTH_TOGGLE)).getAttributes();
  if ('value' in tokenToggle) {
    if (tokenToggle.value === '0') {
      await enterAuthDetails();
    }
  }
  if (device.getPlatform() === 'android') {
    await element(by.id(Selectors.BACK_BUTTON)).longPress();
    await device.disableSynchronization();
  }
}

export async function clickSettingsButton() {
  if (device.getPlatform() === 'ios') {
    await element(by.id(Selectors.SETTINGS_BUTTON)).tap();
  } else if (device.getPlatform() === 'android') {
    await element(by.id(Selectors.SETTINGS_BUTTON)).tap();
  }
}

export async function enterAuthDetails() {
  await element(by.id(Selectors.JUDO_ID_INPUT)).replaceText(judoId);
  await element(by.id(Selectors.AUTH_TOGGLE)).longPress();
  await element(by.id(Selectors.TOKEN_INPUT)).replaceText(token);
  await element(by.id(Selectors.SECRET_INPUT)).replaceText(secret);
  let backButton = await element(by.id(Selectors.BACK_BUTTON)).getAttributes();
  if ('visible' in backButton) {
    if (backButton.visible === true) {
      await element(by.id(Selectors.BACK_BUTTON)).longPress();
    }
  }
}

export async function dissmissKeyboardOnTokenScreen() {
  await element(by.id(Selectors.HELPER_TEXT)).tap();
}

export async function toggleAskForCSCSetting() {
  if (device.getPlatform() === 'android') {
    await device.enableSynchronization();
  }
  await clickSettingsButton();
  await element(by.id('settings-list')).scrollTo('bottom');
  if (device.getPlatform() === 'android') {
    await element(by.id(Selectors.ASK_FOR_CSC)).tap();
  } else if (device.getPlatform() === 'ios') {
    let askForCSCToggle = await element(
      by.id(Selectors.ASK_FOR_CSC)
    ).getAttributes();
    if ('value' in askForCSCToggle) {
      if (askForCSCToggle.value === '0') {
        await element(by.id(Selectors.ASK_FOR_CSC)).tap();
      }
    }
  }
  await element(by.id(Selectors.BACK_BUTTON)).longPress();
}

export async function fillSecurityCodeSheet() {
  if (device.getPlatform() === 'android') {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await element(by.id(Selectors.ANDROID_CODE)).typeText(
      TestData.SECURITY_CODE
    );
    await device.disableSynchronization();
  } else if (device.getPlatform() === 'ios') {
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
  if (device.getPlatform() === 'ios') {
    await element(
      by.id(Selectors.PAY_NOW_BUTTON).and(by.traits(['button']))
    ).tap();
  } else if (device.getPlatform() === 'android') {
    await element(by.text('Pay Now')).tap();
  }
}

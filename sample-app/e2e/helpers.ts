import {element, expect} from 'detox'
import {Selectors, TestData} from './constants'

export async function fillPaymentDetailsSheet(
  failed: boolean = false,
  declined: boolean = false,
  frictionless: boolean = false,
) {
  if (failed) {
    await element(by.id(Selectors.CARD_NUMBER_INPUT)).replaceText(
      TestData.FAILED_CARD_NUMBER,
    )
  } else {
    if (device.getPlatform() === 'ios') {
      await element(by.id(Selectors.CARD_NUMBER_INPUT)).replaceText(
        TestData.CARD_NUMBER,
      )
    } else if (device.getPlatform() === 'android') {
      await element(by.text('Card number')).replaceText(TestData.CARD_NUMBER)
    }
  }
  await element(by.id(Selectors.EXPIRY_DATE_INPUT)).typeText(
    TestData.EXPIRY_DATE,
  )
  if (declined) {
    await element(by.id(Selectors.SECURITY_CODE_INPUT)).typeText(
      TestData.DECLINED_CODE,
    )
  } else {
    await element(by.id(Selectors.SECURITY_CODE_INPUT)).typeText(
      TestData.SECURITY_CODE,
    )
  }
  if (!frictionless) {
    if (device.getPlatform() === 'ios') {
      await element(by.id(Selectors.CARDHOLDER_NAME_INPUT)).typeText(
        TestData.CARDHOLDER_NAME,
      )
    } else if (device.getPlatform() === 'android') {
      await element(by.text('Cardholder Name')).replaceText(
        TestData.CARDHOLDER_NAME,
      )
    }
    await element(
      by.id(Selectors.PAY_NOW_BUTTON).and(by.traits(['button'])),
    ).tap()
  }
}

export async function assertResultsScreen(type: string, result: string) {
  await waitFor(element(by.text('Result')))
    .toExist()
    .withTimeout(10000)
  await expect(element(by.id('receiptId-value'))).not.toHaveText('')
  await expect(element(by.id('type-value'))).toHaveText(type)
  await expect(element(by.id('result-value'))).toHaveText(result)
}

export async function complete3DS2() {
  await waitFor(element(by.text(Selectors.THREEDS2_SCREEN_HEADER)))
    .toBeVisible()
    .withTimeout(10000)
  await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress()
}

export async function addCardPaymentMethod() {
  await element(by.text(Selectors.ADD_CARD_BUTTON)).tap()
  await fillPaymentDetailsSheet()
  await waitFor(element(by.label(Selectors.EXISTING_CARD)))
    .toBeVisible()
    .withTimeout(3000)
  await element(by.text('PAY NOW')).tap()
  await complete3DS2()
}

export async function setNoPreferenceCRI() {
  await element(by.id(Selectors.SETTINGS_BUTTON)).tap()
  await element(by.text(Selectors.CHALLENGE_REQUEST_SETTINGS)).tap()
  await element(by.text(Selectors.NO_PREFERENCE)).tap()
  await element(by.id(Selectors.BACK_BUTTON)).tap()
}

export async function clickSettingsButton() {
  if (device.getPlatform() === 'ios') {
    await element(by.id(Selectors.SETTINGS_BUTTON)).tap()
  } else if (device.getPlatform() === 'android') {
    await element(by.id(Selectors.SETTINGS_BUTTON)).longPress()
  }
}

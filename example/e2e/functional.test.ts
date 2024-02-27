import { element } from 'detox';
import { Selectors } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  enterAuthDetails,
  addCardPaymentMethod,
  toggleAskForCSCSetting,
  fillSecurityCodeSheet,
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
    if (device.getPlatform() === 'android') {
      await device.disableSynchronization();
    }
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  // it('should successfully complete a 3DS2 token payment transaction', async () => {
  //   await element(by.id(Selectors.FEATURE_LIST)).scrollTo('bottom')
  //   await element(by.text(Selectors.TOKEN_PAYMENTS)).tap()
  //   await element(by.text(Selectors.TOKENIZE_NEW_CARD)).tap()
  //   await fillPaymentDetailsSheet()
  //   await element(by.id(Selectors.TOKEN_CVV_CODE)).typeText(
  //     TestData.SECURITY_CODE,
  //   )
  //   await dissmissKeyboardOnTokenScreen()
  //   await element(by.id(Selectors.TOKEN_SCROLL_VIEW)).scrollTo('bottom')
  //   await element(by.id(Selectors.PAY_WITH_TOKEN)).tap()
  //   await complete3DS2()
  //   try {
  //     await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress()
  //     await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress()
  //   } catch (error) {}
  //   await assertResultsScreen({type: '1', result: '1'})
  // })

  // it('should successfully complete a 3DS2 token pre-auth transaction', async () => {
  //   await element(by.id(Selectors.FEATURE_LIST)).scrollTo('bottom')
  //   await element(by.text(Selectors.TOKEN_PAYMENTS)).tap()
  //   await element(by.text(Selectors.TOKENIZE_NEW_CARD)).tap()
  //   await fillPaymentDetailsSheet()
  //   await element(by.id(Selectors.TOKEN_CVV_CODE)).typeText(
  //     TestData.SECURITY_CODE,
  //   )
  //   await dissmissKeyboardOnTokenScreen()
  //   await element(by.id(Selectors.TOKEN_SCROLL_VIEW)).scrollTo('bottom')
  //   await element(by.id(Selectors.PREAUTH_WITH_TOKEN)).tap()
  //   await complete3DS2()
  //   try {
  //     await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress()
  //     await element(by.text(Selectors.THREEDS2_COMPLETE_BUTTON)).longPress()
  //   } catch (error) {}
  //   await assertResultsScreen({type: '2', result: '1'})
  // })

  // it('should successfully complete a 3DS2 payment transaction', async () => {
  //   await element(by.text(Selectors.PAY_WITH_CARD)).tap();
  //   await fillPaymentDetailsSheet();
  //   await complete3DS2();
  //   await assertResultsScreen({ type: '1', result: '1' });
  // });

  // it('should successfully complete a 3DS2 pre-auth transaction', async () => {
  //   await element(by.text(Selectors.PAY_WITH_PREAUTH)).tap();
  //   await fillPaymentDetailsSheet();
  //   await complete3DS2();
  //   await assertResultsScreen({ type: '2', result: '1' });
  // });

  // it('should successfully complete a 3DS2 register card transaction', async () => {
  //   await element(by.text(Selectors.REGISTER_CARD)).tap();
  //   await fillPaymentDetailsSheet();
  //   await complete3DS2();
  //   await assertResultsScreen({ type: '3', result: '1' });
  // });

  // it('should successfully complete a 3DS2 check card transaction', async () => {
  //   await element(by.text(Selectors.CHECK_CARD)).tap();
  //   await fillPaymentDetailsSheet();
  //   await complete3DS2();
  //   await assertResultsScreen({ type: '4', result: '1' });
  // });

  it('should successfully complete a 3DS2 payment transaction via payment methods', async () => {
    await toggleAskForCSCSetting();
    await element(by.text(Selectors.PAYMENT_METHODS)).tap();
    await addCardPaymentMethod();
    await element(by.text('PAY NOW')).tap();
    await fillSecurityCodeSheet();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  // it('should successfully complete a 3DS2 pre-auth transaction via payment methods', async () => {
  //   await element(by.text(Selectors.PREAUTH_METHODS)).tap()
  //   await addCardPaymentMethod()
  //   // Will fail until CSC toggle is implemented
  //   await assertResultsScreen('1', '1')
  // })

  // it('should return error message upon a failed 3DS2 payment transaction', async () => {
  //   await element(by.text(Selectors.PAY_WITH_CARD)).tap()
  //   await fillPaymentDetailsSheet(true, false)
  //   await complete3DS2()
  //   await assertResultsScreen({type: '1', result: '0'})
  //   await expect(element(by.text('The gateway reported an error'))).toExist()
  // })

  // it('should return error message upon a declined 3DS2 payment transaction', async () => {
  //   await element(by.text(Selectors.PAY_WITH_CARD)).tap()
  //   await fillPaymentDetailsSheet(false, true)
  //   await complete3DS2()
  //   await assertResultsScreen({type: '1', result: '2'})
  //   await expect(element(by.text('3D secure authorisation declined'))).toExist()
  // })

  // it('should handle a 3DS2 payment transaction verification cancellation', async () => {
  //   await element(by.text(Selectors.PAY_WITH_CARD)).tap()
  //   await fillPaymentDetailsSheet()
  //   await waitFor(element(by.text(Selectors.THREEDS2_SCREEN_HEADER)))
  //     .toBeVisible()
  //     .withTimeout(10000)
  //   await element(by.text('Cancel')).tap()
  //   await waitFor(element(by.text(UserFeedback.THREEDS2_CANCELLED)))
  //     .toExist()
  //     .withTimeout(10000)
  // })

  // it('should successfully complete a 3DS2 payment frictionless transaction', async () => {
  //   await setNoPreferenceCRI()
  //   await element(by.text(Selectors.PAY_WITH_CARD)).tap()
  //   await element(by.id(Selectors.CARDHOLDER_NAME_INPUT)).typeText(
  //     TestData.FRICTIONLESS,
  //   )
  //   await fillPaymentDetailsSheet(false, false, true)
  //   await element(
  //     by.id(Selectors.PAY_NOW_BUTTON).and(by.traits(['button'])),
  //   ).tap()
  //   await assertResultsScreen({type: '1', result: '1'})
  // })

  // it('should successfully complete a 3DS2 payment frictionless no method transaction', async () => {
  //   await setNoPreferenceCRI()
  //   await element(by.text(Selectors.PAY_WITH_CARD)).tap()
  //   await element(by.id(Selectors.CARDHOLDER_NAME_INPUT)).typeText(
  //     TestData.FRICTIONLESS_NOMETHOD,
  //   )
  //   await fillPaymentDetailsSheet(false, false, true)
  //   await element(
  //     by.id(Selectors.PAY_NOW_BUTTON).and(by.traits(['button'])),
  //   ).tap()
  //   await assertResultsScreen({type: '1', result: '1'})
  // })

  // it('should return error upon a 3DS2 payment frictionless auth failed transaction', async () => {
  //   await setNoPreferenceCRI()
  //   await element(by.text(Selectors.PAY_WITH_CARD)).tap()
  //   await element(by.id(Selectors.CARDHOLDER_NAME_INPUT)).typeText(
  //     TestData.FRICTIONLESS_AUTHFAILED,
  //   )
  //   await fillPaymentDetailsSheet(false, false, true)
  //   await element(
  //     by.id(Selectors.PAY_NOW_BUTTON).and(by.traits(['button'])),
  //   ).tap()
  //   await waitFor(element(by.text(UserFeedback.THREEDS2_CANCELLED)))
  //     .toExist()
  //     .withTimeout(10000)
  // })
});

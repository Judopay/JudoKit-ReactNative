import { element } from 'detox';
import { Selectors } from './constants';
import {
  assertResultsScreen,
  clickSettingsButton,
  addCardPaymentMethodAndPay,
  defaultConfig,
  pressBackButton,
} from './helpers';

describe('E2E Payment Methods Tests', () => {
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

  it('should successfully complete a 3DS2 payment transaction via payment methods', async () => {
    await element(by.text(Selectors.PAYMENT_METHODS)).tap();
    await addCardPaymentMethodAndPay();
    await assertResultsScreen({ type: '1', result: '1' });
  });

  it('should successfully complete a 3DS2 pre-auth transaction via payment methods', async () => {
    await element(by.text(Selectors.PREAUTH_METHODS)).tap();
    await addCardPaymentMethodAndPay();
    await assertResultsScreen({ type: '2', result: '1' });
  });
});

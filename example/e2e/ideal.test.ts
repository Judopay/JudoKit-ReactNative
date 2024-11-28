import { element } from 'detox';
import { Ideal, Selectors } from './constants';
import {
  clickSettingsButton,
  idealConfig,
  delay,
  disableSync,
  pressBackButton,
  completeIdealWebFlow,
  clickButtonOnWebViewWithText,
  launchApp,
  assertIdealPayment,
  assertIdealError,
  idealPressPayNow,
} from './helpers';

describe('E2E iDEAL Payment Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { camera: 'YES', location: 'always' },
      launchArgs: {
        customSettings: idealConfig,
      },
    });
    await clickSettingsButton();
    await pressBackButton();
  });

  afterEach(async () => {
    await device.terminateApp();
  });

  it('should successfully perform an iDEAL transaction', async () => {
    await disableSync();
    await element(by.text(Selectors.PAYMENT_METHODS)).tap();
    await delay(1500);
    await idealPressPayNow();
    await completeIdealWebFlow();
    await assertIdealPayment();
  });

  it('should successfully cancel an iDEAL transaction', async () => {
    await launchApp(idealConfig);
    await disableSync();
    await element(by.text(Selectors.PAYMENT_METHODS)).tap();
    await delay(1500);
    await idealPressPayNow();
    await clickButtonOnWebViewWithText(Ideal.ABORT_BUTTON);
    await assertIdealError();
  });
});

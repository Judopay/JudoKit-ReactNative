import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

import type { JudoResponse } from '../types/';

export interface Spec extends TurboModule {
  invokeTransaction(params: Object): Promise<JudoResponse>;
  invokeApplePay(params: Object): Promise<JudoResponse>;
  invokePaymentMethodScreen(params: Object): Promise<JudoResponse>;
  performTokenTransaction(params: Object): Promise<JudoResponse>;
  invokeGooglePay(params: Object): Promise<JudoResponse>;
  isApplePayAvailableWithConfiguration(params: Object): Promise<JudoResponse>;
  fetchTransactionDetails(params: Object): Promise<JudoResponse>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('JudoKitReactNative');

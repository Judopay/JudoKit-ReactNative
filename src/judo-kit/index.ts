import type {
  JudoAuthorization,
  JudoConfiguration,
  JudoResponse,
  JudoTransactionMode,
  JudoTransactionType,
} from '../types';

import { version as packageVersion } from '../../package.json';
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'judokit-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const JudoKitReactNative = NativeModules.JudoKitReactNative
  ? NativeModules.JudoKitReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// TODO: Rename this to `JudoKit`.
export class JudoPay {
  //------------------------------------------------------------------
  // Private properties
  //------------------------------------------------------------------

  private readonly authorization: JudoAuthorization;

  //------------------------------------------------------------------
  // Public properties
  //------------------------------------------------------------------

  /**
   * This property is used to toggle the sandbox environment on and off.
   * You can use the sandbox environment to test our SDK features.
   */
  public isSandboxed = true;

  //------------------------------------------------------------------
  // Initializers
  //------------------------------------------------------------------

  /**
   * The designated initializer that is used to configure the JudoPay session, based
   * on a provided object that implements the JudoAuthorization interface.
   *
   * @param authorization - can be either a JudoBasicAuthorization (token & secret) or
   * a JudoSessionAuthorization (token & payment session) instance.
   */
  constructor(authorization: JudoAuthorization) {
    this.authorization = authorization;
  }

  //------------------------------------------------------------------
  // SDK Features
  //------------------------------------------------------------------

  /**
   * A method used to verify if ApplePay is supported for given configuration object
   *
   * This needs to be invoked before invoking ApplePay transactions.
   *
   * @returns an asynchronous boolean value that indicates if ApplePay is available.
   */
  public isApplePayAvailableWithConfiguration(
    configuration: JudoConfiguration
  ): Promise<boolean> {
    const params = this.generateJudoParameters(configuration);
    return JudoKitReactNative.isApplePayAvailableWithConfiguration(params);
  }

  /**
   * A method for invoking the Judo UI for card transactions.
   * Supported operations - payments, pre-auths, register card, save card, check card.
   *
   * @param type - a JudoTransactionType value that defines the transaction type.
   * @param configuration - a JudoConfiguration object that is used to configure/customize the payment flow.
   *
   * @returns an asynchronous JudoResponse object, containing the transaction results.
   */
  public async invokeTransaction(
    type: JudoTransactionType,
    configuration: JudoConfiguration
  ): Promise<JudoResponse> {
    const params = {
      ...this.generateTransactionTypeParameters(type, configuration),
      packageVersion,
    };
    return JudoKitReactNative.invokeTransaction(params);
  }

  public async fetchTransactionDetails(
    receiptId: string
  ): Promise<JudoResponse> {
    const params = {
      authorization: this.generateAuthorizationParameters(),
      sandboxed: this.isSandboxed,
      receiptId,
      packageVersion,
    };

    return JudoKitReactNative.fetchTransactionDetails(params);
  }

  /**
   * A method for completing a payment/pre-auth transaction using a saved card token.
   *
   * @param mode - a JudoTransactionMode value that defines if the transaction is either a payment or pre-auth.
   * @param configuration - a JudoConfiguration object that is used to configure/customize the payment flow.
   * @param cardToken - the saved card token string.
   * @param securityCode - the saved card token security code.
   * @param cardholderName - the saved card token cardholder name.
   * @param cardScheme - the saved card token scheme name.
   *
   * @returns an asynchronous JudoResponse object, containing the transaction results.
   */
  public async performTokenTransaction(
    mode: JudoTransactionMode,
    configuration: JudoConfiguration,
    cardToken: string,
    securityCode: string | undefined | null,
    cardholderName: string | undefined | null,
    cardScheme: string
  ): Promise<JudoResponse> {
    const params = {
      ...this.generateTransactionModeParameters(mode, configuration),
      ...{
        cardToken,
        securityCode,
        cardholderName,
        cardScheme,
      },
      packageVersion,
    };
    return JudoKitReactNative.performTokenTransaction(params);
  }

  /**
   * A method for invoking Apple Pay transactions.
   * For this transaction to work, the required JudoApplePayConfiguration parameters must be present as part of
   * the JudoConfiguration object passed to the method.
   *
   * @param mode - a JudoTransactionMode value that defines if the transaction is either a payment or pre-auth.
   * @param configuration - a JudoConfiguration object that is used to configure/customize the payment flow.
   *
   * @returns an asynchronous JudoResponse object, containing the transaction results.
   */
  public async invokeApplePay(
    mode: JudoTransactionMode,
    configuration: JudoConfiguration
  ): Promise<JudoResponse> {
    const params = {
      ...this.generateTransactionModeParameters(mode, configuration),
      packageVersion,
    };
    return JudoKitReactNative.invokeApplePay(params);
  }

  /**
   * A method for invoking Google Pay transactions.
   * For this transaction to work, the required JudoGooglePayConfiguration parameters must be present as part of
   * the JudoConfiguration object passed to the method.
   *
   * @param mode - a JudoTransactionMode value that defines if the transaction is either a payment or pre-auth.
   * @param configuration - a JudoConfiguration object that is used to configure/customize the payment flow.
   *
   * @returns an asynchronous JudoResponse object, containing the transaction results.
   */
  public async invokeGooglePay(
    mode: JudoTransactionMode,
    configuration: JudoConfiguration
  ): Promise<JudoResponse> {
    const params = {
      ...this.generateTransactionModeParameters(mode, configuration),
      packageVersion,
    };
    return JudoKitReactNative.invokeGooglePay(params);
  }

  /**
   * A method for invoking the Judo wallet, allowing users to pay with their preferred payment method.
   * (Cards, Apple Pay/Google Pay, iDEAL)
   *
   * @param mode - a JudoTransactionMode value that defines if the transaction is either a payment or pre-auth.
   * @param configuration - a JudoConfiguration object that is used to configure/customize the payment flow.
   *
   * @returns an asynchronous JudoResponse object, containing the transaction results.
   */
  public async invokePaymentMethodScreen(
    mode: JudoTransactionMode,
    configuration: JudoConfiguration
  ): Promise<JudoResponse> {
    const params = {
      ...this.generateTransactionModeParameters(mode, configuration),
      packageVersion,
    };
    return JudoKitReactNative.invokePaymentMethodScreen(params);
  }

  //------------------------------------------------------------------
  // Private helper methods
  //------------------------------------------------------------------

  private readonly generateJudoParameters = (
    configuration: JudoConfiguration
  ): Record<string, any> => {
    return {
      authorization: this.generateAuthorizationParameters(),
      sandboxed: this.isSandboxed,
      configuration: configuration,
    };
  };

  private readonly generateTransactionTypeParameters = (
    type: JudoTransactionType,
    configuration: JudoConfiguration
  ): Record<string, any> => {
    return {
      authorization: this.generateAuthorizationParameters(),
      sandboxed: this.isSandboxed,
      transactionType: type,
      configuration: configuration,
    };
  };

  private readonly generateTransactionModeParameters = (
    mode: JudoTransactionMode,
    configuration: JudoConfiguration
  ): Record<string, any> => {
    return {
      authorization: this.generateAuthorizationParameters(),
      sandboxed: this.isSandboxed,
      transactionMode: mode,
      configuration: configuration,
    };
  };

  private readonly generateAuthorizationParameters = (): Record<
    string,
    any
  > => {
    if (this.authorization.secret) {
      return {
        token: this.authorization.token,
        secret: this.authorization.secret,
      };
    }

    return {
      token: this.authorization.token,
      paymentSession: this.authorization.paymentSession,
    };
  };
}

import { NativeModules } from 'react-native'
import JudoPBBAButton from './components/JudoPBBAButton'

import {
    JudoConfiguration,
    JudoResponse,
    JudoTransactionMode,
    JudoTransactionType,
    JudoAuthorization
} from './types/JudoTypes'

export {
    JudoTransactionType,
    JudoTransactionMode,
    JudoPaymentMethod,
    JudoCardNetwork
} from './types/JudoTypes'

export type {
    JudoAmount,
    JudoReference,
    JudoAddress,
    JudoUIConfiguration,
    JudoAccountDetails,
    JudoTheme,
    JudoResponse,
    JudoConfiguration,
    JudoAuthorization
} from './types/JudoTypes'

export {
    JudoPaymentSummaryItemType,
    JudoMerchantCapability,
    JudoContactField,
    JudoShippingType,
    JudoReturnedInfo
} from './types/JudoApplePayTypes'

export type {
    JudoApplePayConfiguration,
    JudoPaymentSummaryItem,
    JudoShippingMethod
} from './types/JudoApplePayTypes'

export {
    JudoAddressFormat,
    JudoGooglePayEnvironment
} from './types/JudoGooglePayTypes'

export type {
    JudoGooglePayConfiguration,
    JudoBillingAddressParameters,
    JudoShippingAddressParameters
} from './types/JudoGooglePayTypes'

export type { JudoPBBAConfiguration } from './types/JudoPBBATypes'

export { JudoPBBAButton }

class JudoPay {
    public isSandboxed = true

    private readonly authorization: JudoAuthorization

    constructor(authorization: JudoAuthorization) {
        this.authorization = authorization
    }

    public async invokeTransaction(
        type: JudoTransactionType,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generateTransactionTypeParameters(
            type,
            configuration
        )
        return NativeModules.RNJudo.invokeTransaction(params)
    }

    public async performTokenTransaction(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration,
        token: string
    ): Promise<JudoResponse> {
        const params = this.generateTransactionModeParameters(
            mode,
            configuration
        )
        params['cardToken'] = token
        return NativeModules.RNJudo.performTokenTransaction(params)
    }

    public async invokeApplePay(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generateTransactionModeParameters(
            mode,
            configuration
        )
        return NativeModules.RNJudo.invokeApplePay(params)
    }

    public async invokeGooglePay(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generateTransactionModeParameters(
            mode,
            configuration
        )
        return NativeModules.RNJudo.invokeGooglePay(params)
    }

    public async invokePayByBankApp(
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generatePayByBankAppParameters(configuration)
        return NativeModules.RNJudo.invokePayByBankApp(params)
    }

    public async invokePaymentMethodScreen(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generateTransactionModeParameters(
            mode,
            configuration
        )
        return NativeModules.RNJudo.invokePaymentMethodScreen(params)
    }

    public async fetchTransactionDetails(receiptId: string): Promise<JudoResponse> {
        const params = this.generateTransactionDetailsParameters(receiptId)
        return NativeModules.RNJudo.fetchTransactionDetails(params)
    }

    private readonly generatePayByBankAppParameters = (
        configuration: JudoConfiguration
    ): Record<string, any> => {
        return {
            authorization: this.generateAuthorizationParameters(),
            sandboxed: this.isSandboxed,
            configuration: configuration
        }
    }

    private readonly generateTransactionTypeParameters = (
        type: JudoTransactionType,
        configuration: JudoConfiguration
    ): Record<string, any> => {
        return {
            authorization: this.generateAuthorizationParameters(),
            sandboxed: this.isSandboxed,
            transactionType: type,
            configuration: configuration
        }
    }

    private readonly generateTransactionModeParameters = (
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Record<string, any> => {
        return {
            authorization: this.generateAuthorizationParameters(),
            sandboxed: this.isSandboxed,
            transactionMode: mode,
            configuration: configuration
        }
    }

    private readonly generateTransactionDetailsParameters = (
        receiptId: string
    ): Record<string, any> => {
        return {
            authorization: this.generateAuthorizationParameters(),
            sandboxed: this.isSandboxed,
            receiptId: receiptId
        }
    }

    private readonly generateAuthorizationParameters = (): Record<string, any> => {
        if (this.authorization.secret) {
            return {
                token: this.authorization.token,
                secret: this.authorization.secret
            }
        }

        return {
            token: this.authorization.token,
            paymentSession: this.authorization.paymentSession
        }
    }
}

export default JudoPay

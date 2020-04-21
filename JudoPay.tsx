import { NativeModules } from 'react-native';

import { JudoConfiguration, JudoResponse, JudoTransactionMode, JudoTransactionType } from './types/JudoTypes';

class JudoPay {

    public isSandboxed: boolean = true;

    private readonly token: string;
    private readonly secret: string;

    constructor(token: string, secret: string) {
        this.token = token;
        this.secret = secret;
    }

    public async invokeTransaction(
        type: JudoTransactionType,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generateTransactionTypeParameters(type, configuration);
        return await NativeModules.RNJudo.invokeTransaction(params);
    }

    public async invokeApplePay(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generateTransactionModeParameters(mode, configuration);
        return await NativeModules.RNJudo.invokeApplePay(params);
    }

    public async invokeGooglePay(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generateTransactionModeParameters(mode, configuration);
        return await NativeModules.RNJudo.invokeGooglePay(params);
    }

    public async invokePaymentMethodScreen(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {
        const params = this.generateTransactionModeParameters(mode, configuration);
        return await NativeModules.RNJudo.invokePaymentMethodScreen(params);
    }

    private generateTransactionTypeParameters = (
        type: JudoTransactionType,
        configuration: JudoConfiguration
    ): Record<string, any> => {
        return {
            'token': this.token,
            'secret': this.secret,
            'sandboxed': this.isSandboxed,
            'transactionType': type,
            'configuration': configuration,
        }
    }

    private generateTransactionModeParameters = (
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Record<string, any> => {
        return {
            'token': this.token,
            'secret': this.secret,
            'sandboxed': this.isSandboxed,
            'transactionMode': mode,
            'configuration': configuration,
        }
    }
}

export default JudoPay;
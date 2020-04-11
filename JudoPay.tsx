import { NativeModules, Platform } from 'react-native';

import {
    JudoTransactionType,
    JudoTransactionMode,
    JudoConfiguration,
    JudoResponse
} from './types/JudoTypes';

class JudoPay {

    public isSandboxed: boolean = true;

    private token: string;
    private secret: string;

    constructor(token: string, secret: string) {
        this.token = token;
        this.secret = secret;
    }

    public async invokeTransaction(
        type: JudoTransactionType,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {

        const params = this.generateTransactionTypeParameters(type, configuration);
        const judoPay = NativeModules.RNJudo;

        const response = await judoPay.invokeTransaction(params);
        return response;
    }

    public async invokeApplePay(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {

        const params = this.generateTransactionModeParameters(mode, configuration);
        const judoPay = NativeModules.RNJudo;

        if (Platform.OS === 'android') {
            const response = await judoPay.invokeGooglePay(params);
            return response;
        }

        const response = await judoPay.invokeApplePay(params);
        return response;
    }

    public async invokePaymentMethodScreen(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {

        const params = this.generateTransactionModeParameters(mode, configuration);
        const judoPay = NativeModules.RNJudo;

        const response = await judoPay.invokePaymentMethodScreen(params);
        return response;
    }

    private generateTransactionTypeParameters(
        type: JudoTransactionType,
        configuration: JudoConfiguration
    ): Record<string, any> {
        return {
            'token': this.token,
            'secret': this.secret,
            'sandboxed': this.isSandboxed,
            'transactionType': type,
            'configuration': configuration,
        }
    }

    private generateTransactionModeParameters(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): any {
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
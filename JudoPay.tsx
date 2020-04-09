import { NativeModules } from 'react-native';

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

        const params = this.generateTransactionParameters(type, configuration);
        const judoPay = NativeModules.RNJudo;

        const response = await judoPay.invokeTransaction(params);
        return response;
    }

    public async invokePaymentMethodScreen(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse> {

        const params = this.generatePaymentMethodParameters(mode, configuration);
        const judoPay = NativeModules.RNJudo;

        const response = await judoPay.invokePaymentMethodScreen(params);
        return response;
    }

    private generateTransactionParameters(
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

    private generatePaymentMethodParameters(
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
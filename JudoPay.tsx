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

    public invokeTransaction(
        type: JudoTransactionType,
        configuration: JudoConfiguration
    ): Promise<JudoResponse | null> {

        const params = this.generateTransactionParameters(type, configuration);
        const judoPay = NativeModules.RNJudo;

        return new Promise((resolve, reject) => {
            judoPay.invokeTransaction(params)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                })
        });
    }

    public invokePaymentMethodScreen(
        mode: JudoTransactionMode,
        configuration: JudoConfiguration
    ): Promise<JudoResponse | null> {

        const params = this.generatePaymentMethodParameters(mode, configuration);
        const judoPay = NativeModules.RNJudo;

        return new Promise((resolve, reject) => {
            judoPay.invokePaymentMethodScreen(params)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                })
        });
    }

    private generateTransactionParameters(
        type: JudoTransactionType,
        configuration: JudoConfiguration
    ): any {
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
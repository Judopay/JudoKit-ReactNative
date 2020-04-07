import { NativeModules } from 'react-native';
import { JudoTransactionType, JudoConfiguration, JudoResponse } from './types/JudoTypes';

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

        const params = this.generateParameters(type, configuration);

        return new Promise((resolve, reject) => {
            const judoPay = NativeModules.RNJudo;
            judoPay.invokeTransaction(params)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                })
        });
    }

    private generateParameters(
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
}

export default JudoPay;
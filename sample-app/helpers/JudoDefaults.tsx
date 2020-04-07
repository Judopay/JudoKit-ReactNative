import { JudoConfiguration, JudoAmount, JudoReference } from 'judo-react-native';

const amount: JudoAmount = {
    value: '0.01',
    currency: 'GBP',
}

const reference: JudoReference = {
    consumerReference: 'my-consumer-reference',
    paymentReference: 'my-payment-reference',
    metadata: {
        'optionalMetadata': 'free-form-type'
    }
}

const configuration: JudoConfiguration = {
    judoId: 'my-judo-id',
    amount: amount,
    reference: reference,
}

export default configuration;
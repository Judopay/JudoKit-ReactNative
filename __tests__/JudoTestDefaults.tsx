import {
    JudoConfiguration,
    JudoAmount,
    JudoReference,
    JudoAddress,
    JudoUIConfiguration,
    JudoTheme,
    JudoPaymentMethod,
    JudoCardNetwork,
    JudoAccountDetails
} from 'judo-react-native';

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

const cardAddress: JudoAddress = {
    line1: 'example-address-1',
    line2: 'example-address-2',
    line3: 'example-address-3',
    postCode: 'example-postcode',
    town: 'example-town',
    countryCode: 'example-country-code',
}

const theme: JudoTheme = {
    //TODO: Nothing here yet
}

const uiConfiguration: JudoUIConfiguration = {
    isAVSEnabled: false,
    shouldDisplayAmount: true,
    theme: theme,
}

const paymentMethods: JudoPaymentMethod =
    JudoPaymentMethod.Card |
    JudoPaymentMethod.ApplePay |
    JudoPaymentMethod.GooglePay |
    JudoPaymentMethod.iDEAL;

const supportedCardNetworks: JudoCardNetwork =
    JudoCardNetwork.Visa |
    JudoCardNetwork.Mastercard |
    JudoCardNetwork.Amex;

const primaryAccountDetails: JudoAccountDetails = {
    name: 'example-name',
    accountNumber: 'example-account-number',
    dateOfBirth: 'example-date-of-birth',
    postCode: 'example-post-code',
}

const configuration: JudoConfiguration = {
    judoId: 'my-judo-id',
    amount: amount,
    reference: reference,
    siteId: 'my-site-id',
    cardAddress: cardAddress,
    uiConfiguration: uiConfiguration,
    paymentMethods: paymentMethods,
    supportedCardNetworks: supportedCardNetworks,
    primaryAccountDetails: primaryAccountDetails,
    applePayConfiguration: null,
    googlePayConfiguration: null,
}

export default configuration;

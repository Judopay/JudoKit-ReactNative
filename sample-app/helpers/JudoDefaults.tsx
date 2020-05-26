import { applePayConfiguration } from './ApplePayDefaults';
import { googlePayConfiguration } from './GooglePayDefaults';

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
    largeTitleFont: "Quicksand-Bold",
    largeTitleSize: 18,
    titleFont: "Quicksand-Italic",
    titleSize: 16,
    headlineFont: "Quicksand-Regular",
    headlineSize: 15,
    headlineLightFont: "Quicksand-Regular",
    headlineLightSize: 15,
    bodyFont: "Quicksand-Regular",
    bodySize: 15,
    bodyBoldFont: "Quicksand-Bold",
    bodyBoldSize: 17,
    captionFont: "Quicksand-Regular",
    captionSize: 18,
    captionBoldFont: "Quicksand-Light",
    captionBoldSize: 16,
    jpBlackColor: "#262626",
    jpDarkGrayColor: "#999999",
    jpGrayColor: "#E5E5E5",
    jpLightGrayColor: "#F6F6F6",
    jpRedColor: "#E21900",
    jpWhiteColor: "#FFFFFF",
    buttonColor: "#999999",
    buttonTitleColor: "#000000",
    backButtonImage: "back-button.png",
    buttonCornerRadius: 5
}

const uiConfiguration: JudoUIConfiguration = {
    isAVSEnabled: false,
    shouldDisplayAmount: true,
    isPayButtonAmountVisible: true,
    isCV2Enabled: false,
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
    applePayConfiguration: applePayConfiguration,
    googlePayConfiguration: googlePayConfiguration,
}

export default configuration;

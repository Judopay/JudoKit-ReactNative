import {applePayConfiguration} from './ApplePayDefaults'
import {googlePayConfiguration} from './GooglePayDefaults'
import {pbbaConfiguration} from './PBBADefaults'

import {
    JudoAccountDetails,
    JudoAddress,
    JudoAmount,
    JudoCardNetwork,
    JudoConfiguration,
    JudoPaymentMethod,
    JudoReference,
    JudoTheme,
    JudoUIConfiguration,
} from 'judo-react-native'

const amount: JudoAmount = {
    value: '0.01',
    currency: 'GBP',
}

export const reference = (): JudoReference => {
    return {
        consumerReference: 'my-consumer-reference',
        paymentReference: Math.random().toString(20).substr(2, 40),
        metadata: {
            optionalMetadata: 'free-form-type',
        },
    }
}

const theme: JudoTheme = {
    largeTitleFont: 'Quicksand-Bold',
    largeTitleSize: 18,
    titleFont: 'Quicksand-Italic',
    titleSize: 16,
    headlineFont: 'Quicksand-Regular',
    headlineSize: 15,
    headlineLightFont: 'Quicksand-Regular',
    headlineLightSize: 15,
    bodyFont: 'Quicksand-Regular',
    bodySize: 15,
    bodyBoldFont: 'Quicksand-Bold',
    bodyBoldSize: 17,
    captionFont: 'Quicksand-Regular',
    captionSize: 18,
    captionBoldFont: 'Quicksand-Light',
    captionBoldSize: 16,
    jpBlackColor: '#262626',
    jpDarkGrayColor: '#999999',
    jpGrayColor: '#E5E5E5',
    jpLightGrayColor: '#F6F6F6',
    jpRedColor: '#E21900',
    jpWhiteColor: '#FFFFFF',
    buttonColor: '#999999',
    buttonTitleColor: '#000000',
    backButtonImage: 'back-button.png',
    buttonCornerRadius: 5,
}

const uiConfiguration: JudoUIConfiguration = {
    isAVSEnabled: false,
    shouldPaymentButtonDisplayAmount: true,
    shouldPaymentMethodsDisplayAmount: true,
    shouldPaymentMethodsVerifySecurityCode: false,
    theme: theme,
}

const paymentMethods: JudoPaymentMethod =
    JudoPaymentMethod.Card |
    JudoPaymentMethod.ApplePay |
    JudoPaymentMethod.GooglePay |
    JudoPaymentMethod.iDEAL

const supportedCardNetworks: JudoCardNetwork =
    JudoCardNetwork.Visa | JudoCardNetwork.Mastercard | JudoCardNetwork.Amex

const primaryAccountDetails: JudoAccountDetails = {
    name: 'example-name',
    accountNumber: 'example-account-number',
    dateOfBirth: 'example-date-of-birth',
    postCode: 'example-post-code',
}

const configuration = (): JudoConfiguration => {
    return {
        judoId: '<YOUR JUDO ID>',
        amount: amount,
        reference: reference(),
        uiConfiguration: uiConfiguration,
        paymentMethods: paymentMethods,
        supportedCardNetworks: supportedCardNetworks,
        primaryAccountDetails: primaryAccountDetails,
        applePayConfiguration: applePayConfiguration,
        googlePayConfiguration: googlePayConfiguration,
        pbbaConfiguration: pbbaConfiguration,
        isInitialRecurringPayment: false
    }
}

export default configuration

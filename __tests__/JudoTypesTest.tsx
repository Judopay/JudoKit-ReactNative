import 'react-native';
import {
    JudoResponse,
    JudoAccountDetails,
    JudoCardNetwork,
    JudoPaymentMethod,
    JudoTheme,
    JudoUIConfiguration,
    JudoAddress,
    JudoReference,
    JudoAmount,
    JudoTransactionMode,
    JudoTransactionType,
    JudoConfiguration
} from '../types/JudoTypes';
import { JudoApplePayConfiguration } from '../types/JudoApplePayTypes';
import { JudoGooglePayConfiguration } from '../types/JudoGooglePayTypes';

const judoAmount: JudoAmount = {
    value: '1999.0',
    currency: 'USD'
};

const judoAccountDetails: JudoAccountDetails = {
    name: 'name',
    accountNumber: 'acc number',
    dateOfBirth: 'date of birth',
    postCode: 'post code'
};

const judoReference: JudoReference = {
    consumerReference: 'reference',
    paymentReference: 'reference',
    metadata: {}
};

const judoAddress: JudoAddress = {
    line1: 'line1',
    line2: 'line2',
    line3: 'line3',
    postCode: 'postcode',
    town: 'town',
    countryCode: 832
};

const judoTheme: JudoTheme = {
    largeTitleFont: 'fontName',
    largeTitleSize: 99,
    titleFont: 'fontName',
    titleSize: 22,
    headlineFont: 'fontName',
    headlineSize: 33,
    headlineLightFont: 'fontName',
    headlineLightSize: 44,
    bodyFont: 'fontName',
    bodySize: 55,
    bodyBoldFont: 'fontName',
    bodyBoldSize: 66,
    captionFont: 'fontName',
    captionSize: 77,
    captionBoldFont: 'fontName',
    captionBoldSize: 88,
    jpBlackColor: '#ff0000',
    jpDarkGrayColor: '#ff0000',
    jpGrayColor: '#ff0000',
    jpLightGrayColor: '#ff0000',
    jpRedColor: '#ff0000',
    jpWhiteColor: '#ff0000',
    buttonColor: '#ff0000',
    buttonTitleColor: '#ff0000',
    backButtonImage: 'image_name',
    buttonCornerRadius: 5
};

const judoUIConfiguration: JudoUIConfiguration = {
    isAVSEnabled: true,
    shouldPaymentButtonDisplayAmount: true,
    shouldPaymentMethodsDisplayAmount: true,
    shouldPaymentMethodsVerifySecurityCode: false,
    theme: judoTheme
};

test('check JudoResponse model fields', () => {
    const judoResponse: JudoResponse = {
        receiptId: 'receiptId',
        yourPaymentReference: 'paymentRef',
        type: 'someType',
        createdAt: 'someCreationTime',
        result: 'any result',
        message: 'some message',
        judoId: 'favourite Id',
        siteId: 'your site Id',
        merchantName: 'best merchant name',
        appearsOnStatementAs: 'as',
        originalAmount: 'amounting',
        netAmount: 'net amount',
        amount: 'some other number',
        currency: 'currency id',
        cardDetails: 'details',
        consumer: 'consumer',
        risks: 'risks',
        paymentToken: 'token'
    };

    expect(Object.keys(judoResponse).length).toBe(18);
});

test('check JudoAccountDetails model fields', () => {
    expect(Object.keys(judoAccountDetails).length).toBe(4);
});

test('check JudoUIConfiguration model fields', () => {
    expect(Object.keys(judoUIConfiguration).length).toBe(5);
});

test('check JudoAddress is empty', () => {
    expect(Object.keys(judoAddress).length).toBe(6);
});

test('check JudoReference model fields', () => {
    expect(Object.keys(judoReference).length).toBe(3);
});

test('check JudoAmount model fields', () => {
    expect(Object.keys(judoAmount).length).toBe(2);
});

test('check JudoTransactionType model fields', () => {
    const judoConfiguration: JudoConfiguration = {
        judoId: 'judoId',
        amount: judoAmount,
        reference: judoReference,
        siteId: 'siteId',
        cardAddress: judoAddress,
        uiConfiguration: judoUIConfiguration,
        paymentMethods: JudoPaymentMethod.All,
        supportedCardNetworks: JudoCardNetwork.All,
        primaryAccountDetails: judoAccountDetails,
        applePayConfiguration: {} as JudoApplePayConfiguration,
        googlePayConfiguration: {} as JudoGooglePayConfiguration
    };

    expect(Object.keys(judoConfiguration).length).toBe(11);
});

test('check JudoTransactionType model fields', () => {
    expect(Object.keys(JudoTransactionType)).toStrictEqual([
        '0',
        '1',
        '2',
        '3',
        '4',
        'Payment',
        'PreAuth',
        'RegisterCard',
        'CheckCard',
        'SaveCard'
    ]);
});

test('check JudoTransactionMode model fields', () => {
    expect(Object.keys(JudoTransactionMode)).toStrictEqual([
        '0',
        '1',
        '2',
        'Payment',
        'PreAuth',
        'ServerToServer'
    ]);
});

test('check JudoTheme model fields', () => {
    expect(Object.keys(judoTheme).length).toBe(26);
});

test('check JudoCardNetwork enum keys/values', () => {
    expect(Object.keys(JudoCardNetwork)).toStrictEqual([
        '1',
        '2',
        '4',
        '8',
        '16',
        '32',
        '64',
        '128',
        '256',
        'Visa',
        'Mastercard',
        'Maestro',
        'Amex',
        'ChinaUnionPay',
        'JCB',
        'Discover',
        'DinersClub',
        'All'
    ]);
});

test('check JudoPaymentMethod enum keys/values', () => {
    expect(Object.keys(JudoPaymentMethod)).toStrictEqual([
        '1',
        '2',
        '4',
        '8',
        '16',
        '32',
        'Card',
        'ApplePay',
        'GooglePay',
        'iDEAL',
        'PayByBankApp',
        'All'
    ]);
});

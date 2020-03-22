import React from 'react';
import { View, Text, Button, processColor } from 'react-native'
import {
  JudoConfig,
  JudoApplePayConfig,
  JudoGooglePayConfig,
  JudoPaymentSummaryItemType,
  JudoPaymentShippingType,
  JudoTransactionType
} from 'judo-react-native'

export const judoOptions: JudoConfig = {
  token: '<TOKEN>',
  secret: '<SECRET>',
  judoId: '<JUDO_ID>',
  siteId: '<SITE_ID>',
  isSandbox: true,
  amount: '1.00',
  currency: 'EUR',
  consumerReference: 'myConsumerReference',
  paymentReference: 'myPaymentReference',
  metaData: {
    metadatakey: 'metadataValue',
    metadatakey2: 'metadataValue2',
  },
  theme: {
    // iOS only. On Android theming works by overriding style definitions
    tintColor: processColor('#ff0000'),
    avsEnabled: true,
    showSecurityMessage: true,
    paymentButtonTitle: 'Pay now',
    backButtonTitle: 'Cancel',
    paymentTitle: 'Pay £1.50',
    loadingIndicatorProcessingTitle: 'Taking your money...',
    inputFieldHeight: 65.5,
    securityMessageString:
      "This is the most secure way of paying you've ever experienced!",
    securityMessageTextSize: 16,
    textColor: processColor('#ac8805'),
    navigationBarTitleColor: processColor('#ac0005'),
    inputFieldTextColor: processColor('#66f'),
    contentViewBackgroundColor: processColor('#ccc'),
    buttonColor: processColor('#dd0'),
    buttonTitleColor: processColor('#d00'),
    loadingBackgroundColor: processColor('#33ffff33'),
    errorColor: processColor('#600'),
    loadingBlockViewColor: processColor('#3ff'),
    inputFieldBackgroundColor: processColor('#dedede'),
    buttonCornerRadius: 16,
    buttonHeight: 80,
    buttonSpacing: 64,
  },
}

export const applePayOptions: JudoApplePayConfig = {
  merchantId: '<MERCHANT_ID>',
  countryCode: 'GB',
  transactionType: JudoTransactionType.preAuth,
  shippingType: JudoPaymentShippingType.shipping,
  shippingMethods: [
    {
      identifier: 'identifier for shiping method',
      detail: 'shipping method description',
      label: 'shipping method label',
      amount: '10.0',
      paymentSummaryItemType: JudoPaymentSummaryItemType.final,
    },
  ],
  requireBillingDetails: true,
  requireShippingDetails: false,
  summaryItems: [{ label: 'Purchased item name', amount: '1.50' }],
}

export const googlePayOptions: JudoGooglePayConfig = {
  googlePayTestEnvironment: true,
  transactionType: JudoTransactionType.preAuth,
  requireBillingDetails: true,
  requireContactDetails: false,
  requireShippingDetails: false,
}

const Settings = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

export default Settings

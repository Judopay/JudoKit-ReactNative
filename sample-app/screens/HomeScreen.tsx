// @flow
import React, { useCallback, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, processColor } from 'react-native'
import {
  Judopay,
  JudoApplePayButton,
  JudoGooglePayButton,
  JudoTransactionType,
  JudoPaymentSummaryItemType,
  JudoPaymentMethods,
  JudoPaymentShippingType,
  JudoPaymentParams,
  JudoConfig,
  JudoApplePayConfig,
  JudoGooglePayConfig,
  JudoPaymentMethodsConfig
} from 'judo-react-native'
import { showMessage, isAndroid, isIos } from '../utils'

const judoOptions: JudoConfig = {
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

const applePayOptions: JudoApplePayConfig = {
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

const googlePayOptions: JudoGooglePayConfig = {
  googlePayTestEnvironment: true,
  transactionType: JudoTransactionType.preAuth,
  requireBillingDetails: true,
  requireContactDetails: false,
  requireShippingDetails: false,
}

const HomeScreen = () => {
  const [canUseApplePay, setCanUseApplePay] = useState(false)
  const [canUseGooglePay, setCanUseGooglePay] = useState(false)

  useEffect(() => {
    const detect = async () => {
      if (isIos) {
        const result = await Judopay.canUseApplePay()
        setCanUseApplePay(result)
      } else if (isAndroid) {
        const result = await Judopay.canUseGooglePay(googlePayOptions)
        setCanUseGooglePay(result)
      }
    }
    detect()
  }, [])

  const makePayment = useCallback(async () => {
    judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    try {
      const response = await Judopay.makePayment({
        ...judoOptions
      })

      if (response && response.result === 'Success') {
        await showMessage(
          'Payment successful',
          `ReceiptId: ${response.receiptId}`,
        )
      } else {
        await showMessage('Payment error', (response && response.result) || '')
      }
    } catch (e) {
      handleException(e, 'Payment')
    }
  }, [])

  const makePreAuth = useCallback(async () => {
    judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    try {
      const response = await Judopay.makePreAuth({
        ...judoOptions
      })
      if (response && response.result === 'Success') {
        await showMessage(
          'Pre-auth successful',
          `ReceiptId: ${response.receiptId}`,
        )
      } else {
        await showMessage('Pre-auth error', (response && response.result) || '')
      }
    } catch (e) {
      handleException(e, 'Pre-auth')
    }
  }, [])

  const selectPaymentMethod = useCallback(async () => {
    judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    const params: JudoPaymentParams = {
      judoConfig: judoOptions,
      judoApplePayConfig: applePayOptions,
      judoGooglePayConfig: googlePayOptions,
      judoPaymentMethodsConfig: {
        paymentMethods: JudoPaymentMethods.all
      }
    }
    try {
      const response = await Judopay.showPaymentMethods({
        ...params
      })
      if (response && response.result === 'Success') {
        await showMessage(`Successful`, `ReceiptId: ${response.receiptId}`)
      } else {
        await showMessage(
          'Select payment method error',
          (response && response.result) || '',
        )
      }
    } catch (e) {
      handleException(e, 'Something')
    }
  }, [])

  const makeIDEALPayment = useCallback(async () => {
    judoOptions.paymentReference = `myPaymentReference${Date.now()}` // MEMO: max length = 40
    try {
      const response = await Judopay.makeIDEALPayment({
        ...judoOptions
      })
      if (response && response.orderStatus === 'SUCCEEDED') {
        await showMessage(`Successful`, `orderId: ${response.orderId || ''}`)
      } else {
        await showMessage(
          'iDEAL payment error',
          (response && response.orderFailureReason) || '',
        )
      }
    } catch (e) {
      handleException(e, 'iDEAL transaction')
    }
  }, [])

  const makeApplePayPayment = useCallback(async () => {
    judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    const params: JudoPaymentParams = {
      judoConfig: judoOptions,
      judoApplePayConfig: applePayOptions
    }
    const title =
      applePayOptions.transactionType === JudoTransactionType.payment
        ? 'Apple Pay payment'
        : 'Apple Pay pre-auth'
    try {
      const response = await Judopay.makeApplePayPayment({
        ...params
      })
      if (response && response.result === 'Success') {
        await showMessage(
          `${title} successful`,
          `ReceiptId: ${response.receiptId}`,
        )
      } else {
        await showMessage(`${title} error`, (response && response.result) || '')
      }
    } catch (e) {
      handleException(e, title)
    }
  }, [])

  const makeGooglePayPayment = useCallback(async () => {
    judoOptions.paymentReference = `myPaymentReference${Date.now()}`
    const params: JudoPaymentParams = {
      judoConfig: judoOptions,
      judoGooglePayConfig: googlePayOptions
    }
    const title =
      googlePayOptions.transactionType == JudoTransactionType.payment
        ? 'Google Pay payment'
        : 'Google Pay pre-auth'
    try {
      const response = await Judopay.makeGooglePayPayment({
        ...params
      })
      if (response && response.result === 'Success') {
        await showMessage(
          `${title} successful`,
          `ReceiptId: ${response.receiptId}`,
        )
      } else {
        await showMessage(`${title} error`, (response && response.result) || '')
      }
    } catch (e) {
      handleException(e, title)
    }
  }, [])

  const handleException = useCallback(async (e, title) => {
    if (e.code === 'JUDO_USER_CANCELLED') {
      // do nothing when the user cancels
    } else if (
      e.code === 'JUDO_ERROR' &&
      e.userInfo &&
      e.userInfo.result === 'Declined'
    ) {
      await showMessage(
        `${title} failed`,
        'Card declined. Please try again and make sure the card details are correct.',
      )
    } else {
      const message = e.message || 'Something went wrong. Please try again later.'
      await showMessage('Oops...', message)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {`Welcome to the\nJudopay sample app!`}
      </Text>
      <View style={styles.buttons}>
        <OptionButton title="Make payment" onPress={() => makePayment()} />
        <OptionButton title="Make pre-auth" onPress={() => makePreAuth()} />
        <OptionButton
          title="Select payment method"
          onPress={() => selectPaymentMethod()}
        />
        <OptionButton
          title="iDEAL payment"
          onPress={() => makeIDEALPayment()}
        />
        {isIos && canUseApplePay && (
          <JudoApplePayButton
            style={styles.payButtonStyle}
            isDark={true}
            onPayPress={() => makeApplePayPayment()}
          />
        )}
        {isAndroid && canUseGooglePay && (
          <JudoGooglePayButton
            style={styles.payButtonStyle}
            isDark={false}
            onPayPress={() => makeGooglePayPayment()}
          />
        )}
      </View>
    </View>
  )
}

const OptionButton = ({
  disabled,
  onPress,
  title,
}: {
  disabled?: boolean,
  onPress: () => any,
  title: string,
}) => {
  return (
    <View style={styles.button}>
      <Button disabled={disabled} title={title} onPress={() => onPress()} />
    </View>
  )
}

HomeScreen.navigationOptions = {
  title: 'Judopay Sample App',
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    margin: 32,
  },
  welcome: {
    fontSize: 21,
    marginBottom: 32,
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  payButtonStyle: {
    alignSelf: 'center',
    height: 30,
    width: 100,
    marginTop: 16,
    marginBottom: 16,
  },
})

export default HomeScreen

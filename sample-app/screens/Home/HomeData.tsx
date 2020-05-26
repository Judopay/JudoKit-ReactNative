import { HomeListItem, HomeListType } from './HomeProps'
import { isIos } from '../../helpers/utils';
import { storageKey } from '../../helpers/AsyncStore'
import AsyncStorage from '@react-native-community/async-storage'
import {
  JudoPaymentMethod,
  JudoCardNetwork
} from 'judo-react-native'

const applePayment: HomeListItem = {
    "title": "Apple Pay payment",
    "subtitle": "with a wallet card",
    "type": HomeListType.ApplePay
}

const applePreAuth: HomeListItem = {
    "title": "Apple Pay pre-auth",
    "subtitle": "with a wallet card",
    "type": HomeListType.ApplePreAuth
}

const googlePayment: HomeListItem = {
    "title": "Google Pay payment",
    "subtitle": "with a wallet card",
    "type": HomeListType.GooglePay
}

const googlePreAuth: HomeListItem = {
    "title": "Google Pay pre-auth",
    "subtitle": "with a wallet card",
    "type": HomeListType.GooglePreAuth
}

export const HomeScreenData = {
    list: [
        {
            "data": [
                {
                    "title": "Pay with card",
                    "subtitle": "by entering card details",
                    "type": HomeListType.Payment
                } as HomeListItem,
                {
                    "title": "Pre-auth with card",
                    "subtitle": "pre-auth by entering card details",
                    "type": HomeListType.PreAuth
                } as HomeListItem,
                {
                    "title": "Register card",
                    "subtitle": "to be stored for future transactions",
                    "type": HomeListType.RegisterCard
                } as HomeListItem,
                {
                    "title": "Check card",
                    "subtitle": "to validate a card",
                    "type": HomeListType.CheckCard
                } as HomeListItem,
                {
                    "title": "Save card",
                    "subtitle": "to be stored for future transactions",
                    "type": HomeListType.SaveCard
                } as HomeListItem,
                isIos ? applePayment : googlePayment,
                isIos ? applePreAuth : googlePreAuth,
                {
                    "title": "Payment method",
                    "subtitle": "with default payment methods",
                    "type": HomeListType.PaymentMethods
                } as HomeListItem,
                {
                    "title": "PreAuth method",
                    "subtitle": "with default preauth methods",
                    "type": HomeListType.PreAuthMethods
                } as HomeListItem,
                {
                  "title": "Server-to-Server payment methods",
                  "subtitle": "with default Server-to-Server payment methods",
                  "type": HomeListType.ServerToServer
                } as HomeListItem,
            ]
        }
    ]
}

export const getStoredData = async (state: any): Promise<object> => {
  try {
    const value = await AsyncStorage.getItem(storageKey)
    if (value !== null) {
      const settings = JSON.parse(value)
      var token = state.token
      var secret = state.secret
      var configuration = state.configuration
      let tokenValue = settings.list[0].data[3].value as string
      if (tokenValue) {
        token = tokenValue
      }
      let secretValue = settings.list[0].data[4].value as string
      if (secretValue) {
        secret = secretValue
      }

      return {
        configuration: {
          ...configuration,
          judoId: settings.list[0].data[1].value as string,
          siteId: settings.list[0].data[2].value as string,
          paymentMethods: parsePaymentMethods(settings.list[2].data[1].valueArray),
          supportedCardNetworks: parseCardNetworks(settings.list[2].data[0].valueArray),
          amount: {
            value: settings.list[1].data[0].value as string,
            currency: settings.list[1].data[1].value as string
          },
          uiConfiguration: {
            isAVSEnabled: settings.list[2].data[2].value,
            isCV2Enabled: settings.list[2].data[3].value,
            isPaymentButtonAmountVisible: settings.list[2].data[4].value,
            shouldDisplayAmount: settings.list[2].data[5].value,
          }
        },
        secret: secret,
        token: token,
        isSandbox: settings.list[0].data[0].value as boolean
      }
    } else {
      return {}
    }
  } catch(e) {
    console.log("getStoredData() error " + e)
    return {}
  }
}

const parsePaymentMethods = (values: string[]): JudoPaymentMethod => {
  var paymentMethods = 0
  if (values.includes('CARD')) paymentMethods |= JudoPaymentMethod.Card
  if (values.includes('APPLE_PAY')) paymentMethods |= JudoPaymentMethod.ApplePay
  if (values.includes('GOOGLE_PAY')) paymentMethods |= JudoPaymentMethod.GooglePay
  if (values.includes('IDEAL')) paymentMethods |= JudoPaymentMethod.iDEAL
  return paymentMethods
}

const parseCardNetworks = (values: string[]): JudoCardNetwork => {
  var cardNetworks = 0
  if (values.includes('AMEX')) cardNetworks |= JudoCardNetwork.Amex
  if (values.includes('CHINA_UNION_PAY')) cardNetworks |= JudoCardNetwork.ChinaUnionPay
  if (values.includes('DINERS_CLUB')) cardNetworks |= JudoCardNetwork.DinersClub
  if (values.includes('DISCOVER')) cardNetworks |= JudoCardNetwork.Discover
  if (values.includes('JCB')) cardNetworks |= JudoCardNetwork.JCB
  if (values.includes('MAESTRO')) cardNetworks |= JudoCardNetwork.Maestro
  if (values.includes('MASTERCARD')) cardNetworks |= JudoCardNetwork.Mastercard
  if (values.includes('VISA')) cardNetworks |= JudoCardNetwork.Visa
  return cardNetworks
}

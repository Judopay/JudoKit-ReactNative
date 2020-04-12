import { HomeListItem, HomeListType } from './HomeProps'
import { Platform } from 'react-native'

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
                Platform.OS == "ios" ? applePayment : googlePayment,
                Platform.OS == "ios" ? applePreAuth : googlePreAuth,
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
            ]
        }
    ]
}
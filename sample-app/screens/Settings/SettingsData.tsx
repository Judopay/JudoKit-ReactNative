import {
    PickerItem,
    SettingsListItem,
    SettingsPickArray,
    SettingsPickType
} from './SettingsProps'

import { isIos } from '../../helpers/utils'

export const Currencies = {
    list: [
        {
            "data": [
                { "entry": "AED - United Arab Emirates Dirham", "value": "AED" } as PickerItem,
                { "entry": "AUD - Australia Dollar", "value": "AUD" } as PickerItem,
                { "entry": "BRL - Brazil Real", "value": "BRL" } as PickerItem,
                { "entry": "CZK - Czech Republic Koruna", "value": "CHF" } as PickerItem,
                { "entry": "DKK - Denmark Krone", "value": "DKK" } as PickerItem,
                { "entry": "EUR - Euro Member Countries", "value": "EUR" } as PickerItem,
                { "entry": "GBP - United Kingdom Pound", "value": "GBP" } as PickerItem,
                { "entry": "HKD - Hong Kong Dollar", "value": "HKD" } as PickerItem,
                { "entry": "HUF - Hungary Forint", "value": "HUF" } as PickerItem,
                { "entry": "JPY - Japan Yen", "value": "JPY" } as PickerItem,
                { "entry": "NOK - Norway Krone", "value": "NOK" } as PickerItem,
                { "entry": "NZD - New Zealand Dollar", "value": "NZD" } as PickerItem,
                { "entry": "PLN - Poland Zloty", "value": "PLN" } as PickerItem,
                { "entry": "SEK - Sweden Krona", "value": "SEK" } as PickerItem,
                { "entry": "SGD - Singapore Dollar", "value": "SGD" } as PickerItem,
                { "entry": "QAR - Qatar Riyal", "value": "QAR" } as PickerItem,
                { "entry": "SAR - Saudi Arabia Riyal", "value": "SAR" } as PickerItem,
                { "entry": "USD - United States Dollar", "value": "USD" } as PickerItem,
                { "entry": "ZAR - South Africa Rand", "value": "ZAR" } as PickerItem
            ]
        }
    ]
}

export const CardNetworks = {
    list: [
        {
            "data": [
                { "entry": "Visa", "value": "VISA" } as PickerItem,
                { "entry": "Master Card", "value": "MASTERCARD" } as PickerItem,
                { "entry": "Maestro", "value": "MAESTRO" } as PickerItem,
                { "entry": "AMEX", "value": "AMEX" } as PickerItem,
                { "entry": "China Union Pay", "value": "CHINA_UNION_PAY" } as PickerItem,
                { "entry": "JCB", "value": "JCB" } as PickerItem,
                { "entry": "Discover", "value": "DISCOVER" } as PickerItem,
                { "entry": "Diners Club", "value": "DINERS_CLUB" } as PickerItem,
            ]
        }
    ]
}

export const Payments = {
    list: [
        {
            "data": [
                { "entry": "Card", "value": "CARD" } as PickerItem,
                { "entry": "Apple Pay", "value": "APPLE_PAY" } as PickerItem,
                { "entry": "Google Pay", "value": "GOOGLE_PAY" } as PickerItem,
                { "entry": "iDEAL", "value": "IDEAL" } as PickerItem,
                { "entry": "Pay by Bank App", "value": "PBBA"} as PickerItem,
            ]
        }
    ]
}

export const MerchantCapabilities = {
    list: [
        {
            "data": [
                { "entry": "3DS", "value": "ThreeDS" } as PickerItem,
                { "entry": "EMV", "value": "EMV" } as PickerItem,
                { "entry": "Credit", "value": "Credit" } as PickerItem,
                { "entry": "Debit", "value": "Debit"} as PickerItem,
            ]
        }
    ]
}

export const ApplePayContactFields = {
    list: [
        {
            "data": [
                { "entry": "Postal Address", "value": "PostalAddress" } as PickerItem,
                { "entry": "Phone", "value": "Phone" } as PickerItem,
                { "entry": "Email", "value": "Email" } as PickerItem,
                { "entry": "Name", "value": "Name"} as PickerItem,
            ]
        }
    ]
}

export const AppleShippingTypes = {
    list: [
        {
            "data": [
                { "entry": "Delivery", "value": "Delivery" } as PickerItem,
                { "entry": "Shipping", "value": "Shipping" } as PickerItem,
                { "entry": "Store Pickup", "value": "Store Pickup" } as PickerItem,
                { "entry": "Service Pickup", "value": "Service Pickup"} as PickerItem,
            ]
        }
    ]
}

export const AppleReturnInfoTypes = {
    list: [
        {
            "data": [
                { "entry": "Billing", "value": "Billing" } as PickerItem,
                { "entry": "Shipping", "value": "Shipping" } as PickerItem,
            ]
        }
    ]
}

const applePaySettings = {
    "title": "Apple Pay",
    "data": [
        {
            "title": "Merchant ID",
            "subtitle": "Your Merchant ID",
            "type": SettingsPickType.TextPicker,
            "value": ""
        } as SettingsListItem,
        {
            "title": "Country Code",
            "subtitle": "Your 2-digit ISO 3166-1 country code",
            "type": SettingsPickType.TextPicker,
            "value": ""
        } as SettingsListItem,
        {
            "title": "Merchant Capabilities",
            "subtitle": "ThreeDS, Credit",
            "type": SettingsPickType.MultiPicker,
            "value": "",
            "valueArray": ["ThreeDS", "Credit"],
            "pickItems": SettingsPickArray.MerchantCapabilities
        } as SettingsListItem,
        {
            "title": "Required billing fields",
            "subtitle": "Email, Phone",
            "type": SettingsPickType.MultiPicker,
            "value": "",
            "valueArray": ["Email", "Phone"],
            "pickItems": SettingsPickArray.ApplePayContactFields
        } as SettingsListItem,
        {
            "title": "Required shipping fields",
            "subtitle": "Email",
            "type": SettingsPickType.MultiPicker,
            "value": "",
            "valueArray": ["Email", "Phone"],
            "pickItems": SettingsPickArray.ApplePayContactFields
        } as SettingsListItem,
        {
            "title": "Shipping Type",
            "subtitle": "Delivery",
            "type": SettingsPickType.SinglePicker,
            "value": "Delivery",
            "valueArray": [],
            "pickItems": SettingsPickArray.AppleShippingTypes
        } as SettingsListItem,
        {
            "title": "Returned Contact Info",
            "subtitle": "Billing, Shipping",
            "type": SettingsPickType.MultiPicker,
            "value": "",
            "valueArray": ["Billing", "Shipping"],
            "pickItems": SettingsPickArray.AppleReturnInfoTypes
        } as SettingsListItem,
    ]
}

export const GooglePayEnvironments = {
    list: [
        {
            "data": [
                { "entry": "Test", "value": "Test" } as PickerItem,
                { "entry": "Production", "value": "Production" } as PickerItem,
            ]
        }
    ]
}

const googlePaySettings = {
    "title": "Google Pay",
    "data": [
        {
            "title": "Country Code",
            "subtitle": "Your 2-digit ISO 3166-1 country code",
            "type": SettingsPickType.TextPicker,
            "value": ""
        } as SettingsListItem,
        {
            "title": "Environment",
            "subtitle": "Test",
            "type": SettingsPickType.SinglePicker,
            "value": "Test",
            "valueArray": [],
            "pickItems": SettingsPickArray.GooglePayEnvironments
        } as SettingsListItem,
        {
            "title": "E-mail required",
            "subtitle": "Toggle if Google Pay should require an email address",
            "type": SettingsPickType.Switch,
            "value": false,
        } as SettingsListItem,
        {
            "title": "Billing address required",
            "subtitle": "Toggle if Google Pay should require billing information",
            "type": SettingsPickType.Switch,
            "value": false,
        } as SettingsListItem,
        {
            "title": "Shipping address required",
            "subtitle": "Toggle if Google Pay should require shipping information",
            "type": SettingsPickType.Switch,
            "value": false,
        } as SettingsListItem,
    ]
}

export var SettingsData = {
    list: [
        {
            "title": "API Configurations",
            "data": [
                {
                    "title": "Sandboxed",
                    "subtitle": "Use Judopay API sandbox environment",
                    "type": SettingsPickType.Switch,
                    "value": true
                } as SettingsListItem,
                {
                    "title": "Judo ID",
                    "subtitle": "Your Judo ID",
                    "type": SettingsPickType.TextPicker,
                    "value": ""
                } as SettingsListItem,
                {
                    "title": "Site ID",
                    "subtitle": "Your Site ID",
                    "type": SettingsPickType.TextPicker,
                    "value": ""
                } as SettingsListItem,
            ]
        },
        {
            "title": "Basic Authorization",
            "data": [
                {
                    "title": "Token",
                    "subtitle": "Your API authorization token",
                    "type": SettingsPickType.TextPicker,
                    "value": ""
                } as SettingsListItem,
                {
                    "title": "Secret",
                    "subtitle": "Your API authorization secret",
                    "type": SettingsPickType.TextPicker,
                    "value": ""
                },
            ]
        },
        {
            "title": "Session Authorization",
            "data": [
                {
                    "title": "Token",
                    "subtitle": "Your API authorization token",
                    "type": SettingsPickType.TextPicker,
                    "value": ""
                } as SettingsListItem,
                {
                    "title": "Payment Session",
                    "subtitle": "Yout payment session value",
                    "type": SettingsPickType.TextPicker,
                    "value": ""
                },
            ]
        },
        {
            "title": "References",
            "data": [
                {
                    "title": "Consumer Reference",
                    "subtitle": "Your consumer reference",
                    "type": SettingsPickType.TextPicker,
                    "value": ""
                } as SettingsListItem,
                {
                    "title": "Payment Reference",
                    "subtitle": "If no payment reference is set, a random one will be generated",
                    "type": SettingsPickType.TextPicker,
                    "value": ""
                } as SettingsListItem
            ]
        },
        {
            "title": "Amount",
            "data": [
                {
                    "title": "Amount",
                    "subtitle": "Your amount",
                    "type": SettingsPickType.TextPicker,
                    "value": "0.15"
                } as SettingsListItem,
                {
                    "title": "Currency",
                    "subtitle": "EUR - Euro Member Countries",
                    "type": SettingsPickType.SinglePicker,
                    "value": "EUR",
                    "pickItems": SettingsPickArray.Currencies,
                    "valueArray": []
                } as SettingsListItem
            ]
        },
        isIos ? applePaySettings : googlePaySettings,
        {
            "title": "Customizations",
            "data": [
                {
                    "title": "Supported card networks",
                    "subtitle": "Visa, MasterCard, Amex, JCB, Discover",
                    "type": SettingsPickType.MultiPicker,
                    "value": "",
                    "valueArray": ["VISA", "MASTERCARD", "AMEX", "JCB", "DISCOVER"],
                    "pickItems": SettingsPickArray.CardNetworks
                } as SettingsListItem,
                {
                    "title": "Payment methods",
                    "subtitle": "Card, iDeal",
                    "type": SettingsPickType.MultiPicker,
                    "value": "",
                    "valueArray": ["CARD", "IDEAL"],
                    "pickItems": SettingsPickArray.Payment
                } as SettingsListItem,
                {
                    "title": "Toggle Address Verification System",
                    "subtitle": "Payments require country and postal code information",
                    "type": SettingsPickType.Switch,
                    "value": false,
                } as SettingsListItem,
                {
                    "title": "Toggle Security Code validation",
                    "subtitle": "Token payments require security code validation to complete",
                    "type": SettingsPickType.Switch,
                    "value": false,
                } as SettingsListItem,
                {
                    "title": "Show Payment/PreAuth button amount",
                    "subtitle": "Payment/PreAuth buttons will now display the amount & currency",
                    "type": SettingsPickType.Switch,
                    "value": true,
                } as SettingsListItem,
                {
                    "title": "Show Payment Methods Screen amount",
                    "subtitle": "The amount will be visible on the Payment Method screen",
                    "type": SettingsPickType.Switch,
                    "value": true,
                } as SettingsListItem,
            ]
        }
    ]
}

import React from 'react';

export enum SettingsPickType {
  switch,
  textPicker,
  singlePicker,
  multiPicker,
}

export type SettingsListItem = {
  title: string,
  subtitle: string,
  type: SettingsPickType,
  value: any,
  valueArray?: [string]
}

export type PickerItem = {
  entry: string,
  value: string
}

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

export var SettingsData = {
  list: [
     {
        "title":"API Configurations",
        "data":[
          {
            "title": "Sandboxed",
            "subtitle": "Use Judopay API sandbox environment",
            "type": SettingsPickType.switch,
            "value": true
          } as SettingsListItem,
          {
            "title":"Judo ID",
            "subtitle":"Your Judo ID",
            "type": SettingsPickType.textPicker,
            "value": ""
          } as SettingsListItem,
          {
            "title":"Site ID",
            "subtitle":"Your Site ID",
            "type": SettingsPickType.textPicker,
            "value": ""
          } as SettingsListItem,
          {
            "title":"Token",
            "subtitle":"Your API authorization token",
            "type": SettingsPickType.textPicker,
            "value": ""
          } as SettingsListItem,
          {
            "title":"Secret",
            "subtitle":"Your API authorization secret",
            "type": SettingsPickType.textPicker,
            "value": ""
          }
        ]
     },
     {
        "title":"Amount",
        "data":[
           {
              "title":"Amount",
              "subtitle":"Your amount",
              "type": SettingsPickType.textPicker,
              "value": "0.15"
           } as SettingsListItem,
           {
              "title":"Currency",
              "subtitle":"Select currency",
              "type": SettingsPickType.singlePicker,
              "value":"GBP - United Kingdom Pound"
           } as SettingsListItem
        ]
     },
     {
        "title":"Google Pay",
        "data":[
           {
              "title":"Production environment",
              "subtitle":"Use Google Pay production environment",
              "type": SettingsPickType.switch,
              "value": false
           } as SettingsListItem,
           {
              "title":"Billing address",
              "subtitle":"Select address",
              "type": SettingsPickType.singlePicker,
              "value":"FULL: Name, street address, locality, region, country code and postal code"
           } as SettingsListItem,
           {
              "title":"Billing address phone number",
              "subtitle":"Turn on to request a billing address phone number",
              "type": SettingsPickType.switch,
              "value": false
           } as SettingsListItem,
           {
              "title":"Shipping address",
              "subtitle":"Turn on to request a full shipping address",
              "type": SettingsPickType.switch,
              "value": false
           } as SettingsListItem,
           {
              "title":"Shipping address phone number",
              "subtitle":"Turn on to request a full shipping address phone number",
              "type": SettingsPickType.switch,
              "value": false
           } as SettingsListItem,
           {
              "title":"Email address",
              "subtitle":"Turn on to request a email address",
              "type": SettingsPickType.switch,
              "value": false
           } as SettingsListItem
        ]
     },
     {
        "title":"Others",
        "data":[
           {
              "title":"Supported card networks",
              "subtitle":"Card networks you want to support",
              "type": SettingsPickType.multiPicker,
              "value": "",
              "valueArray": new Array()
           } as SettingsListItem,
           {
              "title":"Payment methods",
              "subtitle":"Payment methods you want to support",
              "type": SettingsPickType.multiPicker,
              "value": "",
              "valueArray": new Array()
           } as SettingsListItem
        ]
     }
  ]
}

import React from 'react';

export enum SettingsPickType {
  switch,
  textPicker,
  singlePicker,
  multiPicker,
}

export const SettingsData = {
  list: [
     {
        "title":"API Configurations",
        "data":[
           {
              "title":"Sandboxed",
              "subtitle":"Use Judopay API sandbox environment",
              "type": SettingsPickType.switch,
              "state": true
           },
           {
              "title":"Judo ID",
              "subtitle":"Your Judo ID",
              "type": SettingsPickType.textPicker
           },
           {
              "title":"Site ID",
              "subtitle":"Your Site ID",
              "type": SettingsPickType.textPicker
           },
           {
              "title":"Token",
              "subtitle":"Your API authorization token",
              "type": SettingsPickType.textPicker
           },
           {
              "title":"Secret",
              "subtitle":"Your API authorization secret",
              "type": SettingsPickType.textPicker
           }
        ]
     },
     {
        "title":"Amount",
        "data":[
           {
              "title":"Amount",
              "subtitle":"0.15",
              "type": SettingsPickType.textPicker
           },
           {
              "title":"Currency",
              "subtitle":"GBP - United Kingdom Pound",
              "type": SettingsPickType.singlePicker
           }
        ]
     },
     {
        "title":"Google Pay",
        "data":[
           {
              "title":"Production environment",
              "subtitle":"Use Google Pay production environment",
              "type": SettingsPickType.switch,
              "state": false
           },
           {
              "title":"Billing address",
              "subtitle":"FULL: Name, street address, locality, region, country code and postal code",
              "type": SettingsPickType.singlePicker
           },
           {
              "title":"Billing address phone number",
              "subtitle":"Turn on to request a billing address phone number",
              "type": SettingsPickType.switch,
              "state": false
           },
           {
              "title":"Shipping address",
              "subtitle":"Turn on to request a full shipping address",
              "type": SettingsPickType.switch,
              "state": false
           },
           {
              "title":"Shipping address phone number",
              "subtitle":"Turn on to request a full shipping address phone number",
              "type": SettingsPickType.switch,
              "state": false
           },
           {
              "title":"Email address",
              "subtitle":"Turn on to request a email address",
              "type": SettingsPickType.switch
           }
        ]
     },
     {
        "title":"Others",
        "data":[
           {
              "title":"Supported card networks",
              "subtitle":"Card networks you want to support",
              "type": SettingsPickType.multiPicker
           },
           {
              "title":"Payment methods",
              "subtitle":"Payment methods you want to support",
              "type": SettingsPickType.multiPicker
           }
        ]
     }
  ]
}

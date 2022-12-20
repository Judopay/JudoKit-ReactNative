import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import * as _ from 'lodash'

const cardAddressSection = (
  data: SettingsData,
): SectionListData<SettingsItem> => {
  const isEnabledPath = 'cardAddress.isEnabled'
  const line1Path = 'cardAddress.line1'
  const line2Path = 'cardAddress.line2'
  const line3Path = 'cardAddress.line3'
  const townPath = 'cardAddress.town'
  const postCodePath = 'cardAddress.postCode'
  const countryCodePath = 'cardAddress.countryCode'
  const statePath = 'cardAddress.state'
  const phoneCountryCodePath = 'cardAddress.phoneCountryCode'
  const mobileNumberPath = 'cardAddress.mobileNumber'
  const emailAddressPath = 'cardAddress.emailAddress'

  const isEnabled = _.get(data, isEnabledPath)

  return {
    header: 'ADDRESS',
    data: [
      {
        path: isEnabledPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable card address',
        value: isEnabled,
      },
      ...(isEnabled
        ? [
            {
              path: line1Path,
              dataType: SettingsItemDataType.TEXT,
              title: 'Line 1',
              value: _.get(data, line1Path),
            },
            {
              path: line2Path,
              dataType: SettingsItemDataType.TEXT,
              title: 'Line 2',
              value: _.get(data, line2Path),
            },
            {
              path: line3Path,
              dataType: SettingsItemDataType.TEXT,
              title: 'Line 3',
              value: _.get(data, line3Path),
            },
            {
              path: townPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Town',
              value: _.get(data, townPath),
            },
            {
              path: postCodePath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Post code',
              value: _.get(data, postCodePath),
            },
            {
              path: countryCodePath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Country code',
              value: _.get(data, countryCodePath),
            },
            {
              path: statePath,
              dataType: SettingsItemDataType.TEXT,
              title: 'State',
              value: _.get(data, statePath),
            },
            {
              path: phoneCountryCodePath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Phone country code',
              value: _.get(data, phoneCountryCodePath),
            },
            {
              path: mobileNumberPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Mobile number',
              value: _.get(data, mobileNumberPath),
            },
            {
              path: emailAddressPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Email address',
              value: _.get(data, emailAddressPath),
            },
          ]
        : []),
    ],
  }
}

export default cardAddressSection

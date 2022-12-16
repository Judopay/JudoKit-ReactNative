import {
  Screen,
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions'
import { SectionListData } from 'react-native'
import {
  CHALLENGE_REQUEST_INDICATOR_OPTIONS,
  SCA_EXEMPTION_OPTIONS,
} from '../Constants'
import * as _ from 'lodash'

const threeDSTwoSection = (
  data: SettingsData,
): SectionListData<SettingsItem> => {
  const isBillingInformationScreenEnabledPath =
    'threeDSTwo.isBillingInformationScreenEnabled'
  const challengeRequestIndicatorPath = 'threeDSTwo.challengeRequestIndicator'
  const SCAExemptionPath = 'threeDSTwo.SCAExemption'
  const maxTimeoutPath = 'threeDSTwo.maxTimeout'
  const protocolMessageVersionPath = 'threeDSTwo.protocolMessageVersion'
  const uiCustomizationPath = 'threeDSTwo.uiCustomization'

  const isBillingInformationScreenEnabled = _.get(
    data,
    isBillingInformationScreenEnabledPath,
  )
  const challengeRequestIndicator = _.get(data, challengeRequestIndicatorPath)
  const SCAExemption = _.get(data, SCAExemptionPath)
  const maxTimeout = _.get(data, maxTimeoutPath)
  const protocolMessageVersion = _.get(data, protocolMessageVersionPath)

  return {
    header: '3DS 2.0',
    data: [
      {
        path: isBillingInformationScreenEnabledPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable billing information screen',
        value: isBillingInformationScreenEnabled,
      },
      {
        path: challengeRequestIndicatorPath,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        title: 'Challenge request indicator',
        value: challengeRequestIndicator,
        options: CHALLENGE_REQUEST_INDICATOR_OPTIONS,
      },
      {
        path: SCAExemptionPath,
        dataType: SettingsItemDataType.SINGLE_SELECTION,
        title: 'SCA exemption',
        value: SCAExemption,
        options: SCA_EXEMPTION_OPTIONS,
      },
      {
        path: maxTimeoutPath,
        dataType: SettingsItemDataType.TEXT,
        title: '3DS 2.0 max timeout',
        value: maxTimeout,
      },
      {
        path: protocolMessageVersionPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Protocol message version',
        value: protocolMessageVersion,
      },
      {
        path: uiCustomizationPath,
        dataType: SettingsItemDataType.CHILD_PANE,
        title: 'UI customization',
        value: Screen.THREE_DS_UI_SETTINGS,
      },
    ],
  }
}

export default threeDSTwoSection

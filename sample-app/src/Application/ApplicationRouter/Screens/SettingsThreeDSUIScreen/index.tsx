import React, { FC } from 'react'
import SettingsTable from '../../../../Components/SettingsTable'
import { buildThreeDSSDKUISections } from '../../../../Data/SettingsSections'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'

const SettingsThreeDSUIScreen: FC<
  StackScreenProps<RootStackParamList, Screen.THREE_DS_UI_SETTINGS>
> = () => {
  const {
    colors: { background: backgroundColor },
  } = useTheme()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <SettingsTable transformationFunction={buildThreeDSSDKUISections} />
    </SafeAreaView>
  )
}

export default SettingsThreeDSUIScreen

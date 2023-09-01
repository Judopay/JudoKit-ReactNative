import React, { FC } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Screen } from '../../Data/TypeDefinitions'

const SettingsButton: FC = () => {
  const navigation = useNavigation()
  const {
    colors: { primary },
  } = useTheme()

  return (
    <Icon.Button
      testID="settings-button"
      name="settings-outline"
      size={28}
      color={primary}
      backgroundColor="transparent"
      selectionColor="transparent"
      underlayColor="transparent"
      onPress={() => navigation.navigate(Screen.SETTINGS)}
    />
  )
}

export default SettingsButton

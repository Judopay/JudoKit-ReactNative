import React, { FC } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

const BackButton: FC = () => {
  const {
    colors: { primary },
  } = useTheme()
  const { canGoBack, goBack } = useNavigation()

  const navigateBackIfPossible = () => {
    if (canGoBack()) {
      goBack()
    }
  }

  return (
    <Icon.Button
      testID="back-button"
      name="ios-chevron-back"
      size={28}
      color={primary}
      backgroundColor="transparent"
      selectionColor="transparent"
      underlayColor="transparent"
      onPress={() => navigateBackIfPossible()}
    />
  )
}

export default BackButton

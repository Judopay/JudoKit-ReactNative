// @flow
import { Alert, Platform } from 'react-native'
export const showMessage = async function(
  title: string,
  message: string,
  onPress?: (value?: string) => void
) {
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: onPress,
    },
  ], { cancelable: false })
}

export const isIos = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

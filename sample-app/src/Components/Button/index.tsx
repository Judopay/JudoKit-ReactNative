import React, { FC } from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from '@react-navigation/native'

export interface ButtonProps {
  title: string
  onPress: () => void
  isLoading: boolean
  disabled?: boolean
  borderRadius?: number
  fontSize?: number
  marginTop?: number
  marginBottom?: number
  testID?: string
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled = false,
  borderRadius = 4,
  fontSize = 16,
  marginBottom = 24,
  marginTop = 0,
  testID,
}) => {
  const {
    colors: { card, text, border },
  } = useTheme()

  return (
    <TouchableOpacity
      testID={testID}
      disabled={isLoading || disabled}
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: card,
        borderRadius,
        marginBottom,
        marginTop,
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={text}
          style={{
            padding: 13,
          }}
        />
      ) : (
        <Text
          style={{
            fontSize,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: '600',
            color: disabled ? border : text,
            padding: 13,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default Button

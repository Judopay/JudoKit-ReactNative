import React, { FC } from 'react'
import { useTheme } from '@react-navigation/native'
import { Text, TextInput, View } from 'react-native'
import { IS_IOS } from '../../Data/Constants'

export interface TextSettingsItemProps {
  title: string
  value?: string
  onChange: (value: string) => void
}

const TextSettingsItem: FC<TextSettingsItemProps> = ({
  title,
  value,
  onChange,
}) => {
  const {
    colors: { card, text },
  } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: IS_IOS ? 8 : 0,
        paddingBottom: IS_IOS ? 8 : 0,
        backgroundColor: card,
      }}
    >
      <Text
        style={{
          flex: 1.1,
          fontSize: 16,
          fontWeight: 'normal',
          color: text,
        }}
      >
        {title}
      </Text>
      <TextInput
        style={{
          flex: 1,
          minHeight: 28,
          fontSize: 16,
          fontWeight: 'normal',
          color: text,
          marginLeft: 4,
        }}
        clearButtonMode="always"
        value={value}
        onChangeText={onChange}
        testID={`${title} input`}
      />
    </View>
  )
}

export default TextSettingsItem

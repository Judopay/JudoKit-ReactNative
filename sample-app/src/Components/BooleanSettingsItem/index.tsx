import React, { FC, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { StyleSheet, Switch, Text, View } from 'react-native'

export interface BooleanSettingsItemProps {
  title: string
  value: boolean
  onValueChange?: (value: boolean) => void
}

const BooleanSettingsItem: FC<BooleanSettingsItemProps> = ({
  title,
  value,
  onValueChange,
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
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: card,
      }}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontWeight: 'normal',
          color: text,
        }}
      >
        {title}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        testID={`${title} switch`}
      />
    </View>
  )
}

export default BooleanSettingsItem

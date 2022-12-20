import React, { FC } from 'react'
import { Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

export interface SectionHeaderProps {
  text?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ text = '' }) => {
  const {
    colors: { background },
  } = useTheme()

  return (
    <Text
      style={{
        color: '#6e6e6e',
        backgroundColor: background,
        fontSize: 12,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 8,
      }}
    >
      {text}
    </Text>
  )
}

export default SectionHeader

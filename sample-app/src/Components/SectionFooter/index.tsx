import React, { FC } from 'react'
import { Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

export interface SectionFooterProps {
  text?: string
}

const SectionFooter: FC<SectionFooterProps> = ({ text = '' }) => {
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
        paddingTop: 16,
        paddingBottom: 20,
      }}
    >
      {text}
    </Text>
  )
}

export default SectionFooter

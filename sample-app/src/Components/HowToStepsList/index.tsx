import React, { FC } from 'react'
import { Text, View } from 'react-native'

export interface HowToStepsListProps {
  header?: string
  steps: Array<string>
}

const HowToStepsList: FC<HowToStepsListProps> = ({
  header = 'How To Instructions',
  steps,
}) => {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          width: '100%',
          textAlign: 'center',
          color: '#6e6e6e',
          textTransform: 'uppercase',
          marginBottom: 10,
          fontSize: 15,
          fontWeight: '600',
        }}
      >
        {header}
      </Text>
      {steps.map((step, index) => (
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            color: '#6e6e6e',
            textAlign: 'left',
            width: '100%',
            marginBottom: 8,
          }}
          key={`${index}`}
        >
          {`${index + 1}. ${step}`}
        </Text>
      ))}
    </View>
  )
}

export default HowToStepsList

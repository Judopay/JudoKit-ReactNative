import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export interface SimulateDelayStepperProps {
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
  testID?: string;
}

const SimulateDelayStepper: FC<SimulateDelayStepperProps> = ({
  value,
  onValueChange,
  disabled = false,
  minValue = 0,
  maxValue = 30,
  testID,
}) => {
  const {
    colors: { card, text, border },
  } = useTheme();

  const isDecreaseDisabled = disabled || value <= minValue;
  const isIncreaseDisabled =
    disabled || (maxValue !== undefined && value >= maxValue);
  const baseTestID = testID || 'simulate-delay-stepper';
  return (
    <View
      testID={baseTestID}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
      }}
    >
      <Text
        testID={`${baseTestID}-label`}
        style={{
          fontSize: 16,
          fontWeight: 'normal',
          color: text,
        }}
      >
        Simulate delay: {value} sec.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <TouchableOpacity
          testID={`${baseTestID}-decrease-button`}
          onPress={() => onValueChange(Math.max(minValue, value - 1))}
          disabled={isDecreaseDisabled}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
            backgroundColor: card,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: isDecreaseDisabled ? border : text,
            }}
          >
            −
          </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: border,
            height: '100%',
            width: 1,
          }}
        />
        <TouchableOpacity
          testID={`${baseTestID}-increase-button`}
          onPress={() => {
            const newValue = value + 1;
            if (maxValue === undefined || newValue <= maxValue) {
              onValueChange(newValue);
            }
          }}
          disabled={isIncreaseDisabled}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
            backgroundColor: card,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: isIncreaseDisabled ? border : text,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SimulateDelayStepper;

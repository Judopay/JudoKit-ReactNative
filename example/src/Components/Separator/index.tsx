import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export interface SeparatorProps {
  inset?: number;
}

const Separator: FC<SeparatorProps> = ({ inset = 0 }) => {
  const {
    colors: { card, border },
  } = useTheme();

  return (
    <View
      style={{
        backgroundColor: card,
      }}
    >
      <View
        style={{
          backgroundColor: border,
          height: 1,
          marginLeft: inset,
        }}
      />
    </View>
  );
};

export default Separator;

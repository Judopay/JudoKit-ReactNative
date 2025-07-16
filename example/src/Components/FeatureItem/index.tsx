import { Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import { useTheme } from '@react-navigation/native';

export interface FeatureItemProps {
  title: string;
  details: string;
  onPress: () => void;
}

const FeatureItem: FC<FeatureItemProps> = ({ title, details, onPress }) => {
  const {
    colors: { card, text },
  } = useTheme();

  return (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: pressed ? '#e0e0e0' : card,
          borderRadius: 6,
        })}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: text,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#6e6e6e',
            marginTop: 2,
          }}
        >
        {details}
      </Text>
    </Pressable>
  );
};

export default FeatureItem;

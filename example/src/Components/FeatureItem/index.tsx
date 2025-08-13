import { Text, View, TouchableHighlight } from 'react-native';
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
    <TouchableHighlight onPress={onPress}>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 16,
          paddingBottom: 16,
          backgroundColor: card,
        }}
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
      </View>
    </TouchableHighlight>
  );
};

export default FeatureItem;

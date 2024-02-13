import React, { FC } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface ChildPaneSettingsItemProps {
  title: string;
  value: string;
  onPress: () => void;
}

const SingleSelectionSettingsItem: FC<ChildPaneSettingsItemProps> = ({
  title,
  value,
  onPress,
}) => {
  const {
    colors: { card, text, border },
  } = useTheme();

  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: card,
        }}
      >
        <Text
          style={{
            flex: 2,
            fontSize: 16,
            fontWeight: 'normal',
            color: text,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: 'normal',
            textAlign: 'right',
            color: border,
          }}
        >
          {value}
        </Text>
        <Icon name="chevron-forward" size={20} color={border} />
      </View>
    </TouchableHighlight>
  );
};

export default SingleSelectionSettingsItem;

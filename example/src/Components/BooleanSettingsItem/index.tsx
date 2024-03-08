import React, { FC } from 'react';
import { useTheme } from '@react-navigation/native';
import { Switch, Text, View } from 'react-native';

export interface BooleanSettingsItemProps {
  title: string;
  value: boolean;
  onValueChange?: (value: boolean) => void;
  testID?: string;
}

const BooleanSettingsItem: FC<BooleanSettingsItemProps> = ({
  title,
  value,
  onValueChange,
  testID,
}) => {
  const {
    colors: { card, text },
  } = useTheme();

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
      <Switch value={value} onValueChange={onValueChange} testID={testID} />
    </View>
  );
};

export default BooleanSettingsItem;

import React, { FC } from 'react';
import { useTheme } from '@react-navigation/native';
import { Switch, Text, View } from 'react-native';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { appStorage } from '../../Application';
import { Persistable } from '../../Data/TypeDefinitions';

export interface BooleanSettingsItemProps extends Persistable<boolean> {
  title: string;
  onValueChange?: (value: boolean) => void;
  testID?: string;
}

const BooleanSettingsItem: FC<BooleanSettingsItemProps> = ({
  storageKey,
  title,
  testID,
  defaultValue = false,
}) => {
  const [value, setValue] = useMMKVStorage(
    storageKey,
    appStorage,
    defaultValue
  );

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
      <Switch value={value} onValueChange={setValue} testID={testID} />
    </View>
  );
};

export default BooleanSettingsItem;

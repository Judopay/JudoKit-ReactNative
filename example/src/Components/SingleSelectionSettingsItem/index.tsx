import React, { FC } from 'react';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { Text, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import {
  Persistable,
  RootStackParamList,
  Screen,
  SingleSelectionTableParams,
} from '../../Data/TypeDefinitions';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { appStorage } from '../../Application';

export interface ChildPaneSettingsItemProps extends Persistable<string> {
  title: string;
  selectionTableParams?: SingleSelectionTableParams;
}

const SingleSelectionSettingsItem: FC<ChildPaneSettingsItemProps> = ({
  title,
  storageKey,
  defaultValue = '',
  selectionTableParams = null,
}) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [value, _] = useMMKVStorage(storageKey, appStorage, defaultValue);

  const {
    colors: { card, text, border },
  } = useTheme();

  const onPress = () => {
    if (selectionTableParams) {
      navigate(Screen.SINGLE_SELECTION, selectionTableParams);
    }
  };

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
        <Ionicons name="chevron-forward" size={20} color={border} />
      </View>
    </TouchableHighlight>
  );
};

export default SingleSelectionSettingsItem;

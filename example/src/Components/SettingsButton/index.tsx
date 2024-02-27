import React, { FC } from 'react';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, Screen } from '../../Data/TypeDefinitions';

const SettingsButton: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    colors: { primary },
  } = useTheme();

  return (
    <Icon.Button
      testID="settings-button"
      name="settings-outline"
      size={28}
      color={primary}
      backgroundColor="transparent"
      selectionColor="transparent"
      underlayColor="transparent"
      onPress={() => navigation.navigate(Screen.SETTINGS)}
    />
  );
};

export default SettingsButton;

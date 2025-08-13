import React, { FC } from 'react';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { RootStackParamList, Screen } from '../../Data/TypeDefinitions';
import { TouchableOpacity } from 'react-native';

const SettingsButton: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    colors: { primary },
  } = useTheme();

  return (
    <TouchableOpacity
      testID="settings-button"
      onPress={() => navigation.navigate(Screen.SETTINGS)}
    >
      <Ionicons name="settings-outline" size={28} color={primary} />
    </TouchableOpacity>
  );
};

export default SettingsButton;

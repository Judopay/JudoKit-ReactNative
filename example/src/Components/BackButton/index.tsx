import React, { FC } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { TouchableOpacity } from 'react-native';

const BackButton: FC = () => {
  const {
    colors: { primary },
  } = useTheme();
  const { canGoBack, goBack } = useNavigation();

  const navigateBackIfPossible = () => {
    if (canGoBack()) {
      goBack();
    }
  };

  return (
    <TouchableOpacity
      testID="back-button"
      onPress={() => navigateBackIfPossible()}
    >
      <Ionicons name="chevron-back" size={28} color={primary} />
    </TouchableOpacity>
  );
};

export default BackButton;

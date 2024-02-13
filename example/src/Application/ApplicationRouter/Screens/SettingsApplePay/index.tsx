import React, { FC } from 'react';
import SettingsTable from '../../../../Components/SettingsTable';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import applePaySettingsSections from '../../../../Data/SettingsSections/applePaySettingsSections';

const SettingsApplePayScreen: FC<
  StackScreenProps<RootStackParamList, Screen.APPLE_PAY_SETTINGS>
> = () => {
  const {
    colors: { background: backgroundColor },
  } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <SettingsTable transformationFunction={applePaySettingsSections} />
    </SafeAreaView>
  );
};

export default SettingsApplePayScreen;

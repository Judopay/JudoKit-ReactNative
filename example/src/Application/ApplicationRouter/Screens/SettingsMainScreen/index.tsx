import React, { FC } from 'react';
import SettingsTable from '../../../../Components/SettingsTable';
import { buildSettingsSections } from '../../../../Data/SettingsSections';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

const SettingsMainScreen: FC<
  StackScreenProps<RootStackParamList, Screen.SETTINGS>
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
      <SettingsTable transformationFunction={buildSettingsSections} />
    </SafeAreaView>
  );
};

export default SettingsMainScreen;

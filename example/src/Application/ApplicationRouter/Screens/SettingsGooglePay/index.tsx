import React, { FC } from 'react';
import SettingsTable from '../../../../Components/SettingsTable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import googlePaySettingsSections from '../../../../Data/SettingsSections/googlePaySection';

const SettingsGooglePayScreen: FC<
  NativeStackScreenProps<RootStackParamList, Screen.GOOGLE_PAY_SETTINGS>
> = () => {
  const {
    colors: { background: backgroundColor },
  } = useTheme();

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <SettingsTable transformationFunction={googlePaySettingsSections} />
    </SafeAreaView>
  );
};

export default SettingsGooglePayScreen;

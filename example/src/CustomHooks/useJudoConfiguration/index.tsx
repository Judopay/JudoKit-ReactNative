import { useEffect, useState } from 'react';
import { JudoAuthorization, JudoConfiguration } from 'judokit-react-native';
import {
  DEFAULT_SETTINGS_DATA,
  STORAGE_SETTINGS_KEY,
} from '../../Data/Constants';
import {
  judoAuthorizationFromSettingsData,
  judoConfigurationFromSettingsData,
} from '../../Data/Mapping';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { appStorage } from '../../Application';

export interface UseJudoConfigurationResult {
  isSandboxed: boolean;
  authorization: JudoAuthorization;
  configuration: JudoConfiguration;
}

export function useJudoConfiguration(): UseJudoConfigurationResult {
  const [settings, _] = useMMKVStorage(
    STORAGE_SETTINGS_KEY,
    appStorage,
    DEFAULT_SETTINGS_DATA
  );

  const [configuration, setConfiguration] = useState<JudoConfiguration>(
    judoConfigurationFromSettingsData(settings)
  );

  const {
    apiConfiguration: { isSandboxed },
  } = settings;

  useEffect(() => {
    setConfiguration(judoConfigurationFromSettingsData(settings));
  }, [settings]);

  return {
    isSandboxed,
    authorization: judoAuthorizationFromSettingsData(settings),
    configuration,
  };
}

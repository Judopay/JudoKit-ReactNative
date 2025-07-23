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
import { appStorage } from '../../Application';

export interface UseJudoConfigurationResult {
  isSandboxed: boolean;
  authorization: JudoAuthorization;
  configuration: JudoConfiguration;
}

export function useJudoConfiguration(): UseJudoConfigurationResult {
  const raw = appStorage.getString(STORAGE_SETTINGS_KEY);
  const settings = raw ? JSON.parse(raw) : DEFAULT_SETTINGS_DATA;

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

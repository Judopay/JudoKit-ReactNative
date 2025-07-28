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
import { SettingsData } from '../../Data/TypeDefinitions';

export interface UseJudoConfigurationResult {
  isSandboxed: boolean;
  authorization: JudoAuthorization;
  configuration: JudoConfiguration;
}

export function useJudoConfiguration(): UseJudoConfigurationResult {
  const [settings, setSettings] = useState<SettingsData>(() => {
    const stored = appStorage.getString(STORAGE_SETTINGS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS_DATA;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = appStorage.getString(STORAGE_SETTINGS_KEY);
      const parsed = stored ? JSON.parse(stored) : DEFAULT_SETTINGS_DATA;
      setSettings((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(parsed)) {
          return parsed;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const configuration = judoConfigurationFromSettingsData(settings);
  const authorization = judoAuthorizationFromSettingsData(settings);
  const isSandboxed = settings.apiConfiguration.isSandboxed;

  return { configuration, authorization, isSandboxed };
}

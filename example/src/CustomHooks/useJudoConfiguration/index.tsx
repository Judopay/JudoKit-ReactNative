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
import { MMKV } from 'react-native-mmkv';

export function useMMKVState<T>(
  key: string,
  storage: MMKV,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = storage.getString(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });
  const update = (newValue: T) => {
    setValue(newValue);
    storage.set(key, JSON.stringify(newValue));
  };
  return [value, update];
}

export interface UseJudoConfigurationResult {
  isSandboxed: boolean;
  authorization: JudoAuthorization;
  configuration: JudoConfiguration;
}

export function useJudoConfiguration(): UseJudoConfigurationResult {
  const [settings, _] = useMMKVState(
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

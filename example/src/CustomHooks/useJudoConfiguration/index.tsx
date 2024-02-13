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
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { fromJSONString } from '../../Functions';

export interface UseJudoConfigurationResult {
  isSandboxed: boolean;
  authorization: JudoAuthorization;
  configuration: JudoConfiguration;
}

export function useJudoConfiguration(): UseJudoConfigurationResult {
  const navigation = useNavigation();

  const { getItem } = useAsyncStorage(STORAGE_SETTINGS_KEY);
  const [settingsData, setSettingsData] = useState(DEFAULT_SETTINGS_DATA);
  const [configuration, setConfiguration] = useState<JudoConfiguration>(
    judoConfigurationFromSettingsData(settingsData)
  );

  const {
    apiConfiguration: { isSandboxed },
  } = settingsData;

  const reloadSettings = async () => {
    const data = await getItem();
    setSettingsData(fromJSONString(data, DEFAULT_SETTINGS_DATA));
  };

  useEffect(() => {
    setConfiguration(judoConfigurationFromSettingsData(settingsData));
  }, [settingsData]);

  const onFocus = () => {
    reloadSettings().catch(console.error);
  };

  useEffect(() => {
    navigation.addListener('focus', onFocus);

    return () => {
      navigation.removeListener('focus', onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return {
    isSandboxed,
    authorization: judoAuthorizationFromSettingsData(settingsData),
    configuration,
  };
}

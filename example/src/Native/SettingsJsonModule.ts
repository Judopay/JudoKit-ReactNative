import { NativeModules } from 'react-native';

type SettingsJsonNativeModule = {
  copyToClipboard: (text: string) => void;
  pickJsonFile: () => Promise<string>;
};

const nativeModule = NativeModules.SettingsJsonModule as
  | SettingsJsonNativeModule
  | undefined;

export const copySettingsToClipboard = (json: string) => {
  if (!nativeModule?.copyToClipboard) {
    throw new Error('Clipboard is not available.');
  }
  nativeModule.copyToClipboard(json);
};

export const pickSettingsJsonFile = async (): Promise<string | undefined> => {
  if (!nativeModule?.pickJsonFile) {
    throw new Error('File picker is not available.');
  }
  try {
    return await nativeModule.pickJsonFile();
  } catch (error) {
    const code = (error as { code?: string })?.code;
    if (code === 'cancelled') {
      return undefined;
    }
    throw error;
  }
};

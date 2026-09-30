import { appStorage } from '../../Application';
import {
  buildSettingsExport,
  parseSettingsImport,
  SettingsImportError,
} from './index';
import { BOOLEAN_STORAGE_KEYS } from './importMaps';

export { SettingsImportError };

const readStoredValue = (storageKey: string): string | boolean | undefined => {
  if (BOOLEAN_STORAGE_KEYS.has(storageKey)) {
    const boolValue = appStorage.getBool(storageKey);
    return typeof boolValue === 'boolean' ? boolValue : undefined;
  }
  const stringValue = appStorage.getString(storageKey);
  return typeof stringValue === 'string' ? stringValue : undefined;
};

export const persistSettingsPatch = (
  patch: Record<string, string | boolean>
) => {
  Object.entries(patch).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      appStorage.setBool(key, value);
    } else {
      appStorage.setString(key, value);
    }
  });
};

export const importSettingsFromJson = (json: string) => {
  persistSettingsPatch(parseSettingsImport(json));
};

export const exportSettingsToJson = (): string =>
  buildSettingsExport(readStoredValue);

import { appStorage } from '../../Application';
import { SETTINGS_IMPORT_REVISION_KEY } from '../Constants';
import {
  buildSettingsExport,
  parseSettingsImport,
  SettingsImportError,
} from './index';

export { SettingsImportError };

const readStoredValue = (storageKey: string): string | boolean | undefined => {
  const boolValue = appStorage.getBool(storageKey);
  if (typeof boolValue === 'boolean') {
    return boolValue;
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

  const currentRevision = appStorage.getInt(SETTINGS_IMPORT_REVISION_KEY) ?? 0;
  appStorage.setInt(SETTINGS_IMPORT_REVISION_KEY, currentRevision + 1);
};

export const importSettingsFromJson = (json: string) => {
  persistSettingsPatch(parseSettingsImport(json));
};

export const exportSettingsToJson = (): string =>
  buildSettingsExport(readStoredValue);

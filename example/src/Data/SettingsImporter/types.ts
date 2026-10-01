export class SettingsImportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SettingsImportError';
  }
}

export type JsonValue =
  | string
  | boolean
  | number
  | JsonValue[]
  | JsonObject
  | null;
export type JsonObject = { [key: string]: JsonValue };
export type SettingsPatch = Record<string, string | boolean>;
export type StoredValue = string | boolean | undefined;
export type ValueReader = (storageKey: string) => StoredValue;

export const isPlainObject = (value: unknown): value is JsonObject =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export const asStringArray = (value: JsonValue): string[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined;
  }
  return value.filter((item) => item !== null).map((item) => `${item}`);
};

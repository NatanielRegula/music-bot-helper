import { Data } from './bdApi';
import getKeycodeMappings from './keycodeMappings';

export const SETTINGS_KEYS = {
  keybindMuteAudioBotLocal: 'keybindMuteAudioBotLocal',
  keybindIncreaseVolume: 'keybindIncreaseVolume',
  keybindDecreaseVolume: 'keybindDecreaseVolume',

  shouldShowNativeDesktopNotifications: 'shouldShowNativeDesktopNotifications',
} as const;

type ObjectValues<T> = T[keyof T];

export type SettingsKeys = ObjectValues<typeof SETTINGS_KEYS>;

export function readSettingRaw<T>(key: SettingsKeys): T | null {
  const keyWithPrefix = `settings_${key}`;

  const settingValueFromData: string | undefined = Data.load(keyWithPrefix);

  const settingParsed: T | undefined =
    settingValueFromData != undefined
      ? JSON.parse(settingValueFromData)
      : undefined;

  return settingParsed;
}

export function readSetting<T>(key: SettingsKeys, defaultValue: T): T {
  return readSettingRaw(key) || defaultValue;
}

export function saveSetting<T>(key: SettingsKeys, value: T): void {
  const keyWithPrefix = `settings_${key}`;

  Data.save(keyWithPrefix, JSON.stringify(value));
}

export function setDefaultValuesSettings(onlyIfNull = true): void {
  Object.entries(SETTINGS_KEYS).forEach(([_, settingKey]) => {
    const currentValue = readSettingRaw(settingKey);
    const keycodeMappings = getKeycodeMappings();

    if (currentValue === undefined || onlyIfNull === false) {
      switch (settingKey) {
        case SETTINGS_KEYS.keybindMuteAudioBotLocal:
          saveSetting(settingKey, [
            [0, keycodeMappings.ctrl, '0:0'],
            [0, keycodeMappings.alt, '0:0'],
            [0, keycodeMappings.k, '0:0'],
          ]);
          break;
        case SETTINGS_KEYS.keybindIncreaseVolume:
          saveSetting(settingKey, [
            [0, keycodeMappings.ctrl, '0:0'],
            [0, keycodeMappings.alt, '0:0'],
            [0, keycodeMappings['='], '0:0'],
          ]);
          break;
        case SETTINGS_KEYS.keybindDecreaseVolume:
          saveSetting(settingKey, [
            [0, keycodeMappings.ctrl, '0:0'],
            [0, keycodeMappings.alt, '0:0'],
            [0, keycodeMappings['-'], '0:0'],
          ]);
          break;
        case SETTINGS_KEYS.shouldShowNativeDesktopNotifications:
          saveSetting(settingKey, false);
          break;

        default:
          break;
      }
    }
  });
}

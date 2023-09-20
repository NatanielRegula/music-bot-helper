import { useEffect, useRef, useState } from '../utils/bdApi';
import { SettingsKeys, readSetting, saveSetting } from '../utils/settingUtils';

interface Props<T> {
  key: SettingsKeys;
  defaultValue?: T;
  onChange?: () => void;
}

export default function useSetting<T>(
  key: SettingsKeys,
  { defaultValue, onChange }: { defaultValue?: T; onChange?: () => void }
) {
  if (key.length === 0) throw new Error('Setting key cannot be empty!');

  const state = useState<T>(readSetting<T>(key, defaultValue));

  const settingCurrentValue = state[0];

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    saveSetting(key, settingCurrentValue);
    onChange?.();
  }, [settingCurrentValue]);

  return state;
}

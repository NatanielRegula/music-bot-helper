import { DisHeading } from '../../../dis/modules/uiComponents/DisHeading';
import {
  DisKeybindRecorder,
  KeyCode,
} from '../../../dis/modules/uiComponents/DisKeybindRecorder';
import useSetting from '../../../hooks/useSetting';
import { globalShortcuts } from '../../../lib/globalKeyboardShortcuts';
import { React } from '../../../utils/bdApi';
import { SettingsKeys } from '../../../utils/settingUtils';

interface Props {
  settingKey: SettingsKeys;
  label: string;
  onChange?: () => void;
}

export default function KeybindRecorderSetting(props: Props) {
  const [keyCodesValue, setKeyCodesValue] = useSetting<KeyCode[]>(
    props.settingKey,
    {
      onChange: () => {
        globalShortcuts.registerGlobalKeyboardShortcuts();
        props.onChange?.();
      },
    }
  );

  return (
    <div>
      <DisHeading>{props.label}</DisHeading>
      <DisKeybindRecorder
        defaultValue={keyCodesValue}
        onChange={(newValues) => {
          setKeyCodesValue(newValues);
        }}
      />
      <div className="divider-3nqZNm dividerDefault-wIfHHD"></div>
    </div>
  );
}

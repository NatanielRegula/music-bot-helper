import { DisHeading } from '../../dis/modules/uiComponents/DisHeading';
import {
  KeyCode,
  DisKeybindRecorder,
} from '../../dis/modules/uiComponents/DisKeybindRecorder';
import { DisSettingToggle } from '../../dis/modules/uiComponents/DisSettingToggle';
import useSetting from '../../hooks/useSetting';
import { globalShortcuts } from '../../lib/globalKeyboardShortcuts';
import { useState, React } from '../../utils/bdApi';
import Logger from '../../utils/logger';
import { SETTINGS_KEYS } from '../../utils/settingUtils';
import EnablePluginPrompt from './components/EnablePluginPrompt';

interface Props {}

export default function SettingsPopup(props: Props) {
  const [keyCodesValue, setKeyCodesValue] = useSetting<KeyCode[]>(
    SETTINGS_KEYS.keybindMuteAudioBotLocal,
    {
      onChange: () => {
        globalShortcuts.registerGlobalKeyboardShortcuts();
      },
    }
  );

  const [value, setValue] = useState(false);

  return (
    <div className="colorStandard-1Xxp1s size12-12FL_s">
      <EnablePluginPrompt />
      <DisSettingToggle
        note={'trying to write a note is hard'}
        onChange={(newValue: boolean) => {
          setValue(newValue);
        }}
        value={value}
      >
        Im a label
      </DisSettingToggle>

      <DisHeading>Keybinds</DisHeading>

      <DisHeading tag="label">Mute the audio bot</DisHeading>
      <DisKeybindRecorder
        defaultValue={keyCodesValue}
        onChange={(newValues) => {
          Logger.info(newValues);
          setKeyCodesValue(newValues);
        }}
      />
    </div>
  );
}

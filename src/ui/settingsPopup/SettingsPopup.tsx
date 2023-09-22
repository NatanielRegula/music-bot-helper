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
import KeybindRecorderSetting from './components/KeybindRecorderSetting';

interface Props {}

export default function SettingsPopup(props: Props) {
  const [value, setValue] = useState(false);

  return (
    <div className=" colorStandard-1Xxp1s size12-12FL_s">
      <EnablePluginPrompt />
      {/* <DisSettingToggle
        note={'trying to write a note is hard'}
        onChange={(newValue: boolean) => {
          setValue(newValue);
        }}
        value={value}
      >
        Im a label
      </DisSettingToggle> */}

      <div style={{ paddingTop: '1rem' }}>
        <DisHeading tag="h1">Keybinds</DisHeading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <KeybindRecorderSetting
            settingKey={SETTINGS_KEYS.keybindMuteAudioBotLocal}
            label={'Mute the active audio bot'}
          />

          <KeybindRecorderSetting
            settingKey={SETTINGS_KEYS.keybindIncreaseVolume}
            label={"Increase the music bot's volume"}
          />

          <KeybindRecorderSetting
            settingKey={SETTINGS_KEYS.keybindDecreaseVolume}
            label={"Decrease the music bot's volume"}
          />
        </div>
      </div>
    </div>
  );
}

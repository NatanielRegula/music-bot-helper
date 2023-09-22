import { React } from '../../utils/bdApi';

import { DisHeading } from '../../dis/modules/uiComponents/DisHeading';
import { SETTINGS_KEYS } from '../../utils/settingUtils';
import EnablePluginPrompt from './components/EnablePluginPrompt';
import KeybindRecorderSetting from './components/KeybindRecorderSetting';
import ToggleSetting from './components/ToggleSetting';

interface Props {}

export default function SettingsPopup(props: Props) {
  return (
    <div className=" colorStandard-1Xxp1s size12-12FL_s">
      <EnablePluginPrompt />

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

      <div style={{ paddingTop: '1rem' }}>
        <DisHeading tag="h1">Experimental</DisHeading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ToggleSetting
            settingKey={SETTINGS_KEYS.shouldShowNativeDesktopNotifications}
            label={'Show Native Desktop Notifications'}
            note={
              'If enabled notifications such as volume changes will be displayed using your systems native notification in addition to the "Toasts" within the application.'
            }
          />
        </div>
      </div>
    </div>
  );
}

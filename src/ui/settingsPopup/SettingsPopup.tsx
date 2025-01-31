import BdApi, { React } from '../../utils/bdApi';

import { DisHeading } from '../../dis/modules/uiComponents/DisHeading';
import { SETTINGS_KEYS } from '../../utils/settingUtils';
import EnablePluginPrompt from './components/EnablePluginPrompt';
import KeybindRecorderSetting from './components/KeybindRecorderSetting';
import ToggleSetting from './components/ToggleSetting';
import { DisCssClassesColor, DisCssClassesSize } from '../../dis/modules/css';

interface Props {}

export default function SettingsPopup(props: Props) {
  return (
    <div
      className={`${DisCssClassesColor.colorStandard} ${DisCssClassesSize.size16}`}
    >
      <EnablePluginPrompt />

      <div style={{ paddingTop: '1rem' }}>
        <DisHeading tag="h1">Keybinds</DisHeading>

        {BdApi.version === '1.9.5' && (
          <p style={{ color: 'var(--text-danger)' }}>
            Warning: The below value for a keybind might say [object Undefined],
            it is caused by a bug in BD v1.9.5 (Your currently installed
            version). To fix this update BD to the latest version.
          </p>
        )}

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

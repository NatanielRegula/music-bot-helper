import { DisFormLabel } from '../../dis/modules/uiComponents/DisFormLabel';
import { DisHeading } from '../../dis/modules/uiComponents/DisHeading';
import {
  DisKeybindRecorder,
  KeyCode,
} from '../../dis/modules/uiComponents/DisKeybindRecorder';
import { DisSettingToggle } from '../../dis/modules/uiComponents/DisSettingToggle';
import { React, useState } from '../../utils/bdApi';
import Logger from '../../utils/logger';
import EnablePluginPrompt from './components/EnablePluginPrompt';

interface Props {}

export default function SettingsPopup(props: Props) {
  const [keyCodesValue, setKeyCodesValue] = useState<KeyCode[]>([]);
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

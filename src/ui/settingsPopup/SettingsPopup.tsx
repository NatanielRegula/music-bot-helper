import { DisKeybindRecorder } from '../../dis/modules/uiComponents/DisKeybindRecorder';
import { React, useState } from '../../utils/bdApi';
import Logger from '../../utils/logger';
import EnablePluginPrompt from './components/EnablePluginPrompt';

interface Props {}

export default function SettingsPopup(props: Props) {
  const [values, setValues] = useState([]);

  return (
    <div className="colorStandard-1Xxp1s size12-12FL_s">
      <EnablePluginPrompt />
      <DisKeybindRecorder
        defaultValue={values}
        onChange={(newValues: []) => {
          Logger.info(newValues);
          setValues(newValues);
        }}
      />
    </div>
  );
}

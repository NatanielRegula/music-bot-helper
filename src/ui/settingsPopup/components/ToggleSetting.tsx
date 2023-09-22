import { DisSettingToggle } from '../../../dis/modules/uiComponents/DisSettingToggle';
import useSetting from '../../../hooks/useSetting';
import { React } from '../../../utils/bdApi';
import { SettingsKeys } from '../../../utils/settingUtils';

interface Props {
  settingKey: SettingsKeys;
  label: string;
  note?: string;
  onChange?: () => void;
}

export default function ToggleSetting(props: Props) {
  const [value, setValue] = useSetting<boolean>(props.settingKey, {
    onChange: () => {
      props.onChange?.();
    },
  });

  return (
    <div>
      <DisSettingToggle
        note={props.note}
        onChange={(newValue: boolean) => {
          setValue(newValue);
        }}
        value={value}
      >
        {props.label}
      </DisSettingToggle>
      <div className="divider-3nqZNm dividerDefault-wIfHHD"></div>
    </div>
  );
}

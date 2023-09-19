import { Switch } from '../../../dis/modules/uiComponents';
import BdApi, { React, useState } from '../../../utils/bdApi';
import config from '../../../../config.json';

interface Props {}

export default function EnablePluginPrompt(props: Props) {
  const [isChecked, setIsChecked] = useState(
    BdApi.Plugins.isEnabled(config.name)
  );

  return (
    <div
      style={{
        border: '1px solid var(--primary-500)',
        padding: '1rem',
        borderRadius: '5px',
        margin: '1rem 0 1rem 0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <label htmlFor="enablePlugin" className="title-2yADjX">
          Enable the plugin
        </label>
        <Switch
          id="enablePlugin"
          checked={isChecked}
          onChange={(value: boolean) => {
            BdApi.Plugins.toggle(config.name);
            setIsChecked(BdApi.Plugins.isEnabled(config.name));
          }}
        />
      </div>

      {!isChecked && (
        <div style={{ margin: '1rem 0 0 0' }}>
          <span
            style={{
              fontSize: ' 0.8rem',
              textTransform: 'uppercase',
              color: 'var(--text-danger)',
            }}
          >{`Plugin is currently disabled!`}</span>{' '}
        </div>
      )}
    </div>
  );
}

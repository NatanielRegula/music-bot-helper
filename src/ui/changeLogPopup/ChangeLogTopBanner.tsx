import { React } from '../../utils/bdApi';
import config from '../../../config.json';

export default function ChangeLogTopBanner() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '410px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
          }}
        >{`Plugin updated`}</span>
        <span
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            color: 'var(--text-normal)',
          }}
        >{`Current Version: ${config.version}`}</span>
      </div>
      <span>{`${config.name}`}</span>
    </div>
  );
}

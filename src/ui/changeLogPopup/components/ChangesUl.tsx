import { React } from '../../../utils/bdApi';

interface Props {
  changes: string[];
}

export function ChangesUlFeatures(props: Props) {
  return (
    <div>
      {props.changes.length != 0 && (
        <>
          <span
            style={{
              color: 'var(--text-positive)',
              fontWeight: 600,
              //   textTransform: 'uppercase',
            }}
          >
            Features
          </span>
          <ul style={{ margin: '.3rem 0px 0 1.5rem' }}>
            {props.changes.map((change) => {
              return <li key={change}>{change}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export function ChangesUlBugFixes(props: Props) {
  return (
    <div>
      {props.changes.length != 0 && (
        <>
          <span
            style={{
              color: 'var(--text-danger)',
              fontWeight: 600,
              //   textTransform: 'uppercase',
            }}
          >
            Bug fixes
          </span>
          <ul style={{ margin: '.3rem 0px 0 1.5rem' }}>
            {props.changes.map((change) => {
              return <li>{change}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

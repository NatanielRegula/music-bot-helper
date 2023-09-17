import { React } from '../../../utils/bdApi';

interface Props {
  changes: string[];
}

export function ChangesUlFeatures(props: Props) {
  return (
    <>
      {props.changes.length != 0 && (
        <div>
          <span
            style={{
              color: 'var(--text-positive)',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            &#91;Features&#93;
          </span>
          <ul style={{ margin: '.3rem 0px 0 1.5rem' }}>
            {props.changes.map((change) => {
              return <li key={change}>{change}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export function ChangesUlBugFixes(props: Props) {
  return (
    <>
      {props.changes.length != 0 && (
        <div>
          <span
            style={{
              color: 'var(--text-danger)',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            &#91;Bug fixes&#93;
          </span>
          <ul style={{ margin: '.3rem 0px 0 1.5rem' }}>
            {props.changes.map((change) => {
              return <li key={change}>{change}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
}

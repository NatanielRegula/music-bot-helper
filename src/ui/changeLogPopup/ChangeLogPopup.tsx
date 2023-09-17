import { React } from '../../utils/bdApi';
import changeLog from '../../../changelog.json';
import {
  ChangesUlBugFixes,
  ChangesUlImprovements,
} from './components/ChangesUl';

interface Props {
  newVersion: string;
}

function ChangeLogPopup(props: Props) {
  return (
    <div className="colorStandard-1Xxp1s size12-12FL_s">
      <div className="content-FDHp32">
        {Object.entries(changeLog).map(([_, value]) => {
          return (
            <div
              style={{
                padding: '1rem',
                background: 'var(--primary-700)',
                borderRadius: '5px',
                margin: '0 0 1rem 0',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  //   alignSelf: 'flex-end',
                  margin: '0 0 1rem 0',
                }}
                className="defaultColor-1EVLSt heading-lg-semibold-14ouVv"
              >
                {value.title}
              </span>
              <ChangesUlImprovements changes={value.improved} />
              <ChangesUlBugFixes changes={value.fixed} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChangeLogPopup;

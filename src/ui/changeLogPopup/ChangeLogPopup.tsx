import { React } from '../../utils/bdApi';
import changeLog from '../../../changelog.json';
import { ChangesUlBugFixes, ChangesUlFeatures } from './components/ChangesUl';
import EnablePluginPrompt from './components/EnablePluginPrompt';

interface Props {
  newVersion: string;
}

function ChangeLogPopup(props: Props) {
  return (
    <div className="colorStandard-1Xxp1s size12-12FL_s">
      <EnablePluginPrompt />
      <div className="content-FDHp32">
        {Object.entries(changeLog).map(([key, value]) => {
          return (
            <div
              key={key}
              style={{
                padding: '1rem',
                background: 'var(--primary-700)',
                borderRadius: '5px',
                margin: '0 0 1rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <span className="defaultColor-1EVLSt heading-lg-semibold-14ouVv">
                {value.title}
              </span>
              <ChangesUlFeatures changes={value.feature} />
              <ChangesUlBugFixes changes={value.fixed} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChangeLogPopup;

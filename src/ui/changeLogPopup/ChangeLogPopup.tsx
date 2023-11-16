import { React } from '../../utils/bdApi';
import changeLog from '../../../changelog.json';
import { ChangesUlBugFixes, ChangesUlFeatures } from './components/ChangesUl';
import EnablePluginPrompt from './components/EnablePluginPrompt';
import {
  DisCssClassesColor,
  DisCssClassesSize,
  DisCssTextStyle,
} from '../../dis/modules/css';

interface Props {
  newVersion: string;
}

function ChangeLogPopup(props: Props) {
  return (
    <div
      className={`${DisCssClassesColor.colorStandard} ${DisCssClassesSize.size16}`}
    >
      <EnablePluginPrompt />
      <div>
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <span className={`${DisCssTextStyle['heading-lg/semibold']}`}>
                  {value.title}
                </span>

                {value.title === props.newVersion && <span>New</span>}
              </div>
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

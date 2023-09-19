import { React } from '../../utils/bdApi';
import EnablePluginPrompt from './components/EnablePluginPrompt';

interface Props {}

export default function SettingsPopup(props: Props) {
  return (
    <div className="colorStandard-1Xxp1s size12-12FL_s">
      <EnablePluginPrompt />
    </div>
  );
}

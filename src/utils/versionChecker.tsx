import BdApi, { Data, React } from './bdApi';
import Logger from './logger';
import config from '../../config.json';
import ChangeLogPopup from '../ui/changeLogPopup/ChangeLogPopup';
import ChangeLogTopBanner from '../ui/changeLogPopup/ChangeLogTopBanner';

export default function checkIfVersionUpdated() {
  if (config.version !== Data.load(`lastLoadedVersion`)) {
    showVersionUpdatedPopup();
  }
}

export function showVersionUpdatedPopup() {
  Logger.info('New version installed!');

  BdApi.alert(
    <ChangeLogTopBanner />,
    <ChangeLogPopup newVersion={config.version} />
  );

  Data.save(`lastLoadedVersion`, config.version);
}

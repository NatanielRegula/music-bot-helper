import BdApi, { Data, React } from './bdApi';
import Logger from './logger';
import config from '../../config.json';
import ChangeLogPopup from '../ui/changeLogPopup/changeLogPopup';

export default function checkIfVersionUpdated() {
  if (config.version != Data.load(`lastLoadedVersion`)) {
    Logger.info('New version installed!');

    BdApi.showConfirmationModal(
      `New version of ${config.name} was installed.`,
      <ChangeLogPopup newVersion={config.version} />
    );

    Data.save(`lastLoadedVersion`, config.version);
  }
}

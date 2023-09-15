import { Data } from './bdApi';
import Logger from './logger';
import config from '../../config.json';

export default function checkIfVersionUpdated() {
  if (config.version != Data.load(`lastLoadedVersion`)) {
    Logger.info('new version loaded');

    Data.save(`lastLoadedVersion`, config.version);
  }
}

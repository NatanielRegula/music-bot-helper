import BdApi, { UI, React } from './utils/bdApi';

import SettingsPopup from './ui/settingsPopup/SettingsPopup';

import Logger from './utils/logger';
import showSettings from './utils/showSettings';
import checkIfVersionUpdated, {
  showVersionUpdatedPopup,
} from './utils/versionChecker';

import config from '../config.json';
import { setDefaultValuesSettings } from './utils/settingUtils';
import { globalShortcuts } from './lib/globalKeyboardShortcuts';

checkIfVersionUpdated();

if (process.env.NODE_ENV === 'development') {
  Logger.warn(
    `Development Mode! | Enabled status: ${BdApi.Plugins.isEnabled(
      config.name
    )}`
  );

  window.zoxMusicBotHelper = {};
  window.zoxMusicBotHelper.showSettings = showSettings;
  window.zoxMusicBotHelper.showVersionUpdatedPopup = showVersionUpdatedPopup;
}

export default class {
  start() {
    Logger.info('Plugin enabled!');
    setDefaultValuesSettings();

    document.addEventListener('keydown', this.keyBindHandler);
    globalShortcuts.registerGlobalKeyboardShortcuts();
  }

  stop() {
    Logger.info('Plugin disabled!');
    document.removeEventListener('keydown', this.keyBindHandler);
    globalShortcuts.unregisterAllGlobalKeyboardShortcuts();
  }

  getSettingsPanel() {
    return <SettingsPopup />;
  }

  ///-----Misc-----///
  async keyBindHandler(e: any) {
    if (!e.ctrlKey || !e.altKey) return;
    switch (e.code) {
      // case 'KeyK':
      //   this.toggleMuteClientSide();
      //   break;l

      case 'KeyO':
        Logger.info('ctrl alt o');
        UI.alert('Settings', <SettingsPopup />);

        break;
      case 'KeyL':
        // await this.openSetupDialog();
        break;
      case 'KeyN':
        // await this.patchPlaybackUi();
        break;

      default:
        return;
    }
  }
}

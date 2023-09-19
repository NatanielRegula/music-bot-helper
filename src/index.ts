import { getCurrentlyActiveBotId } from './botController/botController';
import { DisAudioCtl } from './dis/modules/modules';
import { DisMediaInfo, DisUserStore } from './dis/modules/stores';
import NativeDisUtils from './dis/nativeModules/discordUtils';
import { UI } from './utils/bdApi';
import getKeycodeMappings from './utils/keycodeMappings';
import Logger from './utils/logger';
import showSettings from './utils/showSettings';
import checkIfVersionUpdated from './utils/versionChecker';

let globalKeyboardShortcutsRegisterIds: number[] = [];

checkIfVersionUpdated();

if (process.env.NODE_ENV === 'development') {
  Logger.info(`Development Mode!`);

  window.showSettings = showSettings;
}

export default class {
  start() {
    Logger.info('Plugin enabled!');

    document.addEventListener('keydown', () => this.keyBindHandler);
    this.registerGlobalKeyboardShortcuts();
  }

  stop() {
    Logger.info('Plugin disabled!');
    document.removeEventListener('keydown', () => this.keyBindHandler);
    this.unregisterAllGlobalKeyboardShortcuts();
  }

  getSettingsPanel() {
    const mySettingsPanel = document.createElement('div');
    mySettingsPanel.id = 'my-settings';

    const buttonTextSetting = document.createElement('div');
    buttonTextSetting.classList.add('setting');

    const buttonTextLabel = document.createElement('span');
    buttonTextLabel.textContent = 'Button Text';

    const buttonTextInput = document.createElement('input');
    buttonTextInput.type = 'text';
    buttonTextInput.name = 'buttonText';

    buttonTextSetting.append(buttonTextLabel, buttonTextInput);

    const darkModeSetting = document.createElement('div');
    darkModeSetting.classList.add('setting');

    const darkModeLabel = document.createElement('span');
    darkModeLabel.textContent = 'Dark Mode';

    const darkModeInput = document.createElement('input');
    darkModeInput.type = 'checkbox';
    darkModeInput.name = 'darkMode';

    darkModeSetting.append(darkModeLabel, darkModeInput);

    mySettingsPanel.append(buttonTextSetting, darkModeSetting);

    return mySettingsPanel;
  }

  ///-----Audio actions / Bot interactions-----///
  toggleMuteClientSide() {
    const activeBotId = getCurrentlyActiveBotId();

    if (activeBotId == null) return;

    DisAudioCtl.toggleLocalMute(activeBotId);

    const botName: string = DisUserStore.getUser(activeBotId).username;

    if (DisMediaInfo.isLocalMute(activeBotId)) {
      UI.showToast(`⏸️ ${botName} PAUSED (Just for you)`, {
        forceShow: true,
      });
    } else {
      UI.showToast(`▶️ ${botName} RESUMED (Just for you)`, {
        forceShow: true,
      });
    }
  }

  ///-----Misc-----///
  async keyBindHandler(e: any) {
    if (!e.ctrlKey || !e.altKey) return;
    switch (e.code) {
      // case 'KeyK':
      //   this.toggleMuteClientSide();
      //   break;

      case 'KeyO':
        // this.createFakeAudioPlayer();
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

  registerGlobalKeyboardShortcuts() {
    const keycodeMappings = getKeycodeMappings();
    const toggleMuteClientSideRegisterId = Math.floor(Math.random() * 100000);

    globalKeyboardShortcutsRegisterIds.push(toggleMuteClientSideRegisterId);

    NativeDisUtils.inputEventRegister(
      toggleMuteClientSideRegisterId,
      [
        [0, keycodeMappings.ctrl],
        [0, keycodeMappings.alt],
        [0, keycodeMappings.k],
      ],
      (isDown: boolean) => {
        Logger.log(`ctrl+alt+k - isDown ${isDown}`);
        if (isDown) {
          this.toggleMuteClientSide();
        }
      },
      {
        blurred: true,
        focused: true,
        keydown: true,
        keyup: true,
      }
    );
  }

  unregisterAllGlobalKeyboardShortcuts(): void {
    for (const id of globalKeyboardShortcutsRegisterIds) {
      NativeDisUtils.inputEventUnregister(id);
    }
  }
}

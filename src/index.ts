import { DisAudioCtl } from './dis/modules/modules';
import {
  DisMediaInfo,
  DisSelectedChannelStore,
  DisUserStore,
  DisVoiceStateStore,
} from './dis/modules/stores';
import NativeDisUtils from './dis/nativeModules/discordUtils';
import { UI } from './utils/bdApi';
import getKeycodeMappings from './utils/keycodeMappings';
import Logger from './utils/logger';
import checkIfVersionUpdated from './utils/versionChecker';

let globalKeyboardShortcutsRegisterIds: number[] = [];

checkIfVersionUpdated();

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

  ///-----Audio actions / Bot interactions-----///
  toggleMuteClientSide() {
    const activeBotId = this.getCurrentlyActiveBotId();
    if (activeBotId.length == 0) return;

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
  ///-----Bot Detection-----///
  getIsUserABot(userId: string): boolean {
    const userData = DisUserStore.getUser(userId);
    return userData.bot;
  }

  getCurrentVoiceChannelUsersIds(): Array<string> {
    const voiceStatesForCurrentVoiceChannelObject =
      DisVoiceStateStore.getVoiceStatesForChannel(
        DisSelectedChannelStore.getVoiceChannelId()
      );

    const currentVoiceChannelUsersIds = Object.keys(
      voiceStatesForCurrentVoiceChannelObject
    ).map((key) => voiceStatesForCurrentVoiceChannelObject[key].userId);

    return currentVoiceChannelUsersIds;
  }

  getCurrentlyActiveBotId(): string {
    //this will in the future allow to switch between multiple bots in vc
    //for now it just gives the first form the list
    const selectedBots = this.getMusicBotsInCurrentVoiceChat();
    if (selectedBots.length == 0) return '';
    return selectedBots[0];
  }

  getMusicBotsInCurrentVoiceChat(): Array<string> {
    const currentVoiceChannelUsersIds = this.getCurrentVoiceChannelUsersIds();

    const detectedBotsIds: Array<string> = [];
    currentVoiceChannelUsersIds.forEach((userId) => {
      if (this.getIsUserABot(userId)) {
        detectedBotsIds.push(userId);
      }
    });
    return detectedBotsIds;
  }
}

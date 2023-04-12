'use strict';
/**
 *
 * @param {import("zerespluginlibrary").Plugin} Plugin
 * @param {import("zerespluginlibrary").BoundAPI} Library
 * @returns
 */

module.exports = (Plugin, Library) => {
  const { Logger, Utilities, WebpackModules, DiscordModules } = Library;

  const Dispatcher = WebpackModules.getByProps('dispatch', 'subscribe');

  const DisVoiceStateStore = WebpackModules.getByProps(
    'getVoiceStateForUser',
    'getVoiceStatesForChannel'
  );

  const DisUserStore = DiscordModules.UserStore;
  const DisSelectedChannelStore = DiscordModules.SelectedChannelStore;
  const DisAudioCtl = WebpackModules.getByProps(
    'toggleLocalMute',
    'setLocalVolume'
  );

  return class MusicBotHelper extends Plugin {
    constructor() {
      super();
      ///-----Adding Context To Methods-----///
      //misc
      this.getCurrentVoiceChannelUsersIds =
        this.getCurrentVoiceChannelUsersIds.bind(this);
      this.getIsUserABot = this.getIsUserABot.bind(this);
      this.getCurrentlyActiveBotId = this.getCurrentlyActiveBotId.bind(this);

      //audio actions
      this.muteClientSide = this.muteClientSide.bind(this);

      //misc
      this.keyBindHandler = this.keyBindHandler.bind(this);
      this.createFakeAudioPlayer = this.createFakeAudioPlayer.bind(this);
    }

    ///-----Audio actions / Bot interactions-----///
    muteClientSide() {
      const activeBotId = this.getCurrentlyActiveBotId();
      DisAudioCtl.toggleLocalMute(activeBotId);
    }

    ///-----Misc-----///
    keyBindHandler(e) {
      if (!e.ctrlKey && !e.altKey) return;
      switch (e.code) {
        case 'KeyK':
          this.muteClientSide();
          break;

        case 'KeyO':
          this.createFakeAudioPlayer();
          break;

        default:
          return;
      }
    }

    createFakeAudioPlayer() {
      Logger.info('creating fake audio player');
    }

    onStart() {
      Logger.info('Plugin enabled!');
      Logger.info();
      this.createFakeAudioPlayer();
      document.addEventListener('keydown', this.keyBindHandler);
    }

    onStop() {
      Logger.info('Plugin disabled!');
      document.removeEventListener('keydown', this.keyBindHandler);
    }

    ///-----Bot Detection-----///
    getIsUserABot(userId) {
      const userData = DisUserStore.getUser(userId);
      return userData.bot;
    }

    getCurrentVoiceChannelUsersIds() {
      const voiceStatesForCurrentVoiceChannelObject =
        DisVoiceStateStore.getVoiceStatesForChannel(
          DisSelectedChannelStore.getVoiceChannelId()
        );

      const currentVoiceChannelUsersIds = Object.keys(
        voiceStatesForCurrentVoiceChannelObject
      ).map((key) => voiceStatesForCurrentVoiceChannelObject[key].userId);

      return currentVoiceChannelUsersIds;
    }
    getCurrentlyActiveBotId() {
      //this will in the future allow to switch between multiple bots in vc
      //for now it just gives the first form the list
      return this.getMusicBotsInCurrentVoiceChat()[0];
    }

    getMusicBotsInCurrentVoiceChat() {
      const currentVoiceChannelUsersIds = this.getCurrentVoiceChannelUsersIds();
      const detectedBotsIds = [];
      currentVoiceChannelUsersIds.forEach((userId) => {
        if (this.getIsUserABot(userId)) {
          detectedBotsIds.push(userId);
        }
      });
      return detectedBotsIds;
    }
  };
};

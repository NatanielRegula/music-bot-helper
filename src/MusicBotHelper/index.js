'use strict';
/**
 *
 * @param {import("zerespluginlibrary").Plugin} Plugin
 * @param {import("zerespluginlibrary").BoundAPI} Library
 * @returns
 */

module.exports = (Plugin, Library) => {
  const { UI, React, Patcher, Webpack } = new BdApi('MusicBotHelper');
  const {
    Logger,
    Utilities,
    WebpackModules,
    DiscordModules,
    ReactComponents,
    PluginUtilities,
  } = Library;

  const Dispatcher = WebpackModules.getByProps('dispatch', 'subscribe');
  const DisVoiceStateStore = WebpackModules.getByProps(
    'getVoiceStateForUser',
    'getVoiceStatesForChannel'
  );
  const DisMessageStore = ZLibrary.WebpackModules.getByProps(
    'sendMessage',
    'sendBotMessage'
  );

  const DisUserStore = DiscordModules.UserStore;
  const DisMediaInfo = DiscordModules.MediaInfo;

  const DisSelectedChannelStore = DiscordModules.SelectedChannelStore;
  const DisAudioCtl = WebpackModules.getByProps(
    'toggleLocalMute',
    'setLocalVolume'
  );

  function getModuleAndKey(filter) {
    let module;
    const target = Webpack.getModule(
      (entry, m) => (filter(entry) ? (module = m) : false),
      { searchExports: true }
    );
    return [
      module.exports,
      Object.keys(module.exports).find((k) => module.exports[k] === target),
    ];
  }

  const [HeaderBarContainer, key] = getModuleAndKey(
    (m, _, __) => {
      // Logger.info(i);
      return m.Caret && m.Divider;
    },
    { searchExports: true }
  );

  class PlaybackPanel extends React.Component {
    render() {
      const { songTitle, botUsername } = this.props;

      return React.createElement(
        'div',
        { class: 'playbackContainer' },
        React.createElement('span', { class: 'songTitle' }, songTitle),
        React.createElement('span', { class: 'botUsername' }, botUsername)
      );
    }
  }

  const DisComponents = BdApi.findModuleByProps('AnimatedAvatar');
  const DisOriginalButton = DisComponents.Button;
  // const DisOriginalButtonSizes = ;
  // const DisOriginalButton = ReactComponents.getComponent(
  //   'Mre',
  //   '.button-1EGGcP'
  // );

  const ListIcon = require('ListIcon.jsx.js');

  class DisIconButton extends React.Component {
    render() {
      const { onClick, icon } = this.props;

      return React.createElement(
        DisOriginalButton,
        {
          submittingStartedLabel: 'sa',
          size: DisComponents.ButtonSizes.SMALL,
          look: DisComponents.ButtonLooks.FILLED,
          color: DisComponents.ButtonColors.TRANSPARENT,
          fullWidth: true,
          onClick: onClick,
        },
        icon
      );
    }
  }

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
      this.sendMessageInBotChannel = this.sendMessageInBotChannel.bind(this);

      //misc
      this.keyBindHandler = this.keyBindHandler.bind(this);
      this.createFakeAudioPlayer = this.createFakeAudioPlayer.bind(this);
      this.patchPlaybackUi = this.patchPlaybackUi.bind(this);

      this.playbackUiReact = require('test.js');
      this.playbackUiCss = require('zoxMusicBotHelper.css');
    }

    ///-----Audio actions / Bot interactions-----///
    muteClientSide() {
      const activeBotId = this.getCurrentlyActiveBotId();
      if (activeBotId.length == 0) return;

      DisAudioCtl.toggleLocalMute(activeBotId);
      // Logger.info(DisUserStore.getUser(activeBotId));

      /**@type {string} */
      const botName = DisUserStore.getUser(activeBotId).username;

      if (DisMediaInfo.isLocalMute(activeBotId)) {
        BdApi.showToast(`⏸️ ${botName} PAUSED (Just for you)`);
      } else {
        BdApi.showToast(`▶️ ${botName} RESUMED (Just for you)`);
      }
    }

    /**
     * @param {string} message
     * @returns {boolean}
     */
    sendMessageInBotChannel(message) {
      //get this from the user using dropdown menu
      const botChannelId = '1028616633712922667';

      DisMessageStore.sendMessage(botChannelId, {
        content: message,
        tts: false,
        invalidEmojis: [],
        validNonShortcutEmojis: [],
      });

      return true;
    }

    ///-----Misc-----///
    /**@returns */
    async keyBindHandler(e) {
      if (!e.ctrlKey || !e.altKey) return;
      switch (e.code) {
        case 'KeyK':
          this.muteClientSide();
          break;

        case 'KeyO':
          this.createFakeAudioPlayer();
          break;
        case 'KeyL':
          await this.patchPlaybackUi();
          break;

        default:
          return;
      }
    }

    async patchPlaybackUi() {
      // this.playbackUiReact = React.createElement(
      //   'div',
      //   { class: 'playbackContainer' },
      //   React.createElement(
      //     'span',
      //     { class: 'songTitle' },
      //     'Title of the song thats playing'
      //   ),
      //   React.createElement('span', { class: 'botUsername' }, 'DJ Hobo')
      // );

      // let buttons = await ReactComponents.getComponentByName(
      //   'Account',
      //   '.container-3baos1'
      // );
      // Logger.log(buttons);
      // Logger.log(this.playbackUiReact);

      // window.lamlam = HeaderBarContainer;
      // Logger.log(HeaderBarContainer);

      // document
      //   .getElementsByClassName('panels-3wFtMD')[0]
      //   .append(this.playbackUiReact);

      // Patcher.after(Bar, 'guild-channels', (_, __, { props }) => {
      //   props.children.props.toolbar.unshift(this.playbackUiReact);
      // });

      BdApi.showConfirmationModal(
        'Setup AudioBotHelper',
        React.createElement(DisIconButton, {
          onClick: () => {
            Logger.log('clicked');
          },
          icon: ListIcon({ fill: 'currentColor' }),
        }),

        {
          confirmText: 'Save',
          cancelText: 'Cancel',
          // onConfirm: () => console.log('allalalalalalallal'),
          // onCancel: () => window.alert('two'),
        }
      );

      // BdApi.showConfirmationModal(
      //   'Setup AudioBotHelper',
      //   React.createElement(PlaybackPanel, {
      //     songTitle: caca,
      //     botUsername: cacaa,
      //   }),

      //   {
      //     confirmText: 'Save',
      //     cancelText: 'Cancel',
      //     // onConfirm: () => console.log('allalalalalalallal'),
      //     // onCancel: () => window.alert('two'),
      //   }
      // );
    }

    createFakeAudioPlayer() {
      Logger.info('creating fake audio player');
      // // create an audio context
      // const audioContext = new AudioContext();

      // // set the duration of the audio file
      // const duration = 10;

      // // set the sample rate and number of channels
      // const sampleRate = audioContext.sampleRate;
      // const numChannels = 1;

      // // calculate the total number of samples
      // const numSamples = duration * sampleRate;

      // // create a buffer for the audio data
      // const audioBuffer = audioContext.createBuffer(
      //   numChannels,
      //   numSamples,
      //   sampleRate
      // );

      // // get the audio data for the buffer
      // const audioData = audioBuffer.getChannelData(0);

      // // fill the buffer with random audio data
      // for (let i = 0; i < numSamples; i++) {
      //   audioData[i] = Math.random() * 2 - 1;
      // }

      // // encode the audio data as Base64
      // const encoder = new TextEncoder();
      // const base64Data = btoa(encoder.encode(audioData.toString()));
      // const src = `data:audio/wav;base64,${base64Data}`;

      // // create an audio element with the Base64 data as the source
      // console.log(base64Data);
      // const audio = new Audio(src);
      // audio.controls = true; // enable the audio controls in the browser
      // document.getElementsByClassName('panels-3wFtMD')[0].append(audio);
      // audio.play();
    }

    onStart() {
      Logger.info('Plugin enabled!');
      // Logger.info(this.getName());
      this.createFakeAudioPlayer();
      document.addEventListener('keydown', this.keyBindHandler);

      PluginUtilities.addStyle(this.getName(), this.playbackUiCss);
    }

    onStop() {
      Logger.info('Plugin disabled!');
      document.removeEventListener('keydown', this.keyBindHandler);
      Patcher.unpatchAll();
      PluginUtilities.removeStyle(this.getName());
    }

    ///-----Bot Detection-----///
    /**@returns {boolean} */
    getIsUserABot(userId) {
      const userData = DisUserStore.getUser(userId);
      return userData.bot;
    }

    /**@returns {Array<string>} */
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

    /**@returns {string} */
    getCurrentlyActiveBotId() {
      //this will in the future allow to switch between multiple bots in vc
      //for now it just gives the first form the list
      const selectedBots = this.getMusicBotsInCurrentVoiceChat();
      if (selectedBots.length == 0) return '';
      return selectedBots[0];
    }

    /**@returns {Array<string>} */
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

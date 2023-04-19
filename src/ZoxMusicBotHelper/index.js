'use strict';
/**
 *
 * @param {import("zerespluginlibrary").Plugin} Plugin
 * @param {import("zerespluginlibrary").BoundAPI} Library
 * @returns
 */

module.exports = (Plugin, Library) => {
  const { UI, React, Patcher, Webpack } = new BdApi('ZoxMusicBotHelper');
  const {
    Logger,
    Utilities,
    WebpackModules,
    DiscordModules,
    ReactComponents,
    PluginUtilities,
  } = Library;

  const Dispatcher = BdApi.findModuleByProps('dispatch', 'subscribe');
  const DisVoiceStateStore = BdApi.findModuleByProps(
    'getVoiceStateForUser',
    'getVoiceStatesForChannel'
  );
  const DisMessageStore = BdApi.findModuleByProps(
    'sendMessage',
    'sendBotMessage'
  );

  //guild info
  const DisSelectedGuildStore = BdApi.findModuleByProps(
    'getGuildId',
    'getLastSelectedGuildId'
  );
  const DisGuildChannelStore = BdApi.findModuleByProps(
    'getChannels',
    'hasChannels'
  );
  const DisGuildStore = DiscordModules.GuildStore;

  const DisUserStore = DiscordModules.UserStore;
  const DisMediaInfo = DiscordModules.MediaInfo;

  const DisSelectedChannelStore = DiscordModules.SelectedChannelStore;
  const DisAudioCtl = BdApi.findModuleByProps(
    'toggleLocalMute',
    'setLocalVolume'
  );

  //ui / react
  const DisComponents = BdApi.findModuleByProps('AnimatedAvatar');
  // const { useState } = BdApi.;
  const DisPanelCssClasses = {
    ...BdApi.findModuleByProps('actionButtons'),
    ...BdApi.findModuleByProps('micTestButton'),
  };
  const DisOriginalButton = DisComponents.Button;

  const ListIcon = require('ListIcon.jsx.js');
  const AddIcon = require('AddIcon.jsx.js');
  //used by SetupDialog
  const FormInputDescription = require('FormInputDescription.jsx.js');
  //used by SetupDialog
  const SettingTextInputWrapper = require('SettingTextInputWrapper.jsx.js');
  const SetupDialog = require('SetupDialog.jsx.js');

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

  const objectMap = (obj, fn) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );

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

      // return React.createElement('div', { class: 'playbackContainer' });
      return React.createElement(
        'div',
        { class: `playbackContainer ${DisPanelCssClasses.container}` },
        React.createElement('span', { class: 'songTitle' }, songTitle),
        React.createElement('span', { class: 'botUsername' }, botUsername),
        React.createElement(
          DisComponents.Text,
          {
            // S: 'aaaaaaa',
            // onClick: () => {
            //   Logger.log('clicked');
            // },
            // icon: ListIcon({ fill: 'currentColor' }),
          },
          'aaaaaaa'
        ),

        React.createElement(
          'div',
          {
            class: `secondaryButtonsContainer ${DisPanelCssClasses.actionButtons}`,
          },
          React.createElement(DisIconButton, {
            onClick: () => {
              Logger.log('clicked');
            },
            icon: ListIcon({ fill: 'currentColor', width: '15' }),
          }),
          React.createElement(DisIconButton, {
            onClick: () => {
              Logger.log('clicked');
            },
            icon: AddIcon({ fill: 'currentColor', width: '15' }),
          }),
          React.createElement(DisIconButton, {
            onClick: () => {
              Logger.log('clicked');
            },
            icon: ListIcon({ fill: 'currentColor', width: '15' }),
          }),
          React.createElement(DisIconButton, {
            onClick: () => {
              Logger.log('clicked');
            },
            icon: ListIcon({ fill: 'currentColor', width: '15' }),
          }),
          React.createElement(
            'button',
            {
              'aria-expanded': 'false',
              'aria-label': 'Open Soundboard',
              type: 'button',
              class:
                'button-1EGGcP buttonColor-3bP3fX button-ejjZWC lookFilled-1H2Jvj colorBrand-2M3O3N sizeSmall-3R2P2p fullWidth-3M-YBR grow-2T4nbg button-1EGGcP buttonColor-3bP3fX',
            },
            React.createElement(
              'div',
              { class: 'contents-3NembX' },
              React.createElement(
                'svg',
                {
                  class: 'buttonIcon-2Zsrs2',
                  'aria-hidden': 'true',
                  role: 'img',
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '24',
                  height: '24',
                  viewBox: '0 0 24 24',
                },
                React.createElement(
                  'g',
                  { 'clip-path': 'url(#clip0_414_20322)' },
                  React.createElement('path', {
                    d: 'M2 6.00299V18.003C2 19.107 2.895 20.003 4 20.003H5V4.00299H4C2.895 4.00299 2 4.89799 2 6.00299Z',
                    fill: 'currentColor',
                  }),
                  React.createElement('path', {
                    d: 'M20 4.00299H7V20.003H20C21.104 20.003 22 19.107 22 18.003V6.00299C22 4.89799 21.104 4.00299 20 4.00299ZM19 14.003C19 15.107 18.104 16.003 17 16.003C15.896 16.003 15 15.107 15 14.003C15 12.899 15.896 12.003 17 12.003V9.38999L13 10.724C13 10.724 13 14.984 13 15.003C13 16.107 12.104 17.003 11 17.003C9.896 17.003 9 16.107 9 15.003C9 13.899 9.896 13.003 11 13.003V10.003C11 9.57199 11.275 9.19099 11.684 9.05399L17.684 7.05399C17.989 6.95199 18.323 7.00299 18.585 7.19199C18.846 7.37899 19 7.68199 19 8.00299C19 8.00299 19 13.983 19 14.003Z',
                    fill: 'currentColor',
                  })
                ),
                React.createElement(
                  'defs',
                  null,
                  React.createElement(
                    'clipPath',
                    { id: 'clip0_414_20322' },
                    React.createElement('rect', {
                      width: '24',
                      height: '24',
                      fill: 'white',
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }

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
          grow: true,
        },
        icon
      );
    }
  }

  return class ZoxMusicBotHelper extends Plugin {
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

      //Guild Info Getters / Guild Interactions
      this.getAllTextChannelsInSelectedGuild =
        this.getAllTextChannelsInSelectedGuild.bind(this);
      this.getSelectedGuildName = this.getSelectedGuildName.bind(this);

      ///-----Additional imports-----///
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
      const activeBotId = this.getCurrentlyActiveBotId();
      if (activeBotId.length == 0) return;
      /**@type {string} */
      const botName = DisUserStore.getUser(activeBotId).username;

      const initialData = {
        serverSpecific: {
          selectedTextChannel: '1028616633712922667',
        },
        botSpecific: {
          playFromLinkCommand: 'playFromLinkCommand',
          playFromSearchCommand: 'playFromSearchCommand',
          pauseCommand: 'pauseCommand',
          resumeCommand: 'resumeCommand',
        },
      };

      let mostUpToDateFormData = JSON.parse(JSON.stringify(initialData));

      BdApi.showConfirmationModal(
        `Setup ${this.getName()} for ${this.getSelectedGuildName()}`,
        React.createElement(SetupDialog, {
          textChannelsInGuild: Object.values(
            objectMap(this.getAllTextChannelsInSelectedGuild(), (v, _, __) => {
              return { value: v.id, label: v.name };
            })
          ),
          botUsername: botName,
          serverName: this.getSelectedGuildName(),
          initialData: initialData,
          getUpdate: (e) => {
            mostUpToDateFormData = e;
          },
        }),

        // React.createElement(DisComponents.KeyCombo, {
        //   shortcut: 'CTRL + ALT + k',
        // }),

        // React.createElement(DisComponents.Combobox, {
        //   // shortcut: 'CTRL + ALT + k',
        //   placeholder: 'ssss',
        //   onChange: () => console.log('allalalalalalallal'),
        //   value: '',
        //   children: () => ['aaa', 'bbb', 'ccc'],
        // }),
        {
          confirmText: 'Save',
          cancelText: 'Cancel',
          onConfirm: () => {
            ///save data here
            Logger.info(mostUpToDateFormData);
          },
          onCancel: () => {
            const hasDataChanged =
              JSON.stringify(mostUpToDateFormData) !==
              JSON.stringify(initialData);

            if (!hasDataChanged) return;

            BdApi.showConfirmationModal(
              `Changes will be lost!`,

              React.createElement(
                DisComponents.Text,
                {},
                'Are you sure you want to discard the changes?'
              ),
              {
                confirmText: 'Yes, discard the changes',
                cancelText: 'Save changes',
                onConfirm: () => {},
                onCancel: () => {
                  ///save data here
                },
              }
            );
          },
        }
      );
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

    ///-----Guild Info Getters / Guild Interactions-----///

    /**
     *returns object shaped like this
     {
      1062051345336639630: {id: '1062051345336639630', name: '✋︱welcome-goodbye'}
      1062051345336639631: {id: '1062051345336639631', name: '📔︱rules'}
    }
    @returns {Map<string,Map<string,any>>?}
     */
    getAllTextChannelsInSelectedGuild() {
      /**@type {string?} */
      const selectedGuildId = DisSelectedGuildStore.getLastSelectedGuildId();
      if (!selectedGuildId) return;

      /**@type {Map<string,Map<string,any>>?} */
      const textChannelsInGuild =
        DisGuildChannelStore.getTextChannelNameDisambiguations(selectedGuildId);

      if (!textChannelsInGuild) return;

      return textChannelsInGuild;
    }

    /**@returns {string?} */
    getSelectedGuildName() {
      /**@type {string?} */
      const selectedGuildId = DisSelectedGuildStore.getLastSelectedGuildId();
      if (!selectedGuildId) return;

      /**@type {string?} */
      const selectedGuildName = DisGuildStore.getGuild(selectedGuildId).name;

      if (!selectedGuildName) return;

      return selectedGuildName;
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

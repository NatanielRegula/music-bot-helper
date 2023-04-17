/**
 * @name MusicBotHelper
 * @description MusicBotHelper
 * @version 0.0.3
 * @author NR
 * @source https://github.com/NatanielRegula/bd-voice-announcer
 * @donate paypal.me/NatanielRegula
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/
const config = {
    main: "index.js",
    id: "",
    name: "MusicBotHelper",
    author: "NR",
    authorId: "",
    authorLink: "",
    version: "0.0.3",
    description: "MusicBotHelper",
    website: "",
    source: "https://github.com/NatanielRegula/bd-voice-announcer",
    patreon: "",
    donate: "paypal.me/NatanielRegula",
    invite: "",
    changelog: [
        {
            title: "0.0.4",
            type: "improved",
            items: [
                "Improved toast messages."
            ]
        },
        {
            title: "0.0.3",
            type: "fixed",
            items: [
                "Fixed bugs"
            ]
        },
        {
            title: "0.0.2",
            type: "improved",
            items: [
                "Added toast message when bot muted or unmuted with the keybind"
            ]
        }
    ]
};
class Dummy {
    constructor() {this._config = config;}
    start() {}
    stop() {}
}
 
if (!global.ZeresPluginLibrary) {
    BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.name ?? config.info.name} is missing. Please click Download Now to install it.`, {
        confirmText: "Download Now",
        cancelText: "Cancel",
        onConfirm: () => {
            require("request").get("https://betterdiscord.app/gh-redirect?id=9", async (err, resp, body) => {
                if (err) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                if (resp.statusCode === 302) {
                    require("request").get(resp.headers.location, async (error, response, content) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), content, r));
                    });
                }
                else {
                    await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                }
            });
        }
    });
}
 
module.exports = !global.ZeresPluginLibrary ? Dummy : (([Plugin, Api]) => {
     const plugin = (Plugin, Library) => {
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

  //ui
  const DisComponents = BdApi.findModuleByProps('AnimatedAvatar');
  const DisPanelCssClasses = BdApi.findModuleByProps('actionButtons');
  const DisOriginalButton = DisComponents.Button;

  const ListIcon = (() => {return function ListIcon(props) {
  return React.createElement(
    'svg',
    {
      ...{
        viewBox: '0 0 24 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      ...props,
    },
    React.createElement('path', {
      d: 'M1.33334 5.99999C0.95556 5.99999 0.638671 5.87199 0.382671 5.61599C0.126671 5.35999 -0.000884275 5.04355 4.61361e-06 4.66666V1.99999C4.61361e-06 1.62222 0.128005 1.30533 0.384005 1.04933C0.640004 0.793328 0.956449 0.665772 1.33334 0.666661H4C4.37778 0.666661 4.69467 0.794661 4.95067 1.05066C5.20667 1.30666 5.33422 1.62311 5.33334 1.99999V4.66666C5.33334 5.04444 5.20534 5.36133 4.94934 5.61733C4.69334 5.87333 4.37689 6.00088 4 5.99999H1.33334ZM8 5.99999C7.62222 5.99999 7.30533 5.87199 7.04933 5.61599C6.79333 5.35999 6.66578 5.04355 6.66667 4.66666V1.99999C6.66667 1.62222 6.79467 1.30533 7.05067 1.04933C7.30667 0.793328 7.62311 0.665772 8 0.666661H22.6667C23.0444 0.666661 23.3613 0.794661 23.6173 1.05066C23.8733 1.30666 24.0009 1.62311 24 1.99999V4.66666C24 5.04444 23.872 5.36133 23.616 5.61733C23.36 5.87333 23.0436 6.00088 22.6667 5.99999H8ZM8 12.6667C7.62222 12.6667 7.30533 12.5387 7.04933 12.2827C6.79333 12.0267 6.66578 11.7102 6.66667 11.3333V8.66666C6.66667 8.28888 6.79467 7.97199 7.05067 7.71599C7.30667 7.45999 7.62311 7.33244 8 7.33332H22.6667C23.0444 7.33332 23.3613 7.46132 23.6173 7.71732C23.8733 7.97332 24.0009 8.28977 24 8.66666V11.3333C24 11.7111 23.872 12.028 23.616 12.284C23.36 12.54 23.0436 12.6675 22.6667 12.6667H8ZM1.33334 12.6667C0.95556 12.6667 0.638671 12.5387 0.382671 12.2827C0.126671 12.0267 -0.000884275 11.7102 4.61361e-06 11.3333V8.66666C4.61361e-06 8.28888 0.128005 7.97199 0.384005 7.71599C0.640004 7.45999 0.956449 7.33244 1.33334 7.33332H4C4.37778 7.33332 4.69467 7.46132 4.95067 7.71732C5.20667 7.97332 5.33422 8.28977 5.33334 8.66666V11.3333C5.33334 11.7111 5.20534 12.028 4.94934 12.284C4.69334 12.54 4.37689 12.6675 4 12.6667H1.33334ZM8 19.3333C7.62222 19.3333 7.30533 19.2053 7.04933 18.9493C6.79333 18.6933 6.66578 18.3769 6.66667 18V15.3333C6.66667 14.9555 6.79467 14.6387 7.05067 14.3827C7.30667 14.1267 7.62311 13.9991 8 14H22.6667C23.0444 14 23.3613 14.128 23.6173 14.384C23.8733 14.64 24.0009 14.9564 24 15.3333V18C24 18.3778 23.872 18.6947 23.616 18.9507C23.36 19.2067 23.0436 19.3342 22.6667 19.3333H8ZM1.33334 19.3333C0.95556 19.3333 0.638671 19.2053 0.382671 18.9493C0.126671 18.6933 -0.000884275 18.3769 4.61361e-06 18V15.3333C4.61361e-06 14.9555 0.128005 14.6387 0.384005 14.3827C0.640004 14.1267 0.956449 13.9991 1.33334 14H4C4.37778 14 4.69467 14.128 4.95067 14.384C5.20667 14.64 5.33422 14.9564 5.33334 15.3333V18C5.33334 18.3778 5.20534 18.6947 4.94934 18.9507C4.69334 19.2067 4.37689 19.3342 4 19.3333H1.33334Z',
      fill: 'white',
    })
  );
}
})();
  const AddIcon = (() => {return function AddIcon(props) {
  return React.createElement(
    'svg',
    {
      ...{
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      ...props,
    },

    React.createElement('path', {
      d: 'M10.2857 24V13.7143H0V10.2857H10.2857V0H13.7143V10.2857H24V13.7143H13.7143V24H10.2857Z',
    })
  );
}
})();

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

      // return React.createElement('div', { class: 'playbackContainer' });
      return React.createElement(
        'div',
        { class: 'playbackContainer' },
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
          })
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

      this.playbackUiReact = (() => {return // const { UI, React } = window.BdApi;

// export default MyComponent = () => <div className="foo">Hello world!</div>;
})();
      this.playbackUiCss = `.playbackContainer {
  background-color: var(--background-secondary-alt, #232428);
  color: var(--header-primary, #f2f3f5);
  width: 100%;
  display: grid;
  grid-template-areas: 'songTitle songTitle primaryButtons' 'botUsername botUsername primaryButtons' 'secondaryButtons secondaryButtons secondaryButtons';
}
.playbackContainer .songTitle {
  grid-area: songTitle;
}
.playbackContainer .botUsername {
  grid-area: botUsername;
}
.playbackContainer .secondaryButtonsContainer {
  grid-area: secondaryButtons;
  /* display: flex; */
  /* gap: 2rem; */
}

/* .playbackContainer .secondaryButtonsContainer {
  grid-area: secondaryButtons;
  display: grid;
  padding: 4px;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
} */
`;
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

      // BdApi.showConfirmationModal(
      //   'Setup AudioBotHelper',

      //   {
      //     confirmText: 'Save',
      //     cancelText: 'Cancel',
      //     // onConfirm: () => console.log('allalalalalalallal'),
      //     // onCancel: () => window.alert('two'),
      //   }
      // );

      BdApi.showConfirmationModal(
        'Setup AudioBotHelper',
        React.createElement(PlaybackPanel, {
          songTitle: 'caca',
          botUsername: 'cacaa',
        }),

        {
          confirmText: 'Save',
          cancelText: 'Cancel',
          // onConfirm: () => console.log('allalalalalalallal'),
          // onCancel: () => window.alert('two'),
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
     return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/
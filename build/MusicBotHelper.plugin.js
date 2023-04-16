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

  const DisActionButtonsCssClass =
    BdApi.findModuleByProps('actionButtons').actionButtons;

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
          'div',
          { class: `secondaryButtonsContainer ${DisActionButtonsCssClass}` },
          React.createElement(DisIconButton, {
            onClick: () => {
              Logger.log('clicked');
            },
            icon: ListIcon({ fill: 'currentColor' }),
          }),
          React.createElement(DisIconButton, {
            onClick: () => {
              Logger.log('clicked');
            },
            icon: ListIcon({ fill: 'currentColor' }),
          }),
          React.createElement(DisIconButton, {
            onClick: () => {
              Logger.log('clicked');
            },
            icon: ListIcon({ fill: 'currentColor' }),
          }),
          React.createElement(DisIconButton, {
            onClick: () => {
              Logger.log('clicked');
            },
            icon: ListIcon({ fill: 'currentColor' }),
          })
        )
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

  const ListIcon = (() => {return function ListIcon(props) {
  return React.createElement(
    'svg',
    {
      ...{
        width: 13,
        height: 10,
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      ...props,
    },
    React.createElement('path', {
      d: 'M.714 2.857a.692.692 0 01-.509-.206A.688.688 0 010 2.143V.714C0 .512.069.342.206.205A.688.688 0 01.714 0h1.429c.202 0 .372.069.51.206a.688.688 0 01.204.508v1.429a.692.692 0 01-.206.51.688.688 0 01-.508.204H.714zm3.572 0a.692.692 0 01-.51-.206.688.688 0 01-.205-.508V.714c0-.202.069-.372.206-.509A.688.688 0 014.286 0h7.857c.202 0 .372.069.51.206a.688.688 0 01.204.508v1.429a.691.691 0 01-.206.51.688.688 0 01-.508.204H4.286zm0 3.572a.692.692 0 01-.51-.206.688.688 0 01-.205-.509V4.286c0-.203.069-.372.206-.51a.688.688 0 01.509-.205h7.857c.202 0 .372.069.51.206a.688.688 0 01.204.509v1.428a.691.691 0 01-.206.51.688.688 0 01-.508.205H4.286zm-3.572 0a.692.692 0 01-.509-.206A.688.688 0 010 5.714V4.286c0-.203.069-.372.206-.51a.688.688 0 01.508-.205h1.429c.202 0 .372.069.51.206a.688.688 0 01.204.509v1.428a.692.692 0 01-.206.51.688.688 0 01-.508.205H.714zM4.286 10a.692.692 0 01-.51-.206.688.688 0 01-.205-.508V7.857c0-.202.069-.372.206-.51a.688.688 0 01.509-.204h7.857c.202 0 .372.068.51.206a.688.688 0 01.204.508v1.429a.691.691 0 01-.206.509.688.688 0 01-.508.205H4.286zM.714 10a.692.692 0 01-.509-.206A.688.688 0 010 9.286V7.857c0-.202.069-.372.206-.51a.688.688 0 01.508-.204h1.429c.202 0 .372.068.51.206a.688.688 0 01.204.508v1.429a.692.692 0 01-.206.509.688.688 0 01-.508.205H.714z',
    })
  );
}
})();

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
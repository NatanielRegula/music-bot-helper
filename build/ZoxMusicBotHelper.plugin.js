/**
 * @name ZoxMusicBotHelper
 * @description zoxMusicBotHelper allows you to control a music bot that's in your vc.
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
    name: "ZoxMusicBotHelper",
    author: "NR",
    authorId: "",
    authorLink: "",
    version: "0.0.3",
    description: "zoxMusicBotHelper allows you to control a music bot that's in your vc.",
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
  //used by SetupDialog
  const FormInputDescription = (() => {return function FormInputDescription(props) {
  return React.createElement(
    DisComponents.FormText,
    {
      type: DisComponents.FormTextTypes.DESCRIPTION,
      //   class: `settingsDescriptionText`,
    },
    props.value
  );
}
})();
  //used by SetupDialog
  const SettingTextInputWrapper = (() => {return function SettingTextInputWrapper(props) {
  return React.createElement(
    'div',
    {
      class: `settingGroup`,
    },
    React.createElement(
      DisComponents.FormLabel,
      {
        disabled: false,
      },
      props.label
    ),
    React.createElement(DisComponents.TextInput, {
      placeholder: props.placeholder,
      clearable: true,
      value: props.value,
      onChange: props.onChange,
    }),
    FormInputDescription({
      value: props.description,
    })
  );
}
})();
  const SetupDialog = (() => {return function SetupDialog(props) {
  const [selectedTextChannel, setSelectedTextChannel] = React.useState(
    props.initialData.serverSpecific.selectedTextChannel
  );
  const [playFromLinkCommand, setPlayFromLinkCommand] = React.useState(
    props.initialData.botSpecific.playFromLinkCommand
  );
  const [playFromSearchCommand, setPlayFromSearchCommand] = React.useState(
    props.initialData.botSpecific.playFromSearchCommand
  );
  const [pauseCommand, setPauseCommand] = React.useState(
    props.initialData.botSpecific.pauseCommand
  );
  const [resumeCommand, setResumeCommand] = React.useState(
    props.initialData.botSpecific.resumeCommand
  );

  React.useEffect(() => {
    props.getUpdate({
      serverSpecific: {
        selectedTextChannel: selectedTextChannel,
      },
      botSpecific: {
        playFromLinkCommand: playFromLinkCommand,
        playFromSearchCommand: playFromSearchCommand,
        pauseCommand: pauseCommand,
        resumeCommand: resumeCommand,
      },
    });
  }, [
    selectedTextChannel,
    playFromLinkCommand,
    playFromSearchCommand,
    pauseCommand,
    resumeCommand,
  ]);

  return React.createElement(
    'div',
    {
      class: `setupDialogContainer`,
    },

    React.createElement(
      DisComponents.FormSection,
      {
        title: `Server specific (${props.serverName})`,
      },
      React.createElement(
        'div',
        { class: 'column' },

        React.createElement(
          'div',
          { class: 'settingGroup' },
          React.createElement(
            DisComponents.FormLabel,
            {
              disabled: false,
            },
            'Select bot text channel'
          ),
          React.createElement(DisComponents.SearchableSelect, {
            value: selectedTextChannel,
            options: props.textChannelsInGuild,

            clearable: true,
            placeholder: 'eg. bot-commands',
            onChange: (/**@type {string?} */ newSelectedOptionValue) => {
              setSelectedTextChannel(newSelectedOptionValue);
            },
          }),
          FormInputDescription({
            value:
              'Select the text channel used by the members of your community to send commands to the bot',
          })
        )
      )
    ),

    React.createElement(
      DisComponents.FormSection,
      {
        title: `Bot specific (${props.botUsername})`,
      },
      React.createElement(
        'div',
        { class: 'column' },
        SettingTextInputWrapper({
          label: 'Command used to play music form a link',
          placeholder: 'eg. -p [url]',
          description:
            'Enter the command followed by [url] where [url] will be replaced by a link to the song',
          value: playFromLinkCommand,
          onChange: (/**@type {string?} */ newValue) =>
            setPlayFromLinkCommand(newValue),
        }),
        SettingTextInputWrapper({
          label: 'Command used to play music form a search',
          placeholder: 'eg. -p [search]',
          description:
            'Enter the command followed by [search] where [search] will be replaced by the search phrase',
          value: playFromSearchCommand,
          onChange: (/**@type {string?} */ newValue) =>
            setPlayFromSearchCommand(newValue),
        }),
        SettingTextInputWrapper({
          label: 'Command used to pause the music',
          placeholder: 'eg. -pause',
          description: 'Enter the command used to pause the music',
          value: pauseCommand,
          onChange: (/**@type {string?} */ newValue) =>
            setPauseCommand(newValue),
        }),
        SettingTextInputWrapper({
          label: 'Command used to resume the music after it was paused',
          placeholder: 'eg. -play',
          description: 'Enter the command used to resume the music',
          value: resumeCommand,
          onChange: (/**@type {string?} */ newValue) =>
            setResumeCommand(newValue),
        })
      )
    )
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

.setupDialogContainer {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}
.setupDialogContainer .column {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

.settingsDescriptionText {
  text-transform: initial;
  font-size: 14px;
  font-weight: 400;
}

.settingGroup *:not(:first-child) {
  padding-bottom: 0.3rem;
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
          onConfirm: () => Logger.info(mostUpToDateFormData),
          onCancel: () => {
            const hasDataChanged =
              JSON.stringify(mostUpToDateFormData) !==
              JSON.stringify(initialData);

            Logger.info(hasDataChanged);
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
     return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/
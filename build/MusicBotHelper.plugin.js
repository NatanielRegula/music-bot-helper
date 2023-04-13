/**
 * @name MusicBotHelper
 * @description MusicBotHelper
 * @version 0.0.1
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
    version: "0.0.1",
    description: "MusicBotHelper",
    website: "",
    source: "https://github.com/NatanielRegula/bd-voice-announcer",
    patreon: "",
    donate: "paypal.me/NatanielRegula",
    invite: "",
    changelog: [
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
  const { Logger, Utilities, WebpackModules, DiscordModules } = Library;

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
        BdApi.showToast(`⏸️ ${botName} paused locally`);
      } else {
        BdApi.showToast(`▶️ ${botName} resumed locally`);
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
      Logger.info();
      this.createFakeAudioPlayer();
      document.addEventListener('keydown', this.keyBindHandler);
    }

    onStop() {
      Logger.info('Plugin disabled!');
      document.removeEventListener('keydown', this.keyBindHandler);
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
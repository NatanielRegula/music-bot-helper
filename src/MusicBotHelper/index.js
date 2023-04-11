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

  return class MusicBotHelper extends Plugin {
    constructor() {
      super();
    }

    onStart() {
      Logger.info('Plugin enabled!');
    }

    onStop() {
      Logger.info('Plugin disabled!');
    }
  };
};

import BdApi from './bdApi';

const linuxKeycodeMappings = BdApi.Webpack.getModule(
  (m: any) => m.ctrl === 0x25,
  {
    searchExports: true,
  }
);

const windowsKeycodeMappings = BdApi.Webpack.getModule(
  (m: any) => m.ctrl === 0xa2,
  {
    searchExports: true,
  }
);

const macKeycodeMappings = BdApi.Webpack.getModule(
  (m: any) => m.ctrl === 0xe0,
  {
    searchExports: true,
  }
);

function getKeycodeMappings() {
  return window.DiscordNative.process.platform === 'linux'
    ? linuxKeycodeMappings
    : window.DiscordNative.process.platform === 'win32'
    ? windowsKeycodeMappings
    : macKeycodeMappings;
}

export default getKeycodeMappings;

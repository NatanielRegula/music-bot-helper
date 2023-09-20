import BdApi from '../../utils/bdApi';

//audio info
export const DisAudioCtl = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('toggleLocalMute', 'setLocalVolume')
);

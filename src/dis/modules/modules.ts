import BdApi from '../../utils/bdApi';

//audio info
export const DisMediaEngineController = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('toggleLocalMute', 'setLocalVolume')
);

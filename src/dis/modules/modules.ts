import BdApi from '../../utils/bdApi';

//audio info
export const DisAudioCtl = BdApi.findModuleByProps(
  'toggleLocalMute',
  'setLocalVolume'
);

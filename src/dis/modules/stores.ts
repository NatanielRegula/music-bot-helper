import BdApi from '../../utils/bdApi';

export const DisVoiceStateStore = BdApi.findModuleByProps(
  'getVoiceStateForUser',
  'getVoiceStatesForChannel'
);

export const DisSelectedChannelStore = BdApi.findModuleByProps(
  'getLastSelectedChannelId'
);

//guild info
export const DisUserStore = BdApi.findModuleByProps(
  'getCurrentUser',
  'getUser'
);

export const DisMediaInfo = BdApi.findModuleByProps('getOutputVolume');

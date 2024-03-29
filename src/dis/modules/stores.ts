import BdApi from '../../utils/bdApi';

export const DisVoiceStateStore = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps(
    'getVoiceStateForUser',
    'getVoiceStatesForChannel'
  )
);

export const DisSelectedChannelStore = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('getLastSelectedChannelId')
);

type UserInfo = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  avatarDecoration?: unknown;
  email?: string;
  verified: boolean;
  bot: boolean;
  system: boolean;
  mfaEnabled: boolean;
  mobile: boolean;
  desktop: boolean;
  flags: number;
  publicFlags: number;
  purchasedFlags: number;
  premiumUsageFlags: number;
  phone?: string;
  guildMemberAvatars?: unknown;
  hasBouncedEmail: boolean;
  personalConnectionId?: unknown;
  globalName?: unknown;
};

type UserStore = {
  addChangeListener: Function;
  addConditionalChangeListener: Function;
  addReactChangeListener: Function;
  emitChange: unknown;
  filter: Function;
  findByTag: Function;
  forEach: Function;
  getCurrentUser: () => UserInfo;
  getDispatchToken: () => string;
  getName: () => string;
  getUser: (userId: string) => UserInfo;
  getUserStoreVersion: () => number;

  /**Return a list of users with the user id (number) as the key*/
  getUsers: () => Map<number, UserInfo>;

  hasOwnProperty: () => boolean;
  initialize: Function;
  initializeIfNeeded: Function;
  isPrototypeOf: () => boolean;
  mustEmitChanges: Function;
  propertyIsEnumerable: () => boolean;
  registerActionHandlers: Function;
  removeChangeListener: Function;
  removeReactChangeListener: Function;
  syncWith: Function;
  toLocaleString: () => string;
  toString: () => string;
  valueOf: Function;
  waitFor: Function;
};

//guild info
export const DisUserStore: UserStore = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('getCurrentUser', 'getUser')
);

/**Types are not exhaustive, only used properties are included */
type MediaEngineStore = {
  isLocalMute: (userId: string) => boolean;
  getLocalVolume: (userId: string) => number;
};

export const DisMediaEngineStore: MediaEngineStore = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('getOutputVolume')
);

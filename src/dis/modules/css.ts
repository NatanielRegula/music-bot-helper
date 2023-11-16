import BdApi from '../../utils/bdApi';

type DisCssClassesColor = {
  colorBrand: string;
  colorError: string;
  colorHeaderPrimary: string;
  colorHeaderSecondary: string;
  colorInteractiveActive: string;
  colorInteractiveNormal: string;
  colorLink: string;
  colorMuted: string;
  colorStandard: string;
  colorStatusGreen: string;
  colorStatusRed: string;
  colorStatusYellow: string;
  colorWhite: string;
  selectable: string;
  strong: string;
};

export const DisCssClassesColor: DisCssClassesColor = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('colorStandard', 'colorBrand')
);

type DisCssClassesSize = {
  size10: string;
  size12: string;
  size14: string;
  size16: string;
  size20: string;
  size24: string;
  size32: string;
};

export const DisCssClassesSize: DisCssClassesSize = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('size10', 'size12')
);

type DisCssTextStyle = {
  code: string;
  'display-lg': string;
  'display-md': string;
  'display-sm': string;
  eyebrow: string;
  grey: string;
  'heading-deprecated-12/bold': string;
  'heading-deprecated-12/extrabold': string;
  'heading-deprecated-12/medium': string;
  'heading-deprecated-12/normal': string;
  'heading-deprecated-12/semibold': string;
  'heading-lg/bold': string;
  'heading-lg/extrabold': string;
  'heading-lg/medium': string;
  'heading-lg/normal': string;
  'heading-lg/semibold': string;
  'heading-md/bold': string;
  'heading-md/extrabold': string;
  'heading-md/medium': string;
  'heading-md/normal': string;
  'heading-md/semibold': string;
  'heading-sm/bold': string;
  'heading-sm/extrabold': string;
  'heading-sm/medium': string;
  'heading-sm/normal': string;
  'heading-sm/semibold': string;
  'heading-xl/bold': string;
  'heading-xl/extrabold': string;
  'heading-xl/medium': string;
  'heading-xl/normal': string;
  'heading-xl/semibold': string;
  'heading-xxl/bold': string;
  'heading-xxl/extrabold': string;
  'heading-xxl/medium': string;
  'heading-xxl/normal': string;
  'heading-xxl/semibold': string;
  live: string;
  liveLarge: string;
  liveShapeRound: string;
  liveShapeRoundLeft: string;
  liveShapeRoundRight: string;
  liveSmall: string;
  'redesign/channel-title/bold': string;
  'redesign/channel-title/medium': string;
  'redesign/channel-title/normal': string;
  'redesign/channel-title/semibold': string;
  'redesign/heading-18/bold': string;
  'redesign/message-preview/bold': string;
  'redesign/message-preview/medium': string;
  'redesign/message-preview/normal': string;
  'redesign/message-preview/semibold': string;
  'text-lg/bold': string;
  'text-lg/medium': string;
  'text-lg/normal': string;
  'text-lg/semibold': string;
  'text-md/bold': string;
  'text-md/medium': string;
  'text-md/normal': string;
  'text-md/semibold': string;
  'text-sm/bold': string;
  'text-sm/medium': string;
  'text-sm/normal': string;
  'text-sm/semibold': string;
  'text-xs/bold': string;
  'text-xs/medium': string;
  'text-xs/normal': string;
  'text-xs/semibold': string;
  'text-xxs/bold': string;
  'text-xxs/medium': string;
  'text-xxs/normal': string;
  'text-xxs/semibold': string;
};

export const DisCssTextStyle: DisCssTextStyle = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps(
    'heading-md/semibold',
    'heading-sm/semibold',
    'heading-xxl/extrabold'
  )
);

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

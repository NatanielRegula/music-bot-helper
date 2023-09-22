import BdApi from '../../../utils/bdApi';

/** looks like this [0, 69, '0:0'] */
export type KeyCode = Array<number | string>;

interface Props {
  note?: string;

  onChange: (newValue: boolean) => void;

  /** false by default */
  disabled?: boolean;

  /**
   * Hides the border below this setting
   *
   * false by default */
  hideBorder?: boolean;

  /**
   * Tooltip shown on hover over the switch/toggle
   */
  tooltipNote?: string;

  value: boolean;

  className?: string;
  style?: React.CSSProperties;

  /** label of the setting */
  children: React.JSX.Element | string;
}

export const DisSettingToggle: (props: Props) => React.JSX.Element =
  BdApi.Webpack.getModule(
    (m: any) => {
      const asString = m?.toString?.();
      return (
        asString?.includes('note') &&
        asString?.includes('onChange') &&
        asString?.includes('value') &&
        !asString?.includes('hideDeviceSelector')
      );
    },
    { searchExports: true }
  );

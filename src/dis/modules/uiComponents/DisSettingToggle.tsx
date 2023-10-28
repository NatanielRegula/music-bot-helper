import BdApi from '../../../utils/bdApi';

interface Props {
  value: boolean;

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

  onChange: (newValue: boolean) => void;

  className?: string;

  style?: React.CSSProperties;

  note?: string;

  /** label of the setting */
  children: React.JSX.Element | string;
}

export const DisSettingToggle: (props: Props) => React.JSX.Element =
  BdApi.Webpack.getModule(
    (m: any) => {
      const asString = m?.toString?.();
      return (
        asString?.includes('value') &&
        asString?.includes('disabled') &&
        asString?.includes('hideBorder') &&
        asString?.includes('tooltipNote') &&
        asString?.includes('onChange') &&
        asString?.includes('className') &&
        asString?.includes('style') &&
        asString?.includes('note') &&
        !asString?.includes('hideDeviceSelector') &&
        !asString?.includes('audioSubsystem')
      );
    },
    { searchExports: true }
  );

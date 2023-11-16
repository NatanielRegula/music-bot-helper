import BdApi from '../../../utils/bdApi';

interface Props {
  /** false by default */
  disabled?: boolean;

  /**
   * visually changes the tag to one of the above while still using h2 for all h* tags for accessibility
   *
   * default is 'h5'
   */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'label' | 'legend';

  /**
   * Adds an asterisk that indicates that the associated field is required
   *
   * false by default */
  required?: boolean;

  /** false by default */
  faded?: boolean;

  /** false by default */
  error?: boolean;

  errorId?: unknown;

  className?: string;

  style?: React.CSSProperties;

  /** label of the setting */
  children: React.JSX.Element | string;
}

export const DisHeading: (props: Props) => React.JSX.Element =
  BdApi.Webpack.getModule(
    (m: any) => {
      const asString = m?.toString?.();
      return (
        asString?.includes('legend') &&
        asString?.includes('errorId') &&
        asString?.includes('h5') &&
        asString?.includes('label')
      );
    },
    { searchExports: true }
  );

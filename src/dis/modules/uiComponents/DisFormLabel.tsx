import { DisUiComponents } from '.';

interface Props {
  /** false by default */
  disabled?: boolean;

  /**
   * Adds an asterisk that indicates that the associated field is required
   *
   * false by default */
  required?: boolean;

  className?: string;

  style?: React.CSSProperties;

  /** label of the setting */
  children: React.JSX.Element | string;
}

export const DisFormLabel: (props: Props) => React.JSX.Element =
  DisUiComponents.FormLabel;

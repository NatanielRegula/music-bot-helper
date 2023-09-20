import BdApi from '../../../utils/bdApi';

/** looks like this [0, 69, '0:0'] */
export type KeyCode = Array<number | string>;

interface Props {
  defaultValue: Array<KeyCode>;

  onChange: (newValue: Array<KeyCode>) => void;

  /** false by default */
  disabled?: boolean;
}

/**
 * This module is not being cached because it is not available before the user opens the settings page.
 *  This is not ideal for performance, but also means that this is only usable inside of settings.
 */
export const DisKeybindRecorder = (props: Props) => {
  const Component: (props: Props) => React.JSX.Element =
    BdApi.Webpack.getModule(
      (m: any) => {
        const asString: string | undefined = m?.toString?.();
        return (
          asString?.includes('RECORDING') &&
          asString?.includes('recordStart') &&
          asString?.includes('handleComboKeys')
        );
      },
      { searchExports: true }
    );
  /// @ts-ignore
  return new Component(props);
};

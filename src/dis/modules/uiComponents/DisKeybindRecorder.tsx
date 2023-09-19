import BdApi from '../../../utils/bdApi';

/** looks like this [0, 69, '0:0'] */
export type KeyCode = Array<number | string>;

interface Props {
  defaultValue: Array<KeyCode>;

  onChange: (newValue: Array<KeyCode>) => void;

  /** false by default */
  disabled?: boolean;
}

export const DisKeybindRecorder: React.FC<Props> = BdApi.Webpack.getModule(
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

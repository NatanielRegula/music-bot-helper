import BdApi from '../../../utils/bdApi';

interface Props {
  defaultValue: any[];
  onChange: (newValue: any[]) => void;
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

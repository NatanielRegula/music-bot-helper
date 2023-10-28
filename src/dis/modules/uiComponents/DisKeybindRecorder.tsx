import BdApi, { React } from '../../../utils/bdApi';

/** looks like this [0, 69, '0:0'] */
export type KeyCode = Array<number | string>;

interface Props {
  defaultValue: Array<KeyCode>;

  onChange: (newValue: Array<KeyCode>) => void;

  /** false by default */
  disabled?: boolean;
}

/**
 * This module is not available before the user opens the settings page.
 *  This is not ideal for performance, but also means that this is only usable inside of settings.
 */
export let DisKeybindRecorder: (props: Props) => React.JSX.Element = () => {
  return (
    <div>Module not loaded, you have to navigate here through settings ;/</div>
  );
};

(async function () {
  const module = await BdApi.Webpack.waitForModule(
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

  DisKeybindRecorder = module;
})();

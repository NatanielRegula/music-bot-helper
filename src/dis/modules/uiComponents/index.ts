import BdApi from '../../../utils/bdApi';

// get ModalActions() {
// return {
//         openModal: _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => typeof(m) === "function" && m?.toString().includes("onCloseCallback") && m?.toString().includes("Layer"), {searchExports: true}),
//         closeModal: _webpackmodules__WEBPACK_IMPORTED_MODULE_1__["default"].getModule(m => typeof(m) === "function" && m?.toString().includes("onCloseCallback()"), {searchExports: true})
//     // };
// // },

type openModalType = (
  child: (props: {
    onClose?: Function;
    transitionState?: number | null;
  }) => React.JSX.Element
) => void;
// type openModalType = (
// child: (props: {
//   onClose?: () => void;
//   transitionState?: number | null;
// }) => React.JSX.Element
// ) => void;

export const openModal: any = BdApi.Webpack.getModule(
  (m: any) =>
    typeof m === 'function' &&
    m?.toString().includes('onCloseCallback') &&
    m?.toString().includes('Layer'),
  { searchExports: true }
);

export const closeModal = BdApi.Webpack.getModule(
  (m: any) =>
    typeof m === 'function' && m?.toString().includes('onCloseCallback()'),
  { searchExports: true }
);

export const ConfirmationModal = BdApi.Webpack.getModule(
  (m: any) => m?.toString?.()?.includes('.confirmButtonColor'),
  { searchExports: true }
);

export const Modal = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('handleCancel', 'handleSubmit')
);

export const DisDivider = BdApi.findModuleByProps('Divider').Divider;

// export const Switch = BdApi.Webpack.getModule

const DisUiComponents = BdApi.Webpack.getMangled(
  /ConfirmModal:\(\)=>.{1,3}.ConfirmModal/,
  {
    Switch: (x: unknown) =>
      x.toString?.().includes('REDESIGN_INPUT_CONTROL_SELECTED'),
    Dialog: (x: unknown) =>
      x.toString?.().includes('role:"dialog",tabIndex:-1'),
  },
  { all: true }
);

export const { Switch, Dialog } = DisUiComponents;

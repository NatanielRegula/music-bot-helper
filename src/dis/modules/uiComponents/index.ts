import BdApi from '../../../utils/bdApi';

export const DisUiComponents = BdApi.Webpack.getModule(
  BdApi.Webpack.Filters.byProps('AnimatedAvatar')
);

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

export const { Switch, Dialog, ConfirmModal, Modals } = DisUiComponents;

//   const ModalsApi = BdApi.findModuleByProps("useModalsStore", "closeModal");

// function closeLastModal() {
//   const lastModal = ModalsApi.useModalsStore.getState().default[0];

//   if (!lastModal) return;

//   ModalsApi.closeModal(lastModal.key);
// }

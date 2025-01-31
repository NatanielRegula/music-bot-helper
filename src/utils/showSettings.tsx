import { React } from './bdApi';
import { openModal } from '../dis/modules/uiComponents';

function showModal() {
  //   openModal(({onClose:() => {}}) => {
  //   openModal(({ onClose }) => {
  //   const {
  //     danger = false,
  //     confirmText = 'Okay',
  //     cancelText = 'Cancel',
  //     onConfirm = () => {},
  //     onCancel = () => {},
  //   } = options;

  openModal(TestChild);
  // openModal((props: any) => {
  //   // return React.createElement(ConfirmationModal, {
  //   //   danger: false,
  //   //   confirmText: 'Okay',
  //   //   confirmButtonColor: 'red',
  //   //   cancelText: 'Cancel',
  //   //   onConfirm: () => {},
  //   //   onCancel: () => {},
  //   // });
  //   return <TestChild />;
  // });
  //   openModal(
  //       React.createElement(ConfirmationModal, {
  //   danger: false,
  //   confirmText: 'Okay',
  //   cancelText: 'Cancel',
  //   onConfirm: () => {},
  //   onCancel: () => {},
  //       })
  //     );
  //   openModal(({ onClose:() => {}, transitionState:1 }) => {
  //   Logger.log(onClose);

  //     return (
  //       <div
  //         style={{
  //           padding: '1rem',
  //           background: 'var(--primary-700)',
  //           borderRadius: '5px',
  //           margin: '0 0 1rem 0',
  //           display: 'flex',
  //           flexDirection: 'column',
  //           gap: '1rem',
  //           height: '200px',
  //           width: '200px',
  //         }}
  //       >
  //         <h1>sss</h1>
  //       </div>
  //     );
  //   });
}

export default function showSettings() {
  showModal();
  //   openModal();
  //   BdApi.alert('Setting', );
  //   React.createElement(Modal);
  //   return (
  //     <Modal>
  //       <h1>ss</h1>
  //     </Modal>
  //   );
}

function TestChild(props: {
  onClose?: () => void;
  transitionState?: number | null;
}) {
  //   props.onClose.apply(() => {
  //     Logger.log('im closed');
  //   });
  //   Logger.log(props.close.call(1));

  return (
    <div
      style={{
        padding: '1rem',
        background: 'var(--primary-700)',
        borderRadius: '5px',
        margin: '0 0 1rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        // height: '200px',
        // width: '200px',
      }}
    >
      <h1>sss</h1>
      {/* <Modals /> */}
      {/* <ConfirmationModal
        danger={true}
        confirmText="Okay"
        cancelText="Cancel"
        header="Cancel"
        onConfirm={() => {}}
        onCancel={() => {}}
      >
        <h1>sss</h1>
      </ConfirmationModal> */}
    </div>
  );
}

import AddModal from "./Add";
import RemoveModal from "./Remove";
import RenameModal from "./Rename";

const getModalWithProps = (modalData, hideModal) => {
  const mapping = {
    'adding': <AddModal hideModal={hideModal}/>,
    'removing': <RemoveModal hideModal={hideModal} channel={modalData.channel}/>,
    'renaming' : <RenameModal hideModal={hideModal} channel={modalData.channel}/>
  };

  return mapping[modalData.type]
}

const getModal = (modalData, hideModal) => getModalWithProps(modalData, hideModal);

const Modal = ({ modalData, hideModal }) => {
  return ( modalData.type !== null &&
    <div role="dialog" aria-modal className="fade modal show" tabIndex={-1} style={{ display: 'block' }}>
        {getModal(modalData, hideModal)}
    </div>
  )
}

export default Modal;



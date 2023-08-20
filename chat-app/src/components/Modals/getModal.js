import AddModal from "./Add";

const getModalWithProps = (type, hideModal) => {
  const mapping = {
    'adding': <AddModal hideModal={hideModal}/>,
  };

  return mapping[type]
}

const getModal = (type, hideModal) =>getModalWithProps(type, hideModal);

const Modal = ({ modalData, hideModal }) => {
  
  return ( modalData.type !== null &&
    <div role="dialog" aria-modal className="fade modal show" tabIndex={-1} style={{ display: 'block' }}>
        {getModal(modalData.type, hideModal)}
    </div>
  )
}

export default Modal;



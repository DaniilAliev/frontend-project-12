import AddModal from './Add/Add';
import RemoveModal from './Remove/Remove';
import RenameModal from './Rename/Rename';

const getModal = (modalData, hideModal) => {
  const mapping = {
    adding: <AddModal hideModal={hideModal} />,
    removing: <RemoveModal hideModal={hideModal} channel={modalData.channel} />,
    renaming: <RenameModal hideModal={hideModal} channel={modalData.channel} />,
  };

  return mapping[modalData.type];
};

const Modal = ({ modalData, hideModal }) => (modalData.type !== null
    && (
    <div role="dialog" aria-modal className="fade modal show" tabIndex={-1} style={{ display: 'block' }}>
      {getModal(modalData, hideModal)}
    </div>
    )
);

export default Modal;

import { useSelector } from 'react-redux';
import AddModal from './Add';
import RemoveModal from './Remove';
import RenameModal from './Rename';
// import { modalActions } from '../../slices';
// import { selectors } from '../../slices/modalSlice';

const getModal = (modalData) => {
  console.log(modalData);
  const mapping = {
    adding: <AddModal />,
    removing: <RemoveModal channel={modalData.channel} />,
    renaming: <RenameModal channel={modalData.channel} />,
  };

  return mapping[modalData.type];
};

const Modal = () => {
  const modalState = useSelector((state) => state.modal);

  return modalState.type !== null
    && (
    <div role="dialog" aria-modal className="fade modal show" tabIndex={-1} style={{ display: 'block' }}>
      {getModal(modalState)}
    </div>
    );
};

export default Modal;

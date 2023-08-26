import React from "react";
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useChat } from "../../context";
import { useTranslation } from "react-i18next";

const RemoveModal = ({ hideModal, channel }) => {
  const { t } = useTranslation();

  const { removeChannel } = useChat()

  return(
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.remove.p')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={hideModal}>{t('modals.remove.cancelBtn')}</Button>
          <Button variant="danger" onClick={() => {removeChannel(channel.id); hideModal(); toast.success(`${t('toastify.remove')}`)}}>{t('modals.remove.removeBtn')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
};

export default RemoveModal;
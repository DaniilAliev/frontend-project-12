import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useChat } from "../../context";

const RemoveModal = ({ hideModal, channel }) => {
  const { removeChannel } = useChat()

  return(
      <Modal show onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">Уверены?</p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={hideModal}>Отменить</Button>
            <Button variant="danger" onClick={() => {removeChannel(channel.id); hideModal()}}>Удалить</Button>
          </div>
        </Modal.Body>
      </Modal>
  )
}

export default RemoveModal;
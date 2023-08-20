import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { useChat } from "../../context";
import { selectors } from "../../slices/channelsSlice";
import { useSelector } from "react-redux";

const AddModal = ({ hideModal }) => {
  const channels = useSelector(selectors.selectAll);

  const { addChannel, setCurrentId } = useChat();

  return(
    <div className="modal-content">
      <Modal show onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{name: ''}}
            onSubmit={(values) => {
              addChannel(values);
              setCurrentId(channels.length + 2);
              hideModal();
            }}
          >
            {() => (
              <Form>
                <div>
                  <Field name="name" id="name" className="mb-2 form-control" />
                  <label className="visually-hidden" for="name">Имя канала</label>
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={hideModal}>Отменить</Button>
                    <Button type="submit">Отправить</Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  )
};

export default AddModal;
import React, { useRef, useEffect } from "react";
import * as Yup from 'yup';
import cn from 'classnames'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { useChat } from "../../context";
import { selectors } from "../../slices/channelsSlice";
import { useSelector } from "react-redux";

const AddModal = ({ hideModal }) => {
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  const channels = useSelector(selectors.selectAll);

  const channelsNames = channels.map(channel => channel.name);

  const { addChannel, setCurrentId } = useChat();

  const addChannelSchema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле').notOneOf(channelsNames, 'Должно быть уникальным'),
  })

  const classNames = (errors, touched) => cn('mb-2', 'form-control', {
    'is-invalid': errors.name && touched.name,
  })
  

  return(
    <div className="modal-content">
      <Modal show onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{name: ''}}
            validationSchema={addChannelSchema}
            validateOnMount={false}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await addChannel(values);
                setCurrentId(channels.length + 1);
                hideModal();
                setSubmitting(true)
              }
              catch (e) {
              }
              setSubmitting(false)
            }}
          >
            {({errors, touched, isSubmitting}) => (
              <Form>
                <div>
                  <Field innerRef={inputEl} name="name" id="name" className={classNames(errors, touched)} />
                  <label className="visually-hidden" htmlFor="name">Имя канала</label>
                  {errors.name && touched.name ? (
                    <div className="invalid-feedback">{errors.name}</div>
                ) : null}
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={hideModal}>Отменить</Button>
                    <Button type="submit" disabled={isSubmitting}>Отправить</Button>
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
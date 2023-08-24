import React, {useEffect, useRef} from "react";
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames'
import { useChat } from "../../context";
import { selectors } from "../../slices/channelsSlice";
import { useSelector } from "react-redux";

const RenameModal = ({ hideModal, channel }) => {
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select()
  }, [])

  const { renameChannel } = useChat();

  const channels = useSelector(selectors.selectAll);

  const channelsNames = channels.map(channel => channel.name);

  const addChannelSchema = Yup.object().shape({
    name: Yup.string().notOneOf(channelsNames, 'Должно быть уникальным').required('Обязательное поле'),
  })

  const classNames = (errors, touched) => cn('mb-2', 'form-control', {
    'is-invalid': errors.name && touched.name,
  })

  return(
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{name: channel.name}}
          validationSchema={addChannelSchema}
          validateOnMount={false}
          onSubmit={ async (values, {setSubmitting}) => {
            try {
              await renameChannel(channel.id, values.name);
              hideModal();
              setSubmitting(true);
            } catch {
              setSubmitting(false);
            }
          }}
        >
          {({errors, touched, isSubmitting, values}) => (
            <Form>
              <div>
                <Field value={values.name} innerRef={inputEl} name="name" id='name' className={classNames(errors, touched)} />
                <label className="visually-hidden" htmlFor="name">Имя канала</label>
                {errors.name && touched.name ? (
                    <div className="invalid-feedback">{errors.name}</div>
                ) : null}
              </div>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={hideModal}>Отменить</Button>
                <Button type="submit" disabled={isSubmitting}>Отправить</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  ) 
}

export default RenameModal;
import React, { useRef, useEffect } from "react";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import cn from 'classnames'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { useChat } from "../../context";
import { selectors } from "../../slices/channelsSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AddModal = ({ hideModal }) => {
  const { t } = useTranslation();

  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  const channels = useSelector(selectors.selectAll);

  const channelsNames = channels.map(channel => channel.name);

  const { addChannel, setCurrentId } = useChat();

  const addChannelSchema = Yup.object().shape({
    name: Yup.string().trim().min(3, `${t('errors.usernameSymbols')}`).max(20, `${t('errors.usernameSymbols')}`).notOneOf(channelsNames, `${t('errors.unique')}`).required(`${t('errors.reqired')}`),
  })

  const classNames = (errors, touched) => cn('mb-2', 'form-control', {
    'is-invalid': errors.name && touched.name,
  })
  
  return(
    <div className="modal-content">
      <Modal show onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.add.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{name: ''}}
            validationSchema={addChannelSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await addChannel(values);
                const channelsIds = channels.map(channel => channel.id);
                const lastAddedId = channelsIds[channelsIds.length];
                setCurrentId(lastAddedId);
                hideModal();
                setSubmitting(true);
                toast.success(`${t('toastify.add')}`);
              }
              catch (e) {
                setSubmitting(false);
              }
            }}
          >
            {({errors, touched, isSubmitting}) => (
              <Form>
                <div>
                  <Field innerRef={inputEl} name="name" id="name" className={classNames(errors, touched)} />
                  <label className="visually-hidden" htmlFor="name">{t('modals.add.label')}</label>
                  {errors.name && touched.name ? (
                    <div className="invalid-feedback">{errors.name}</div>
                ) : null}
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={hideModal}>{t('modals.add.cancelBtn')}</Button>
                    <Button type="submit" disabled={isSubmitting}>{t('modals.add.submitBtn')}</Button>
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
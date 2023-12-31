import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import cn from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useChatContext } from '../../context';
import { selectors } from '../../slices/channelSelectors';
import { modalActions } from '../../slices';

const AddModal = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const channels = useSelector(selectors.selectAll);

  const channelsNames = channels.map((channel) => channel.name);

  const { addChannel, setCurrentId } = useChatContext();

  const addChannelSchema = Yup.object().shape({
    name: Yup.string().trim().min(3, `${t('errors.usernameSymbols')}`).max(20, `${t('errors.usernameSymbols')}`)
      .notOneOf(channelsNames, `${t('errors.unique')}`)
      .required(`${t('errors.reqired')}`),
  });

  const classNames = (errors, touched) => cn('mb-2', 'form-control', {
    'is-invalid': errors.name && touched.name,
  });

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  const addSubmit = async (values, setSubmitting) => {
    try {
      const response = await addChannel(values);
      const lastAddedId = response.data.id;
      closeModal();
      setSubmitting(true);
      toast.success(`${t('toastify.add')}`);
      setCurrentId(lastAddedId);
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      toast.error(`${t('errors.networkError')}`);
    }
  };

  return (
    <div className="modal-content">
      <Modal show onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.add.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={addChannelSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values, { setSubmitting }) => {
              await addSubmit(values, setSubmitting);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div>
                  <Field innerRef={inputEl} name="name" id="name" className={classNames(errors, touched)} />
                  <label className="visually-hidden" htmlFor="name">{t('modals.add.label')}</label>
                  {errors.name && touched.name ? (
                    <div className="invalid-feedback">{errors.name}</div>
                  ) : null}
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={closeModal}>{t('modals.add.cancelBtn')}</Button>
                    <Button type="submit" disabled={isSubmitting}>{t('modals.add.submitBtn')}</Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddModal;

import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useChatContext } from '../../context';
import { selectors } from '../../slices/channelSelectors';
import { modalActions } from '../../slices';

const RenameModal = ({ channel }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);

  const { renameChannel } = useChatContext();

  const channels = useSelector(selectors.selectAll);

  const channelsNames = channels.map((channelName) => channelName.name);

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

  const renameSubmit = async (values, setSubmitting) => {
    try {
      await renameChannel(channel.id, values.name);
      closeModal();
      setSubmitting(true);
      toast.success(`${t('toastify.rename')}`);
    } catch (e) {
      setSubmitting(false);
      toast.error(`${t('errors.networkError')}`);
    }
  };

  return (
    <Modal show onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: channel.name }}
          validationSchema={addChannelSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, { setSubmitting }) => {
            await renameSubmit(values, setSubmitting);
          }}
        >
          {({
            errors, touched, isSubmitting, values,
          }) => (
            <Form>
              <div>
                <Field
                  value={values.name}
                  innerRef={inputEl}
                  name="name"
                  id="name"
                  className={classNames(errors, touched)}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t('modals.rename.label')}
                </label>
                {errors.name && touched.name ? (
                  <div className="invalid-feedback">{errors.name}</div>
                ) : null}
              </div>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={closeModal}>
                  {t('modals.rename.cancelBtn')}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {t('modals.rename.submitBtn')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;

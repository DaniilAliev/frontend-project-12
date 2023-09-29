import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { useChatContext } from '../../context';
import { selectCurrentChannelId } from '../../slices/channelSelectors';
import store from '../../slices/store';
import { channelActions, modalActions } from '../../slices';

const RemoveModal = ({ channel }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { removeChannel } = useChatContext();

  const currentId = useSelector(selectCurrentChannelId);

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  const removeSubmit = async (setSubmitting) => {
    try {
      await removeChannel(channel.id);
      if (currentId === channel.id) {
        store.dispatch(channelActions.setDefaultId());
      }
      toast.success(`${t('toastify.remove')}`);
      closeModal();
      setSubmitting(true);
    } catch (e) {
      console.log(e);
      toast.error(`${t('errors.networkError')}`);
      setSubmitting(false);
    }
  };

  return (
    <Modal show onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            await removeSubmit(setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <p className="lead">{t('modals.remove.p')}</p>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={closeModal}>{t('modals.remove.cancelBtn')}</Button>
                <Button type="submit" variant="danger" disabled={isSubmitting}>{t('modals.remove.removeBtn')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;

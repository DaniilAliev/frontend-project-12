import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { useChatContext } from '../../context';
import { selectors } from '../../slices/channelSelectors';
import store from '../../slices/store';
import { channelActions } from '../../slices';

const RemoveModal = ({ hideModal, channel }) => {
  const { t } = useTranslation();

  const { removeChannel } = useChatContext();

  const currentId = useSelector(selectors.selectCurrentChannelId);

  const removeSubmit = async (setSubmitting) => {
    try {
      await removeChannel(channel.id);
      if (currentId === channel.id) {
        store.dispatch(channelActions.setDefaultId());
      }
      toast.success(`${t('toastify.remove')}`);
      hideModal();
      setSubmitting(true);
    } catch (e) {
      console.log(e);
      toast.error(`${t('errors.networkError')}`);
      setSubmitting(false);
    }
  };

  return (
    <Modal show onHide={hideModal} centered>
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
                <Button variant="secondary" className="me-2" onClick={hideModal}>{t('modals.remove.cancelBtn')}</Button>
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

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { useChatContext } from '../../../context';
import removeSubmit from './submit';
import { selectCurrentChannelId } from '../../../slices/channelsSlice';

const RemoveModal = ({ hideModal, channel }) => {
  const { t } = useTranslation();

  const { removeChannel } = useChatContext();

  const currentId = useSelector(selectCurrentChannelId);

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            await removeSubmit(removeChannel, currentId, channel, setSubmitting, t, hideModal);
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

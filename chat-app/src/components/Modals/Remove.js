import React from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { useChat } from '../../context';

const RemoveModal = ({ hideModal, channel }) => {
  const { t } = useTranslation();

  const { removeChannel } = useChat();

  // const [isSubmitting, setSubmitting] = useState(false);

  // const handleRemove = async () => {
  //   try {
  //     await removeChannel(channel.id);
  //     hideModal();
  //     toast.success(`${t('toastify.remove')}`);
  //     setSubmitting(true);
  //   } catch {
  //     toast.error(`${t('errors.networkError')}`);
  //     setSubmitting(false);
  //   }
  // };

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await removeChannel(channel.id);
              toast.success(`${t('toastify.remove')}`);
              hideModal();
              setSubmitting(true);
            } catch (e) {
              console.log(e);
              toast.error(`${t('errors.networkError')}`);
              setSubmitting(false);
            }
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

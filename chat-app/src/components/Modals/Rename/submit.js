import { toast } from 'react-toastify';

const renameSubmit = async (values, channel, renameChannel, setSubmitting, hideModal, t) => {
  try {
    await renameChannel(channel.id, values.name);
    hideModal();
    setSubmitting(true);
    toast.success(`${t('toastify.rename')}`);
  } catch (e) {
    setSubmitting(false);
    toast.error(`${t('errors.networkError')}`);
  }
};

export default renameSubmit;

import { toast } from 'react-toastify';

const addSubmit = async (values, addChannel, hideModal, setCurrentId, setSubmitting, t) => {
  try {
    const response = await addChannel(values);
    const lastAddedId = response.data.id;
    hideModal();
    setSubmitting(true);
    toast.success(`${t('toastify.add')}`);
    setCurrentId(lastAddedId);
  } catch (e) {
    console.log(e);
    setSubmitting(false);
    toast.error(`${t('errors.networkError')}`);
  }
};

export default addSubmit;

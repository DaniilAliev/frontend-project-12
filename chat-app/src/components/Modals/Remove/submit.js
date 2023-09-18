import { toast } from 'react-toastify';
import store from '../../../slices/store';
import { channelActions } from '../../../slices';

const removeSubmit = async (removeChannel, currentId, channel, setSubmitting, t, hideModal) => {
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

export default removeSubmit;

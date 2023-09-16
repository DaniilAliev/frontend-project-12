import axios from 'axios';
import { toast } from 'react-toastify';
import API_ROUTES from '../../routes/apiRoutes';

const submitLogIn = async (values, logIn, navigate, setSubmitting, setInvalidState, t) => {
  try {
    const response = await axios.post(
      API_ROUTES.LOGIN,
      { username: values.username, password: values.password },
    );
    if (response.data.token) {
      logIn(response.data);
      navigate('/');
    }
  } catch (error) {
    setSubmitting(false);
    if (error.response?.status === 401) {
      error.authentification = true;
      setInvalidState(true);
    }
    if (error.response?.status === 500) {
      console.log('500');
      toast.error(`${t('errors.networkError')}`);
    }
  }
};

export default submitLogIn;

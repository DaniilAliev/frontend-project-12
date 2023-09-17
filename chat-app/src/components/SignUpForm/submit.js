import axios from 'axios';
import { toast } from 'react-toastify';
import API_ROUTES from '../../routes/apiRoutes';

const submitSignUp = async (values, navigate, logIn, t, setUserExistance) => {
  try {
    const response = await axios.post(
      API_ROUTES.SIGNUP,
      { username: values.username, password: values.password },
    );
    logIn(response.data);
    navigate(API_ROUTES.MAINPAGE);
    setUserExistance(false);
  } catch (error) {
    if (error.response?.status === 409) {
      error.authentification = true;
      setUserExistance(true);
    } else if (error.response?.status === 500) {
      console.log('500');
      toast.error(`${t('errors.networkError')}`);
    } else {
      setUserExistance(false);
    }
  }
};

export default submitSignUp;

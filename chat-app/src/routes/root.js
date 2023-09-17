import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context';
import MainPage from '../components/MainPage';

const Root = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      {user && <MainPage />}
      <Outlet />
    </>
  );
};

export default Root;

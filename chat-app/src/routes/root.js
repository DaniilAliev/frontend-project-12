import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../context';
import MainPage from '../components/MainPage';

const Root = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, setUser]);

  return (
    <>
      {user && <MainPage />}
      <Outlet />
    </>
  );
};

export default Root;

// import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context';
import MainPage from '../components/MainPage';
import API_ROUTES from './apiRoutes';

const Root = () => {
  const { user } = useAuthContext();

  return (
    <>
      {user ? <MainPage /> : <Navigate to={API_ROUTES.LOGINROOT} />}
      <Outlet />
    </>
  );
};

export default Root;

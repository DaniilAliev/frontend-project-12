import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context';
// import MainPage from '../components/MainPage';
import API_ROUTES from './apiRoutes';

const Root = () => {

};

const PrivateOutlet = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to={API_ROUTES.LOGINROOT} />;
};

export default Root;
export { PrivateOutlet };

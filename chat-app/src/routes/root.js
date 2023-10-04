import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context';
import APP_ROUTES from './appRoutes';

const Root = () => (
  <Outlet />
);

const PrivateOutlet = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to={APP_ROUTES.LOGIN_ROOT} />;
};

export default Root;
export { PrivateOutlet };

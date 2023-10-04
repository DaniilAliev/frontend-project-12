import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Root, { PrivateOutlet } from './routes/root';
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import Login from './components/Login';
import APP_ROUTES from './routes/appRoutes';

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: APP_ROUTES.LOGIN_ROOT,
        element: <Login type="login" />,
      },
      {
        path: APP_ROUTES.SIGNUP_PAGE,
        element: <Login type="signup" />,
      },
      {
        path: '',
        element: <PrivateOutlet />,
        children: [
          {
            path: '',
            element: <MainPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <NavBar />
      <RouterProvider router={router} />
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </div>
);

export default App;

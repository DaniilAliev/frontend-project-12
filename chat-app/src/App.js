import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SpinnerLoading from './components/SpinnerLoading';

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login/',
        element: <Login type="login" />,
      },
      {
        path: 'signup/',
        element: <Login type="signup" />,
      },
    ],
  },
]);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <SpinnerLoading />
    : (
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
};

export default App;

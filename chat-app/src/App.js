import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import { AuthContext } from './context';
import { useState, useEffect } from 'react';
import parserUser from './context/parser';

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login/",
        element: <Login type={'login'} />,
      },
      {
        path: "signup/",
        element: <Login type={'signup'} />,
      },
    ],
  },
]);

function App() {
  const user = parserUser();
  const [isAuth, setAuth] = useState();

  useEffect(() => {
    if (user) {
      setAuth(true);
    }
  }, [user]);
  
  return (
    <AuthContext.Provider value={{isAuth}}>
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <NavBar />
          <RouterProvider router={router} />
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

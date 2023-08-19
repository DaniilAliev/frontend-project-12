import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import AuthProvider from './context/AuthProvider';
import ChatProvider from './context/ChatProvider';

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
  return (
    <AuthProvider>
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <ChatProvider>
            <NavBar />
            <RouterProvider router={router} />
          </ChatProvider>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;

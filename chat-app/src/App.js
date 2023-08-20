import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';
import Login from './components/Login';

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
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
            <NavBar />
            <RouterProvider router={router} />
        </div>
      </div>
  );
}

export default App;

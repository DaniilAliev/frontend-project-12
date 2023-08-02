import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

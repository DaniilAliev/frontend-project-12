import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import MainPage from "../components/MainPage";

export default function Root() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

 useEffect(() => {
  if (!user) {
    navigate('/login');
  }
 }, [user, navigate, setUser])
  
  return (
    <>
      {user && <MainPage />}
      <Outlet />
    </>
    );
  }
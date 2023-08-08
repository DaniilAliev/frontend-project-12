import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from "../slices/channelsSlice";
import { selectors } from '../slices/channelsSlice';
import { fetchChannels } from "../slices/channelsSlice";

export default function Root() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll)
  console.log(channels)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login');
    } else if (token) {
      dispatch(fetchChannels(token));
    }
    
  }, [navigate, dispatch]);

  return (    
    <Outlet />
    );
  }
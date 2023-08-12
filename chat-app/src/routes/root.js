import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from "../slices/channelsSlice";
import { selectors } from '../slices/channelsSlice';
import { fetchChannels } from "../slices/channelsSlice";
import parserUser from "../context/parser";

export default function Root() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll)
  const user = parserUser()
  console.log(user)
  const {isAuth} = useAuth()
  
  console.log(isAuth)
  // console.log(channels)

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    } else if (isAuth) {
      dispatch(fetchChannels(user.token));
    }
  });

  return (    
    <Outlet />
    );
  }
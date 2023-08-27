import React, { useEffect } from "react";
import { toast } from 'react-toastify';
import Channels from "./ChatComponents/Channels";
import MessagesWindow from "./ChatComponents/MessagesWindow";
import axios from "axios";
import { useAuth, useChat } from "../context";
import { useTranslation } from "react-i18next";


const MainPage = () => {
  const { t } = useTranslation()

  const { user } = useAuth();
  const { addChannels, addMessages } = useChat()

  useEffect(() => {
    const fetchData = async () => {
      try {const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const { data } = response;

      addChannels(data.channels);
      addMessages(data.messages);
      } catch (error) {
        if (error.response?.status === 500) {
          console.log('500')
          toast.error(`${t('errors.networkError')}`);
        }
      }
    };
    
    fetchData();
  }, [addChannels, addMessages, user, t])

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <MessagesWindow />
        </div>
    </div>
  )
}

export default MainPage;
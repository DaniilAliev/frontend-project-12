import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Channels from './ChatComponents/Channels';
import MessagesWindow from './ChatComponents/MessagesWindow';
import { useAuth, useChat } from '../context';
import SpinnerLoading from './SpinnerLoading';

const MainPage = () => {
  const { t } = useTranslation();

  const { user } = useAuth();
  const { addChannels, addMessages } = useChat();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const { data } = response;

        addChannels(data.channels);
        addMessages(data.messages);
        setLoading(false);
      } catch (error) { /* empty */ }
    };

    fetchData();
  }, [addChannels, addMessages, user, t]);

  const mainBlock = (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <MessagesWindow />
      </div>
    </div>
  );

  return (
    isLoading ? <SpinnerLoading /> : mainBlock
  );
};

export default MainPage;

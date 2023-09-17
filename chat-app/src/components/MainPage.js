import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Channels from './ChatComponents/Channels';
import MessagesWindow from './ChatComponents/MessagesWindow';
import { useAuthContext, useChatContext } from '../context';
import SpinnerLoading from './SpinnerLoading';
// import API_ROUTES from '../routes/apiRoutes';

const MainPage = () => {
  const { t } = useTranslation();

  const { user, auth } = useAuthContext();
  const { addChannels, addMessages } = useChatContext();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await auth();

        const { data } = response;

        addChannels(data.channels);
        addMessages(data.messages);
        setLoading(false);
      } catch (error) { /* empty */ }
    };

    fetchData();
  }, [addChannels, addMessages, user, t, auth]);

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

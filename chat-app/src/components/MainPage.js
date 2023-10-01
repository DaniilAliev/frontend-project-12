import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Channels from './ChatComponents/Channels';
import MessagesWindow from './ChatComponents/MessagesWindow';
import { useAuthContext, useChatContext } from '../context';
import SpinnerLoading from './SpinnerLoading';

const MainPage = () => {
  const { t } = useTranslation();

  const { user, auth, logOut } = useAuthContext();
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
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logOut();
        }
      }
    };

    fetchData();
  }, [addChannels, addMessages, user, t, auth, logOut]);

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

import React, { useEffect } from "react";
import axios from "axios";
import Channels from "./ChatComponents/Channels";
import MessagesWindow from "./ChatComponents/MessagesWindow";
import { useAuth, useChat } from "../context";

const MainPage = () => {
  const { user } = useAuth();
  const { addChannels, addMessages, setCurrentId } = useChat();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const { data } = response;
      console.log(data);

      addChannels(data.channels);
      addMessages(data.messages);
      setCurrentId(data.currentChannelId);
    };
    
    fetchData();
  }, [addChannels, addMessages, setCurrentId, user])

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
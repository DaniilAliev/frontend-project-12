import React, { useEffect } from "react";
import Channels from "./ChatComponents/Channels";
import MessagesWindow from "./ChatComponents/MessagesWindow";
import axios from "axios";
import { useAuth, useChat } from "../context";


const MainPage = () => {
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
      } catch (e) {
        console.log('error fetch')
      }
    };
    
    fetchData();
  }, [addChannels, addMessages, user])

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
import React from 'react';
import { ChatContext, useAuth } from './index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as currentIdActions } from '../slices/currentIdSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChatProvider = ({ socket, children }) => {
  console.log(socket)

  const dispatch = useDispatch();

  const currentId = useSelector((state) => state.currentChannelId.id);

  const { user } = useAuth()

  const addChannels = (channels) => dispatch(channelsActions.addChannels(channels));
  
  const addChannel = async (channel) => {
    await socket.timeout(5000).emit('newChannel', channel);
  };

  const addMessages = (messages) => dispatch(messagesActions.addMessages(messages));
  const addMessage = async (message) => {
    const messageData = {
      channelId: currentId,
      text: message,
      user: user.username,
    };

    await socket.timeout(5000).emit('newMessage', messageData);
  };

  const setCurrentId = (id) => dispatch(currentIdActions.setCurrentId(id));

  return (
    <ChatContext.Provider value={{ addChannels, addChannel, addMessages, addMessage, setCurrentId }}>
      {children}
    </ChatContext.Provider>
  )
  
}

export default ChatProvider;
import React, { useRef } from 'react';
import { ChatContext } from './index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as currentIdActions } from '../slices/currentIdSlice';
import { useDispatch } from 'react-redux';

const ChatProvider = ({ children }) => {
  const dispatch = useDispatch();

  const addChannels = (channels) => dispatch(channelsActions.addChannels(channels));
  const addChannel = (channel) => dispatch(channelsActions.addChannel(channel));

  const addMessages = (messages) => dispatch(messagesActions.addMessages(messages));
  const addMessage = (message) => dispatch(messagesActions.addMessage(message));

  const setCurrentId = (id) => dispatch(currentIdActions.setCurrentId(id));

  return (
    <ChatContext.Provider value={{ addChannels, addChannel, addMessages, addMessage, setCurrentId }}>
      {children}
    </ChatContext.Provider>
  )
  
}

export default ChatProvider;
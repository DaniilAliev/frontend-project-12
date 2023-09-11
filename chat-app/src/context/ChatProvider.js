import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatContext, useAuth } from './index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as currentIdActions } from '../slices/currentIdSlice';

const ChatProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const currentId = useSelector((state) => state.currentChannelId.id);

  const { user } = useAuth();

  const addChannels = useCallback((channels) => dispatch(channelsActions
    .addChannels(channels)), [dispatch]);

  const addChannel = useCallback((channel) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('newChannel', channel, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  }), [socket]);

  const removeChannel = useCallback((id) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('removeChannel', { id }, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  }), [socket]);

  const renameChannel = useCallback((id, name) => new Promise((resolve, reject) => {
    socket.timeout(5000).emit('renameChannel', { id, name }, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  }), [socket]);

  const addMessages = useCallback((messages) => dispatch(messagesActions
    .addMessages(messages)), [dispatch]);

  const addMessage = useCallback((message) => new Promise((resolve, reject) => {
    const messageData = {
      channelId: currentId,
      text: message,
      user: user.username,
    };

    socket.timeout(5000).emit('newMessage', messageData, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  }), [socket, currentId]);

  const setCurrentId = useCallback((id) => dispatch(currentIdActions
    .setCurrentId(id)), [dispatch]);

  const props = useMemo(
    () => ({
      addChannels,
      addChannel,
      removeChannel,
      renameChannel,
      addMessages,
      addMessage,
      setCurrentId,
    }),
    [addChannels, addChannel, removeChannel, renameChannel, addMessages, addMessage, setCurrentId],
  );

  return (
    <ChatContext.Provider value={props}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

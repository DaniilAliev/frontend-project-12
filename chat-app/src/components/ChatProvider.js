/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatContext, useAuthContext } from '../context/index';
import { channelActions, messageActions } from '../slices';
import { selectCurrentChannelId } from '../slices/channelSelectors';

const ChatProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const currentId = useSelector(selectCurrentChannelId);

  const { user } = useAuthContext();

  const timeOutTime = 5000;

  const addChannels = useCallback((channels) => dispatch(channelActions
    .addChannels(channels)), [dispatch]);

  const addChannel = (channel) => new Promise((resolve, reject) => {
    socket.timeout(timeOutTime).emit('newChannel', channel, (error, payload) => {
      if (error) {
        reject(error);
      }
      resolve(payload);
    });
  });

  const removeChannel = (id) => new Promise((resolve, reject) => {
    socket.timeout(timeOutTime).emit('removeChannel', { id }, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

  const renameChannel = (id, name) => new Promise((resolve, reject) => {
    socket.timeout(timeOutTime).emit('renameChannel', { id, name }, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

  const addMessages = useCallback((messages) => dispatch(messageActions
    .addMessages(messages)), [dispatch]);

  const addMessage = (message) => new Promise((resolve, reject) => {
    const messageData = {
      channelId: currentId,
      text: message,
      user: user.username,
    };

    socket.timeout(timeOutTime).emit('newMessage', messageData, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

  const setCurrentId = (id) => dispatch(channelActions.setCurrentId(id));

  const props = {
    addChannels,
    addChannel,
    removeChannel,
    renameChannel,
    addMessages,
    addMessage,
    setCurrentId,
  };

  return (
    <ChatContext.Provider value={props}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

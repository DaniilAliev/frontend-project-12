import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import AuthProvider from './components/AuthProvider';
import ChatProvider from './components/ChatProvider';
import App from './App';
import store from './slices/store';
import { channelActions, messageActions } from './slices';
import initI18Next from './components/locales/i18n';

const initialization = async () => {
  const i18nextInstance = await initI18Next();

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messageActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelActions.removeChannel(payload.id));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelActions.updateChannel({
      id: payload.id,
      changes: { name: payload.name },
    }));
  });

  return (
    <AuthProvider>
      <I18nextProvider i18n={i18nextInstance}>
        <ChatProvider socket={socket}>
          <App />
        </ChatProvider>
      </I18nextProvider>
    </AuthProvider>
  );
};

export default initialization;

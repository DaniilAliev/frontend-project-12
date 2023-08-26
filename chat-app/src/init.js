import React from "react";
import AuthProvider from './context/AuthProvider';
import ChatProvider from './context/ChatProvider';
import { I18nextProvider } from "react-i18next";
import App from "./App";
import store from "./slices/store";
import { io } from 'socket.io-client';
import { actions as channelActions } from './slices/channelsSlice';
import { actions as messageActions } from './slices/messagesSlice';
import { actions as currentIdActions } from './slices/currentIdSlice';
import initI18Next from "./components/locales/i18n";

const initialization = async () => {
    const i18nextInstance = await initI18Next();

    const socket = io();

    socket.on('newMessage', (payload) => {
        store.dispatch(messageActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
        console.log(payload)
        store.dispatch(channelActions.addChannel(payload));
        store.dispatch(currentIdActions.setCurrentId(payload.id))
    })

    socket.on('removeChannel', (payload) => {
        store.dispatch(channelActions.removeChannel(payload.id));
        store.dispatch(currentIdActions.setCurrentId(1));
      });

    socket.on('renameChannel', (payload) => {
        store.dispatch(channelActions.updateChannel({ id: payload.id, changes: { name: payload.name }}))
    });

    return(
        <AuthProvider>
            <I18nextProvider i18n={i18nextInstance}>
                <ChatProvider socket={socket}>
                    <App />
                </ChatProvider>
            </I18nextProvider>
        </AuthProvider>
    )
};

export default initialization;
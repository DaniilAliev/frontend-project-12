import React from "react";
import AuthProvider from './context/AuthProvider';
import ChatProvider from './context/ChatProvider';
import App from "./App";
import store from "./slices/store";
import { io } from 'socket.io-client';
import { actions as channelActions } from './slices/channelsSlice';
import { actions as messageActions } from './slices/messagesSlice';
import { actions as currentIdActions } from './slices/currentIdSlice';

const initialization = () => {
    const socket = io();

    socket.on('newMessage', (payload) => {
        store.dispatch(messageActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
        store.dispatch(channelActions.addChannel(payload));
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
            <ChatProvider socket={socket}>
                <App />
            </ChatProvider>
        </AuthProvider>
    )
};

export default initialization;
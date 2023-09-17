import { createContext, useContext } from 'react';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const ChatContext = createContext({});
export const useChatContext = () => useContext(ChatContext);

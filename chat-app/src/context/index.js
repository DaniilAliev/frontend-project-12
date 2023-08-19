import { createContext, useContext } from "react";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const ChatContext = createContext({});
export const useChat = () => useContext(ChatContext);
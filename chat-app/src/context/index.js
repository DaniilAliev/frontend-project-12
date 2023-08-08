import { createContext, useContext } from "react";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const logIn = (data) => localStorage.setItem('token', data)
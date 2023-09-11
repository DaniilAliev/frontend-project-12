import React, { useMemo, useState } from 'react';
import { AuthContext } from './index';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser || null);

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const props = useMemo(() => ({
    user, logIn, logOut, setUser,
  }), [user]);

  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

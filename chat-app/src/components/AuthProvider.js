import React, { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/index';
import API_ROUTES from '../routes/apiRoutes';

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

  const auth = useCallback(async () => {
    const response = await axios.get(API_ROUTES.DATA, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return response;
  }, [user]);

  const props = useMemo(() => ({
    user, logIn, logOut, setUser, auth,
  }), [user, auth]);

  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

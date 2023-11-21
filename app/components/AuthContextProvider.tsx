import { createContext } from 'react';
import * as React from 'react';

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
});

export const AuthContextProvider = (props) => {
  const contextValue = {
    user: props.user,
    isLoggedIn: props.isLoggedIn,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

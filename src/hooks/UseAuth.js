import React, { useContext, createContext, useState } from "react";
import { setAuthToken } from "../YataClient";

const authContext = createContext();

/**
 * useAuth is a hook to provide the current auth state and render depending on any changes
 * This approach is taken from https://usehooks.com/useAuth/
 */
export const useAuth = () => {
  return useContext(authContext);
};

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signout = (userData) => {
    setUser(null);
    setAuthToken(null);
  };

  const signin = (userData, token) => {
    //TODO: save the userData and token to browser storage and refresh token as needed
    setUser(userData);
    setAuthToken(token);
  };

  return {
    user,
    signin,
    signout,
  };
}

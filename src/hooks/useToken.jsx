import { useState } from "react";

const TOKEN_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export const useToken = () => {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));

  const setToken = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setTokenState(newToken);
  };

  const setRefreshToken = (refreshToken) => {
    localStorage.setItem(REFRESH_KEY, refreshToken);
  };

  const getToken = () => localStorage.getItem(TOKEN_KEY);
  const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    setTokenState(null);
  };

  return { token, setToken, getToken, removeToken, setRefreshToken, getRefreshToken };
};

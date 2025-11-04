import React, { createContext, useState } from 'react';
import api, { setAuthToken } from '../api/apiClient';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem('token');
    if (raw) setAuthToken(raw);
    return { token: raw, user: JSON.parse(localStorage.getItem('user')) || null };
  });
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const login = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    setAuth({ token: null, user: null });
  };

  return (
    <AppContext.Provider value={{ auth, login, logout, posts, setPosts, categories, setCategories }}>
      {children}
    </AppContext.Provider>
  );
}

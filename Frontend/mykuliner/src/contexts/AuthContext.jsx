import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const attemptLoginFromStorage = () => {
      const storedAuth = authApi.getCurrentUser();
      if (storedAuth && storedAuth.token) {
        setUser(storedAuth.user);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    attemptLoginFromStorage();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authApi.loginUser(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authApi.registerUser(userData);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    await authApi.logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
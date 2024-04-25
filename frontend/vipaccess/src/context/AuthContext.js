// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const url = 'http://127.0.0.1:8000/api'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') || null);

  const login = async (usernameOrEmail, password) => {
    try {
      const response = await axios.post(`${url}/login/`, { email: usernameOrEmail, password });
      setAccessToken(response.data.jwt);
      localStorage.setItem('accessToken', accessToken);

      setRefreshToken(response.data.refresh_token);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(response.data.user);
      
    } catch (error) {
      // Trate os erros de login
      console.error('Erro de login:', error);
    }
  };

  const userDetails = async () => {
    const response = await axios.post(`${url}/user/`, {accessToken})
  }


  return (
    <AuthContext.Provider value={{ user, accessToken, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../Services/Services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();


  const login = async (loginData) => {
    try {
      const response = await apiService.post('/login', loginData);
      setAuthToken(response.token);
      setUser({ id: response.data._id, name: response.data.name, userType: response.data.userType }); // Adjust according to your response structure
      localStorage.setItem('authToken', response.token);
  
      navigate(response.data.userType === 'User' ? '/user' : '/mover');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);


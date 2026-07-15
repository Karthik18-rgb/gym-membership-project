import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('gym-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('gym-token') || '');
  const navigate = useNavigate();

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    localStorage.setItem('gym-token', response.token);
    localStorage.setItem('gym-user', JSON.stringify({ username: response.username, role: response.role }));
    setToken(response.token);
    setUser({ username: response.username, role: response.role });
    toast.success(`Welcome back, ${response.username}!`);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('gym-token');
    localStorage.removeItem('gym-user');
    setToken('');
    setUser(null);
    toast.info('You have been logged out.');
    navigate('/login');
  };

  const value = useMemo(() => ({ user, token, login, logout, isAuthenticated: Boolean(token) }), [user, token, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

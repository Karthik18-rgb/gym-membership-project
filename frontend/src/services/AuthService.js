import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

const authApi = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const getErrorMessage = (error) => {
  const responseData = error.response?.data;
  if (typeof responseData === 'string') return responseData;
  if (responseData?.message) return responseData.message;
  if (error.request) return 'Unable to reach the authentication server.';
  return 'Authentication failed. Please try again.';
};

export const login = async (credentials) => {
  try {
    const { data } = await authApi.post('/login', credentials);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const register = async (payload) => {
  try {
    const { data } = await authApi.post('/register', payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export default { login, register };

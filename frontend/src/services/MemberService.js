import axios from 'axios';

const API_URL = 'http://localhost:8000/api/members';

const memberApi = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

memberApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('gym-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getErrorMessage = (error) => {
  const responseData = error.response?.data;
  if (typeof responseData === 'string') return responseData;
  if (responseData?.message) return responseData.message;
  if (error.request) return 'Unable to reach the server.';
  return 'Something went wrong. Please try again.';
};

export const getAllMembers = async () => {
  try {
    const { data } = await memberApi.get('');
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getMemberById = async (id) => {
  try {
    const { data } = await memberApi.get(`/${id}`);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const addMember = async (member) => {
  try {
    const { data } = await memberApi.post('', member);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateMember = async (id, member) => {
  try {
    const { data } = await memberApi.put(`/${id}`, member);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteMember = async (id) => {
  try {
    await memberApi.delete(`/${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

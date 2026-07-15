import axios from 'axios';

const memberApi = axios.create({
  baseURL: 'http://localhost:8000/api/members',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getErrorMessage = (error) => {
  const responseData = error.response?.data;

  if (typeof responseData === 'string') return responseData;
  if (responseData?.message) return responseData.message;
  if (error.request) return 'Unable to reach the server. Please make sure the backend is running.';

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

export default memberApi;

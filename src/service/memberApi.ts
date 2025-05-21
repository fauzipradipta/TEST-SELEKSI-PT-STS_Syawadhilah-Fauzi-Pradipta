import axios from 'axios';

const API_URL = import.meta.env.API_URL;

export const registerMember = async (memberData: any) => {
  const response = await axios.post(`${API_URL}/members`, memberData);
  return response.data;
};

export const getMembers = async (page = 1, limit = 5) => {
  const response = await axios.get(`${API_URL}/members`, {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const exportMembers = async () => {
  const response = await axios.get(`${API_URL}/members/export`, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};
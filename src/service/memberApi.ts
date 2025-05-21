import axios from 'axios';

const API_URL = import.meta.env.API_URL;

interface memberData {
  nik: string;
  name: string;
  phone: string;
  province: string;
  regency: string;
  district: string;
  village: string;
}


export const registerMember = async (data: memberData) => {
  const response = await axios.post(`${API_URL}/members`, data);
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
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

const api = axios.create({
  baseURL:'http://localhost:5000/api',
})

export const registerMember = async (data: memberData) => {
  try {
    const response = await api.post('/members/register', data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getMembers = async (page = 1, limit = 5) => {
  const response = await axios.get(`${API_URL}/api/getmembers`, {
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
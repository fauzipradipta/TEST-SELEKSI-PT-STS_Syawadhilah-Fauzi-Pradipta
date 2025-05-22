import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your server's base URL

export const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${API_URL}/users/auth/login`, credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const registerUser = async (data: { username: string; password: string; regionLevel: string }) => {
  const response = await axios.post(`${API_URL}/register-admin`, data);
  return response.data;
};
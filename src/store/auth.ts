import { create } from 'zustand';
import { login, getCurrentUser } from '../api/auth';

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  
  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await login(username, password);
      localStorage.setItem('token', token);
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', loading: false });
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  loadUser: async () => {
    set({ loading: true });
    try {
      const user = await getCurrentUser();
      set({ user, loading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, loading: false });
    }
  }
}));
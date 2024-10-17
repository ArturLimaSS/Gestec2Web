import { create } from "zustand";
import { api } from "../../constants/endpoint";
import { Navigate, useNavigate } from "react-router";
import { PublicRoutes } from "../../routes/PublicRoutes";
import Router from "../../routes/Router";

export const useAuthStore = create((set) => {
  return ({
    user: {},
    empresa: {},
    error: null,
    status: 'idle',
    isLogged: false,
    routes: PublicRoutes,
    authenticate: async (credentials) => {
      set({ status: 'loading' });
      try {
        const response = await api.post('/auth/login', credentials);
        localStorage.setItem('token', response.data.token);
        set({ user: response.data.user, error: null, isLogged: true, status: 'succeeded' });
        return response
      } catch (error) {
        set({ error: error.response?.data?.message || 'Error occurred', status: 'failed' });
        return error.response
      }
    },
    logout: async () => {
      set({ status: 'loading' });
      try {
        await api.post('/auth/logout');
        set({ user: null, error: null, status: 'succeeded', routes: PublicRoutes });
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        set({ error: error.response.data.message, status: 'failed', routes: PublicRoutes });
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    },
    checkLogin: async (navigate) => {
      set({ status: 'loading' });
      try {
        const response = await api.post('/auth/check');
        set({ user: response.data.user, empresa: response.data.user.empresa[0], isLogged: true, error: null, status: 'succeeded', routes: Router });
        if (!response.data.user) {
          navigate('/login');
        }
      } catch (error) {
        set({ error: error.response.data.message, isLogged: false, status: 'failed', routes: PublicRoutes });
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    },
    updateUser: async (data) => {
      set({ isLoading: true, error: null });
      try {
        const response = await api.put(`/user/atualizar`, data);
        set({ user: response.data, isLoading: false });
        return response
      } catch (error) {
        set({ error: error.response.data.message, isLoading: false });
      }
    },
  })
})
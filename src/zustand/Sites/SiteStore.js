import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useSitesStore = create((set, get) => ({
  listaSites: [],
  site: {},
  isLoading: false,
  error: null,
  fetchListaSites: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('site/listar');
      set({ listaSites: response.data.sites, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  createSite: async (site) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('site/cadastro', site);
      set({ site: response.data, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  }
}));
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
      return error.response
    }
  },
  excluirSite: async (site_id) => {
    set({ isLoading: true });
    try {
      const response = await api.put('site/excluir', { site_id });
      set(store => ({ isLoading: false, listaSites: store.listaSites.filter(item => item.site_id != site_id) }));
      return response
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return error.response;
    }
  },
  buscarSite: async (site_id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`site/buscar`, { params: { site_id: site_id } });
      set({ site: response.data.site, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  atualizarSite: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put('site/atualizar', payload);
      set((state) => ({
        isLoading: false,
        listaSites: state.listaSites.map((site) =>
          site.site_id === payload.site_id ? response.data.site : site
        ),
      }));
      console.log('Response dentro do try:', response); // Para debug
      return response;
    } catch (error) {
      console.log('Erro na atualização:', error); // Para debug
      set({ error: error.message, isLoading: false });
      return error.response;
    }
  }
}));
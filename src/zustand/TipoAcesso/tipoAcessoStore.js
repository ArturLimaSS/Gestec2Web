import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useTipoAcesso = create((set, get) => {
  const baseUrl = '/site/tipo-acesso';
  return ({
    isLoading: false,
    lista_tipo_acesso: [],
    error: null,
    fetchTipoAcessos: async () => {
      try {
        const response = await api.get(baseUrl + '/listar')
        set({ isLoading: false, lista_tipo_acesso: response.data.lista_tipo_acesso })
      } catch (error) {
        set({ isLoading: false, erro: error.message })
        return error.response
      }
    },
    cadastraTipoAcesso: async (payload) => {
      try {
        const response = await api.post(baseUrl + '/cadastro', payload)
        set((state) => ({ isLoading: false, erro: null, lista_tipo_acesso: [...state.lista_tipo_acesso, response.data.tipo_acesso] }))
        return response;
      } catch (error) {
        set({ isLoading: false, error: error.message })
        return error.response
      }
    },
    deletaTipoAcesso: async (id) => {
      try {
        const response = await api.put(baseUrl + '/editar', { params: { tipo_acesso_id: id } })
        set((state) => ({ isLoading: false, tipos_acesso: state.tipos_acesso.filter(tipo => tipo.tipo_acesso_id !== id) }))
        return response;
      } catch (error) {
        set({ isLoading: false, error: error.message })
        return error.response
      }
    },
    editaTipoAcesso: async (payload) => {
      try {
        const response = await api.put(baseUrl + '/excluir', { params: { tipo_acesso_id: payload.tipo_acesso_id } })
        set((state) => ({ isLoading: false, tipos_acesso: state.tipos_acesso.map(tipo => tipo.tipo_acesso_id == payload.tipo_acesso_id ? response.data.tipo_acesso : tipo) }))
        return response;
      } catch (error) {
        set({ isLoading: false, error: error.message })
        return error.response
      }
    },
  })
})
import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useTipoChave = create((set, get) => {
  const baseUrl = '/site/tipo-chave';

  return {
    lista_tipo_chave: [],
    tipo_chave: {},
    isLoading: false,
    error: null,
    cadastraTipoChave: async (payload) => {
      try {
        const response = await api.post(`${baseUrl}/cadastro`, payload)
        set(state => ({ isLoading: false, error: null, lista_tipo_chave: [...state.lista_tipo_chave, response.data.tipo_chave] }))
        return response;
      } catch (error) {
        set({ isLoading: false, error: error.message })
        return error.response
      }
    },
    fetchTipoChave: async () => {
      set({ isLoading: true, error: null })
      try {
        const response = await api.get(`${baseUrl}/listar`)
        set({ lista_tipo_chave: response.data.lista_tipo_chave, isLoading: false, error: null })
      } catch (error) {
        set({ isLoading: false, error: error.message })
      }
    },
    atualizaTipoChave: async (payload) => {
      try {
        const response = await api.put(`${baseUrl}/editar`, payload)
        set((state) =>
          ({ isLoading: false, lista_tipo_chave: state.lista_tipo_chave?.map((item) => item.tipo_chave_id == payload.tipo_chave_id ? response.data.tipo_chave : item) }))
        return response;
      } catch (error) {
        set({ isLoading: false, error: error.message })
        return error.response

      }
    },
    excluirTipoChave: async (tipo_chave_id) => {
      try {
        const response = await api.put(`${baseUrl}/excluir`, { tipo_chave_id: tipo_chave_id })
        set((state) =>
          ({ isLoading: false, lista_tipo_chave: state.lista_tipo_chave?.filter(item => item.tipo_chave_id != tipo_chave_id) }))
        return response;
      } catch (error) {
        set({ isLoading: false, error: error.message })
        return error.response

      }
    }
  }
})
import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useRespostaStore = create((set, get) => ({
     isLoading: false,
     respostas: [],
     error: null,
     fetchRespostas: async (atividade_id) => {
          set({ respostas: [], isLoading: true, error: null });
          try {
               const response = await api.get('/respostas/listar', { params: { atividade_id } });
               set({ respostas: response.data.respostas, isLoading: false });
               return response
          } catch (error) {
               set({ isLoading: false, error: error.message });
          }
     },
     updateResposta: async (respostas) => {
          set({ isLoading: true, error: null });
          try {
               const response = await api.put('/respostas/atualizar', { respostas: respostas });
               set({ isLoading: false, error: null });
               return response
          } catch (error) {
               set({ isLoading: false, error: error.message });
          }
     }
}));
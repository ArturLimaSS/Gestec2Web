import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useAtividadesStore = create((set, get) => ({
     atividades: [],
     atividade: {},
     isLoading: false,
     error: null,
     fetchAtividades: async () => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/atividade/listar')
               set({ atividades: response.data.atividades, isLoading: false })
               return response;
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     createAtividades: async (atividade) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.post('/atividade/cadastro', atividade);
               if (response.status == 200) {
                    set((state) => ({ isLoading: false, atividades: [...state.atividades, response.data.atividade] }))
               }
               return response;
          } catch (error) {

          }
     },
     getAtividadeDetalhes: async (atividade_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/atividade/detalhes', { params: { atividade_id: atividade_id } })
               set({ atividade: response.data.atividade, isLoading: false })
          } catch (error) {

          }
     }
}))
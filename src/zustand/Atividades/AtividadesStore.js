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
     },
     concluiAtividade: async (atividade_id, password, atividade_conclusao) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.put('/atividade/concluir', { atividade_id: atividade_id, password: password, atividade_conclusao: atividade_conclusao })
               console.log(response)
               return response;
          } catch (error) {
               set({ isLoading: false, error: error.message })
               return error.response;
          }
     },
     geraRelatorio: async (atividade_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/atividade/anexo/relatorio', { params: { atividade_id: atividade_id } })
               var anchor = document.createElement('a');
               anchor.href = response.data.url;
               anchor.target = '_blank';
               anchor.click();
          } catch (error) {
               set({ isLoading: false, error: error.message })
               return error.response;
          }
     },
     excluirAtividade: async (atividade_id) => {
          set({ isLoading: true, error: null });
          try {
               const response = await api.put('/atividade/excluir', { atividade_id: atividade_id })
               set((state) => ({ isLoading: false, atividades: state.atividades.filter((a) => a.atividade_id !== atividade_id) }));
               return response;
          } catch (error) {
               set({ isLoading: false, error: error })
               return error.response;
          }
     }

}))
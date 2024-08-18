import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useUploadStore = create((set, get) => ({
     arquivos: [],
     isLoading: false,
     upload: async (data) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.post("/atividade/anexo/upload", data, { headers: { 'Content-Type': 'multipart/form-data' } })
               set((state) => ({ isLoading: false, arquivos: [...state.arquivos, response.data.anexo] }));
               return response;

          } catch (error) {
               set({ isLoading: false, error: error.message })
               return error.response;
          }
     },

     fetchFiles: async (atividade_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/atividade/anexo/listar', { params: { atividade_id } })
               set({ arquivos: response.data.anexos, isLoading: false })
               return response;
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     atualizaArquivo: async (arquivo) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.put('/atividade/anexo/atualizar', arquivo)
               set((state) => ({ isLoading: false, arquivos: state.arquivos.map((a) => a.anexo_id === arquivo.anexo_id ? { ...a, descricao: arquivo.descricao } : a) }));
               return response;

          } catch (error) {
               set({ isLoading: false, error: error.message })
               return error.response;
          }
     },
     deletaArquivo: async (arquivo_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.put('/atividade/anexo/excluir', { arquivo_id });
               set((state) => ({ isLoading: false, arquivos: state.arquivos.filter((a) => a.anexo_id !== arquivo_id) }));
               return response;
          } catch (error) {
               set({ isLoading: false, error: error.message })
               return error.response;
          }
     }
}))
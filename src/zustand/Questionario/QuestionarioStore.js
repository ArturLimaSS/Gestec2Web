import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useQuestionarioStore = create((set, get) => ({
     isLoading: false,
     tarefas: [],
     error: null,
     questionario: {},
     fetchQuestionario: async (empresa_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/cadastro', { params: { empresa_id: empresa_id } })
               set({ questionario: response.data.questionario, isLoading: false })
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     atualizaQuestionario: async (questionario) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.put('/questionario/cadastro', questionario);

               if (response.status === 200) {
                    set(({ questionario: response.data, isLoading: false }))
               }
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     fetchTarefas: async (checklist_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/tarefas/listar', { params: { checklist_id: checklist_id } })
               set({ tarefas: response.data.tarefas, isLoading: false })
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     addTarefa: async (checklist_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.post('/questionario/tarefas/adicionar', { checklist_id: checklist_id });
               const tarefa = response.data;

               set((state) => ({
                    tarefas: [
                         ...state.tarefas,
                         {
                              tarefa_id: tarefa.tarefa_id,
                              checklist_id: tarefa.checklist_id,
                              nome_tarefa: "",
                              descricao_tarefa: ""
                         }
                    ],
                    isLoading: false
               }));
          } catch (error) {
               set({ error: error.message, isLoading: false });
          }
     },
     atualizaTarefa: async (tarefa) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.put('/questionario/tarefas/atualizar', tarefa);
               set((state) => ({ tarefas: state.tarefas.map(t => t.tarefa_id === tarefa.tarefa_id ? response.data : t), isLoading: false }))
          } catch (error) {
               set({ error: error.message, isLoading: false })
          }
     },
     excluiTarefa: async (tarefa_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.delete('/questionario/tarefas/excluir', { params: { tarefa_id: tarefa_id } });
               if (response.status === 200) {
                    set((state) => ({
                         tarefas: state.tarefas.filter(t => t.tarefa_id !== tarefa_id),
                         isLoading: false
                    }))
               }
          } catch (error) {
               set({ error: error.message, isLoading: false })
          }
     },
     fetchPerguntas: async (checklist_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/perguntas/listar', { params: { checklist_id: checklist_id } })
               set({ perguntas: response.data.perguntas, isLoading: false })
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     criarPergunta: async (payload) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.post('/questionario/perguntas/adicionar', payload);
               const perguntaResponse = response.data.pergunta;
               set((state) => ({
                    perguntas: [...state.perguntas, {
                         checklist_id: perguntaResponse.checklist_id,
                         created_at: perguntaResponse.created_at,
                         empresa_id: perguntaResponse.empresa_id,
                         opcoes: "",
                         pergunta: "",
                         pergunta_id: perguntaResponse.pergunta_id,
                         tarefa_id: perguntaResponse.tarefa_id,
                         tipo_resposta: "",
                    }],
                    isLoading: false
               }))
          } catch (error) {
               set({ error: error.message, isLoading: false })
          }
     },
     excluirPergunta: async (pergunta_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.delete('/questionario/perguntas/excluir', { params: { pergunta_id: pergunta_id } });
               if (response.status === 200) {
                    set((state) => ({
                         perguntas: state.perguntas.filter(p => p.pergunta_id !== pergunta_id),
                         isLoading: false
                    }))
               }
          } catch (error) {
               set({ error: error.message, isLoading: false })
          }
     },
     atualizaPergunta: async (payload) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.put('/questionario/perguntas/atualizar', payload);
               set((state) => ({
                    perguntas: state.perguntas.map(p => p.pergunta_id == payload.pergunta_id ? response.data.pergunta : p)
               }))
          } catch (error) {
               set({ error: error.message, isLoading: false })
          }
     }
}))
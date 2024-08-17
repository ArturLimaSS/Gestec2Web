import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useQuestionarioStore = create((set, get) => ({
     isLoading: false,
     tarefas: [],
     error: null,
     questionario: {},
     questionarios: [],
     perguntas: [],
     getQuestionario: async (questionario_id) => {
          set({ questionario: {}, isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/buscar', { params: { questionario_id: questionario_id } })
               set({ questionario: response.data.questionario, isLoading: false })
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     fetchQuestionarios: async () => {
          set({ questionarios: [], isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/listar')
               set({ questionarios: response.data.questionarios, isLoading: false })
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     fetchQuestionario: async () => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/cadastro')
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
     finalizaQuestionario: async (questionario_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.put('/questionario/cadastro/finalizar', { questionario_id: questionario_id });
               set({ isLoading: false })
               return response;
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     deletaQuestionario: async (questionario_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.delete('/questionario/cadastro', { params: { questionario_id: questionario_id } });
               set((state) => ({ isLoading: false, questionarios: state.questionarios.filter((q) => q.questionario_id !== questionario_id) }))
               return response;
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     fetchTarefas: async (questionario_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/tarefas/listar', { params: { questionario_id: questionario_id } })
               set({ tarefas: response.data.tarefas, isLoading: false })
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     },
     addTarefa: async (questionario_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.post('/questionario/tarefas/adicionar', { questionario_id: questionario_id });
               const tarefa = response.data;

               set((state) => ({
                    tarefas: [
                         ...state.tarefas,
                         {
                              tarefa_id: tarefa.tarefa_id,
                              questionario_id: tarefa.questionario_id,
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
     fetchPerguntas: async (questionario_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/perguntas/listar', { params: { questionario_id: questionario_id } })
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
                         questionario_id: perguntaResponse.questionario_id,
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
     },
     listaPorTipoServico: async (tipo_servico_id) => {
          set({ isLoading: true, error: null })
          try {
               const response = await api.get('/questionario/listar-por-tipo-servico', { params: { tipo_servico_id: tipo_servico_id } })
               set({ questionarios: response.data.questionarios, isLoading: false })
               return response
          } catch (error) {
               set({ isLoading: false, error: error.message })
          }
     }
}))
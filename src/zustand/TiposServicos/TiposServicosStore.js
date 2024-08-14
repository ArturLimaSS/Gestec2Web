import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useTiposServicosStore = create((set, get) => ({
  listaTiposServicos: [],
  isLoading: false,
  error: null,
  fetchTiposServicos: async empresa_id => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("tipo-servico/listar", {
        params: { empresa_id: empresa_id },
      });
      set({ listaTiposServicos: response.data.tipos_servicos, isLoading: false });

    } catch (error) { }
  },
  createTipoServico: async dados => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("tipo-servico/cadastro", dados);
      return response;
    } catch (error) { }
  },
  deleteTipoServico: async tipo_servico_id => {
    set({ isLoading: true, error: null });
    try {
      await api.put(`tipo-servico/excluir`, { tipo_servico_id: tipo_servico_id });
    } catch (error) { }
  }
}))
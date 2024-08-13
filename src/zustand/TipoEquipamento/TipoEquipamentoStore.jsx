import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useTipoEquipamentoStore = create((set, get) => ({
  listaTipoEquipamento: [],
  isLoading: false,
  error: null,
  fetchTipoEquipamento: async empresa_id => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("tipo-equipamento/listar", {
        params: { empresa_id: empresa_id },
      });
      set({
        listaTipoEquipamento: response.data.tipos_equipamentos,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  createTipoEquipamento: async dados => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("tipo-equipamento/cadastro", dados);
      // Use the updater function to update the state based on the previous state
      set(state => ({
        listaTipoEquipamento: [
          ...state.listaTipoEquipamento,
          response.data.tipo_equipamento,
        ],
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

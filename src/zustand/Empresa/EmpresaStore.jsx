import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useEmpresaStore = create((set, get) => {
  return {
    isLoading: false,
    erro: null,
    empresa: {},
    atualizaEmpresa: async empresa => {
      set({ isLoading: true });
      try {
        const response = await api.put("/empresa/cadastro", empresa);
        return response;
      } catch (error) {}
    },
  };
});

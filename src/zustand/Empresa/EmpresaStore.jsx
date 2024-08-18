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
		handleSetEmpresaLogoMarca: async formData => {
			set({ isLoading: true, error: null });
			try {
				const response = await api.post("/empresa/logo", formData);
				set({ empresa: response.data.empresa });
				return response;
			} catch (error) {
				set({ isLoading: false, error: error.response?.data?.message || "Erro desconhecido" });
				return error.response;
			}
		},
	};
});

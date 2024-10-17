import { create } from "zustand";
import { useAlert } from "../../context/useAlert";
import axios from "axios";

export const useUtils = create((set, get) => {

  return ({
    error: null,
    endereco: {},
    buscaEndereco: async (cep) => {
      try {
        if (cep.length > 5) {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

          set({ endereco: response.data });
          return response
        } else {
          return ("Cep não informado")
        }
      } catch (error) {
        set({ error: error.message });
        return error.response
      }
    },

    selected_tab: {
      'page': '',
      'value': '1'
    },
    setSelectedTab: (data) => {
      set({
        selected_tab: {
          'page': data.page,
          'value': data.value
        }
      })
    }
  })
})
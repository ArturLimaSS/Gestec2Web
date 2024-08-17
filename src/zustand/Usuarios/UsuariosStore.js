import { create } from "zustand";
import { api } from "../../constants/endpoint";

export const useUserStore = create((set, get) => {
  return {
    selectedUser: {},
    users: [],
    filteredUsers: [],
    isLoading: false,
    cargos: [],
    error: null,
    editUser: false,
    filterUser: (searchValue) => {
      if (searchValue == "") {
        set({ filteredUsers: get().users });
      } else {
        set({ filteredUsers: get().users.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase())) })
      }
    },
    fetchUser: async (cargo_id) => {
      set({ isLoading: true, error: null });
      try {
        const response = await api.get("/user/listar", { params: { cargo_id: cargo_id } });
        set({ users: response.data.users, filteredUsers: response.data.users, isLoading: false });
      } catch (error) {
        set({ error: error.message, isLoading: false });
      }
    },
    fetchCargo: async () => {
      set({})
      try {
        const response = await api.get("/cargo/listar");
        set({
          cargos: response.data.cargos,
          isLoading: false,
        });
        return response;
      } catch (error) {
      }
    },
    createUser: async (data) => {
      set({ isLoading: true, error: null })
      try {
        const response = await api.post("/user/cadastro", data)
        return response
      } catch (error) {
        set({ error: error.message, isLoading: false })
      }
    },
    updateUser: async (data) => {
      set({ isLoading: true, error: null })
      try {
        const response = await api.put('/user/atualizar', data);

        return response;
      } catch (error) {

      }
    },
    setSelectedUser: (user) => {
      set({ selectedUser: user })
    },
    setEditUser: (value) => {
      if (value != null) {
        set({ editUser: value })
      } else {
        set({ editUser: !(get().editUser) })
      }
    }
  };
})
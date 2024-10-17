import { create } from "zustand";

export const useUtils = create((set, get) => {
  return ({
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
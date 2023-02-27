import { create } from "zustand";
import { persist } from "zustand/middleware";
let useStore = (set, get) => ({
  surveys: [],
  loading: false,
  userInfo: {
    isAdmin: false,
    name: "",
    email: "",
  },
  loadSurveys: false,
  pendingSurveys: [],
  setPendingSurvey: (data) => set(() => [...get()?.pendingSurveys, data]),
  setLoadSurveys: () => set(() => ({ loadSurveys: !get()?.loadSurveys })),
  setLoading: (props) => set(() => ({ loading: props })),
  getSurveys: (data) => set(() => ({ surveys: data })),
  setUserInfo: (data) =>
    set(() => ({ userInfo: { ...get()?.userInfo, ...data } })),
});

useStore = persist(useStore, {
  name: "Survey",
  getStorage: () => localStorage,
});

useStore = create(useStore);

export { useStore };

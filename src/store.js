import { create } from "zustand";
// import localforage from 'localforage';
export const useStore = create((set, get) => ({
  surveys: [],
  loading: false,
  userInfo: {},
  setLoading: (props) => set(() => ({ loading: props })),
  getSurveys: (data) => set(() => ({ surveys: data })),
  setUserInfo: (data) => set(() => ({ userInfo: { isAdmin: data } })),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
let useStore = (set, get) => ({
  surveys: [],
  loading: false,
  userInfo: {
    isAdmin: false,
    name: "",
    email: "",
  },
  users: [],
  loadSurveys: false,
  pendingSurveys: [],
  setPendingSurvey: (data) => set(() => [...get()?.pendingSurveys, data]),
  setLoadSurveys: () => set(() => ({ loadSurveys: !get()?.loadSurveys })),
  setLoading: (props) => set(() => ({ loading: props })),
  getSurveys: (data) => set(() => ({ surveys: data })),
  setUserInfo: (data) =>
    set(() => ({ userInfo: { ...get()?.userInfo, ...data } })),
  getUsers: async (db) => {
    set(() => ({loading: true}))
    const data = await getDocs(collection(db, 'users'));
    const usersFetched = []
    for(let i = 0; i < data?.docs?.length; i++){
      const document = data?.docs?.[i]?._document?.data?.value?.mapValue?.fields
      const user = {
        address: document?.address?.stringValue,
        email: document?.email?.stringValue,
        firstName: document?.firstName?.stringValue,
        lastName: document?.lastName?.stringValue,
        lga: document?.lga?.stringValue,
        organization: document?.organization?.stringValue,
        postalCode: document?.postalCode?.stringValue,
        role: document?.role?.stringValue,
        state: document?.state?.stringValue,
        status: document?.status?.stringValue,
        uid: document?.uid?.stringValue,
        _id: data?.docs?.[i]?.id,
      }
      usersFetched.push(user)
    }
    set(() => ({users: usersFetched}))
    return data;
    // set(() => {})
  },
  fetchSurveys: async (db) => {
    get().setLoading(true)
    const data = await getDocs(collection(db, 'surveys'));
    return data;
  },
  deleteUser: async (db, document, uid) => {
    set(() => ({loading: true}))
    set(() => ({users: get()?.users?.filter(user => user?.uid !== uid)}))
    await deleteDoc(doc(db, 'users', document));
    return;
  },
  deleteUserByUid: async (uid) => {
    set(() => ({loading: true}))
    await fetch('https://us-central1-eims-3d73a.cloudfunctions.net/deleteUser', {method: 'DELETE', body: JSON.stringify({uid: uid})})
  }
});

useStore = persist(useStore, {
  name: "Survey",
  getStorage: () => localStorage,
});

useStore = create(useStore);

export { useStore };

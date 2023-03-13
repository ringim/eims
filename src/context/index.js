import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useStore } from "src/store";
import { shallow } from "zustand/shallow";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const { setLoading } = useStore(
    (state) => ({
      setLoading: state?.setLoading,
    }),
    shallow
  );

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  async function createUser(data){
    await addDoc(collection(db, 'users'), data);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  // indexDB

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, createUser, db }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

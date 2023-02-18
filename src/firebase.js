// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "eims-3d73a.firebaseapp.com",
  projectId: "eims-3d73a",
  storageBucket: "eims-3d73a.appspot.com",
  messagingSenderId: "419091917265",
  appId: "1:419091917265:web:763d48a7b2c35c24cc18f0",
  measurementId: "G-FCJK27M282",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

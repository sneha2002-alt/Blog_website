import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAPnS8Ae8iHVTRNsA0SyVFk-eF1g8U5-aE",
  authDomain: "fir-blog-96739.firebaseapp.com",
  projectId: "fir-blog-96739",
  storageBucket: "fir-blog-96739.appspot.com",
  messagingSenderId: "266382486745",
  appId: "1:266382486745:web:e2bd21a921dce0847ba2c8",
  measurementId: "G-39Z8J59G5X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);

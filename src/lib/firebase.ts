import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyApXTfIO6xKsux6A4iQSC-H_u3d8s5lgII",
  authDomain: "unilink-d9520.firebaseapp.com",
  projectId: "unilink-d9520",
  storageBucket: "unilink-d9520.appspot.com",
  messagingSenderId: "136294640996",
  appId: "1:136294640996:web:7997967dcd64a5081d5e71",
  measurementId: "G-4JWBDMEP59",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

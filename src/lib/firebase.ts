import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const analytics = getAnalytics(app);

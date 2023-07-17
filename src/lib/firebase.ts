import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { derived, writable, type Readable } from "svelte/store";
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

/**
 *@returns a store with current firebase user and implements unsubscription
 */
function userStore() {
  let unsubscribe = (): void => {};
  const { subscribe } = writable<User | null>(
    auth?.currentUser ?? null,
    (set) => {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        set(user);
      });
      return () => unsubscribe();
    }
  );
  return {
    subscribe,
  };
}

/**
 * @param string -> Path to doc
 * @returns subscription to docData
 */

function docStore<T>(path: string) {
  let unsubscribe = (): void => {};
  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });
    return () => unsubscribe;
  });
  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}
interface userData {
  uid: string;
  username: string;
  photoURL: string;
  bio: string;
  links: any[];
  published: boolean;
}

export const user = userStore();
export const userData: Readable<userData | null> = derived(
  user,
  ($user, set) => {
    if ($user) {
      return docStore<userData>(`users/${$user.uid}`).subscribe(set);
    } else {
      set(null);
    }
  }
);

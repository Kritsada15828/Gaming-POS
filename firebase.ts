import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDGWATGQZzjj49B3IBxOholoSRyihTHc4",
  authDomain: "kritsada67097830.firebaseapp.com",
  projectId: "kritsada67097830",
  storageBucket: "kritsada67097830.firebasestorage.app",
  messagingSenderId: "42616259657",
  appId: "1:42616259657:web:eb4309c8b97f878198eb98",
  measurementId: "G-VDRH8YN8NX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
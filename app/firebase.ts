import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYKcfKR8qwostvtZkKOyhNBsotLqInbuc",
  authDomain: "rltlsystem.firebaseapp.com",
  projectId: "rltlsystem",
  storageBucket: "rltlsystem.firebasestorage.app",
  messagingSenderId: "588069910426",
  appId: "1:588069910426:web:d681ce4dc43720fd1a2c23"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
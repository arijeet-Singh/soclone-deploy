import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDtLlSRfW-n-QOTKlBQbUdjuy2AmQ5j2GI",
  authDomain: "stackoverflowclone-7c3d3.firebaseapp.com",
  projectId: "stackoverflowclone-7c3d3",
  storageBucket: "stackoverflowclone-7c3d3.appspot.com",
  messagingSenderId: "189003291305",
  appId: "1:189003291305:web:d8c50ed6bda7b8d35027b8",
  measurementId: "G-YD8HB3X5GK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);

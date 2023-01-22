// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsA15zPKsN3YgiQPmRaz-Jw6DX4ltJHDk",
  authDomain: "houses-554ac.firebaseapp.com",
  projectId: "houses-554ac",
  storageBucket: "houses-554ac.appspot.com",
  messagingSenderId: "236320364910",
  appId: "1:236320364910:web:01aea9a55672cc2c20497f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()
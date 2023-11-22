// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXN-54lxxNfEDKm4o3J0qdELfjh1Nul7A",
  authDomain: "react-social-media-app-40fae.firebaseapp.com",
  projectId: "react-social-media-app-40fae",
  storageBucket: "react-social-media-app-40fae.appspot.com",
  messagingSenderId: "834103343779",
  appId: "1:834103343779:web:d6a75c5454876ce36c1d16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

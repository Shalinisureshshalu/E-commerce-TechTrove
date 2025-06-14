// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALAEcO7TUeO_dtwkLq1dO12XHQmW4E_Z4",
  authDomain: "tech-trove-9b246.firebaseapp.com",
  projectId: "tech-trove-9b246",
  storageBucket: "tech-trove-9b246.firebasestorage.app",
  messagingSenderId: "796035405523",
  appId: "1:796035405523:web:fb96a5ae9ee604591c2626",
  measurementId: "G-F7CE6Q0FDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
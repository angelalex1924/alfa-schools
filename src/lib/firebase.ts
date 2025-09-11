// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYV2O9Ar2J_FjzQZfXeM4dmgNeRFCc0GY",
  authDomain: "alfa-schools.firebaseapp.com",
  projectId: "alfa-schools",
  storageBucket: "alfa-schools.firebasestorage.app",
  messagingSenderId: "288300322913",
  appId: "1:288300322913:web:aa43ec6af3863e90779a20",
  measurementId: "G-ZNNJXS339H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

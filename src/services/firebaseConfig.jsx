// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr0s1UwZzJ9eB73LD4KQcUxtls0JH4UrI",
  authDomain: "ai-trip-planner-18.firebaseapp.com",
  projectId: "ai-trip-planner-18",
  storageBucket: "ai-trip-planner-18.firebasestorage.app",
  messagingSenderId: "1010720036711",
  appId: "1:1010720036711:web:2f740d294abd8e311b41c2",
  measurementId: "G-CDRXVB27JM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr0s1UwZzJ9eB73LD4KQcUxtls0JH4UrI",
  authDomain: "ai-trip-planner-18.firebaseapp.com",
  projectId: "ai-trip-planner-18",
  storageBucket: "ai-trip-planner-18.firebasestorage.app",
  messagingSenderId: "1010720036711",
  appId: "1:1010720036711:web:a2524ab0366d40751b41c2",
  measurementId: "G-1JM7R1RY8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
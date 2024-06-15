// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt5VyaWVd8gZmSlA-YngJMvze1mu6kfY0",
  authDomain: "decent-space-426422-t2.firebaseapp.com",
  projectId: "decent-space-426422-t2",
  storageBucket: "decent-space-426422-t2.appspot.com",
  messagingSenderId: "955161671750",
  appId: "1:955161671750:web:8a847e2d386bed9533b247",
  measurementId: "G-08JBCKX0CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
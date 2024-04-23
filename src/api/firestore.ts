// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1FOKGF4r2JUbVkoPWiez9_3nTuyx-PF8",
  authDomain: "tier-list-e64f6.firebaseapp.com",
  projectId: "tier-list-e64f6",
  storageBucket: "tier-list-e64f6.appspot.com",
  messagingSenderId: "482173764610",
  appId: "1:482173764610:web:694f62bad6b4fd7d36531b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

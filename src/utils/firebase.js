// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQkDZ472KPXCvnwc5tw4M7ZlvnMrEEER8",
  authDomain: "crud-login-376117.firebaseapp.com",
  projectId: "crud-login-376117",
  storageBucket: "crud-login-376117.appspot.com",
  messagingSenderId: "1083298399422",
  appId: "1:1083298399422:web:dba76f7b0aca2ef3670aef",
  measurementId: "G-EG6B5MZ2B7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

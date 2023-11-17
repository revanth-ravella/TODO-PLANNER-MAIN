// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase/"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHb9sZ2AF7-esd24kqkfxYP29giq0GiRo",
  authDomain: "todo-5f966.firebaseapp.com",
  projectId: "todo-5f966",
  storageBucket: "todo-5f966.appspot.com",
  messagingSenderId: "710068702195",
  appId: "1:710068702195:web:23d7bd007b63050cdda086",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

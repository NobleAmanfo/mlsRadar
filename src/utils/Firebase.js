// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzwst2pUCUCfDKl9I7YLpVoLNAjjkWk6c",
  authDomain: "mlsradar.firebaseapp.com",
  projectId: "mlsradar",
  storageBucket: "mlsradar.appspot.com",
  messagingSenderId: "839265685548",
  appId: "1:839265685548:web:0b5ef670a08be5cf97c189",
  measurementId: "G-MWJKBZ4ZBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

export function signup(email, password){
    createUserWithEmailAndPassword(authentication, email, password);
}

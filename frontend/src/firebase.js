// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIO_GyHA66Jvrp_HucRX8DaP44TeUXXjQ",
  authDomain: "mern-househunt.firebaseapp.com",
  projectId: "mern-househunt",
  storageBucket: "mern-househunt.appspot.com",
  messagingSenderId: "341689884614",
  appId: "1:341689884614:web:a5bb50639a1b87befc1cc7",
  measurementId: "G-ET73V0DHCG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

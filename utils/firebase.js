// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, push, set, onValue, update } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPN6i9oRevYYuc_vNkKCo6BayrCd7oYgQ",
    authDomain: "project-pp-b9eef.firebaseapp.com",
    projectId: "project-pp-b9eef",
    storageBucket: "project-pp-b9eef.appspot.com",
    messagingSenderId: "767693736395",
    appId: "1:767693736395:web:7eea0e0688392895440e4e",
    measurementId: "G-9XV162746C",
    databaseURL: "https://project-pp-b9eef-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, dbRef, push, set, onValue, update };

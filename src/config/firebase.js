import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm-RsV5Af1uZ3axDusD1aXMiRcUXm6QxU",
  authDomain: "imoney-8a6db.firebaseapp.com",
  projectId: "imoney-8a6db",
  storageBucket: "imoney-8a6db.appspot.com",
  messagingSenderId: "957491953212",
  appId: "1:957491953212:web:543a2c11620eca3ced8d39",
  measurementId: "G-4XY6508TN1",
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const fireAuth = firebase.auth();
const fireStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { fireStore, fireAuth, fireStorage, timestamp };

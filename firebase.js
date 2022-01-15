import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAafIVHzCSGvGEFkvym1s7l59jiuTac9IU",
  authDomain: "ptuddd-f325b.firebaseapp.com",
  projectId: "ptuddd-f325b",
  storageBucket: "ptuddd-f325b.appspot.com",
  messagingSenderId: "641847712605",
  appId: "1:641847712605:web:82ed3253833c883ffe26b4"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export { firebase, db }
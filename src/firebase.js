import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyA8NLVCA8OS6k6yIUdYeBiHNKrLq7X22Xg",
    authDomain: "exam-assistant-d4338.firebaseapp.com",
    projectId: "exam-assistant-d4338",
    storageBucket: "exam-assistant-d4338.appspot.com",
    messagingSenderId: "115631814589",
    appId: "1:115631814589:web:e98f40780ae3df36e344d4"
  };


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.database()
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyBaEyBydmLN3wTkmw_EFnL5euO8dIp4-DE",
  authDomain: "agendacontrol-e9558.firebaseapp.com",
  databaseURL: "https://agendacontrol-e9558.firebaseio.com",
  projectId: "agendacontrol-e9558",
  storageBucket: "agendacontrol-e9558.appspot.com",
  messagingSenderId: "79981172836",
  appId: "1:79981172836:web:8e83506967396901786771",
  measurementId: "G-3TZMB19JHQ"
};
firebase.initializeApp(config)
firebase.firestore().settings({
    timestampsInSnapshots: true
})

export const db = firebase.firestore();
export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB48w6rJenhKpYDyQ1SsP4ZUGnIGmtMNzM",
    authDomain: "whatsapp-1742e.firebaseapp.com",
    databaseURL: "https://whatsapp-1742e.firebaseio.com",
    projectId: "whatsapp-1742e",
    storageBucket: "whatsapp-1742e.appspot.com",
    messagingSenderId: "267549728295",
    appId: "1:267549728295:web:6438ffc926963187263802",
    measurementId: "G-ZNX3WTF69P"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const  provider = new firebase.auth.GoogleAuthProvider();

export {auth , provider};
export default db ;
// 2:02:29s
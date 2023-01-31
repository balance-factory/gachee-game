import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIPhWSlW_uo8MJv5yns5JK8t9mU5V4CVo",
  authDomain: "gachee-game.firebaseapp.com",
  projectId: "gachee-game",
  storageBucket: "gachee-game.appspot.com",
  messagingSenderId: "236074787824",
  appId: "1:236074787824:web:c1ddc9a864166b283c7335",
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
// const firestore = firebase.();

// Initialize Firebase

export default database;




// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';



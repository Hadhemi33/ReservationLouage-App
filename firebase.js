// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLmq9sue_LI0BjV3m-crCTHe2Is8a24KY",
  authDomain: "blasti-cc19f.firebaseapp.com",
  projectId: "blasti-cc19f",
  storageBucket: "blasti-cc19f.appspot.com",
  messagingSenderId: "554605891810",
  appId: "1:554605891810:web:728d6c6dd6eeeeeaf94ebb"
};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
export const db = firebase.firestore();

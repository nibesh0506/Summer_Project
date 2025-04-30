import firebase from "firebase";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBW2fr1l1IsbwKssS0VgBKxFzGfX3xSa8w",
  authDomain: "ecom-fe649.firebaseapp.com",
  projectId: "ecom-fe649",
  storageBucket: "ecom-fe649.appspot.com",
  messagingSenderId: "477497849586",
  appId: "1:477497849586:web:4df2cbf782eb57921f426b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();


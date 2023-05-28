// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc2e16u0T-dw23Al_vBnxGdRlhPzW3CwQ",
  authDomain: "mastery-ml-54f5b.firebaseapp.com",
  projectId: "mastery-ml-54f5b",
  storageBucket: "mastery-ml-54f5b.appspot.com",
  messagingSenderId: "760987028068",
  appId: "1:760987028068:web:344476ec2af21f179d2d71",
  measurementId: "G-VZCCMCFY9Z"
};

// Initialize Firebase

let app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

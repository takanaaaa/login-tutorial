import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwyl1YrENJ7-p015GUt07AeMTD0jHqbPU",
  authDomain: "fir-login-tutorial-d04b7.firebaseapp.com",
  projectId: "fir-login-tutorial-d04b7",
  storageBucket: "fir-login-tutorial-d04b7.appspot.com",
  messagingSenderId: "1025244351152",
  appId: "1:1025244351152:web:ad71a7bfd73f7a54650975"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
import {
  initializeApp
} from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect
} from "@firebase/auth";

// config
const firebaseConfig = {
  apiKey: "AIzaSyDxqRRRX_s4WXn0V7U9Q9ygGaJRCTfJ4rY",
  authDomain: "filmoteka-a1130.firebaseapp.com",
  projectId: "filmoteka-a1130",
  storageBucket: "filmoteka-a1130.appspot.com",
  messagingSenderId: "642546678754",
  appId: "1:642546678754:web:9e6e7d78cbfa23091e17bb"
};

// // initialize firebase
firebase.initializeApp(firebaseConfig);

// // initialize variable
// const provider = new GoogleAuthProvider(app);
const auth = firebase.auth();
const database = firebase.database();

function registration() {

  fullNameEl = document.querySelector('#full-name-js');
  emailEl = document.querySelector('#email-js');
  passwordEl = document.querySelector('#password-js');

}

function validate_email(email) {
  expression = /[^\s@]+@[^\s@]+\.[^\s@]+/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

// const authBtnEl = document.querySelector("#login");

// authBtnEl.addEventListener('click', (event) => {
//   // signInWithRedirect(auth, provider);



//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       alert(user.displayName);
//       // ...
//     }).catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// })
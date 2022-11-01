const firebaseConfig = {
  apiKey: "AIzaSyAKIchMktJz5rM_XvbIscYw1QYB4qobThc",
  authDomain: "gaadigo-d269c.firebaseapp.com",
  databaseURL: "https://gaadigo-d269c-default-rtdb.firebaseio.com",
  projectId: "gaadigo-d269c",
  storageBucket: "gaadigo-d269c.appspot.com",
  messagingSenderId: "22473130630",
  appId: "1:22473130630:web:2bf8da2a6d02fb5ec54707",
  measurementId: "G-9KTMPQ3ZPV",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export function firebaseSuccessMsg() {
  // Requires the following element to Exist in HTML Page
  // <p id="firebase_success_msg" style="display: none; text-align: center; font-weight: 500; font-style: italic;">Form submitted successfully!</p>
  document.getElementById("firebase_success_msg").style.display = "block";
  setTimeout(function () {
    document.getElementById("firebase_success_msg").style.display = "none";
  }, 3000);
}

// Collection and document references
export const carRegister = firestore.collection("car_register");
export const loginDetails = firestore.collection("login_details");

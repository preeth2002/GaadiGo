await import ("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
await import ("https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js");
await import ("https://www.gstatic.com/firebasejs/8.10.1/firebase-storage.js");

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

export async function getImageURL(ref) {
  var imageRef = storage.refFromURL(ref);
  return await imageRef.getDownloadURL().catch((error) => {
    console.log(error);
    return "https://via.placeholder.com/300x200.png?text=Error+Retrieving+Image";
  }
)};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Collection and document references
export const carRegister = db.collection("car_register");
export const loginDetails = db.collection("login_details");
export const storage = firebase.storage();

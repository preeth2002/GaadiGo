import { loginDetails } from "./firebase.js";
import { verifyPassword } from "./password-functions.js";

// Create event listeners
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", loginViaForm);

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", logoutViaButton);

// Init error modal
const loginErrorModal = new bootstrap.Modal(
  document.getElementById("loginErrorModal")
);

// Login Form Function
async function loginViaForm(e) {
  e.preventDefault();

  // Get user details
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;
  loginForm.reset();

  // Get user details from firebase
  var query = loginDetails.where("email", "==", email.toLowerCase());
  let querySnapshot = await query.get();
  if (querySnapshot.empty) {
    loginErrorModal.show();
    return;
  }
  let result = querySnapshot.docs[0].data();

  // Verify Password
  const firebase_hash = result.password;
  const passwordVerified = await verifyPassword(password, firebase_hash);
  if (passwordVerified) {
    localStorage.setItem("name", result.name);
    localStorage.setItem("email", result.email);
    localStorage.setItem("phone", result.mobile);
    localStorage.setItem("authenticated", true);

    //Change UI on reload handled in unauthenticated-deny.js
    location.reload(); 

    return;
  }
  loginErrorModal.show();
}

// Logout Button Function
async function logoutViaButton(e) {
  e.preventDefault();

  localStorage.clear();
  //Change UI on reload handled in unauthenticated-deny.js
  location.reload(); 
}

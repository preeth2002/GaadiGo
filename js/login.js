import { loginDetails } from "./firebase.js";
import { verifyPassword } from "./password-functions.js";

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", loginViaForm);

async function loginViaForm(e) {
  e.preventDefault();

  // Get user details
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  // Get user details from firebase
  var query = loginDetails.where("email", "==", email.toLowerCase());
  let querySnapshot = await query.get();
  if (querySnapshot.empty) {
    window.alert("No matching emails. Please sign up first.");
    return;
  }
  let result = querySnapshot.docs[0].data();

  // Verify Password
  const firebase_hash = result.password;
  const passwordVerified = await verifyPassword(password, firebase_hash);
  if (passwordVerified) {
    window.alert("Password verified");
    return;
  }
  window.alert("Password verification failed");
}

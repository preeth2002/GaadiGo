// Write data to firebase
import { loginDetails } from "./firebase.js";
import { hashPassword } from "./password-functions.js";

const createAccountForm = document.getElementById("createAccountForm");
createAccountForm.addEventListener("submit", createAccountViaForm);

async function createAccountViaForm(e) {
  e.preventDefault();

  // Init message modals
  const signupSuccessModal = new bootstrap.Modal(
    document.getElementById("signupSuccessModal")
  );

  const signupErrorModal = new bootstrap.Modal(
    document.getElementById("signupErrorModal")
  );

  // Check if email already exists
  const email = document.getElementById("signupEmail").value.toLowerCase();

  var query = loginDetails.where("email", "==", email);
  let result = await query.get();
  if (!result.empty) {
    signupErrorModal.show();
    return;
  }

  // Hash Password for security
  const password = document.getElementById("signupPassword").value;
  const hash_result = await hashPassword(password);

  const data = {
    email: email,
    password: hash_result.hash,
    salt: hash_result.salt,
    mobile: document.getElementById("signupPhone").value,
    age: document.getElementById("signupAge").value,
    name: document.getElementById("signupName").value,
  };

  loginDetails.add(data);
  createAccountForm.reset();
  signupSuccessModal.show();
}

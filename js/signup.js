function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccountForm");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "mobile" &&
        e.target.value.length > 0 &&
        (e.target.value.length < 10 || e.target.value.length > 10)
      ) {
        setInputError(inputElement, "Mobile number should be 10 digits");
      }

      if (e.target.id === "age" && e.target.value < 18) {
        setInputError(inputElement, "You should be above 18 years");
      }
    });
  });
});

// Write data to firebase
import { loginDetails, firebaseSuccessMsg } from "./firebase.js";
import { hashPassword } from "./password-functions.js";

const createAccountForm = document.getElementById("createAccountForm");
createAccountForm.addEventListener("submit", createAccountViaForm);

async function createAccountViaForm(e) {
  e.preventDefault();

  // Check if email already exists
  const email = document.getElementById("email").value;
  var query = loginDetails.where("email", "==", email);
  let result = await query.get();
  if (!result.empty) {
    alert("Email already exists.");
    return;
  }

  // Hash Password for security
  const hash_result = await hashPassword(
    document.getElementById("password").value
  );

  const data = {
    email: document.getElementById("email").value.toLowerCase(),
    password: hash_result.hash,
    salt: hash_result.salt,
    mobile: document.getElementById("mobile").value,
    age: document.getElementById("age").value,
    name: document.getElementById("full_name").value,
  };

  loginDetails.add(data);

  firebaseSuccessMsg();
  createAccountForm.reset();
}

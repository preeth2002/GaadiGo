import { carRegister, firebaseSuccessMsg } from "./firebase.js";

const addCarForm = document.getElementById("addCarForm");
addCarForm.addEventListener("submit", addCarToFirebase);

function addCarToFirebase(e) {

  e.preventDefault();

  carRegister.add({
    owner_name: document.getElementById("owner_name").value,
    car_brand: document.getElementById("car_brand").value,
    car_model: document.getElementById("car_model").value,
    registration_number: document.getElementById("registration_number").value,
    odometer_reading: document.getElementById("odometer_reading").value,
    vehicle_type: document.getElementById("vehicle_type").value,
    fuel_type: document.getElementById("fuel_type").value,
    phone_number: document.getElementById("phone_number").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
  });

  firebaseSuccessMsg();
  addCarForm.reset();
}

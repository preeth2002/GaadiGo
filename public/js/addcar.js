import { carRegister, storage } from "./firebase.js";

addCarForm.addEventListener("submit", addCarToFirebase);

async function addCarToFirebase(e) {
  e.preventDefault();
  document.getElementById("add-car-submit-btn").disabled = true;

  const successModal = new bootstrap.Modal(
    document.getElementById("carRegisterSuccessModal")
  );
  const errorModal = new bootstrap.Modal(
    document.getElementById("carRegisterErrorModal")
  );

  const carBrand = document.getElementById("car-brand").value;
  const carModel = document.getElementById("car-model").value;
  const email = localStorage.getItem("email");

  let fileName = String(email + "_" + carBrand + "_" + carModel);
  var imageRef = storage.ref("car_images/" + fileName);

  const image = document.getElementById("image-upload").files[0];
  var uploadTask = await imageRef.put(image);

  await carRegister.add({
      owner_name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone_number: localStorage.getItem("phone"),
      car_brand: document.getElementById("car-brand").value,
      car_model: document.getElementById("car-model").value,
      registration_number: document.getElementById("car-registration").value,
      price: document.getElementById("rental-cost").value,
      odometer_reading: document.getElementById("odometer-reading-km").value,
      vehicle_type: document.getElementById("car-type").value,
      fuel_type: document.getElementById("fuel-type").value,
      address: document.getElementById("address").value,
      image_path: String(imageRef),
    })
    .then(() => {
      successModal.show();
    })
    .catch((error) => {
      console.log(error);
      errorModal.show();
    });
  addCarForm.reset();
}

// Car Image Preview
const carImage = document.getElementById("image-upload");
carImage.addEventListener("change", imagePreview);

function imagePreview() {
  const image = carImage;
  const imagePreview = document.getElementById("image-preview");
  const file = new FileReader();

  file.onload = function () {
    imagePreview.src = file.result;
  };

  file.readAsDataURL(image.files[0]);
}

// Load Placeholders in Form
window.addEventListener("load", () => {
  document.getElementById("email").placeholder = localStorage.getItem("email");
  document.getElementById("phone").placeholder = localStorage.getItem("phone");
});

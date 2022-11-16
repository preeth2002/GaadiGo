import { carRegister, getImageURL } from "./firebase.js";
await import("https://checkout.razorpay.com/v1/checkout.js");

const rzp_key_id = "rzp_test_iNNsOrUwyc5uZr";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const car_id = urlParams.get("car_id");
var globalData = null;

if (car_id == null || car_id == undefined) {
  window.location.href = "index.html";
}

window.addEventListener("load", () => {
  document.getElementById("name").value = localStorage.getItem("name");
  document.getElementById("email").value = localStorage.getItem("email");
  document.getElementById("phone").value = localStorage.getItem("phone");

  carRegister
    .doc(car_id)
    .get()
    .then(async (doc) => {
      let car = doc.data();
      globalData = car;
      car.imageUrl = await getImageURL(car.image_path);
      const card = createCard(car);
      var element = document.createElement("div");
      element.className = "col";
      element.innerHTML = card;
      document.getElementById("card-space").appendChild(element);
    });
});

export function createCard(params) {
  const card = `
        <div class="card shadow-lg mr-3 mb-2" style="width: 18rem;">
            <img src="${
              params.imageUrl
            }" class="card-img-top" height="200em" style="object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title mb-0">${params.car_brand} ${
    params.car_model
  }</h5>
                <!--- To inline, remove mb-2 from span and move the span elements into the h5 element --->
                <span class="badge mb-2 rounded-pill badge-primary text-bg-primary" style="vertical-align: middle; font-size: 10px;">${params.vehicle_type.toUpperCase()}</span>
                <span class="badge mb-2 rounded-pill badge-primary text-bg-warning" style="vertical-align: middle; font-size: 10px;">${params.fuel_type.toUpperCase()}</span>
                <p class="card-text">${params.address}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${params.registration_number}</li>
                <li class="list-group-item">${params.odometer_reading} km</li>
                <li class="list-group-item">Owned by ${params.owner_name}</li>
                <li class="list-group-item">Total Cost: <b>₹${
                  params.price
                }</b></li>
            </ul>
        </div>
      `;
  return card;
}

// Payment stuff

document.getElementById("checkout-button").addEventListener("click", (e) => {
  e.preventDefault();
  razorpay_pay();
});

function razorpay_pay() {
  console.log("Starting Razorpay");
  var name = localStorage.getItem("name");
  var email = localStorage.getItem("email");
  var phone = localStorage.getItem("phone");
  var info = globalData;
  var options = {
    key: rzp_key_id,
    payment_capture: 1,
    amount: info.price * 100,
    name: "GaadiGo",
    description: "Car Rental Fee for " + info.car_brand + " " + info.car_model,
    handler: function (response) {
      localStorage.setItem("rzp_data", JSON.stringify(response));
      rzp_payment_handler(
        response.razorpay_payment_id,
        info.price * 100,
        "INR"
      );
      console.log(response.razorpay_payment_id);
    },
    prefill: {
      name: name,
      email: email,
      contact: phone,
    },
    notes: info,
  };
  var rzp = new Razorpay(options);
  rzp.open();
}

const paymentSuccessModal = new bootstrap.Modal(
  document.getElementById("paymentSuccessModal")
);

const checkoutButton = document.getElementById("checkout-button");
const subTitle = document.getElementById("subTitle");

function rzp_payment_handler(rzp_pay_id, amount, currency) {
  var url = "/.netlify/functions/rzp_capture";
  var options = {
    method: "POST",
    redirect: "follow",
    contentType: "application/json",
    body: JSON.stringify({
      payment_id: rzp_pay_id,
      payment_amount: amount,
      payment_currency: currency,
    }),
  };
  fetch(url, options)
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => {
      console.log(err);
    });
  paymentSuccessModal.show();
  checkoutButton.disabled = true;
  checkoutButton.innerText = "Payment Successful ✔️";
  subTitle.innerText = "Thank you for your payment!";
}

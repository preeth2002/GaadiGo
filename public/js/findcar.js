import { carRegister, getImageURL } from "./firebase.js";
const auth_status = localStorage.getItem("authenticated");

window.addEventListener("load", () => {
  if(!auth_status) return;
  console.log("Loading cars...");
  carRegister.get().then((querySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      let car = doc.data();
      car.id = doc.id;
      car.imageUrl = await getImageURL(car.image_path);
      const card = createCard(car);
      var element = document.createElement("div");
      element.className = "col";
      element.innerHTML = card;
      document.getElementById("car-grid").appendChild(element);
    });
  });
});

// Repeated in checkout.js with minor change to remove button
function createCard(params) {
  const card = `
      <div class="card shadow-lg mr-3 mb-2" style="width: 18rem;">
          <img src="${params.imageUrl}" class="card-img-top" height="200em" style="object-fit: cover;">
          <div class="card-body">
              <h5 class="card-title mb-0">${params.car_brand} ${params.car_model}</h5>
              <!--- To inline, remove mb-2 from span and move the span elements into the h5 element --->
              <span class="badge mb-2 rounded-pill badge-primary text-bg-primary" style="vertical-align: middle; font-size: 10px;">${params.vehicle_type.toUpperCase()}</span>
              <span class="badge mb-2 rounded-pill badge-primary text-bg-warning" style="vertical-align: middle; font-size: 10px;">${params.fuel_type.toUpperCase()}</span>
              <p class="card-text">${params.address}</p>
          </div>
          <ul class="list-group list-group-flush">
              <li class="list-group-item">${params.registration_number}</li>
              <li class="list-group-item">${params.odometer_reading} km</li>
              <li class="list-group-item">Owned by ${params.owner_name}</li>
          </ul>
          <div class="card-body align-content-center">
              <button onclick="location.href = 'checkout.html?car_id=${params.id}';" class="btn btn-outline-primary btn-sm">Rent - ₹${params.price}</button>
          </div>
      </div>
    `;
  return card;
}

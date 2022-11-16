// Unload body main if user is not authenticated
document.addEventListener("DOMContentLoaded", () => {
  const errMsg = document.getElementsByTagName("unauthenticated-error");
  const main = document.getElementsByTagName("main")[0];
  const auth_status = localStorage.getItem("authenticated");

  if (!auth_status) {
    if (errMsg.length > 0) {
      main.remove();
      document.getElementById("unauthenticated-message").hidden = false;
    }
    document.getElementById("login-button").hidden = false;
    document.getElementById("logout-section").hidden = true;
  } else {
    document.getElementById("logged-in-user").innerHTML =
      localStorage.getItem("name");
    document.getElementById("login-button").hidden = true;
    document.getElementById("logout-section").hidden = false;
  }
});

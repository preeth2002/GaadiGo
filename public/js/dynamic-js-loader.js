// Workaround script to dynamically load js libraries that are not ES6 modules.
// Source: https://www.educative.io/answers/how-to-dynamically-load-a-js-file-in-javascript
export function loadJS(FILE_URL, async = true) {
  let scriptEle = document.createElement("script");

  scriptEle.setAttribute("src", FILE_URL);
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", async);

  document.head.appendChild(scriptEle);

  // success event
  scriptEle.addEventListener("load", () => {
    console.log("Loaded Argon2 from CDN");
  });
  // error event
  scriptEle.addEventListener("error", (ev) => {
    console.log("Error loading Argon2", ev);
  });
}

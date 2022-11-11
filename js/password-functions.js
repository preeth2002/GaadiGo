// Loading argon2-browser from CDN dynamically to reduce script tag imports in the HTML files.
// Import statement failed as the argon2-browser library is not an ES6 module.
import { loadJS } from "./dynamic-js-loader.js";
loadJS("https://cdnjs.cloudflare.com/ajax/libs/argon2-browser/1.18.0/argon2-bundled.min.js", false);

// Hash Password
export async function hashPassword(password) {
  const generated_salt = window.crypto.randomUUID();
  const hash = await argon2
    .hash({
      pass: password,
      salt: generated_salt,
      type: 2,
      hashLen: 64,
      time: 5,
    })
    .catch((err) => {
      console.log(err);
    });
  const response = {
    hash: hash.encoded,
    salt: generated_salt,
  };
  return response;
}

// Verify Password
export async function verifyPassword(password, hash) {
  return await argon2
    .verify({
      pass: password,
      encoded: hash,
    })
    .then(() => true)
    .catch((err) => {
      if (err.code === -35) {
        return false;
      } else {
        console.log(err);
        return false;
      }
    });
}

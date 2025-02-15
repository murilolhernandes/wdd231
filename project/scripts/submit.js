import { initializeHeaderAndFooter } from "./header-and-footer-module.js";
initializeHeaderAndFooter();

const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toLocaleString();

document.querySelector('form').addEventListener('submit', function(event) {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      sessionStorage.setItem('uploadedImage', e.target.result);
    };
    reader.readAsDataURL(file);
  }
});
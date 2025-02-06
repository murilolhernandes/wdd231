function lastModified() {
  const today = new Date();
  document.getElementById("currentYear").innerHTML = `&copy; ${today.getFullYear()} Rexburg Chamber of Commerce`;
  document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;
}

lastModified();
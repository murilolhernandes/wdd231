const today = new Date();
document.getElementById("currentYear").innerHTML = `©️ ${today.getFullYear()} | Murilo Luiz Hernandes | Idaho`;
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;

let webFilters = document.getElementById("filter");
let webCourses = document.getElementById("courses");

webFilters.innerHTML = `Hello there`;
webCourses.innerHTML = `Hello there2`;
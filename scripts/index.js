const today = new Date();
document.getElementById("currentYear").innerHTML = `©️ ${today.getFullYear()} | Murilo Luiz Hernandes | Idaho`;
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;


let filters = [
  {
    buttonName: "All",
    id: "all",
    class: "filters",
    ariaLabel: "All"
  }, 
  {
    buttonName: "CSE",
    id: "cse",
    class: "filters",
    ariaLabel: "CSE"
  }, 
  {
    buttonName: "WDD",
    id: "wdd",
    class: "filters",
    ariaLabel: "WDD"
  },
  {
    buttonName: "Finished",
    id: "finished",
    class: "filters",
    ariaLabel: "Finished"
  },
  {
    buttonName: "In Progress",
    id: "in-progress",
    class: "filters",
    ariaLabel: "In Progress"
  }
];

let courses = [
  {
    buttonName: "CSE 110",
    id: "cse110",
    class: "courses finished",
    ariaLabel: "CSE 110"
  },
  {
    buttonName: "WDD 130",
    id: "wdd130",
    class: "courses finished",
    ariaLabel: "WDD 130"
  },
  {
    buttonName: "CSE 111",
    id: "cse111",
    class: "courses finished",
    ariaLabel: "CSE 111"
  },
  {
    buttonName: "CSE 210",
    id: "cse210",
    class: "courses in-progress",
    ariaLabel: "CSE 210"
  },
  {
    buttonName: "WDD 131",
    id: "wdd131",
    class: "courses finished",
    ariaLabel: "WDD 131"
  },
  {
    buttonName: "WDD 231",
    id: "wdd231",
    class: "courses in-progress",
    ariaLabel: "WDD 231"
  }
];

let webFilters = document.getElementById("filter");
let webCourses = document.getElementById("courses");

createButtons(filters, webFilters);
createButtons(courses, webCourses);

function createButtons(array, container) {
  for (let i = 0; i < array.length; i++) {
    let id = array[i].id;
    let className = array[i].class;
    let ariaLabel = array[i].ariaLabel;
    let objectName = array[i].buttonName;
    container.innerHTML += `<button id="${id}" class="${className}" aria-label="${ariaLabel}">${objectName}</button>`;
  } 
}

function clearButtons() {
  webCourses.innerHTML = ``;
}

document.getElementById("all").addEventListener("click", () => {
  clearButtons();
  createButtons(courses, webCourses);
});

document.getElementById("cse").addEventListener("click", () => {
  const cse = courses.filter(course => {
    return course.id.startsWith("cse");
  });
  clearButtons();
  createButtons(cse, webCourses);
});

document.getElementById("wdd").addEventListener("click", () => {
  const wdd = courses.filter(course => {
    return course.id.startsWith("wdd");
  });
  clearButtons();
  createButtons(wdd, webCourses);
});

document.getElementById("finished").addEventListener("click", () => {
  const finished = courses.filter(course => {
    return course.class.endsWith("finished");
  });
  clearButtons();
  createButtons(finished, webCourses);
});

document.getElementById("in-progress").addEventListener("click", () => {
  const inProgress = courses.filter(course => {
    return course.class.endsWith("in-progress");
  });
  clearButtons();
  createButtons(inProgress, webCourses);
});
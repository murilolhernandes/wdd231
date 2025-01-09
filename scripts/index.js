const today = new Date();
document.getElementById("currentYear").innerHTML = `©️ ${today.getFullYear()} | Murilo Luiz Hernandes | Idaho`;
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;

const hamButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");
const header = document.querySelector("header");
const headerContainer = document.querySelector(".header-container");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
  header.classList.toggle("open");
  headerContainer.classList.toggle("open");
});

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

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: [
      'HTML',
      'CSS'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: [
      'C#'
    ],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: false
  }
]

let webFilters = document.getElementById("filter");
let webCourses = document.getElementById("courses");
let h3 = webCourses.appendChild(document.createElement("h3")).classList.add("credits");

createButtons();
createCourseList(courses);

function createCourseList(arrays) {
  for (let i = 0; i < arrays.length; i++) {
    let abbrev = `${arrays[i].subject} ${arrays[i].number}`;
    let totalCredits = arrays.reduce((acc, course) => acc + course.credits, 0);
    let id = abbrev.replace(" ", "");
    let ariaLabel = arrays[i].title;
    let status = arrays[i].completed;
    let classNames = `${arrays[i].subject} ${status}`;
    document.querySelector(".credits").innerHTML = `The total number of course listed below is ${totalCredits}`;
    webCourses.innerHTML += `<button id="${id}" class="course ${classNames}" aria-label="${ariaLabel}"><p>${abbrev}</p></button>`;
  };
}

function createButtons() {
  for (let i = 0; i < filters.length; i++) {
    let id = filters[i].id;
    let className = filters[i].class;
    let ariaLabel = filters[i].ariaLabel;
    let objectName = filters[i].buttonName;
    webFilters.innerHTML += `<button id="${id}" class="${className}" aria-label="${ariaLabel}">${objectName}</button>`;
  }
}

function clearButtons() {
  buttons = webCourses.querySelectorAll("button");
  buttons.forEach(button => {
    button.remove();
  })
}

document.getElementById("all").addEventListener("click", () => {
  clearButtons();
  createCourseList(courses);
});

document.getElementById("cse").addEventListener("click", () => {
  const cse = courses.filter(course => {
    return course.subject.includes("CSE");
  });
  clearButtons();
  createCourseList(cse);
});

document.getElementById("wdd").addEventListener("click", () => {
  const wdd = courses.filter(course => {
    return course.subject.includes("WDD");
  });
  clearButtons();
  createCourseList(wdd);
});

document.getElementById("finished").addEventListener("click", () => {
  const finished = courses.filter(course => {
    return course.completed;
  });
  clearButtons();
  createCourseList(finished);
});

document.getElementById("in-progress").addEventListener("click", () => {
  const inProgress = courses.filter(course => {
    return !course.completed;
  });
  clearButtons();
  createCourseList(inProgress);
});
import {
  appendToDisplay,
  calculateResult,
  clearLastElement,
  clearDisplay,
} from "./math-utils.js";

//Application Window Functionality
let mousePosition;
let offset = [0, 0];
let isDown = false;

const calculator = document.querySelector(".application");
const topBar = document.querySelector(".topbar");

topBar.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = [
      calculator.offsetLeft - e.clientX,
      calculator.offsetTop - e.clientY,
    ];
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isDown = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      calculator.style.left = mousePosition.x + offset[0] + "px";
      calculator.style.top = mousePosition.y + offset[1] + "px";
    }
  },
  true
);

//Close and Open Applications
const close = document.querySelector(".btn-close");
const icon = document.querySelector(".calculator-icon");

close.addEventListener("click", (e) => {
  e.preventDefault();
  calculator.classList.remove("active");
  calculator.classList.add("hidden");
});

icon.addEventListener("click", (e) => {
  e.preventDefault();
  calculator.classList.remove("hidden");
  calculator.classList.add("active");
});

//Time Setting
function updateDateTime() {
  const now = new Date();
  let hours = now.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const currentDateTime = `${hours}:${minutes} ${ampm}`;
  document.querySelector("#clock").textContent = currentDateTime;
}
setInterval(updateDateTime, 1000);

//Start Menu Functionality
const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("menu");

startBtn.addEventListener("click", () => {
  if (!startBtn.classList.contains("start-menu__border")) {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
  startBtn.classList.toggle("start-menu__border");
});

//Calculator Math

const calculatorButtons = document.querySelectorAll(".calculator-btn");
const clearResultButton = document.querySelector(".calculator-clear");
const clearLastEntry = document.querySelector(".calculator-clearlast");
const calculateResultButton = document.querySelector(".calculator-btn-result");

calculateResultButton.addEventListener("click", () => {
  calculateResult();
});

clearLastEntry.addEventListener("click", () => {
  clearLastElement();
});

clearResultButton.addEventListener("click", () => {
  clearDisplay();
});

calculatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    appendToDisplay(btn.textContent);
  });
});

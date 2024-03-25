import {
  appendToDisplay,
  calculateResult,
  clearLastElement,
  clearDisplay,
} from "./math-utils.js";

import { playSound } from "./drum-utils.js";

//Application Window Functionality

const calculator = document.getElementById("calculatorApplication");
const drumKit = document.getElementById("drumkit");
const notepad = document.getElementById("notepad");

let activeWindow = null;
let mousePositions = {};
let offsets = {};
let isDown = false;

calculator.addEventListener("mousedown", () => {
  calculator.style.zIndex = 2;
  drumKit.style.zIndex = 1;
  notepad.style.zIndex = 1;
});

drumKit.addEventListener("mousedown", () => {
  calculator.style.zIndex = 1;
  drumKit.style.zIndex = 2;
  notepad.style.zIndex = 1;
});

notepad.addEventListener("mousedown", () => {
  calculator.style.zIndex = 1;
  drumKit.style.zIndex = 1;
  notepad.style.zIndex = 2;
});

function handleMouseDown(windowId, element, e) {
  isDown = true;
  activeWindow = windowId;
  offsets[windowId] = [
    element.offsetLeft - e.clientX,
    element.offsetTop - e.clientY,
  ];
}

function handleMouseMove(windowId, element, e) {
  e.preventDefault();
  if (isDown && activeWindow === windowId) {
    mousePositions[windowId] = {
      x: e.clientX,
      y: e.clientY,
    };
    element.style.left =
      mousePositions[windowId].x + offsets[windowId][0] + "px";
    element.style.top =
      mousePositions[windowId].y + offsets[windowId][1] + "px";
  }
}

function handleMouseUp() {
  isDown = false;
  activeWindow = null;
}

function initializeWindowEvents(windowId, element, topBar) {
  topBar.addEventListener(
    "mousedown",
    function (e) {
      handleMouseDown(windowId, element, e);
    },
    true
  );

  document.addEventListener(
    "mousemove",
    function (e) {
      handleMouseMove(windowId, element, e);
    },
    true
  );

  document.addEventListener("mouseup", handleMouseUp, true);
}

const topBarCalculator = document.getElementById("topBarCalculator");
initializeWindowEvents("calculator", calculator, topBarCalculator);

const topBarDrumKit = document.getElementById("topBarDrumKit");
initializeWindowEvents("drumKit", drumKit, topBarDrumKit);

const topBarNotepad = document.getElementById("topBarNotepad");
initializeWindowEvents("notepad", notepad, topBarNotepad);

//Close and Open Applications
const closeButtonCalculator = document.getElementById("closeCalculator");
const closeButtonDrumKit = document.getElementById("closeDrumKit");
const closeButtonNotepad = document.getElementById("closeNotepad");
const calculatorIcons = document.querySelectorAll(".icon-calculator");
const drumkitIcons = document.querySelectorAll(".icon-drumkit");
const notepadIcons = document.querySelectorAll(".icon-notepad");

const textNotepad = document.getElementById("notepadDisplay");

closeButtonCalculator.addEventListener("click", (e) => {
  e.preventDefault();
  calculator.classList.add("hidden");
  calculator.classList.remove("active");
});

closeButtonDrumKit.addEventListener("click", (e) => {
  e.preventDefault();
  drumKit.classList.add("hidden");
  drumKit.classList.remove("active");
});

closeButtonNotepad.addEventListener("click", (e) => {
  e.preventDefault();
  notepad.classList.add("hidden");
  notepad.classList.remove("active");
});

drumkitIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    drumKit.style.zIndex = 2;
    calculator.style.zIndex = 1;
    notepad.style.zIndex = 1;
    drumKit.classList.remove("hidden");
    drumKit.classList.add("active");
    if (startBtn.classList.contains("start-menu__border")) {
      menu.style.display = "none";
      subMenu.classList.remove("active");
      isOpen = false;
      startBtn.classList.toggle("start-menu__border");
    }
  });
});

calculatorIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    calculator.style.zIndex = 2;
    drumKit.style.zIndex = 1;
    notepad.style.zIndex = 1;
    calculator.classList.remove("hidden");
    calculator.classList.add("active");
    if (startBtn.classList.contains("start-menu__border")) {
      menu.style.display = "none";
      subMenu.classList.remove("active");
      isOpen = false;
      startBtn.classList.toggle("start-menu__border");
    }
  });
});

notepadIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    calculator.style.zIndex = 1;
    drumKit.style.zIndex = 1;
    notepad.style.zIndex = 2;
    notepad.classList.remove("hidden");
    notepad.classList.add("active");
    if (startBtn.classList.contains("start-menu__border")) {
      menu.style.display = "none";
      subMenu.classList.remove("active");
      isOpen = false;
      startBtn.classList.toggle("start-menu__border");
    }
  });
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
const applications = document.querySelector(".menu-item-options");
const subMenu = document.querySelector(".menu-sub");
let isOpen = false;

startBtn.addEventListener("click", () => {
  if (!startBtn.classList.contains("start-menu__border")) {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
    subMenu.classList.remove("active");
    isOpen = false;
  }
  startBtn.classList.toggle("start-menu__border");
});

//    Sub-Menu

applications.addEventListener("click", () => {
  if (!isOpen) {
    subMenu.classList.add("active");
    isOpen = true;
  } else {
    subMenu.classList.remove("active");
    isOpen = false;
  }
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

// Drum Kit
window.addEventListener("keydown", playSound);

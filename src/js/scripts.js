import {
  appendToDisplay,
  calculateResult,
  clearLastElement,
  clearDisplay,
} from "./math-utils.js";

import { playSound } from "./drum-utils.js";

import { createBoard, resetBoard } from "./minesweeper-utils.js";

//Application Window Functionality

const calculator = document.getElementById("calculator");
const drumKit = document.getElementById("drumkit");
const notepad = document.getElementById("notepad");
const minesweeper = document.getElementById("minesweeper");

let activeWindow = null;
let mousePositions = {};
let offsets = {};
let isDown = false;

const windows = [calculator, drumKit, notepad, minesweeper];
windows.forEach((window) => {
  window.addEventListener("mousedown", () => {
    windows.forEach((w) => {
      w.style.zIndex = w === window ? 2 : 1;
    });
  });
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

const topBarMinesweeper = document.getElementById("topBarMinesweeper");
initializeWindowEvents("minesweeper", minesweeper, topBarMinesweeper);

const topBarCalculator = document.getElementById("topBarCalculator");
initializeWindowEvents("calculator", calculator, topBarCalculator);

const topBarDrumKit = document.getElementById("topBarDrumKit");
initializeWindowEvents("drumKit", drumKit, topBarDrumKit);

const topBarNotepad = document.getElementById("topBarNotepad");
initializeWindowEvents("notepad", notepad, topBarNotepad);

//Close and Open Applications

const closeButtons = document.querySelectorAll(".btn-close");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = button
      .getAttribute("id")
      .replace("close", "")
      .toLowerCase();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.classList.add("hidden");
      targetElement.classList.remove("active");
    }
    if (targetId === "minesweeper") {
      resetBoard();
    }
  });
});

const calculatorIcons = document.querySelectorAll(".icon-calculator");
const drumkitIcons = document.querySelectorAll(".icon-drumkit");
const notepadIcons = document.querySelectorAll(".icon-notepad");
const minesweeperIcons = document.querySelectorAll(".icon-minesweeper");

const iconTypes = {
  "icon-calculator": {
    icon: calculatorIcons,
    element: calculator,
    zIndex: 2,
  },
  "icon-drumkit": {
    icon: drumkitIcons,
    element: drumKit,
    zIndex: 2,
  },
  "icon-notepad": {
    icon: notepadIcons,
    element: notepad,
    zIndex: 2,
  },
  "icon-minesweeper": {
    icon: minesweeperIcons,
    element: minesweeper,
    zIndex: 2,
  },
};

Object.values(iconTypes).forEach(({ icon, element, zIndex }) => {
  icon.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      for (const { element: el } of Object.values(iconTypes)) {
        el.style.zIndex = 1;
      }
      element.style.zIndex = zIndex;
      element.classList.remove("hidden");
      element.classList.add("active");
      if (startBtn.classList.contains("start-menu__border")) {
        menu.style.display = "none";
        applicationsMenu.classList.remove("active");
        isOpen = false;
        startBtn.classList.toggle("start-menu__border");
      }
      if (element === minesweeper) {
        createBoard();
      }
    });
  });
});

//Time Setting
function updateDateTime() {
  const now = new Date();
  const options = { hour12: true, hour: "numeric", minute: "2-digit" };
  const time = now.toLocaleTimeString("EN-us", options);
  document.querySelector("#clock").textContent = time;
}
setInterval(updateDateTime, 1000);

//Start Menu Functionality
const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("menu");
const applications = document.querySelector(".menu-option-applications");
const games = document.querySelector(".menu-option-games");
const applicationsMenu = document.querySelector(".applications-sub");
const gamesMenu = document.querySelector(".games-sub");
let isOpen = false;

startBtn.addEventListener("click", () => {
  if (!startBtn.classList.contains("start-menu__border")) {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
    applicationsMenu.classList.remove("active");
    isOpen = false;
  }
  startBtn.classList.toggle("start-menu__border");
});

//    Sub-Menu

applications.addEventListener("click", () => {
  if (!isOpen) {
    applicationsMenu.classList.add("active");
    isOpen = true;
  } else {
    applicationsMenu.classList.remove("active");
    isOpen = false;
  }
});

games.addEventListener("click", () => {
  if (!isOpen) {
    gamesMenu.classList.add("active");
    isOpen = true;
  } else {
    gamesMenu.classList.remove("active");
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

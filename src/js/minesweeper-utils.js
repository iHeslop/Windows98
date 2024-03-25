const minesweeperGrid = document.querySelector(".minesweeper-grid");
const minesweeperBtn = document.querySelector(".minesweeper-controls-button");
const flagCount = document.querySelector(".minesweeper-controls-flags");
const timer = document.querySelector(".minesweeper-controls-timer");

let width = 10;
let squares = [];
let bombAmount = 20;
let isGameOver = false;
let flags = 0;
let sec = 0;
let timerStarted = false;
let isReset = false;

// Create game board
export const createBoard = () => {
  const bombsArray = Array(bombAmount).fill("minesweeper-bomb");
  const emptyArray = Array(width * width - bombAmount).fill(
    "minesweeper-valid"
  );
  const gameArray = emptyArray.concat(bombsArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("minesweeper-grid-square");
    square.setAttribute("id", i);
    square.classList.add(shuffledArray[i]);
    minesweeperGrid.appendChild(square);
    squares.push(square);

    square.addEventListener("click", (e) => {
      click(square);
    });

    square.oncontextmenu = (e) => {
      e.preventDefault();
      if (!timerStarted || isReset) {
        startTimer();
        timerStarted = true;
        isReset = false;
      }
      addFlag(square);
    };
    square.addEventListener("mousedown", () => {
      minesweeperBtn.innerHTML = "&#128558";
      const mouseUpListener = () => {
        minesweeperBtn.innerHTML = "&#128522";
        document.removeEventListener("mouseup", mouseUpListener);
      };
      document.addEventListener("mouseup", mouseUpListener);
    });
  }

  //add numbers
  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    const isLeftEdge = i % width === 0;
    const isRightEdge = i % width === width - 1;
    if (squares[i].classList.contains("minesweeper-valid")) {
      if (
        i > 0 &&
        !isLeftEdge &&
        squares[i - 1].classList.contains("minesweeper-bomb")
      ) {
        total++;
      }
      if (
        i > 9 &&
        !isRightEdge &&
        squares[i + 1 - width].classList.contains("minesweeper-bomb")
      ) {
        total++;
      }
      if (i > 10 && squares[i - width].classList.contains("minesweeper-bomb")) {
        total++;
      }
      if (
        i > 11 &&
        !isLeftEdge &&
        squares[i - 1 - width].classList.contains("minesweeper-bomb")
      ) {
        total++;
      }
      if (
        i < 98 &&
        !isRightEdge &&
        squares[i + 1].classList.contains("minesweeper-bomb")
      ) {
        total++;
      }
      if (
        i < 90 &&
        !isLeftEdge &&
        squares[i - 1 + width].classList.contains("minesweeper-bomb")
      ) {
        total++;
      }
      if (
        i < 88 &&
        !isRightEdge &&
        squares[i + 1 + width].classList.contains("minesweeper-bomb")
      ) {
        total++;
      }
      if (i < 89 && squares[i + width].classList.contains("minesweeper-bomb")) {
        total++;
      }

      squares[i].setAttribute("data", total);
    }
  }
};

// Add flag with left click
const addFlag = (square) => {
  if (isGameOver) return;
  if (!square.classList.contains("minesweeper-checked") && flags < bombAmount) {
    if (!square.classList.contains("minesweeper-flag")) {
      square.classList.add("minesweeper-flag");
      square.innerHTML = "	&#128681";
      flags++;
      checkForWin();
    } else {
      square.classList.remove("minesweeper-flag");
      square.innerHTML = "";
      flags--;
    }
  }
  updateFlagCount();
};

// Click square to check if bomb or not
const click = (square) => {
  let currentId = square.id;
  if (isGameOver) return;
  if (!timerStarted || isReset) {
    startTimer();
    timerStarted = true;
    isReset = false;
  }

  if (
    square.classList.contains("minesweeper-checked") ||
    square.classList.contains("minesweeper-flag")
  )
    return;
  if (square.classList.contains("minesweeper-bomb")) {
    gameOver(square);
  } else {
    let total = square.getAttribute("data");
    if (total != 0) {
      square.classList.add("minesweeper-checked");
      square.innerHTML = total;
      return;
    }
    checkSquare(square, currentId);
  }
  square.classList.add("minesweeper-checked");
};

// Check nearby squares
const checkSquare = (square, currentId) => {
  const isLeftEdge = currentId % width === 0;
  const isRightEdge = currentId % width === width - 1;

  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 9 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1 - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 10) {
      const newId = squares[parseInt(currentId) - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 11 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1 - width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 98 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 90 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) - 1 + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 88 && !isRightEdge) {
      const newId = squares[parseInt(currentId) + 1 + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 89) {
      const newId = squares[parseInt(currentId) + width].id;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
  }, 10);
};

// Function for game ending
const gameOver = (square) => {
  isGameOver = true;
  squares.forEach((square) => {
    if (square.classList.contains("minesweeper-bomb")) {
      square.classList.add("minesweeper-bomb-square");
      square.innerHTML = "&#128163";
      minesweeperBtn.innerHTML = "&#128565";
    }
  });
};

// Function for checking if you've won
const checkForWin = () => {
  let matches = 0;
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].classList.contains("minesweeper-flag") &&
      squares[i].classList.contains("minesweeper-bomb")
    ) {
      matches++;
    }
    if (matches === bombAmount) {
      isGameOver = true;
      minesweeperBtn.innerHTML = "&#128526;";
      squares.forEach((square) => {
        square.classList.add("minesweeper-checked");
        if (square.classList.contains("minesweeper-bomb")) {
          square.innerHTML = "&#128163;";
        }
      });
    }
  }
};

// Reset board back to base layout
export const resetBoard = () => {
  while (minesweeperGrid.firstChild) {
    minesweeperGrid.removeChild(minesweeperGrid.firstChild);
  }
  isGameOver = false;
  flags = 0;
  squares = [];

  updateFlagCount();
  resetTimer();
};

// Reset grid to base layout
export const resetGrid = () => {
  while (minesweeperGrid.firstChild) {
    minesweeperGrid.removeChild(minesweeperGrid.firstChild);
  }
  isGameOver = false;
  flags = 0;
  squares = [];
  updateFlagCount();
  resetTimer();
  timerStarted = false;
  createBoard();
};

// Updating central button depending on situation
minesweeperBtn.addEventListener("click", () => {
  minesweeperBtn.innerHTML = "&#128522";
  resetGrid();
});

// Updating visual flag count
const updateFlagCount = () => {
  flagCount.innerHTML = 20 - flags;
};

//Timer functions
const startTimer = () => {
  timer.innerHTML = sec;
  sec++;
  const ticker = setInterval(() => {
    timer.innerHTML = sec;
    sec++;
    if (isGameOver || isReset) {
      clearInterval(ticker);
      sec = 0;
    }
  }, 1000);
};

const resetTimer = () => {
  sec = 0;
  timer.innerHTML = sec;
  isReset = true;
};

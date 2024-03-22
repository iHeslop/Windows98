let currentDisplay = "0";
let resultDisplay = false;

export const appendToDisplay = (value) => {
  if (currentDisplay === "0" || resultDisplay) {
    currentDisplay = value;
  } else {
    currentDisplay += value;
  }
  resultDisplay = false;
  updateDisplay();
};

export const updateDisplay = () => {
  const displayElement = document.getElementById("calculatorDisplay");
  displayElement.textContent = currentDisplay;
};

export const calculateResult = () => {
  try {
    const result = eval(currentDisplay);
    currentDisplay = result.toString();
    updateDisplay();
  } catch (error) {
    currentDisplay += "\nError";
    updateDisplay();
  }
  resultDisplay = true;
};

export const clearLastElement = () => {
  currentDisplay = currentDisplay.slice(0, -1);
  if (currentDisplay === "") {
    currentDisplay = "0";
  }
  updateDisplay();
};

export const clearDisplay = () => {
  currentDisplay = "0";
  resultDisplay = false;
  updateDisplay();
};

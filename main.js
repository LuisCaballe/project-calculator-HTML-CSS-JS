let result;
let firstNumber = '';
let secondNumber = '';
let mathOperator = '';
let isAnotherNumber = false;

const display = document.querySelector('.calculator-screen');
display.textContent = '0';

const clearScreenAndValues = () => {
  display.textContent = '0';
  result = '';
  firstNumber = '';
  secondNumber = '';
  mathOperator = '';
  isAnotherNumber = false;
};

const removeLastNumber = () => {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent.length === 0) display.textContent = '0';
};

const addNegativeOrPositive = () => {
  display.textContent = -display.textContent;
};

const makePercentageOperation = () => {
  getAndDisplayResult();
  display.textContent /= 100;
};

const displayNumber = (number) => {
  if (display.textContent === 'Is not a number') clearScreenAndValues();
  if (!isAnotherNumber) {
    if (display.textContent === '0' && number !== '.') display.textContent = '';
    if (display.textContent === '0' && number === '.') display.textContent = '0';
  }
  if (isAnotherNumber) {
    firstNumber = display.textContent;
    if (mathOperator === '') clearScreenAndValues();
    if (number !== '.') display.textContent = '';
    if (number === '.') display.textContent = '0';
    isAnotherNumber = false;
  }
  if (display.textContent.includes('.') && number === '.') number = '';
  display.textContent += number;
};

const makeMathOperation = (operationSymbol) => {
  getAndDisplayResult();
  mathOperator = operationSymbol;
};

const getAndDisplayResult = () => {
  if (firstNumber !== '') {
    secondNumber = Number(display.textContent);
    firstNumber = Number(firstNumber);
    switch (mathOperator) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case 'x':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
    }
    if (Number.isNaN(result) || result === Infinity || result === -Infinity) result = 'Is not a number';
    display.textContent = result;
  }
  firstNumber = '';
  mathOperator = '';
  isAnotherNumber = true;
};

const closeCalculator = () => {
  const calculatorContainer = document.querySelector('.calculator');
  const farewellBox = document.querySelector('.farewell');
  calculatorContainer.setAttribute('hidden', '');
  farewellBox.removeAttribute('hidden');
};

const activateButtonOnKeyPress = (key) => {
  const buttons = document.getElementsByClassName(`calculator-button ${key}`);
  const button = buttons[0];
  button.className = 'calculator-button-active';
  setTimeout(() => {
    button.className = `calculator-button ${key}`;
  }, 50);
};

const activateButtonOperatorOnKeyPress = (key) => {
  const buttons = document.getElementsByClassName(`calculator-button operator ${key}`);
  const button = buttons[0];
  button.className = 'calculator-button-active';
  setTimeout(() => {
    button.className = `calculator-button operator ${key}`;
  }, 50);
};

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '1':
      activateButtonOnKeyPress(1);
      displayNumber(1);
      break;
    case '2':
      activateButtonOnKeyPress(2);
      displayNumber(2);
      break;
    case '3':
      activateButtonOnKeyPress(3);
      displayNumber(3);
      break;
    case '4':
      activateButtonOnKeyPress(4);
      displayNumber(4);
      break;
    case '5':
      activateButtonOnKeyPress(5);
      displayNumber(5);
      break;
    case '6':
      activateButtonOnKeyPress(6);
      displayNumber(6);
      break;
    case '7':
      activateButtonOnKeyPress(7);
      displayNumber(7);
      break;
    case '8':
      activateButtonOnKeyPress(8);
      displayNumber(8);
      break;
    case '9':
      activateButtonOnKeyPress(9);
      displayNumber(9);
      break;
    case '0':
      activateButtonOnKeyPress(0);
      displayNumber(0);
      break;
    case '.':
      activateButtonOnKeyPress('.');
      displayNumber('.');
      break;
    case '+':
      activateButtonOperatorOnKeyPress('+');
      makeMathOperation('+');
      break;
    case '-':
      activateButtonOperatorOnKeyPress('-');
      makeMathOperation('-');
      break;
    case 'x':
      activateButtonOperatorOnKeyPress('x');
      makeMathOperation('x');
      break;
    case '/':
      activateButtonOperatorOnKeyPress('/');
      makeMathOperation('/');
      break;
    case '=':
    case 'Enter':
      activateButtonOperatorOnKeyPress('=');
      getAndDisplayResult();
      break;
    case 'Backspace':
      activateButtonOnKeyPress('backspace');
      removeLastNumber();
      break;
    case 'Escape':
      activateButtonOnKeyPress('escape');
      clearScreenAndValues();
      break;
    case '%':
      activateButtonOnKeyPress('%');
      makePercentageOperation();
      break;
    case '_':
      activateButtonOnKeyPress('_');
      addNegativeOrPositive();
      break;
  }
});

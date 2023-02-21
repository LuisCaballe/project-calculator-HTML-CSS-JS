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

const activateKey = (key) => {
	const button = document.querySelector('.calculator-button.key-' + key);
	button.className = 'calculator-button-active';
	setTimeout(() => {
		button.className = 'calculator-button key-' + key;
	}, 50);
};

const activateKeyOperator = (key) => {
	const button = document.querySelector('.calculator-button.operator.' + '\\' + key);
	button.className = 'calculator-button-active';
	setTimeout(() => {
		button.className = 'calculator-button operator ' + key;
	}, 50);
};

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key >= 0 && key <= 9) { activateKey(key); displayNumber(key) }
  if (key === '.') { activateKey('Dot'); displayNumber(key) }
  if (key === 'Backspace') { activateKey(key); removeLastNumber() }
  if (key === 'Escape') { activateKey(key); clearScreenAndValues() }
  if (key === '%') { activateKey('Percentage'); makePercentageOperation() }
  if (key === '_') { activateKey(key); addNegativeOrPositive() }
  if (key === '+' || key === '-' || key === 'x' || key === '/') { activateKeyOperator(key); makeMathOperation(key) }
  if (key === 'Enter' || key === '=') { activateKeyOperator('='); getAndDisplayResult() }
});
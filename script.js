const resultElement = document.getElementById('result');
const expressionElement = document.getElementById('expression');
let currentInput = '0';
let previousInput = '';
let operator = '';
let expression = '';

const updateDisplay = () => {
  expressionElement.innerText = expression || '0';
  resultElement.innerText = currentInput;
};

const handleNumberClick = (number) => {
  if (currentInput === '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  expression += number;
  updateDisplay();
};

const handleOperatorClick = (op) => {
  if (currentInput !== '') {
    if (previousInput === '') {
      previousInput = currentInput;
    } else {
      calculate();
    }
    operator = op;
    expression += ` ${op} `;
    currentInput = '';
  }
  updateDisplay();
};

const calculate = () => {
  if (operator !== '' && previousInput !== '' && currentInput !== '') {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    switch (operator) {
      case '+':
        currentInput = (prev + curr).toString();
        break;
      case '-':
        currentInput = (prev - curr).toString();
        break;
      case '×':
        currentInput = (prev * curr).toString();
        break;
      case '÷':
        currentInput = (prev / curr).toString();
        break;
      default:
        return;
    }
    previousInput = currentInput;
    operator = '';
    updateDisplay();
  }
};

const clearAll = () => {
  currentInput = '0';
  previousInput = '';
  operator = '';
  expression = '';
  updateDisplay();
};

const handleDelete = () => {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
    expression = expression.slice(0, -1);
  } else {
    currentInput = '0';
    expression = expression.slice(0, -1);
  }
  updateDisplay();
};

const handleButtonClick = (e) => {
  const btn = e.target;
  const value = btn.innerText;

  if (btn.classList.contains('number')) {
    handleNumberClick(value);
  } else if (btn.classList.contains('operator')) {
    if (value === '=') {
      calculate();
    } else {
      handleOperatorClick(value);
    }
  } else if (btn.classList.contains('clear')) {
    clearAll();
  } else if (btn.classList.contains('delete')) {
    handleDelete();
  }
};

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

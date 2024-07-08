const calculatorScreen = document.getElementById('calculator-screen');
const keys = document.querySelector('.calculator-buttons');
let currentNumber = '0';
let previousNumber = '';
let operator = '';

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            break;
        case 'C':
            clear();
            break;
        case '←': // Adicionando o case para backspace
            backspace();
            break;
        default:
            inputNumber(value);
    }

    updateScreen();
});

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentNumber);

    if (operator && previousNumber) {
        calculate();
    } else {
        previousNumber = inputValue;
    }

    operator = nextOperator;
    currentNumber = '0';
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentNumber = String(result);
    operator = '';
    previousNumber = '';
}

function clear() {
    currentNumber = '0';
    previousNumber = '';
    operator = '';
}

function backspace() {
    currentNumber = currentNumber.slice(0, -1);
    if (currentNumber === '') {
        currentNumber = '0';
    }
}

function inputNumber(num) {
    if (currentNumber === '0') {
        currentNumber = num;
    } else {
        currentNumber += num;
    }
}

function updateScreen() {
    calculatorScreen.value = currentNumber;
}
document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.joud');
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    const buttons = Array.from(document.querySelectorAll('.calc-btn button'));

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function handleNumberClick(number) {
        if (currentInput.length < 10) {
            currentInput += number;
            updateDisplay();
        }
    }

    function handleOperatorClick(op) {
        if (currentInput === '') return;

        if (previousInput === '') {
            previousInput = currentInput;
            currentInput = '';
        } else {
            calculate();
            previousInput = currentInput;
            currentInput = '';
        }
        operator = op;
    }

    function calculate() {
        if (operator && previousInput !== '') {
            let result;
            let current = parseFloat(currentInput);
            let previous = parseFloat(previousInput);

            switch (operator) {
                case '+':
                    result = previous + current;
                    break;
                case '-':
                    result = previous - current;
                    break;
                case 'x':
                    result = previous * current;
                    break;
                case '÷':
                    if (current === 0) {
                        result = 'Error';
                    } else {
                        result = previous / current;
                    }
                    break;
                default:
                    return;
            }

            currentInput = result.toString();
            operator = null;
            previousInput = '';
            updateDisplay();
        }
    }

    function clearScreen() {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay();
    }

    function toggleSign() {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = '-' + currentInput;
        }
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('num')) {
                handleNumberClick(button.textContent);
            } else if (button.classList.contains('operator')) {
                handleOperatorClick(button.textContent);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('AC')) {
                clearScreen();
            } else if (button.classList.contains('neg-pos')) {
                toggleSign();
            }
        });
    });
});

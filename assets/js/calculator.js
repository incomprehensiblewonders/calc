// Переменные состояния
let expression = '';
let currentMode = 'normal';

// Функции калькулятора
function appendDigit(digit) {
    if (expression.length < 50) {
        expression += digit;
        updateDisplay();
    }
}

function appendOperator(op) {
    if (expression.length > 0) {
        expression += op;
        updateDisplay();
    }
}

function appendBracket(bracket) {
    expression += bracket;
    updateDisplay();
}

function appendFunc(func) {
    switch(func) {
        case 'pow':
            expression += '^';
            break;
        case 'sqrt':
            expression += 'sqrt(';
            break;
        case 'sin':
            expression += 'sin(';
            break;
        case 'cos':
            expression += 'cos(';
            break;
        case 'tan':
            expression += 'tan(';
            break;
        case 'log':
            expression += 'log10(';
            break;
        case 'ln':
            expression += 'log(';
            break;
        case 'fact':
            expression += '!';
            break;
        case 'pi':
            expression += '3.141592653589793';
            break;
        case 'e':
            expression += '2.718281828459045';
            break;
    }
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = expression || '0';
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function handleEquals() {
    try {
        let expr = expression
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log10/g, 'Math.log10')
            .replace(/log/g, 'Math.log')
            .replace(/\^/g, '**')
            .replace(/(\d+)!/g, (match, num) => factorial(parseInt(num)));
        
        const result = eval(expr);
        if (isFinite(result)) {
            expression = result.toFixed(8).replace(/\.?0+$/, '');
        } else {
            expression = 'Ошибка';
        }
        updateDisplay();
        showPaywall();
    } catch (e) {
        expression = 'Ошибка';
        updateDisplay();
    }
}

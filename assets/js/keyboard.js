// Обработчик ввода с клавиатуры
function handleKeyboardInput(event) {
    const key = event.key;
    
    // Проверяем открыто ли окно подтверждения платежа
    const confirmPaymentModal = document.getElementById('confirmPaymentModal');
    if (confirmPaymentModal && confirmPaymentModal.classList.contains('active')) {
        const smsCodeInput = document.getElementById('smsCode');
        if (smsCodeInput && document.activeElement === smsCodeInput) {
            // Обработка ввода кода
            if (/^[0-9]$/.test(key)) {
                // Цифра
                const currentValue = smsCodeInput.value;
                if (currentValue.length < 6) {
                    smsCodeInput.value = currentValue + key;
                    event.preventDefault();
                    
                    // Если введено 6 цифр - автоматически отправляем
                    if (smsCodeInput.value.length === 6) {
                        setTimeout(() => {
                            confirmPaymentWithCode();
                        }, 2000);
                    }
                }
            } else if (key === 'Backspace') {
                // Удалить последний символ
                smsCodeInput.value = smsCodeInput.value.slice(0, -1);
                event.preventDefault();
            }
        }
        return;
    }
    
    // Игнорируем ввод если открыто другое модальное окно
    const modal = document.getElementById('paywallModal');
    const paymentModal = document.getElementById('paymentModal');
    if (modal.classList.contains('active') || paymentModal.classList.contains('active')) {
        return;
    }
    
    // Для режима обычного и инженерного калькулятора
    if (currentMode === 'normal' || currentMode === 'engineer') {
        if (/^[0-9]$/.test(key)) {
            // Цифры 0-9
            appendDigit(key);
            event.preventDefault();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            // Операторы
            appendOperator(key === '*' ? '*' : key === '/' ? '/' : key === '+' ? '+' : '-');
            event.preventDefault();
        } else if (key === '.') {
            // Точка для десятичных чисел
            appendOperator('.');
            event.preventDefault();
        } else if (key === 'Enter') {
            // Enter для вычисления
            handleEquals();
            event.preventDefault();
        } else if (key === 'Backspace') {
            // Backspace для удаления последнего символа
            expression = expression.slice(0, -1);
            updateDisplay();
            event.preventDefault();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            // Escape или C для очистки
            clearDisplay();
            event.preventDefault();
        } else if ((event.shiftKey && key === '9')) {
            // ( - открывающая скобка
            if (currentMode === 'engineer') {
                appendBracket('(');
                event.preventDefault();
            }
        } else if ((event.shiftKey && key === '0')) {
            // ) - закрывающая скобка
            if (currentMode === 'engineer') {
                appendBracket(')');
                event.preventDefault();
            }
        } else if (key === '(' && currentMode === 'engineer') {
            appendBracket('(');
            event.preventDefault();
        } else if (key === ')' && currentMode === 'engineer') {
            appendBracket(')');
            event.preventDefault();
        }
    }
    // Для режима систем счисления
    else if (currentMode === 'numeral') {
        let inputElement = null;
        let allowedChars = '';
        
        if (currentNumeralSystem === 'binary') {
            inputElement = document.getElementById('binary-input');
            allowedChars = '01';
        } else if (currentNumeralSystem === 'octal') {
            inputElement = document.getElementById('octal-input');
            allowedChars = '01234567';
        } else if (currentNumeralSystem === 'decimal') {
            inputElement = document.getElementById('decimal-input');
            allowedChars = '0123456789';
        } else if (currentNumeralSystem === 'hex') {
            inputElement = document.getElementById('hex-input');
            allowedChars = '0123456789ABCDEFabcdef';
        }
        
        if (inputElement && inputElement.style.display !== 'none') {
            if (allowedChars.includes(key)) {
                // Вставляем символ в Input
                inputElement.value += key.toUpperCase();
                event.preventDefault();
            } else if (key === 'Enter') {
                // Enter для конвертации
                convertNumeral();
                event.preventDefault();
            } else if (key === 'Backspace') {
                // Backspace для удаления последнего символа
                inputElement.value = inputElement.value.slice(0, -1);
                event.preventDefault();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                // Escape или C для очистки
                inputElement.value = '';
                event.preventDefault();
            }
        }
    }
}

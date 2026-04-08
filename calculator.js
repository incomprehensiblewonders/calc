let expression = '';
let selectedPlan = null;
let currentMode = 'normal';
let hasEngineeringAccess = false;
let hasNumeralAccess = false;
let hasPaid = false;
let currentNumeralSystem = 'decimal';
let selectedCard = null;
let savedCards = [];
let isAddingCard = false;

// Инициализация обработчика клавиатуры
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', handleKeyboardInput);
    // Инициализируем блок выбора карточки
    document.querySelector('.card-info-title').textContent = '🏦 Нет карточки';
    document.querySelector('.card-info-number').textContent = 'Карта: Добавьте новую';
});

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

function setMode(mode) {
    if (mode === 'engineer' && !hasEngineeringAccess) {
        document.getElementById('expressionText').textContent = 'Инженерный калькулятор требует плана "Инженерный"';
        document.getElementById('paywallModal').classList.add('active');
        return;
    }
    
    if (mode === 'numeral' && !hasNumeralAccess) {
        document.getElementById('expressionText').textContent = 'Калькулятор систем счисления требует плана "Системы счисления"';
        document.getElementById('paywallModal').classList.add('active');
        return;
    }
    
    currentMode = mode;
    document.getElementById('normalBtn').classList.toggle('active', mode === 'normal');
    document.getElementById('engineerBtn').classList.toggle('active', mode === 'engineer');
    document.getElementById('numeralBtn').classList.toggle('active', mode === 'numeral');
    document.getElementById('normalButtons').style.display = mode === 'normal' ? 'grid' : 'none';
    document.getElementById('engineerButtons').style.display = mode === 'engineer' ? 'grid' : 'none';
    document.getElementById('numeralButtons').style.display = mode === 'numeral' ? 'grid' : 'none';
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

function showPaywall() {
    if (!hasPaid && expression && expression !== 'Ошибка') {
        document.getElementById('expressionText').textContent = `Результат: ${expression}`;
        document.getElementById('paywallModal').classList.add('active');
    }
}

function closePaywall() {
    document.getElementById('paywallModal').classList.remove('active');
    document.getElementById('cardModal').classList.remove('active');
    document.getElementById('confirmPaymentModal').classList.remove('active');
    selectedPlan = null;
    document.getElementById('monthlyPlan').classList.remove('selected');
    document.getElementById('yearlyPlan').classList.remove('selected');
    document.getElementById('engineeringPlan').classList.remove('selected');
    document.getElementById('numeralPlan').classList.remove('selected');
    document.getElementById('superPlan').classList.remove('selected');
}

function selectPlan(type, price) {
    selectedPlan = { type, price };
    
    document.getElementById('monthlyPlan').classList.remove('selected');
    document.getElementById('yearlyPlan').classList.remove('selected');
    document.getElementById('engineeringPlan').classList.remove('selected');
    document.getElementById('numeralPlan').classList.remove('selected');
    document.getElementById('superPlan').classList.remove('selected');
    
    if (type === 'monthly') {
        document.getElementById('monthlyPlan').classList.add('selected');
    } else if (type === 'yearly') {
        document.getElementById('yearlyPlan').classList.add('selected');
    } else if (type === 'engineering') {
        document.getElementById('engineeringPlan').classList.add('selected');
    } else if (type === 'numeral') {
        document.getElementById('numeralPlan').classList.add('selected');
    } else if (type === 'super') {
        document.getElementById('superPlan').classList.add('selected');
    }
}

function showPaymentForm() {
    if (!selectedPlan) {
        alert('Пожалуйста, выберите план перед оплатой');
        return;
    }
    
    if (!selectedCard) {
        alert('Пожалуйста, добавьте карточку для оплаты');
        document.getElementById('paywallModal').classList.remove('active');
        openCardModal();
        return;
    }
    
    // Переходим сразу на окно подтверждения платежа
    openConfirmPaymentModal();
}

function openConfirmPaymentModal() {
    if (!selectedCard || !selectedPlan) return;
    
    // Получаем информацию о плане
    let planName = selectedPlan.type === 'monthly' ? 'Месячный' : 
                  selectedPlan.type === 'yearly' ? 'Годовой' : 
                  selectedPlan.type === 'engineering' ? 'План "Инженер"' : 
                  selectedPlan.type === 'numeral' ? 'План "Программист"' : 'Супер план';
    
    // Заполняем информацию о платеже
    document.getElementById('confirmAmount').textContent = '$' + selectedPlan.price;
    document.getElementById('confirmCard').textContent = '•••• •••• •••• ' + selectedCard.number.slice(-4);
    document.getElementById('confirmPlan').textContent = planName;
    
    // Очищаем поле SMS-кода
    document.getElementById('smsCode').value = '';
    
    // Закрываем предыдущие модали и открываем новую
    document.getElementById('paymentModal').classList.remove('active');
    document.getElementById('paywallModal').classList.remove('active');
    document.getElementById('cardModal').classList.remove('active');
    document.getElementById('confirmPaymentModal').classList.add('active');
    
    // Фокусируем на поле кода
    setTimeout(() => {
        document.getElementById('smsCode').focus();
    }, 300);
}

function closeConfirmPayment() {
    document.getElementById('confirmPaymentModal').classList.remove('active');
    document.getElementById('smsCode').value = '';
}

function confirmPaymentWithCode() {
    const smsCode = document.getElementById('smsCode').value.trim();
    
    if (!smsCode || smsCode.length !== 6) {
        alert('Пожалуйста, введите 6-значный код');
        return;
    }
    
    // Имитируем проверку кода (в реальном приложении проверка на сервере)
    if (!/^\d{6}$/.test(smsCode)) {
        alert('Код должен содержать только цифры');
        return;
    }
    
    // Код верный, обрабатываем платеж
    document.getElementById('confirmPaymentModal').classList.remove('active');
    processPayment();
}

function closePaymentForm() {
    document.getElementById('paymentModal').classList.remove('active');
    document.getElementById('confirmPaymentModal').classList.remove('active');
    isAddingCard = false;
    // Восстанавливаем окно в режим платежа
    document.getElementById('paymentTitle').textContent = '🔒 Безопасная оплата';
    document.getElementById('paymentAmount').style.display = 'block';
    document.getElementById('paymentFormTitle').textContent = 'Введите данные вашей карты';
    document.getElementById('payBtn').textContent = '✓ Оплатить';
    document.getElementById('payBtn').onclick = function() { processPayment(); };
}

function processPaymentOrAddCard() {
    if (isAddingCard) {
        // Режим добавления новой карточки
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiry = document.getElementById('expiry').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        const cardName = document.getElementById('cardName').value.trim();
        
        if (!cardNumber || !expiry || !cvv || !cardName) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Генерируем ID для новой карточки
        const cardId = 'card_' + Date.now();
        
        // Определяем иконку и тип карты
        let icon = '💳';
        if (cardNumber.startsWith('4')) icon = '🏦'; // VISA
        else if (cardNumber.startsWith('5')) icon = '💳'; // MasterCard
        else if (cardNumber.startsWith('3')) icon = '🎫'; // Амекс
        
        // Сохраняем карточку
        const newCard = {
            id: cardId,
            name: cardName,
            number: cardNumber,
            icon: icon
        };
        
        savedCards.push(newCard);
        selectedCard = newCard;
        
        // Обновляем отображение в основном окне
        document.querySelector('.card-info-title').textContent = '🏦 ' + cardName;
        document.querySelector('.card-info-number').textContent = 'Карта: •••• •••• •••• ' + cardNumber.slice(-4);
        
        // Очищаем форму
        document.getElementById('cardNumber').value = '1234 5678 9012 3456';
        document.getElementById('expiry').value = '12/28';
        document.getElementById('cvv').value = '123';
        document.getElementById('cardName').value = 'IVAN PETROV';
        
        isAddingCard = false;
        document.getElementById('paymentModal').classList.remove('active');
        
        // Показываем сообщение об успехе
        alert('✓ Карточка ' + cardName + ' успешно добавлена!');
        
        // Открываем окно выбора карточек
        document.getElementById('paymentModal').classList.remove('active');
        openCardModal();
    } else {
        // Режим платежа
        processPayment();
    }
}

function processPayment() {
    if (!selectedPlan) return;
    
    const amount = selectedPlan.price;
    hasPaid = true;
    
    if (selectedPlan.type === 'engineering') {
        hasEngineeringAccess = true;
        document.getElementById('engineerBtn').classList.remove('locked');
        document.getElementById('engineerBtn').querySelector('.lock-badge').textContent = '';
    }
    
    if (selectedPlan.type === 'numeral') {
        hasNumeralAccess = true;
        document.getElementById('numeralBtn').classList.remove('locked');
        document.getElementById('numeralBtn').querySelector('.lock-badge').textContent = '';
    }
    
    if (selectedPlan.type === 'super') {
        hasEngineeringAccess = true;
        hasNumeralAccess = true;
        document.getElementById('engineerBtn').classList.remove('locked');
        document.getElementById('engineerBtn').querySelector('.lock-badge').textContent = '';
        document.getElementById('numeralBtn').classList.remove('locked');
        document.getElementById('numeralBtn').querySelector('.lock-badge').textContent = '';
    }
    
    let planName = selectedPlan.type === 'monthly' ? 'Месячный' : 
                  selectedPlan.type === 'yearly' ? 'Годовой' : 
                  selectedPlan.type === 'engineering' ? 'Инженерный' : 
                  selectedPlan.type === 'numeral' ? 'Системы счисления' : 'Супер план';
    
    document.getElementById('successText').innerHTML = `Платеж на сумму $${amount} успешно обработан!<br><br>🎉 Ваш план: ${planName}<br><br>Спасибо за покупку!`;
    
    document.getElementById('paymentModal').classList.remove('active');
    document.getElementById('successMessage').classList.add('active');
}

function closeSuccess() {
    document.getElementById('successMessage').classList.remove('active');
    clearDisplay();
    selectedPlan = null;
}

// Функции для калькулятора систем счисления
function switchNumeral(system) {
    currentNumeralSystem = system;
    
    // Скрыть все вводы
    document.getElementById('binary-input').style.display = 'none';
    document.getElementById('octal-input').style.display = 'none';
    document.getElementById('decimal-input').style.display = 'none';
    document.getElementById('hex-input').style.display = 'none';
    
    // Показать нужный ввод
    if (system === 'binary') {
        document.getElementById('binary-input').style.display = 'block';
        document.getElementById('binary-input').focus();
    } else if (system === 'octal') {
        document.getElementById('octal-input').style.display = 'block';
        document.getElementById('octal-input').focus();
    } else if (system === 'decimal') {
        document.getElementById('decimal-input').style.display = 'block';
        document.getElementById('decimal-input').focus();
    } else if (system === 'hex') {
        document.getElementById('hex-input').style.display = 'block';
        document.getElementById('hex-input').focus();
    }
}

function convertNumeral() {
    let decimalValue = 0;
    
    try {
        if (currentNumeralSystem === 'binary') {
            const binaryInput = document.getElementById('binary-input').value.trim();
            if (!binaryInput || !binaryInput.match(/^[01]+$/)) throw new Error('Invalid binary');
            decimalValue = parseInt(binaryInput, 2);
        } else if (currentNumeralSystem === 'octal') {
            const octalInput = document.getElementById('octal-input').value.trim();
            if (!octalInput || !octalInput.match(/^[0-7]+$/)) throw new Error('Invalid octal');
            decimalValue = parseInt(octalInput, 8);
        } else if (currentNumeralSystem === 'decimal') {
            const decimalInput = document.getElementById('decimal-input').value.trim();
            if (!decimalInput || !decimalInput.match(/^[0-9]+$/)) throw new Error('Invalid decimal');
            decimalValue = parseInt(decimalInput, 10);
        } else if (currentNumeralSystem === 'hex') {
            const hexInput = document.getElementById('hex-input').value.trim().toUpperCase();
            if (!hexInput || !hexInput.match(/^[0-9A-F]+$/)) throw new Error('Invalid hex');
            decimalValue = parseInt(hexInput, 16);
        }
        
        // Обновляем результаты
        document.getElementById('decimal-result').textContent = decimalValue;
        document.getElementById('output-binary').textContent = decimalValue.toString(2);
        document.getElementById('output-octal').textContent = decimalValue.toString(8);
        document.getElementById('output-decimal').textContent = decimalValue.toString(10);
        document.getElementById('output-hex').textContent = decimalValue.toString(16).toUpperCase();
        
    } catch (e) {
        document.getElementById('decimal-result').textContent = 'Ошибка';
        document.getElementById('output-binary').textContent = '0';
        document.getElementById('output-octal').textContent = '0';
        document.getElementById('output-decimal').textContent = '0';
        document.getElementById('output-hex').textContent = '0';
    }
}

function copyToClipboard() {
    const hexValue = document.getElementById('output-hex').textContent;
    if (hexValue !== '0' && hexValue !== 'Ошибка') {
        navigator.clipboard.writeText(hexValue).then(() => {
            alert('✓ Скопировано: ' + hexValue);
        }).catch(() => {
            alert('Ошибка при копировании');
        });
    }
}

// Функции для управления карточками
function openCardModal() {
    document.getElementById('cardModal').classList.add('active');
    displaySavedCards();
}

function closeCardModal() {
    document.getElementById('cardModal').classList.remove('active');
}

function displaySavedCards() {
    const cardsList = document.getElementById('cardsList');
    cardsList.innerHTML = '';
    
    if (savedCards.length === 0) {
        cardsList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">У вас пока нет сохраненных карточек</p>';
        return;
    }
    
    savedCards.forEach((card) => {
        const lastDigits = card.number.slice(-4);
        const cardElement = document.createElement('div');
        cardElement.className = 'card-option' + (selectedCard && selectedCard.id === card.id ? ' selected' : '');
        cardElement.id = card.id;
        cardElement.onclick = () => selectSavedCard(card);
        cardElement.innerHTML = `
            <div class="card-option-icon">${card.icon}</div>
            <div class="card-option-details">
                <div class="card-option-name">${card.name}</div>
                <div class="card-option-number">•••• •••• •••• ${lastDigits}</div>
            </div>
            <div class="card-option-checkmark">✓</div>
        `;
        cardsList.appendChild(cardElement);
    });
}

function selectSavedCard(card) {
    selectedCard = card;
    document.querySelector('.card-info-title').textContent = '🏦 ' + card.name;
    document.querySelector('.card-info-number').textContent = 'Карта: •••• •••• •••• ' + card.number.slice(-4);
    displaySavedCards();
}

function openAddCardForm() {
    isAddingCard = true;
    document.getElementById('cardModal').classList.remove('active');
    document.getElementById('paymentTitle').textContent = '💳 Добавить новую карточку';
    document.getElementById('paymentAmount').style.display = 'none';
    document.getElementById('paymentFormTitle').textContent = 'Введите данные вашей карты';
    document.getElementById('payBtn').textContent = '✓ Добавить карточку';
    document.getElementById('payBtn').onclick = function() { processPaymentOrAddCard(); };
    document.getElementById('paymentModal').classList.add('active');
}

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

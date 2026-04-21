// Переменные состояния для платежей
let selectedPlan = null;
let hasPaid = false;

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

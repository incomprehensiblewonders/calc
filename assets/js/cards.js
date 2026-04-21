// Переменные состояния для карточек
let selectedCard = null;
let savedCards = [];
let isAddingCard = false;

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

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', handleKeyboardInput);
    // Инициализируем блок выбора карточки
    document.querySelector('.card-info-title').textContent = '🏦 Нет карточки';
    document.querySelector('.card-info-number').textContent = 'Карта: Добавьте новую';
});

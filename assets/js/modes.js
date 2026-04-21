// Переменные состояния для режимов
let hasEngineeringAccess = false;
let hasNumeralAccess = false;
let currentNumeralSystem = 'decimal';

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

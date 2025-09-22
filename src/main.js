// Инициализация модального окна и валидации формы
// Инициализация модального окна и валидации формы
document.addEventListener('DOMContentLoaded', function() {
    initModal();
    initImageFallback();
    highlightActivePage(); // Добавьте эту строку
});

// Модальное окно с улучшенной валидацией
function initModal() {
    const dlg = document.getElementById('contactDialog');
    const openBtn = document.getElementById('openDialog');
    const closeBtn = document.getElementById('closeDialog');
    const form = document.getElementById('contactForm');
    
    if (openBtn && dlg) {
        openBtn.addEventListener('click', function() {
            dlg.showModal();
        });
    }
    
    if (closeBtn && dlg) {
        closeBtn.addEventListener('click', function() {
            dlg.close();
            resetFormValidation();
        });
    }
    
    if (form) {
        // Валидация в реальном времени
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Обработчик отправки формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                alert('Форма успешно отправлена!');
                form.reset();
                resetFormValidation();
                if (dlg) dlg.close();
            }
        });
    }
}

// Валидация отдельного поля
function validateField(field) {
    const errorElement = field.nextElementSibling;
    
    // Проверка обязательных полей
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, errorElement, 'Это поле обязательно для заполнения');
        return false;
    }
    
    // Специфические проверки
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showError(field, errorElement, 'Введите корректный email адрес');
            return false;
        }
    }
    
    if (field.id === 'phone' && field.value) {
        const phoneRegex = /^(\+7|8)[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (!phoneRegex.test(field.value)) {
            showError(field, errorElement, 'Введите корректный номер телефона');
            return false;
        }
    }
    
    if (field.id === 'name' && field.value && field.value.length < 2) {
        showError(field, errorElement, 'Имя должно содержать минимум 2 символа');
        return false;
    }
    
    if (field.id === 'message' && field.value && field.value.length < 10) {
        showError(field, errorElement, 'Сообщение должно содержать минимум 10 символов');
        return false;
    }
    
    // Если все проверки пройдены
    clearFieldError(field);
    return true;
}

// Показать ошибку
function showError(field, errorElement, message) {
    field.setAttribute('aria-invalid', 'true');
    if (errorElement && errorElement.classList.contains('form__error')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Очистить ошибку
function clearFieldError(field) {
    field.setAttribute('aria-invalid', 'false');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('form__error')) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Сброс валидации формы
function resetFormValidation() {
    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            clearFieldError(input);
        });
    }
}

// Заглушка для изображения
function initImageFallback() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Проверяем, загрузилось ли изображение
        if (img.complete && img.naturalHeight === 0) {
            replaceWithFallback(img);
        } else {
            img.addEventListener('error', function() {
                replaceWithFallback(this);
            });
            // Также проверяем при загрузке
            img.addEventListener('load', function() {
                if (this.naturalHeight === 0) {
                    replaceWithFallback(this);
                }
            });
        }
    });
}

// Замена на заглушку
function replaceWithFallback(img) {
    // Простая SVG заглушка без китайских символов
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNGRjNGNEY2Ii8+PHRleHQgeD0iNzUiIHk9Ijc1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
    img.alt = 'Изображение не загружено';
    img.style.border = '2px dashed #ccc';
    img.onerror = null;
}
// Подсветка активной страницы в навигации
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Удаляем класс active у всех ссылок
        link.classList.remove('active');
        
        // Добавляем класс active текущей странице
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // Для главной страницы (index.html)
        if (currentPage === '' || currentPage === 'index.html') {
            if (linkPage === 'index.html') {
                link.classList.add('active');
            }
        }
    });
}
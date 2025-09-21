// Простая и надежная смена темы
document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку переключения темы
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    
    // Применяем сохраненную тему или системную
    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
        themeToggle.textContent = '☀️';
    } else if (savedTheme === 'light') {
        document.body.classList.remove('theme-dark');
        themeToggle.textContent = '🌙';
    } else {
        // Системная тема по умолчанию
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('theme-dark');
            themeToggle.textContent = '☀️';
        }
    }
    
    // Обработчик клика по кнопке
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('theme-dark');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
});

// Модальное окно
document.addEventListener('DOMContentLoaded', function() {
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
        });
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Форма успешно отправлена!');
            form.reset();
            if (dlg) dlg.close();
        });
    }
});

// Заглушка для изображения, если оно не найдено
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.onerror = function() {
            // Если картинка не загрузилась, создаем SVG заглушку
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjY2NjYiPua1i+ivleS4uuWbvueJhzwvdGV4dD4KPC9zdmc+';
            this.alt = 'Изображение не загружено';
        };
    });
});
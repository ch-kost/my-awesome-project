// theme.js — надёжный, с логами и авто-добавлением кнопки, если её нет
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'site-theme'; // 'dark' или 'light'
  const body = document.body;

  console.log('[theme] script loaded');

  // Найдём кнопку по id или по классу. Если нет — создадим и вставим в themeContainer.
  let btn = document.getElementById('themeToggle') || document.querySelector('.theme-toggle');
  let icon = null;

  if (!btn) {
    const container = document.getElementById('themeContainer');
    if (container) {
      btn = document.createElement('button');
      btn.id = 'themeToggle';
      btn.className = 'theme-toggle';
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('title', 'Переключить тему');
      btn.innerHTML = '<span id="themeIcon">☀️</span>';
      container.appendChild(btn);
      console.log('[theme] created theme button inside #themeContainer');
    } else {
      console.warn('[theme] no theme button and no #themeContainer — theme toggle will not be visible');
    }
  }

  icon = document.getElementById('themeIcon') || (btn && btn.querySelector('#themeIcon'));

  // безопасная установка localStorage (в try/catch для приватного режима)
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { console.warn('[theme] cannot access localStorage', e); }
  }
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function applyTheme(mode, save = false) {
    if (mode === 'dark') {
      body.classList.add('dark');
      if (btn) btn.setAttribute('aria-pressed', 'true');
      if (icon) icon.textContent = '🌙';
    } else {
      body.classList.remove('dark');
      if (btn) btn.setAttribute('aria-pressed', 'false');
      if (icon) icon.textContent = '☀️';
    }
    if (save) safeSet(STORAGE_KEY, mode);
    console.log('[theme] applied theme:', mode);
  }

  // Инициализация: localStorage -> system preference -> light
  const saved = safeGet(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved, false);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark', false);
  } else {
    applyTheme('light', false);
  }

  // если system preference изменился и пользователь не сохранял явный выбор, меняем автоматически
  if (window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener?.('change', (e) => {
      if (!safeGet(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  // Обработчик клика — работает даже если кнопка была создана динамически
  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = body.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark', true); // сохранить выбор
    });
  } else {
    console.warn('[theme] button not found, cannot attach click handler');
  }

  // Отладочная команда в консоли: window.siteTheme.set('dark'|'light')
  window.siteTheme = {
    set: (mode) => applyTheme(mode, true),
    clear: () => { try { localStorage.removeItem(STORAGE_KEY); console.log('[theme] cleared saved theme'); } catch(e){} }
  };
});

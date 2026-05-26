import { OMO_TRANSLATIONS } from '../i18n/translations';

document.addEventListener('DOMContentLoaded', () => {
  initializePreferences();
  bindControls();
  addNavbarScrollBehavior();
});

function initializePreferences() {
  const storedTheme = localStorage.getItem('omo-theme');
  const storedLanguage = localStorage.getItem('omo-language');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));
  applyLanguage(storedLanguage || document.documentElement.lang || 'es');
}

function bindControls() {
  document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage((btn as HTMLElement).dataset.langSwitch!);
    });
  });
}

function applyTheme(theme: string) {
  const t = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.classList.add('theme-switching');
  document.documentElement.dataset.theme = t;
  localStorage.setItem('omo-theme', t);

  document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
    const el = toggle as HTMLElement;
    el.dataset.themeState = t;
    const icon = el.querySelector('.theme-toggle-icon');
    if (icon) icon.textContent = t === 'dark' ? '☀' : '☾';
  });

  window.clearTimeout((window as typeof window & { __omoThemeTimer?: number }).__omoThemeTimer);
  (window as typeof window & { __omoThemeTimer?: number }).__omoThemeTimer = window.setTimeout(() => {
    document.documentElement.classList.remove('theme-switching');
  }, 320);
}

function applyLanguage(language: string) {
  const lang = language === 'en' ? 'en' : 'es';
  const page = document.body.dataset.page as string;
  const translations = OMO_TRANSLATIONS[page]?.[lang];

  document.documentElement.lang = lang;
  localStorage.setItem('omo-language', lang);

  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    const el = btn as HTMLElement;
    el.classList.toggle('is-active', el.dataset.langSwitch === lang);
  });

  if (!translations) return;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    if (translations[key]) el.textContent = translations[key];
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml!;
    if (translations[key]) el.innerHTML = translations[key];
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-alt]').forEach((el) => {
    const key = el.dataset.i18nAlt!;
    if (translations[key]) el.setAttribute('alt', translations[key]);
  });

  if (translations['meta.title']) document.title = translations['meta.title'];
}

function addNavbarScrollBehavior() {
  const navbar = document.querySelector<HTMLElement>('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    navbar.style.transform = scrollTop <= 50 ? 'translateY(-100%)' : 'translateY(0)';
  });
}

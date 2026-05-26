import { OMO_TRANSLATIONS } from '../i18n/translations';

document.addEventListener('DOMContentLoaded', initializeApp);
document.addEventListener('astro:page-load', initializeApp);

function initializeApp() {
  initializePreferences();
  bindControls();
  addNavbarScrollBehavior();
  initializeHistoriaPage();
}

function initializePreferences() {
  const storedTheme = localStorage.getItem('omo-theme');
  const storedLanguage = localStorage.getItem('omo-language');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));
  applyLanguage(storedLanguage || document.documentElement.lang || 'es');
}

function bindControls() {
  document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
    const el = toggle as HTMLElement & { dataset: DOMStringMap };
    if (el.dataset.boundThemeToggle === 'true') return;
    el.dataset.boundThemeToggle = 'true';

    toggle.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    const el = btn as HTMLElement & { dataset: DOMStringMap };
    if (el.dataset.boundLangSwitch === 'true') return;
    el.dataset.boundLangSwitch = 'true';

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
  const state = window as typeof window & {
    __omoNavbarScrollInit?: boolean;
    __omoNavbarScrollHandler?: () => void;
  };

  const syncNavbar = () => {
    const navbar = document.querySelector<HTMLElement>('.navbar');
    if (!navbar) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    navbar.style.transform = scrollTop <= 50 ? 'translateY(-100%)' : 'translateY(0)';
  };

  syncNavbar();

  if (state.__omoNavbarScrollInit) return;
  state.__omoNavbarScrollInit = true;
  state.__omoNavbarScrollHandler = syncNavbar;
  window.addEventListener('scroll', syncNavbar);
}

function initializeHistoriaPage() {
  if (document.body.dataset.page !== 'story') return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      revealTimelineNodes();
      bindHistoriaLightbox();
      ensureTimelineVisibilityFallback();
    });
  });
}

function revealTimelineNodes() {
  const nodes = document.querySelectorAll<HTMLElement>('.timeline-node');
  if (!nodes.length) return;

  nodes.forEach((node) => node.classList.remove('timeline-node--visible'));

  if (!('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('timeline-node--visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('timeline-node--visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  nodes.forEach((node) => observer.observe(node));
}

function ensureTimelineVisibilityFallback() {
  window.setTimeout(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.timeline-node');
    if (!nodes.length) return;

    const anyVisible = Array.from(nodes).some((node) =>
      node.classList.contains('timeline-node--visible'),
    );

    if (!anyVisible) {
      nodes.forEach((node) => node.classList.add('timeline-node--visible'));
    }
  }, 260);
}

function bindHistoriaLightbox() {
  const lightbox = document.getElementById('omo-lightbox');
  const lightboxImage = document.getElementById('omo-lightbox-img') as HTMLImageElement | null;
  const lightboxCaption = document.getElementById('omo-lightbox-caption');
  const closeButton = lightbox?.querySelector<HTMLElement>('.omo-lightbox-close');

  if (!lightbox || !lightboxImage || !lightboxCaption || !closeButton) return;

  document.querySelectorAll<HTMLElement>('.timeline-thumb-btn').forEach((button) => {
    if (button.dataset.boundTimelineLightbox === 'true') return;
    button.dataset.boundTimelineLightbox = 'true';

    button.addEventListener('click', () => {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      lightboxImage.src = theme === 'dark'
        ? (button.dataset.lightboxSrcDark || button.dataset.lightboxSrc || '')
        : (button.dataset.lightboxSrcLight || button.dataset.lightboxSrc || '');
      lightboxImage.alt = button.dataset.lightboxCaption || '';
      lightboxCaption.textContent = button.dataset.lightboxCaption || '';
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.classList.add('omo-lightbox--open');
    });
  });

  if (closeButton.dataset.boundTimelineLightboxClose !== 'true') {
    closeButton.dataset.boundTimelineLightboxClose = 'true';
    closeButton.addEventListener('click', closeHistoriaLightbox);
  }

  if ((lightbox as HTMLElement).dataset.boundTimelineLightboxOverlay !== 'true') {
    (lightbox as HTMLElement).dataset.boundTimelineLightboxOverlay = 'true';
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeHistoriaLightbox();
    });
  }

  const state = window as typeof window & { __omoHistoriaEscBound?: boolean };
  if (!state.__omoHistoriaEscBound) {
    state.__omoHistoriaEscBound = true;
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeHistoriaLightbox();
    });
  }
}

function closeHistoriaLightbox() {
  const lightbox = document.getElementById('omo-lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('omo-lightbox--open');
  lightbox.setAttribute('aria-hidden', 'true');
}

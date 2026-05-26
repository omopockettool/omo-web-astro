# Changelog — omo-web-astro

## [1.0.0] — 2026-05-25

Primera versión del sitio web de OMO migrado a Astro. Reemplaza el proyecto vanilla HTML/CSS/JS anterior (`omo-web-app`).

### Stack

- **Astro 6** — framework de sitio estático
- **Tailwind CSS 4** — sistema de diseño base
- **TypeScript** — tipado en scripts y traducciones
- **Node 26 / npm 11**

### Estructura

```
src/
  i18n/translations.ts     — todas las traducciones ES/EN centralizadas
  layouts/BaseLayout.astro — shell HTML compartido (head, fuentes, script principal)
  components/
    Navbar.astro            — navbar de home (oculta hasta scroll)
    NavbarBack.astro        — navbar de páginas interiores con botón volver
    Footer.astro            — footer reutilizable
  scripts/omo.ts           — lógica cliente: dark mode, i18n, scroll navbar
  styles/global.css        — CSS unificado (fusión de styles.css + 4 CSS de páginas)
  pages/
    index.astro             — home (hero, filosofía, catálogo, historia strip)
    omoni.astro             — detalle OMONI (Pocket Tool Nº 1)
    historia.astro          — timeline Mi Historia con animación IntersectionObserver
    glosario.astro          — glosario de términos del ecosistema OMO
    terms.astro             — términos de uso
    privacy.astro           — política de privacidad
public/
  assets/                  — imágenes, iconos, logo
  clips/                   — vídeo OMONI
  manifest.json
```

### Cambios respecto a omo-web-app

- **CSS unificado** — 5 archivos CSS fragmentados (`styles.css`, `omoni_styles.css`, `historia_styles.css`, `glosario_styles.css`, `legal_styles.css`) fusionados en un único `global.css`
- **Componentes reales** — navbar, footer y layout extraídos como componentes Astro reutilizables; elimina la necesidad de `common/footer.js` inyectando HTML manualmente
- **Traducciones tipadas** — `OMO_TRANSLATIONS` movido de `script.js` a `src/i18n/translations.ts` con tipado TypeScript
- **Sin flash de dark mode** — script inline en `<head>` aplica el tema desde `localStorage` antes del primer paint, eliminando el parpadeo blanco al navegar entre páginas
- **Rutas limpias** — `/omoni`, `/historia`, `/glosario`, `/terms`, `/privacy` en lugar de `/pages/*.html`
- **Build estático** — `npm run build` genera HTML estático listo para deploy en Netlify, Vercel o GitHub Pages

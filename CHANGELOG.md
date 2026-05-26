# Changelog — omo-web-astro

## [1.1.0] — 2026-05-27

Refinamiento visual y estructural del sitio de OMO, con foco en branding, catálogo, ficha de OMONI, timeline de historia y normalización de assets.

### Branding y navegación

- **Navbar con logos por tema** — el logo de OMO ahora cambia automáticamente entre `omo-negro` y `omo-blanco` según light/dark mode
- **Favicon unificado** — pestaña del navegador y `manifest.json` actualizados para usar el nuevo logo negro de OMO
- **Tema más fluido** — mejora de transición visual al cambiar entre dark y light para que fondos, bordes y texto animen de forma más sincronizada

### OMONI

- **Icono correcto en landing y detalle** — OMONI ahora usa `public/assets/pocket-tools/omoni.png`
- **Catálogo tappable** — la card completa de OMONI en home es navegable; se elimina el botón `Conocer más` y se sustituye por una flecha integrada
- **Cabecera refinada** — tamaños responsive ajustados para logo, icono, badge de App Store y navbar en móvil
- **How it works** — añadida la sección completa de flujo de uso de OMONI
- **Vídeo actualizado** — nuevo clip `public/clips/omoni-en-accion.mov`
- **Badge App Store corregido** — el SVG fue recortado y reescalado para que ocupe mejor su espacio real

### Historia

- **Assets reorganizados** — imágenes de la timeline movidas a `public/assets/historia/`
- **Rutas reparadas** — todas las referencias de `historia.astro` actualizadas al nuevo directorio
- **Nuevas imágenes clave** — `On My Own`, `Dennis 2023` y `OMO` sustituyen placeholders o versiones anteriores
- **OMO por tema** — la imagen final de OMO cambia entre negro y blanco según el tema activo
- **Etiquetas Fig. unificadas** — captions de imágenes normalizados con formato `Fig. 0X`
- **CTA final ajustado** — `Ver el ecosistema` ahora respira mejor y queda centrado al final de la historia

### Assets

- **Naming normalizado** — nombres de imágenes unificados a minúsculas y `kebab-case`
- **Extensiones consistentes** — archivos `.JPG` renombrados a `.jpg`
- **Limpieza de nombres** — se corrigen espacios, guiones bajos y nombres inconsistentes como:
  - `grocery_android.png` → `grocery-android.png`
  - `onmyown.png` → `on-my-own.png`
  - `omo-ni-flutter.png` → `omoni-flutter.png`
  - `dashboard v1.png` → `dashboard-v1.png`
  - `ilustration_1.png` → `illustration-1.png`
  - `landing_2023.png` → `landing-2023.png`
  - `omo_logo.png` → `omo-logo-zoom.png`

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

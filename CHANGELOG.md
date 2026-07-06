# Changelog — omo-web-astro

## [1.6.1] — 2026-07-06

Corrección de la sección "Cómo funciona" de `/omoni`, que describía un flujo desactualizado respecto a la app real (grupos, dashboard, modos de entrada, nombres de pantallas).

### Cómo funciona (`/omoni`)

- **Paso "Dashboard"** — ya no dice que da visión de "tus grupos"; ahora refleja que muestra el gasto de hoy/mes por categorías del grupo activo, con opción de cambiar de grupo
- **Paso "Añade un gasto"** — reescrito para reflejar los modos reales **Simple** y **Lista**: el importe solo existe como campo único en modo Simple (en modo Lista se añade por artículo), orden de los ejemplos corregido (importe antes que nombre, igual que en el formulario real) y categorías de ejemplo ajustadas a las que la app crea por defecto (`Hogar`, `Alimentación`)
- **"Métodos de pago" → "Orígenes de pago"** — renombrado para coincidir con el término usado en la app
- **Pasos fusionados** — "Marca lo pagado", "Orígenes de pago" y "Tus datos, tu nube" se combinan en un único paso final, reduciendo la sección de 6 a 4 pasos
- **Sección colapsable** — "Cómo funciona" ahora es un desplegable (`<details>`) cerrado por defecto; el vídeo "Mira OMONI en acción" se muestra primero
- Cambios aplicados en `es`/`en` (`translations.ts`) y en el contenido estático del `.astro`

## [1.6.0] — 2026-07-04

Refuerzo legal de Privacidad y Términos para cubrir vacíos de RGPD y buenas prácticas ante Apple/App Store.

### Privacidad

- **Responsable del tratamiento identificado** — nueva línea en la cabecera con nombre y contacto
- **Nueva sección "Menores de edad"** — OMO/OMONI no dirigidos a menores de 16 años
- **Derechos ampliados** — se añaden portabilidad, oposición y limitación, además del derecho a reclamar ante la AEPD (u autoridad de control equivalente en la UE)
- **Compartición con terceros** — se menciona explícitamente el proveedor de hosting del sitio
- Renumeración de secciones (5 a 9) para acomodar los cambios

### Términos

- **Nueva sección "Edad mínima"** — 16 años como requisito de uso
- **Nueva sección "Terminación"** — condiciones para dejar de usar el servicio o perder el acceso
- **Nueva sección "Ley aplicable y jurisdicción"** — legislación española como marco legal
- Renumeración de secciones (2 a 12) para acomodar los cambios

## [1.5.0] — 2026-07-04

Nueva página pública de Soporte, requerida para completar la ficha de OMONI en App Store Connect (Support URL).

### Support

- **Página `/support`** — FAQ básico (backup/export de datos, eliminar datos, funciones en desarrollo, uso offline), sección para reportar problemas y tarjeta de contacto con email
- **Footer actualizado** — nuevo link `Soporte` en todas las páginas, distinto del link de Donaciones
- **i18n** — nuevo namespace `support` (es/en) y clave `footer.help` añadida a todas las páginas

## [1.4.0] — 2026-07-04

Renombre de concepto: `uxOS` reemplazado por `Diseño Centrado en la Vida` / `Life-Centered Design` en todo el sitio, por ser un término más claro y menos técnico que el acrónimo anterior.

### Glosario

- **Entrada renombrada** — `uxOS` pasa a ser `Diseño Centrado en la Vida` (es) / `Life-Centered Design` (en), reordenada alfabéticamente antes de `OMO`
- **Definición reescrita** — se elimina la expansión de acrónimo `User Experience Operating System`; la definición ahora describe un enfoque de diseño, no un sistema operativo
- **Cita de uso ajustada** — de `"OMO es el primer ecosistema construido bajo..."` a `"OMO sigue los principios del Diseño Centrado en la Vida"`, para no afirmar ser el primero

### Home e Historia

- **Heading de la sección "El ecosistema OMO"** actualizado en `index.astro`
- **Timeline 2025** — título, párrafo y chip de `historia.astro` actualizados

### i18n

- **Claves renombradas** — `uxos.*` → `lcd.*` en `translations.ts` (es/en)

## [1.3.0] — 2026-06-08

Refinamiento visual de la card `Más pocket tools en camino` en home para transmitir mejor calma, anticipación y continuidad del ecosistema OMO.

### Home

- **Placeholder animado del catálogo** — la segunda card del catálogo ahora usa una matriz completa de cuadrados grises con la silueta `OMO` integrada
- **Barrido suave en loop** — la forma `OMO` se activa en verde con un barrido horizontal continuo y luego vuelve a gris para mantener una sensación más limpia
- **Más aire en la composición** — se amplió la grilla con espacio extra arriba y abajo para que la animación respire mejor dentro del contenedor
- **Markup más mantenible** — la matriz se genera desde `index.astro` a partir de coordenadas, en lugar de escribir manualmente cada cuadrado en el HTML

## [1.2.0] — 2026-05-27

Ajuste de navegación y transición entre catálogo, detalle de OMONI y página de historia.

### OMONI

- **Transición nativa entre home y detalle** — navegación refinada con transiciones de Astro entre la card del catálogo y la ficha de OMONI
- **Vuelta coherente al catálogo** — el botón `Volver al catálogo` en la ficha de OMONI ahora apunta directamente a `/#catalog`

### Historia

- **Timeline estabilizada con Astro transitions** — la aparición de los containers y el lightbox de `Mi Historia` ahora se reinicializan correctamente al navegar entre páginas

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

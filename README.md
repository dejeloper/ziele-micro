# Ziele — El Micrófono de la Demanda

Landing page del proyecto **Ziele**: un canal para que empresas y personas cuenten, en sus propias palabras, qué proceso les está costando tiempo, dinero o esfuerzo. La página no vende software ni pide que el usuario diseñe una solución — su único objetivo es abrir una conversación por WhatsApp.

> No construimos productos para buscar usuarios. Construimos productos alrededor de problemas que ya están siendo expresados por suficientes usuarios.

## Objetivo del proyecto

Ziele es la puerta de entrada a un sistema de descubrimiento y validación de demanda: **Problema → descubrimiento → evidencia → demanda → validación → solución → software → cliente**. La landing es solo el primer eslabón — su función es conseguir que alguien con un problema real diga _"quiero contarles lo que me está pasando"_ y continúe la conversación por WhatsApp. El contexto completo del producto (propuesta de valor, chatbot, flujo de conversión, distribución) está documentado en [`docs/`](./docs).

## Stack

- [Astro](https://astro.build) 7 — generador de sitio estático
- [Tailwind CSS](https://tailwindcss.com) 4 (vía `@tailwindcss/vite`)
- [GSAP](https://gsap.com) 3 (`ScrollTrigger`) — animaciones de entrada y scroll
- TypeScript (`astro/tsconfigs/strict`)
- Gestor de paquetes: **pnpm**

## Prerrequisitos

- Node.js `>= 22.12.0`
- [pnpm](https://pnpm.io) instalado globalmente

## Instalación y ejecución local

```sh
pnpm install
pnpm dev
```

El sitio queda disponible en `http://localhost:4321`.

> En este proyecto se prefiere levantar el servidor en segundo plano: `astro dev --background`, y gestionarlo con `astro dev stop` / `astro dev status` / `astro dev logs` (ver [`AGENTS.md`](./AGENTS.md)).

## Variables de entorno

El proyecto no requiere variables de entorno actualmente. `.env` y `.env.production` están contemplados en `.gitignore` por si se necesitan en el futuro (por ejemplo, para credenciales de un backend de conversión o analítica).

## Estructura del proyecto

```text
/
├── docs/                        # Documentación de producto (propósito, landing, chatbot, flujo, distribución)
├── public/
│   ├── favicon.svg
│   └── images/                  # Imágenes estáticas (og:image, ilustraciones de sección)
├── src/
│   ├── components/
│   │   ├── SectionContainer.astro   # Wrapper genérico de sección (flex + id de anclaje)
│   │   ├── WhatsAppButton.astro     # CTA reutilizable hacia wa.me con mensaje precargado
│   │   ├── layout/
│   │   │   ├── SiteHead.astro       # Meta tags, Open Graph, Twitter Card, JSON-LD
│   │   │   ├── SiteHeader.astro     # Header fijo con logo + CTA de WhatsApp
│   │   │   └── SiteFooter.astro     # Pie de página y crédito
│   │   └── sections/                # Una sección de la landing por archivo
│   │       ├── HeroSection.astro
│   │       ├── PropuestaSection.astro
│   │       ├── PreguntasSection.astro
│   │       ├── ComoFuncionaSection.astro
│   │       ├── ParaQuienSection.astro
│   │       ├── ConfianzaSection.astro
│   │       └── CtaFinalSection.astro
│   ├── lib/
│   │   ├── gsap.ts              # Punto único de registro de GSAP (`registerPlugin`, `matchMedia`, `revealOnScroll`, `prefersReducedMotion`)
│   │   └── dom.ts               # Helpers `$` / `$$` de selección DOM e `isDocumentScrollKey`
│   ├── pages/
│   │   └── index.astro          # Compone layout + secciones (única ruta del sitio)
│   ├── styles/
│   │   └── global.css           # Import de Tailwind + `color-scheme: dark`
│   └── env.d.ts
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

`index.astro` es intencionalmente delgado: solo importa y ordena los componentes de `layout/` y `sections/`. Cada sección de la landing vive en su propio archivo, con sus propios datos (arrays de contenido) y, cuando aplica, su propia animación GSAP.

## Deploy

No hay pipeline de CI/CD configurado todavía. El flujo actual es manual:

```sh
pnpm build      # genera ./dist como HTML/CSS/JS estático
pnpm preview    # revisión local antes de publicar
```

`./dist` puede publicarse en cualquier hosting estático (Netlify, Vercel, GitHub Pages, S3 + CDN, etc.) sin necesidad de un runtime de Node en producción.

## Guía de contribución

No se ha definido una metodología de contribución para el proyecto, y no se tiene estipulado aun si se abrirá dicha opción.

## Licencia

No se ha definido una licencia pública para este proyecto.

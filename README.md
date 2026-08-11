# Ziele — El Micrófono de la Demanda

Landing page del proyecto **Ziele**: un canal para que empresas y personas cuenten, en sus propias palabras, qué proceso les está costando tiempo, dinero o esfuerzo. La página no vende software ni pide que el usuario diseñe una solución — su único objetivo es abrir una conversación por WhatsApp.

> No construimos productos para buscar usuarios. Construimos productos alrededor de problemas que ya están siendo expresados por suficientes usuarios.

## Objetivo del proyecto

Ziele es la puerta de entrada a un sistema de descubrimiento y validación de demanda: **Problema → descubrimiento → evidencia → demanda → validación → solución → software → cliente**. La landing es solo el primer eslabón — su función es conseguir que alguien con un problema real diga *"quiero contarles lo que me está pasando"* y continúe la conversación por WhatsApp. El contexto completo del producto (propuesta de valor, chatbot, flujo de conversión, distribución) está documentado en [`docs/`](./docs).

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

## Funcionalidad principal

La landing es de una sola página (`/`) con las siguientes secciones, en orden:

1. **Hero** — pregunta directa ("¿Qué proceso te está costando tiempo o dinero?") y CTA a WhatsApp
2. **Propuesta** — los tres pilares del proyecto (te escuchamos, te ayudamos, sabemos construir)
3. **Preguntas orientadoras** — preguntas que ayudan al usuario a identificar su problema
4. **Cómo funciona** — pasos del proceso, de la conversación a la posible construcción
5. **Para quién** — filtro de audiencia (prioridad a problemas empresariales/operativos)
6. **Confianza** — mensaje de honestidad sobre la etapa del proyecto
7. **CTA final** — última invitación a escribir por WhatsApp

Todo el flujo de conversión apunta a un único mecanismo: el botón `WhatsAppButton`, que arma un enlace `wa.me` con número y mensaje precargado configurables por props.

## Ejemplo de uso

Reutilizar el botón de WhatsApp con un mensaje distinto en cualquier sección nueva:

```astro
---
import WhatsAppButton from "@/components/WhatsAppButton.astro";
---

<WhatsAppButton
  label="Quiero contarles lo que me está pasando"
  mobileLabel="Escríbenos"
  message="Hola, quiero contarles un problema que estoy teniendo."
/>
```

Agregar una animación de scroll reutilizando el helper central de GSAP:

```ts
import { $$ } from "@/lib/dom";
import { mm, breakpoints, revealOnScroll } from "@/lib/gsap";

mm.add(breakpoints, () => {
  $$(".mi-tarjeta").forEach((el, i) =>
    revealOnScroll(el, { y: 24, delay: i * 0.1 }),
  );
});
```

## Tests

El proyecto no tiene suite de tests configurada actualmente.

## Scripts disponibles

| Comando         | Acción                                             |
| :--------------- | :-------------------------------------------------- |
| `pnpm install`    | Instala las dependencias                            |
| `pnpm dev`        | Levanta el servidor de desarrollo en `localhost:4321` |
| `pnpm build`      | Genera el sitio estático en `./dist/`                |
| `pnpm preview`    | Sirve el build de `./dist/` para revisión previa a deploy |
| `pnpm astro ...`  | Ejecuta comandos del CLI de Astro (`astro add`, `astro check`, `astro dev stop`, etc.) |

## Decisiones técnicas relevantes

- **Sitio 100% estático**: no hay backend ni SSR; toda la conversión ocurre fuera del sitio, en WhatsApp.
- **Componentes por sección**: cada bloque de la landing es un componente independiente en `src/components/sections/`, con sus propios datos y animaciones — facilita reordenar, quitar o agregar secciones sin tocar un archivo monolítico.
- **GSAP centralizado**: `registerPlugin(ScrollTrigger)` y la instancia de `gsap.matchMedia()` se crean una sola vez en `src/lib/gsap.ts`; los distintos componentes importan ese módulo (Vite lo deduplica) en vez de reinicializar GSAP cada uno. `breakpoints` define `isMobile` **e** `isDesktop` explícitamente porque `matchMedia().add()` de GSAP solo dispara el callback si al menos una condición coincide — con un solo breakpoint la animación no se ejecutaba en el ancho contrario.
- **`prefersReducedMotion`**: las animaciones respetan la preferencia de accesibilidad `prefers-reduced-motion` del sistema operativo del usuario.
- **Helpers `$` / `$$`**: envoltorios tipados sobre `querySelector`/`querySelectorAll` para evitar selectores string sueltos dentro de las llamadas a GSAP.
- **`select-none` global**: el `<body>` desactiva la selección de texto con el mouse en toda la página (decisión de producto, no técnica).
- **Tailwind v4 vía plugin de Vite**: configurado en `astro.config.mjs`, sin archivo `tailwind.config.js` (Tailwind 4 usa configuración basada en CSS, ver `src/styles/global.css`).

## Deploy

No hay pipeline de CI/CD configurado todavía. El flujo actual es manual:

```sh
pnpm build      # genera ./dist como HTML/CSS/JS estático
pnpm preview    # revisión local antes de publicar
```

`./dist` puede publicarse en cualquier hosting estático (Netlify, Vercel, GitHub Pages, S3 + CDN, etc.) sin necesidad de un runtime de Node en producción.

## Guía de contribución

Proyecto de un solo desarrollador en etapa inicial. Convenciones a seguir si se contribuye:

- Gestor de paquetes: **pnpm** (no usar `npm` ni `yarn`)
- Una sección de landing = un componente en `src/components/sections/`
- No dejar animaciones ni lógica de GSAP fuera de `src/lib/gsap.ts` cuando sea código compartido entre secciones
- No crear commits sin que el usuario lo pida explícitamente

## Roadmap

Según lo documentado en [`docs/`](./docs), los siguientes pasos del proyecto (más allá de esta landing) son:

- Chatbot de WhatsApp como "micrófono conversacional" para profundizar en cada problema reportado
- Estructuración de cada conversación en un modelo de datos (problema declarado, observado, impacto, frecuencia, solución imaginada/propuesta, señales de demanda)
- Ciclo de devolución de valor gratuita antes de cualquier oferta de pago
- Distribución inicial local y humana (no paid ads) antes de escalar
- Automatización progresiva del proceso de descubrimiento a medida que se acumulan patrones

## Troubleshooting

- **El dev server dice que ya está corriendo**: usa `astro dev status` para ver el PID y `astro dev stop` antes de volver a iniciarlo.
- **Cambié algo en `src/lib/gsap.ts` y el dev server no lo refleja**: Vite puede quedar con la caché de optimización de dependencias desincronizada tras cambiar imports; reinicia el servidor (`astro dev stop` + `astro dev --background`).
- **Una animación de scroll no se dispara en cierto tamaño de pantalla**: revisa que el objeto de condiciones pasado a `mm.add()` en `src/lib/gsap.ts` cubra todo el rango de anchos posibles (ver nota en "Decisiones técnicas relevantes").
- **El botón de WhatsApp abre un número equivocado**: el número está hardcodeado en `src/components/WhatsAppButton.astro` (`WHATSAPP_NUMBER`); actualízalo ahí.
- **Error de tipos `Cannot find module for side-effect import of '...css'`**: falta `src/env.d.ts` con `/// <reference types="astro/client" />`.

## Licencia

No se ha definido una licencia pública para este proyecto.

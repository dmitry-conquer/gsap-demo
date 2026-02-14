# ZEN Express

Modern Vite starter kit with Tailwind CSS v4, Alpine.js, and TypeScript for rapid static site development.

[![License](https://img.shields.io/badge/license-MIT-3ecf8e?style=flat-square)](LICENSE)
[![Vite](https://img.shields.io/badge/vite-7.x-646cff?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4.x-06b6d4?style=flat-square)](https://tailwindcss.com/)
[![Alpine.js](https://img.shields.io/badge/alpine.js-3.x-8bc0d0?style=flat-square)](https://alpinejs.dev/)

---

## Quick Start

### Recommended

```bash
npm create zen@latest
```

Select **Express** variant when prompted, then:

```bash
cd my-project
npm install
npm run dev
```

### Alternative (clone from GitHub)

```bash
git clone https://github.com/dmitry-conquer/zen-express.git
cd zen-express
npm install
npm run dev
```

Open `http://localhost:5173/pages/` in your browser.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run host` | Dev server with network access |
| `npm run build` | Production build with TypeScript compilation |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy via FTP/SFTP |
| `npm run lint` | Run ESLint code quality check |
| `npm run lint:fix` | Auto-fix linting issues |

---

## Project Structure

```
zen-express/
├── components/          # Handlebars partials (HTML templates)
├── pages/               # Multi-page entry points
├── public/              # Static assets (fonts, images)
├── scripts/             # Build/deploy scripts
├── src/
│   ├── scripts/
│   │   └── main.ts      # Entry point with Alpine.js init
│   └── styles/
│       └── main.css     # Tailwind CSS v4 configuration
├── dist/                # Build output
└── index.html           # Development welcome page
```

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vite** | 7.x | Build tool and dev server |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Alpine.js** | 3.x | Lightweight reactive JavaScript |
| **TypeScript** | 5.x | Type-safe JavaScript |

### Tooling

| Tool | Purpose |
|------|---------|
| Prettier | Code formatting with Tailwind class sorting |
| ESLint | Code quality checks |
| Handlebars | HTML templating and partials |

---

## Tailwind CSS v4

This project uses **Tailwind CSS v4** with the new CSS-first configuration approach.

### Theme Configuration

Custom theme variables are defined in `src/styles/main.css`:

```css
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;

  --font-base: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-accent: "Playfair Display", ui-serif, Georgia, serif;
}
```

### Usage

```html
<!-- Colors -->
<div class="bg-primary text-white">Primary background</div>
<div class="text-accent">Accent text</div>

<!-- Fonts -->
<h1 class="font-accent text-4xl">Heading with accent font</h1>
<p class="font-base">Body text with base font</p>

<!-- Opacity modifiers -->
<div class="bg-primary/50">50% opacity</div>
```

### Content Sources

Tailwind scans these locations for classes:

```css
@source "../../pages/**/*.html";
@source "../../components/**/*.html";
@source "../../index.html";
@source "../scripts/**/*.ts";
```

### Pre-built Components

| Class | Description |
|-------|-------------|
| `.container` | Centered container with max-width |
| `.btn` | Base button styles |
| `.btn-primary` | Primary colored button |
| `.btn-secondary` | Secondary colored button |
| `.btn-outline` | Outlined button |

---

## Alpine.js

Alpine.js is initialized in `src/scripts/main.ts`:

```typescript
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.start();
```

### Usage

```html
<!-- Counter example -->
<div x-data="{ count: 0 }">
  <button @click="count--" class="btn-secondary">-</button>
  <span x-text="count"></span>
  <button @click="count++" class="btn-primary">+</button>
</div>

<!-- Toggle example -->
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open" x-transition x-cloak>
    Hidden content
  </div>
</div>
```

> **Note:** Use `x-cloak` attribute to hide elements until Alpine initializes.

---

## Handlebars Templates

### Partials

Place HTML partials in `/components`:

```html
<!-- components/header.html -->
<header class="bg-white shadow">
  <nav class="container">...</nav>
</header>
```

### Usage in Pages

```html
<!-- pages/index.html -->
<!doctype html>
<html>
  <body>
    {{> header }}
    <main>Content</main>
    {{> footer }}
  </body>
</html>
```

---

## Configuration

### Vite (`vite.config.js`)

- Multi-page input from `/pages/*.html`
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Handlebars partials from `/components`
- Custom plugins: HTML watcher, IIFE wrapper, output flattening

### Prettier (`.prettierrc`)

Includes `prettier-plugin-tailwindcss` for automatic class sorting:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Deploy (`scripts/deploy.js`)

FTP/SFTP deployment with `.env` configuration:

```env
FTP_SERVER=your-server.com
FTP_USER=username
FTP_PASSWORD=password
FTP_REMOTE_PATH=/path/to/remote/
```

---

## Adding Plugins

### Tailwind Typography (prose)

```bash
npm install @tailwindcss/typography
```

```css
/* src/styles/main.css */
@plugin "@tailwindcss/typography";
```

```html
<article class="prose dark:prose-invert">
  <h1>Article title</h1>
  <p>Rich text content...</p>
</article>
```

---

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox ESR+
- Safari (last 2 versions)
- No IE support

---

## License

MIT © [Dmytro Frolov](https://github.com/dmitry-conquer)

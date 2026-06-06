# The Garage — Car Showcase

A cinematic automotive gallery built with React and Framer Motion. Full-screen video hero, isometric 3D card strip with hover glow effects, click-to-expand fullscreen detail panels, and a filterable collection grid.

---

## Features

- **Video hero** — full-viewport McLaren P1 background with animated headline and CTAs
- **Isometric card strip** — horizontal scroll with CSS 3D perspective, per-card glow gradient, edge-triggered auto-scroll
- **Hover effects** — card expands, rim-light glows in each car's accent color, spec chips reveal
- **Fullscreen detail panel** — desktop split layout (image left / content right), mobile stacked; real specs from verified sources
- **Filterable gallery** — 9 filter categories, Framer Motion layout animations on filter change
- **Expandable collection** — car data lives in `src/data/cars.js`; drop a new image and add an entry to extend the gallery

---

## Tech Stack

| Layer | Library | Version |
|-------|---------|---------|
| Framework | React | 19 |
| Build tool | Vite | 8 |
| Styling | Tailwind CSS | 3 |
| Animation | Framer Motion | 12 |
| Icons | Lucide React | 1 |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Preview production build
npm run preview
```

> **Note:** The hero video is gitignored. After cloning, copy it from `assets/` to `public/videos/hero.mp4` — see Asset Notes below.

---

## Project Structure

```
Cars/
│
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx         Full-screen video hero, headline, CTAs, scroll indicator
│   │   ├── FeaturedCars.jsx        Horizontal card strip with edge-triggered auto-scroll
│   │   ├── CarCard.jsx             Individual card — 3D tilt, glow gradient, spec chips
│   │   ├── CarDetailPanel.jsx      Fullscreen detail view (split desktop / stacked mobile)
│   │   └── GallerySection.jsx      Filterable image grid + footer
│   │
│   ├── data/
│   │   └── cars.js                 All 11 car entries — specs, gradients, descriptions
│   │
│   ├── App.jsx                     Root — selectedCar state, component tree
│   ├── main.jsx                    React entry point
│   └── index.css                   Tailwind directives, Inter font, base dark styles
│
├── public/
│   ├── cars/                       Car photos with clean filenames (copied from assets/)
│   │   ├── bmw-m4.jpg
│   │   ├── bugatti-chiron.jpg
│   │   ├── ferrari-f40.jpg
│   │   ├── ford-mustang.jpg
│   │   ├── koenigsegg-jesko.jpg
│   │   ├── lamborghini-revuelto.jpg
│   │   ├── nissan-gtr.jpg
│   │   ├── porsche-gt3rs.jpg
│   │   ├── toyota-supra.jpg
│   │   ├── apollo-intensa.jpg
│   │   └── pagani-utopia.jpg
│   │
│   ├── logos/                      Brand SVG logos
│   │   ├── bmw.svg
│   │   ├── bugatti.svg
│   │   ├── ferrari.svg
│   │   ├── ford.svg
│   │   ├── koenigsegg.svg
│   │   ├── lamborghini.svg
│   │   ├── nissan.svg
│   │   ├── porsche.svg
│   │   └── toyota.svg
│   │
│   └── videos/
│       └── hero.mp4                McLaren P1 cinematic loop (gitignored — see Asset Notes)
│
├── assets/                         Source originals (images/SVGs tracked; MP4s gitignored)
│
├── .claude/                        Claude Code agent harness (gitignored)
│
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
├── eslint.config.js
├── index.html
├── package.json
├── .gitignore
└── README.md
```

---

## Agent Harness

The `.claude/` directory contains a Claude Code agent harness used to build this project. It defines 6 specialized agents (scaffold → hero → cards → detail panel → gallery → polish) and an orchestrator skill that runs them in sequence. Agent definitions, the orchestrator, and the sprint plan are gitignored — they're development tooling, not part of the shipped app.

---

## Asset Notes

**Hero video** is gitignored. After cloning, re-copy it from `assets/`:
```bash
cp "assets/<video-filename>.mp4" public/videos/hero.mp4
```

**Car images** in `assets/` are tracked. **Brand logos** in `public/logos/` are tracked.

---

## Keyboard

| Key | Action |
|-----|--------|
| `Escape` | Close car detail panel |
| Mouse near card strip edge | Auto-scroll left / right |


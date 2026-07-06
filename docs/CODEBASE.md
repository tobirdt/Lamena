# Lamena Codebase — Entwickler- & Analyse-Guide

Überblick über Architektur, Dateistruktur und typische Erweiterungspunkte für die Lamena-Website (`lamena.ae`).

## Quick Start

```bash
npm install
npm run dev          # Frontend auf http://localhost:5173
npm run build        # Production-Build nach dist/
npm run lint         # ESLint
npm run optimize:images  # PNG/JPG → WebP in public/assets/
```

**Kontaktformular lokal testen** (zwei Terminals):

```bash
# Terminal 1 — Vercel Dev Server (API)
npm run dev:api

# Terminal 2 — Vite mit API-Proxy
VITE_API_PROXY=http://127.0.0.1:3000 npm run dev
```

Kopiere `.env.example` → `.env.local` und setze `RESEND_API_KEY` für echte E-Mail-Zustellung.

---

## Tech-Stack

| Schicht | Technologie |
|---------|-------------|
| Build | Vite 8, TypeScript 6 |
| UI | React 19, React Router 7 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), Custom CSS in `App.css` |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| API | Vercel Serverless (`api/contact.ts`) |
| E-Mail | Resend |
| Deploy | Vercel (`vercel.json` SPA-Rewrites) |

---

## Projektstruktur

```
/workspace
├── api/
│   └── contact.ts          # POST /api/contact — Resend, Rate-Limit, Honeypot
├── public/
│   ├── assets/             # Bilder (Logo, Muster, Portfolio-Visuals)
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── optimize-images.mjs # Sharp: Raster → WebP
├── src/
│   ├── App.tsx             # Router: /, /privacy, /terms
│   ├── App.css             # Design System (~1700 Zeilen, Haupt-Styling)
│   ├── index.css           # CSS-Variablen, Tailwind-Import, Baseline
│   ├── main.tsx
│   ├── components/
│   │   ├── Header.tsx      # Scroll-aware Navigation
│   │   ├── Hero.tsx        # Parallax-Hero, Logo
│   │   ├── Footer.tsx
│   │   ├── ContactForm.tsx # Formular + API-Anbindung
│   │   ├── Reveal.tsx      # Scroll-Reveal-Wrapper
│   │   ├── ScrollManager.tsx # Hash-Navigation / Scroll-Reset
│   │   ├── sections/       # Seitenabschnitte der One-Page
│   │   └── visuals/        # SVG/CSS-Visuals für Portfolio-Karten
│   ├── data/
│   │   ├── content.ts      # Nav, Texte, Karten, Expertise (Content-Source)
│   │   └── legal.ts        # Privacy & Terms Inhalte
│   ├── lib/
│   │   ├── motion.ts       # Framer-Motion-Tokens
│   │   └── site.ts         # SITE_URL, ASSETS-Pfade
│   ├── pages/
│   │   ├── HomePage.tsx    # Komposition aller Sections
│   │   └── LegalPage.tsx   # Wiederverwendbare Legal-Seite
│   └── types/
│       └── content.ts      # TypeScript-Typen für Content-Modelle
├── vite.config.ts          # API-Proxy, Code-Splitting (motion, router)
└── vercel.json             # SPA-Rewrite, API ausgenommen
```

---

## Routing & Seiten

| Route | Komponente | Beschreibung |
|-------|------------|--------------|
| `/` | `HomePage` | One-Page mit Anker-Navigation |
| `/privacy` | `LegalPage` | Datenschutz |
| `/terms` | `LegalPage` | AGB |
| `/api/contact` | `api/contact.ts` | Kontakt-Endpoint (nur POST) |

**Homepage-Sections** (Reihenfolge in `HomePage.tsx`):

1. `Hero` — `#home`
2. `AboutSection` — `#about`
3. `ServicesSection` — `#services`
4. `PortfolioSection` — `#portfolio`
5. `OperatingModelSection`
6. `ContactSection` — `#contact`

Anker-Links in `data/content.ts` → `navItems`.

---

## Design System

**Zwei Styling-Schichten:**

1. **`index.css`** — CSS Custom Properties (`:root`): Farben, Spacing, Typo, Motion-Tokens
2. **`App.css`** — Komponenten-Klassen (BEM-ähnlich): `.site-header`, `.hero-section`, `.contact-form`, …

Tailwind wird für Utility-Klassen in JSX genutzt (`className="site-shell"`), das visuelle System lebt primär in `App.css`.

**Farbpalette:** Lila-Töne (`--purple`, `--purple-deep`), dunkler Hero (`--hero-bg`), helle Flächen (`--bg`, `--surface`).

**Motion:** `lib/motion.ts` exportiert `EASE_OUT` und `REVEAL_VIEWPORT`. `Reveal.tsx` kapselt Scroll-Animationen. `prefers-reduced-motion` wird in `Hero.tsx` respektiert.

---

## Content bearbeiten

| Was ändern | Datei |
|------------|-------|
| Navigation, Texte, Services, Portfolio | `src/data/content.ts` |
| Rechtstexte | `src/data/legal.ts` |
| Logo-/Asset-Pfade | `src/lib/site.ts`, `public/assets/` |
| SEO / Meta | `index.html` |
| Kontakt-E-Mail-Ziel | `.env` → `CONTACT_TO_EMAIL` |

Content-Typen: `IconCard`, `ExpertiseItem`, `PortfolioCard`, `LegalSection` in `src/types/content.ts`.

---

## Kontakt-API

`api/contact.ts` (Vercel Serverless):

- **Rate Limit:** 8 Requests / 15 Min pro IP (in-memory)
- **Honeypot:** Feld `website` — bei Ausfüllung stiller 200-OK
- **Validierung:** Pflichtfelder, E-Mail-Format, Consent
- **E-Mail:** Resend mit HTML + Plain-Text

Env-Variablen: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`

Vite proxied `/api` → `VITE_API_PROXY` (default `http://127.0.0.1:3000`).

---

## Build & Deploy

```bash
npm run build   # tsc -b && vite build → dist/
```

**Code-Splitting** (`vite.config.ts`): separate Chunks für `framer-motion` und `react-router`.

**Vercel:** `vercel.json` leitet alle Pfade außer `/api/*`, `/assets/*`, statische Dateien auf `index.html` um.

---

## Typische Erweiterungen

| Aufgabe | Vorgehen |
|---------|----------|
| Neue Section | Komponente in `components/sections/`, in `HomePage.tsx` einbinden, ggf. `navItems` erweitern |
| Neue Seite | Route in `App.tsx`, Page-Komponente in `pages/` |
| Neues Portfolio-Visual | `components/visuals/` + Typ in `PortfolioCard.type` |
| Blog / CMS | Noch nicht vorhanden — Content aktuell statisch in `data/` |
| i18n | Noch nicht vorhanden — Texte nur Englisch |

---

## Analyse-Checkliste

Beim Review oder Weiterbauen auf folgendes achten:

- [ ] Content-Konsistenz: `content.ts` vs. tatsächliche Section-Texte in Komponenten
- [ ] Responsive: Breakpoints in `App.css` (suche nach `@media`)
- [ ] A11y: `aria-*`, Fokus-States, `prefers-reduced-motion`
- [ ] Performance: WebP-Assets, Lazy Loading, Bundle-Chunks
- [ ] SEO: `index.html` Meta, `sitemap.xml`, strukturierte Daten (JSON-LD)
- [ ] API-Sicherheit: Rate-Limit, Honeypot, Input-Sanitization in `contact.ts`

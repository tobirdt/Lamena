# Revamp-Notizen (Juli 2026)

Design-Richtung: **„Precision Console / Swiss Editorial"** — die technische
Konsolen-Sprache der Portfolio-SVGs (IBM Plex Mono, Status-Zeilen, Indizes)
zieht sich jetzt als Signatur durch die ganze Seite; Sektionen sind editorial
asymmetrisch statt uniform zentriert.

## Leitplanken für weitere Arbeit

- **Mono-Akzent**: Kicker, Indizes (01/02/…), Meta-Zeilen, Status-Labels nutzen
  `var(--font-mono)` (IBM Plex Mono 400/500/600 via Google Fonts), 0.62–0.78rem,
  letter-spacing 0.04–0.14em, uppercase. Keine neuen Icon-Kachel-Karten einführen.
- **Motion-System (Minimalismus-Pass Juli 2026)**: EIN Reveal (Fade-up 450ms/10px,
  `EASE_OUT`) pro Sektions-Block — keine Element-Kaskaden, keine Draw-in-Effekte,
  keine Loops, kein Scroll-Pinning. Micro 150ms · UI 220ms für Zustandswechsel.
  Keine Hover-Transforms auf nicht-interaktiven Elementen. SVG-Visuals rendern
  als fertige statische Zeichnungen (pf-draw/pf-fade sind fest auf „gezeichnet").
- **Hero-Pattern**: nutzt `lamena-muster-plain.*` (nahtlos). Das Wordmark-Muster
  `lamena-muster.*` hat schwarze Ränder → bandet beim Tiling, nicht für
  `background-repeat` verwenden.
- **Header**: Scrollspy (topmost sichtbare Sektion, `aria-current="location"`);
  auf Nicht-Home-Routen startet er im hellen `is-scrolled`-Zustand.
- **Honeypot**: Feld heißt `xfield` (Client + `api/contact.ts`); Server loggt
  Treffer. Namen wie `website` vermeiden (Browser-Autofill).
- **Kontrast**: Mono-Labels auf `--hero-bg` mind. rgba-Alpha ≥ 0.55;
  `--purple-soft` nicht für Text auf Weiß (3:1) — dafür `--purple`.

## Review-Agents

In `.claude/agents/` liegen sechs Projekt-Subagents (visual-design-director,
interaction-motion-designer, ux-product-polisher, design-system-auditor,
responsive-layout-critic, accessibility-performance-reviewer) — nutzbar, wenn
die Session in diesem Verzeichnis (`~/dev/Lamena`) gestartet wird.

Preview-Tool-Hinweis: Screenshots nach programmatischem Scroll sind in der
Headless-Preview unzuverlässig — stattdessen `document.body.style.transform =
'translateY(-Npx)'` bei Scroll 0 setzen und ZWEI Screenshots machen (der erste
pumpt die rAF-gedrosselten Animationen, der zweite ist der echte Capture).

**rAF ist im Headless-Tab komplett ausgesetzt, nicht nur gedrosselt**
(`document.visibilityState === 'hidden'`, `hasFocus() === false`) — betrifft
`whileInView`-Reveals (MaskReveal/Reveal bleiben im Ausgangszustand stehen)
UND Lenis-Smooth-Scroll (Wheel-Events lösen `lenis-scrolling`-Klasse korrekt
aus, aber die rAF-Interpolation tickt nie, `computer scroll` läuft in einen
30s-Timeout). Das ist keine Code-Regression — echte Nutzer-Tabs sind beim
Scrollen immer fokussiert/sichtbar. Verifikation in diesem Fall über
Code-Review + DOM-/Klassen-Zustand, nicht über sichtbares Bewegen im
Screenshot. Smooth Scroll: `src/lib/smoothScroll.ts` (Lenis, `syncTouch`
bleibt aus → Mobile nutzt natives Touch-Scrolling unangetastet); `html.lenis`
schaltet `scroll-behavior` auf `auto`, damit sich native und Lenis-Smoothing
nicht überlagern.

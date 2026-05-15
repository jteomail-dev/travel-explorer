# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev Server

No build step — pure HTML/CSS/JS. Serve locally with:

```
npx http-server . -p 3000 -o
```

Open `index.html` directly in a browser as a zero-dependency alternative.

## Architecture

Single-page application across three files:

- **`index.html`** — all seven section shells (`#home`, `#guides`, `#cities`, `#tools`, `#weather`, `#safety`, `#enquiry`). City cards and modal content are injected by JS at runtime — do not add them in HTML.
- **`style.css`** — section-by-section layout, follows the order of `index.html`. Typography uses Google Fonts (`Playfair Display` for headings, `Inter` for body). Accent colour is `#c9a96e` (gold). Responsive breakpoints at 1023px (tablet) and 639px (mobile).
- **`script.js`** — all logic, structured in labelled blocks in this order:
  1. `destinations[]` — 12 destination objects (lines 11–279). Each has: `id`, `name`, `country`, `flag`, `image`, `description`, `flightTime`, `dailyBudget`, `bestSeason`, `overview`, `itinerary[]`, `food[]`, `transport`, `costs{}`, `safetyTips[]`, `photoSpots[]`.
  2. `packingData[]` — five checklist categories with pre-populated items.
  3. Navbar scroll/hamburger logic.
  4. `renderCities()` — generates all 12 city cards and appends to `#citiesGrid`.
  5. `openModal(id)` / `closeModal()` — looks up destination by `id`, builds modal HTML from the destination object.
  6. `calcBudget()` — reads `budgetBaseRates{}` keyed by destination `id`, calculates total from inputs.
  7. `renderChecklist()` / `toggleCheck()` / `updateChecklistProgress()` — packing checklist backed by `localStorage` key `packingChecked`.
  8. `renderItin()` / `addItinEntry()` / `deleteItin()` / `clearItin()` — itinerary planner backed by `localStorage` key `itinerary`.
  9. `checkWeather()` — calls OpenWeather API (`OPENWEATHER_API_KEY` constant at top of file, line 6). Shows a placeholder error if key is still `"YOUR_API_KEY_HERE"`.
  10. Enquiry form with `validateForm()` — saves submissions to `localStorage` key `enquiries` as a JSON array.
  11. `initReveal()` — `IntersectionObserver` adds `.visible` to `.reveal` elements on scroll.

## Key Conventions

**Adding a destination:** Add one object to `destinations[]` in `script.js` following the existing schema, and add a matching `<option>` in both the budget calculator select (`#bc-dest`) and the enquiry form select (`#f-dest`) in `index.html`. Also add the destination's base daily rates to `budgetBaseRates{}`.

**Modifying guide modal content:** All modal content is built inside `openModal()` — edit the template literal there, not in `index.html`.

**Scroll reveal:** Any element that should animate in on scroll needs the CSS class `reveal`. The observer is set up once in `initReveal()` and called on `DOMContentLoaded`.

**localStorage keys in use:** `packingChecked` (object), `itinerary` (array), `enquiries` (array).

**Images:** All destination images are Unsplash direct URLs (`images.unsplash.com/photo-{ID}?w=800&q=80`). No API key required.

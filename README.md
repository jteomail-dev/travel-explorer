# Travel Explorer

**We went, so you know where to go.**

A modern single-page travel guide website for curated city guides across Asia and beyond. Built with pure HTML, CSS, and JavaScript — no frameworks, no backend.

**Live Site:** [https://jteomail-dev.github.io/travel-explorer/](https://jteomail-dev.github.io/travel-explorer/)

## Preview

![Travel Explorer Screenshot](screenshot.png)

## Live Preview

Open `index.html` in a browser, or serve locally:

```bash
npx http-server . -p 3000 -o
```

## Features

- **12 Destination Guides** — Seoul, Singapore, Bali, Tokyo, Bangkok, Hong Kong, Kuala Lumpur, Maldives, Phuket & Krabi, Sydney, Taipei, Hanoi
- **Guide Modals** — Each city opens a detailed guide with 3-day itinerary, food recommendations, transport tips, cost breakdown, safety tips, and best photo spots
- **Trip Budget Calculator** — Estimate total trip cost in SGD by destination, travellers, days, and daily budget
- **Packing Checklist** — 5 categories, 40+ items, progress tracker — saved in browser localStorage
- **Itinerary Planner** — Add, sort, and remove day-by-day activities — saved in browser localStorage
- **Weather Widget** — Live weather lookup via OpenWeather API (free API key required)
- **Multi-Language UI** — Language selector in navbar with auto-translation into 中文, 日本語, 한국어, ไทย, Tiếng Việt — persists across reloads
- **Enquiry Form** — Validated contact form with localStorage submission storage
- **Responsive Design** — Mobile, tablet, and desktop layouts
- **Backpacker Adventure Design** — Bebas Neue + DM Mono + Barlow typography, aged parchment palette, corkboard card tilts, film-grain hero, topo-map texture

## Weather API Setup

1. Get a free API key at [openweathermap.org/api](https://openweathermap.org/api)
2. Open `script.js` and replace line 6:

```js
const OPENWEATHER_API_KEY = "YOUR_API_KEY_HERE";
```

## Project Structure

```
├── index.html      # Single-page app — all 7 sections
├── style.css       # All styling and responsive layout
├── script.js       # Destination data, modals, tools, weather, forms
└── CLAUDE.md       # AI assistant context for this repo
```

## Destinations Covered

| City | Country | Flight from SG | Daily Budget |
|------|---------|---------------|--------------|
| Tokyo | Japan | ~7h | SGD 150–250 |
| Seoul | South Korea | ~6.5h | SGD 100–200 |
| Bali | Indonesia | ~2.5h | SGD 80–180 |
| Singapore | Singapore | — | SGD 100–300 |
| Bangkok | Thailand | ~2.5h | SGD 70–160 |
| Hong Kong | China SAR | ~3.5h | SGD 120–250 |
| Kuala Lumpur | Malaysia | ~1h | SGD 60–130 |
| Maldives | Maldives | ~4h | SGD 400–1500 |
| Phuket & Krabi | Thailand | ~2h | SGD 80–200 |
| Sydney | Australia | ~8h | SGD 200–400 |
| Taipei | Taiwan | ~4.5h | SGD 80–180 |
| Hanoi | Vietnam | ~3.5h | SGD 50–120 |

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Google Fonts — Bebas Neue (display), DM Mono (labels/stamps), Barlow (body)
- Unsplash (direct image URLs, no API key needed)
- OpenWeather API (optional, for live weather)
- Browser localStorage for packing checklist, itinerary, and enquiry persistence

<div align="center">

# ☄️ Meteor

**A premium, real-time weather application with dynamic weather-reactive backgrounds, hand-crafted animated SVG icons, and a glassmorphism UI — built with React & Vite.**
[**🌍 View Live Demo**](https://meteor-weather-app-sigma.vercel.app/)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

![App Screenshot](./screenshot.png)

</div>

---

## ✨ Key Features

- 🌦️ **Real-Time Weather Data** — Fetches live conditions, temperature, humidity, wind speed, and "feels like" via the [OpenWeatherMap API](https://openweathermap.org/api).
- 🎨 **Dynamic Weather-Reactive Backgrounds** — Ambient floating orbs smoothly shift colour and animation speed based on the current weather condition (clear, clouds, rain, thunderstorm, snow, mist).
- 🧊 **Premium Glassmorphism UI** — Frosted-glass card with `backdrop-filter`, soft drop shadows, and a subtle top-edge highlight for depth.
- ☀️ **Hand-Crafted Animated SVG Icons** — 10 bespoke weather icons (sun with rotating rays & warm glow, drifting clouds, falling rain, flickering lightning, tumbling snowflakes, and more) — zero external icon dependencies.
- 🎞️ **Staggered Entrance Animations** — Weather data cascades into view with sequenced `translateY + scale` transitions powered by cubic-bezier easing.
- 🖱️ **Micro-Interactions** — Expanding conic-gradient glow on search focus, 3D lift hover physics on cards, and a gentle bounce on the weather icon.
- 💀 **Skeleton Loading States** — Shimmer-based skeleton loader mirrors the exact layout of the final display, eliminating layout shifts during API fetches.
- 🔐 **Secure API Key Handling** — API key stored in a `.env` file, loaded via Vite's `import.meta.env`, and excluded from version control through `.gitignore`.

---

## 🏗️ Architecture & Technical Decisions

### Hybrid API Approach

Meteor uses a **decoupled, dual-API architecture** designed to bypass the limitations of free-tier weather services while maximising data quality:

1. **Geocoding — [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)**
   City search and autocomplete are routed through Open-Meteo's geocoding endpoint. This was chosen over OpenWeatherMap's built-in geocoder for two critical reasons:
   - **Population-weighted ranking** — Results are natively sorted by global population, so "London" resolves to London, GB (9M) before London, ON, CA (400K) without any client-side heuristics.
   - **High-quality prefix matching** — The API performs server-side prefix search, enabling responsive suggestions from partial input (e.g., `Istan` → Istanbul, TR).

2. **Meteorological Data — [OpenWeatherMap Current Weather API](https://openweathermap.org/current)**
   Once a city is selected, Meteor forwards the **exact latitude/longitude** returned by Open-Meteo to OpenWeatherMap's `/weather` endpoint. Coordinate-based lookups eliminate the ambiguity of string-based city queries and guarantee that the returned weather data corresponds precisely to the intended location.

```
User Input ──▶ Open-Meteo Geocoding (prefix search, ranked by population)
                        │
                        ▼
              { lat, lon, name, country }
                        │
                        ▼
              OpenWeatherMap /weather?lat=...&lon=... (precise meteorological data)
```

> **Why not a single API?** Free-tier OpenWeatherMap geocoding lacks population ranking and returns inconsistent results for common city names. Conversely, Open-Meteo excels at geocoding but its weather data coverage is forecast-oriented rather than current-conditions-focused. The hybrid approach cherry-picks the strongest capability of each service — at zero cost.

### Known Limitations: Typo Tolerance

To keep Meteor **100% free and open-source** — with no credit-card-backed enterprise API keys required (e.g., Google Places, Algolia) — the search engine intentionally relies on **strict prefix matching** rather than computationally expensive fuzzy matching algorithms (e.g., Levenshtein distance, Jaro-Winkler).

| Input | Result | Why |
|-------|--------|-----|
| `Istan` | ✅ Istanbul, TR | Valid prefix — matched correctly |
| `New Y` | ✅ New York, US | Valid prefix — matched correctly |
| `Istanbuk` | ❌ No result | Typo — not a valid prefix, no fuzzy correction |
| `Londn` | ❌ No result | Typo — would require edit-distance computation |

This is a **deliberate architectural trade-off**: by accepting prefix-only matching, the application avoids external dependencies on paid NLP/search services, keeping the barrier to entry at exactly one free API key.

---

## 🛠️ Tech Stack

| Layer         | Technology                                                         |
| ------------- | ------------------------------------------------------------------ |
| **Framework** | [React 19](https://react.dev)                                      |
| **Bundler**   | [Vite 7](https://vite.dev)                                         |
| **Styling**   | Vanilla CSS (custom properties, keyframe animations, glassmorphism)|
| **Icons**     | Hand-crafted animated SVGs (no external library)                   |
| **Fonts**     | [Outfit](https://fonts.google.com/specimen/Outfit) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| **API**       | [OpenWeatherMap — Current Weather](https://openweathermap.org/current) |
| **Deploy**    | [Vercel](https://vercel.com) (recommended)                        |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or yarn / pnpm)
- A free [OpenWeatherMap API key](https://home.openweathermap.org/api_keys)

### Installation

```bash
# 1 — Clone the repository
git clone https://github.com/your-username/meteor-weather.git
cd meteor-weather

# 2 — Install dependencies
npm install

# 3 — Create your environment file
cp .env.example .env
```

Open the newly created `.env` file and replace the placeholder with your own API key:

```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### Run the Dev Server

```bash
npm run dev
```

The app will be live at **http://localhost:5173** — open it in your browser and search for any city! 🌍

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx          # Pill-shaped search with focus glow
│   ├── SkeletonLoader.jsx     # Shimmer skeleton matching final layout
│   ├── WeatherDisplay.jsx     # Staggered weather cards + detail items
│   └── WeatherIcon.jsx        # 10 hand-crafted animated SVG icons
├── services/
│   └── weatherApi.js          # OpenWeatherMap fetch wrapper
├── App.jsx                    # Theme derivation + ambient orb renderer
├── index.css                  # Full design system (~1100 lines)
└── main.jsx                   # React entry point
```

---

## 🌈 Weather Themes

| Condition      | Orb Palette              | Animation                |
| -------------- | ------------------------ | ------------------------ |
| ☀️ Clear       | Warm ambers & golds      | Fast pulse (10s)         |
| ☁️ Clouds      | Cool slates & greys      | Slow drift (20–24s)      |
| 🌧️ Rain       | Blues & cobalts           | Medium pace (8s)         |
| ⛈️ Thunderstorm| Deep violets & purples   | Rapid pulse + enlarged   |
| ❄️ Snow        | Soft indigos & whites    | Very slow (25s)          |
| 🌫️ Mist       | Muted slates & silvers   | Default                  |

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ☄️ by <strong>You</strong></sub>
</div>

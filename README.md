# Biscuit's Little World 🐾

A cozy, interactive puppy playground built with vanilla HTML, CSS, and JavaScript. The original rotating-navigation interaction stays at the heart of the project, now alongside a lively puppy, treats, a fetch mini-game, and a responsive visual design.

## Features

- **Signature rotating navigation** — open/close controls, anchor navigation, Escape-key support, and keyboard focus handling.
- **Animated SVG puppy** — gentle idle motion, blinking, tail wagging, and happy reactions.
- **Play with Biscuit** — pet the puppy, give treats, and watch the mood respond.
- **Fetch mini-game** — throw the ball, watch the chase/retrieval sequence, and track fetch victories.
- **Personalization** — choose a nickname that can persist in local storage.
- **Progress counters** — treats, fetches, and happiness.
- **Responsive layout** — desktop and mobile layouts, accessible focus states, and reduced-motion support.
- **No build tools or framework required.**

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a browser, or start a simple local server from the project directory:

   ```bash
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000`.

## Project structure

```text
.
├── index.html
├── style.css
├── script.js
├── assets/
│   └── puppy.svg
├── photo-1507146426996-ef05306b995a.avif
├── S6uyw4BMUTPHjx4wXg.woff2
└── S6uyw4BMUTPHjxAwXjeu.woff2
```

## Controls

- **Open/close menu:** circular controls at the top-left.
- **Pet / Treat:** interact with Biscuit in the hero section.
- **Fetch:** use either fetch button or click the ball in the backyard.
- **Rename:** enter a nickname in the introduction section.
- **Keyboard:** use Tab/Enter/Space; Escape closes the navigation.

## Deployment

The project is static and can be published with GitHub Pages from the repository's Settings → Pages. Select the branch containing the finished site and the root folder, then save. Wait for GitHub Pages to publish and test the generated URL.

## Notes

- This project uses no backend and no external JavaScript library.
- Browser storage is optional; the core experience still works if local storage is unavailable.
- Animations respect the operating system's reduced-motion preference.

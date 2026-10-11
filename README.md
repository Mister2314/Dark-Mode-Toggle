# Theme Toggle

**A dark / light theme switcher with animated transitions, system-preference detection and a persisted choice.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-dark--mode--togglee.netlify.app-2ea44f?style=flat-square&logo=vercel&logoColor=white)](https://dark-mode-togglee.netlify.app/)
![React 19](https://img.shields.io/badge/React_19-61dafb?style=flat-square&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-e535ab?style=flat-square&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-0969da?style=flat-square&logoColor=white)

<p align="center">
  <a href="https://dark-mode-togglee.netlify.app/">
    <img src="docs/preview.png" alt="Theme Toggle — desktop preview" width="100%">
  </a>
</p>

## Overview

A small app that does one thing properly: it swaps the whole interface between a dark and a light theme and remembers what you picked.

Theming is driven entirely by CSS custom properties — `themes.css` defines the token set for each theme and a single attribute on `<html>` switches between them, so no component needs to know which theme is active. The `useTheme` hook owns the logic: read the saved value, otherwise fall back to `prefers-color-scheme`, then keep `localStorage` and the DOM in sync.

The transition itself is animated with Framer Motion so the switch reads as a deliberate change rather than a flicker.

## Features

- Dark / light themes defined as CSS custom-property token sets
- `useTheme` hook — reads the stored theme, falls back to `prefers-color-scheme`
- Choice persisted to `localStorage` and restored on reload
- Animated card and feature-list entrance with Framer Motion spring transitions
- Reusable `Layout` component plus a dedicated `ThemeToggle` component
- Component-scoped styling with CSS Modules

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI | React 19 |
| Animation | Framer Motion |
| Theming | CSS custom properties, `localStorage`, `prefers-color-scheme` |
| Styling | CSS Modules |
| Build | Vite, ESLint |

## Screenshots

| Desktop | Mobile |
| :---: | :---: |
| <img src="docs/preview.png" alt="Desktop view"> | <img src="docs/preview-mobile.png" alt="Mobile view" width="230"> |

## Getting Started

```bash
git clone https://github.com/Mister2314/Dark-Mode-Toggle.git
cd Dark-Mode-Toggle
npm install
npm run dev
```

## Project Structure

```
src/hooks/useTheme.js — theme state, persistence and system-preference detection
src/styles/themes.css — the token set for each theme
src/components/ThemeToggle/ — the switch itself
src/components/Layout/ — page shell that consumes the tokens
src/App.jsx — demo content showing the theme in use
```

## Notes

The point of this project was to learn that theming belongs in tokens, not in components. Once the palettes are custom properties, adding a third theme is a matter of writing one more block of CSS — nothing in the React tree changes.

## Author

**Xəyal Hüseynli** — Junior Front-End Developer

[Portfolio](https://hypnosdev.vercel.app) · [GitHub](https://github.com/Mister2314) · [LinkedIn](https://www.linkedin.com/in/x%C9%99yal-h%C3%BCseynli-3487b91ba/) · [xeyalhuseynli06@gmail.com](mailto:xeyalhuseynli06@gmail.com)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A birthday website designed for GitHub Pages hosting. Features a three-page flow:
1. **Landing page**: Bouncing cake (DVD screensaver style) that must be clicked
2. **Birthday page**: Top-down cake view with clickable candles that must all be blown out
3. **Card page**: Personal birthday message loaded from markdown file

## Development

To test locally:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`

To deploy: Push to GitHub and enable GitHub Pages from Settings > Pages (source: main branch, root folder).

## Architecture

### Configuration (script.js)
- `numberOfCandles`: Controls age display, candle count, and which message file to load
- All dynamic text (title, candles remaining) derives from this single variable

### Color Theming (styles.css)
Colors are defined as CSS custom properties in `:root`:
- `--color-primary`, `--color-secondary`: Matcha greens
- `--color-background`: Cream/beige
- `--color-text`: Brown/taupe  
- `--color-accent`: Terracotta/peach

To change the theme, only modify the `:root` variables.

### Birthday Messages (messages/)
Messages are markdown files named by age (e.g., `29.md`). Loaded dynamically via fetch and parsed with the `marked` library. If the file doesn't exist, a fallback message displays.

### Page Navigation
Single-page app using CSS class toggling (`.active`). The `goToPage()` function handles transitions and triggers:
- Music start on first visit to birthday page
- Candle reset when returning to birthday page

### Candle System
Candles are generated dynamically in concentric circles via `calculateRings()`. The distribution adapts based on `numberOfCandles`. Each candle click triggers `blowOutCandle()` which adds visual effects and tracks progress. All candles must be clicked to proceed to the card page.

https://nephdz.github.io/j-birthday/

A birthday website with an interactive cake and candle-blowing experience. Designed for GitHub Pages hosting.

## Configuration

### Age / Number of Candles

In `script.js`, change the `numberOfCandles` variable:

```javascript
const numberOfCandles = 29;
```

This controls:
- The title ("Happy 29th Birthday!")
- Number of candles on the cake
- The candles remaining counter
- Which message file to load (`messages/29.md`)

### Birthday Message

Create a markdown file in the `messages/` directory named `{age}.md` (e.g., `messages/29.md`). The content will be rendered as HTML on the card page.

### Color Theme

Edit the CSS custom properties in `:root` at the top of `styles.css`:

```css
:root {
    --color-primary: #bfbb7e;       /* Muted matcha green */
    --color-secondary: #bdbf65;     /* Brighter matcha green */
    --color-background: #f2ded0;    /* Cream/beige */
    --color-text: #73655d;          /* Brown/taupe */
    --color-accent: #d99b77;        /* Terracotta/peach */
    --color-primary-dark: #a8aa52;
    --color-accent-light: #e8b99a;
}
```

### Background Music

Replace `happy-birthday-155461.mp3` with your own audio file, or update the source path in `index.html`:

```html
<audio id="birthday-music" loop>
    <source src="your-music-file.mp3" type="audio/mpeg" />
</audio>
```

## Local Development

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deployment

Push to GitHub and enable GitHub Pages in Settings > Pages (source: main branch, root folder).

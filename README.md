# Web Browser

A lightweight web browser built with HTML, CSS, and JavaScript.

## Features

- 🌐 Navigate to any website
- ⬅️ ➡️ Back and Forward navigation
- 🔄 Refresh page functionality
- 📍 Address bar with URL support
- 📊 Status bar showing page information

## Getting Started

### Using Python

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Using Node.js

```bash
npm run dev
```

## How to Use

1. Enter a URL in the address bar
2. Press Enter or click the "Go" button
3. Use the navigation buttons to browse:
   - **←** Back button
   - **→** Forward button
   - **↻** Refresh button

## Architecture

- **index.html** - Main HTML structure
- **styles.css** - Browser styling
- **script.js** - Browser functionality and navigation logic

## Limitations

- Due to CORS restrictions, some websites may not load properly in the iframe
- Cross-site scripting is blocked for security reasons

## Future Enhancements

- [ ] Bookmarks functionality
- [ ] Browser history
- [ ] Tab support
- [ ] Zoom controls
- [ ] Developer tools
- [ ] Search suggestions

## License

MIT

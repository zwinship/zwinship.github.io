# zwinship.github.io

Source for https://zwinship.github.io.

- `site/`: the main site (React + Vite). Content lives in `site/src/content.js`; design direction in `site/DESIGN.md`.
- `play/wii/`, `play/win98/`: the Wii Menu and Windows 98 versions. Their data file `play/shared/data.js` is generated from `site/src/content.js`.
- `images/`, `videos/`, `presentations/`, `about_me/`: files the pages link to.

## Editing and deploying

```bash
cd site
npm install
npm run build      # writes ../index.html, ../assets/ and ../play/shared/data.js
```

Commit the build output with the source; GitHub Pages serves the repository root.

# Design notes

The site is drawn like a transit map. Each section is a line in an MBTA colour (Red: research, Orange: software, Green: experience, Blue: projects, Silver: education) and each item is a station on it. Figtree throughout, white ground, near-black ink.

Routes (hash based, see `src/router.js`):
- no hash or `#/`: the main page. A bare visit plays a short intro first (`src/intros/Intro2.jsx`, "the whole map": the five lines draw a full-screen map, then flatten into the route bar). Once per tab, skipped on any input or with reduced motion. `?intro=1` plays the earlier intro.
- `#/fun`: the page leading to the Wii and Windows 98 versions (button at the bottom of the main page)
- `#/<section>`: the main page, eased to that section
- `#/<item>`: the item opens over the main page (`src/sheets/Sheet2.jsx`, "station grows": the clicked station opens into a full screen in the line colour, which lifts into a band over the item). Closing leaves you where you were. `?open=1` uses the earlier side panel.

Motion (motion/react): eased scrolling the visitor can interrupt; the route bar marker slides to the current section; each line fills in as it scrolls past; items open from their station and Next/Previous wipe across in the line colour. Only transform and opacity are animated. Reduced motion turns all of it off.

Rules for anything new:
- Real content only. No invented numbers, quotes or claims.
- No em dashes, no "A · B · C" strings, no labels above headings, no tag pills, no emoji.
- The transit theme is visual. The copy stays plain: no train puns, and no sentence that leans on one detail for no reason.
- Content lives in `src/content.js`; `src/data.js` shapes it into lines and stops.

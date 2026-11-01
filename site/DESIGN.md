# Design notes

The site is drawn like a transit map. Each section is a line in an MBTA colour (Red: research, Orange: software, Green: experience, Blue: projects, Silver: education) and each item is a station on it. Figtree throughout, white ground, near-black ink.

Routes (hash based, see `src/router.js`):
- no hash or `#/`: the main page. A bare visit plays a short intro first (`src/Intro.jsx`): the route draws under the name, then glides into the route bar. Once per tab, skipped on any input or with reduced motion.
- `#/fun`: the page leading to the Wii and Windows 98 versions (button at the bottom of the main page)
- `#/<section>`: the main page, eased to that section
- `#/<item>`: the item opens in a side panel over the main page, so closing it leaves you where you were

Motion (motion/react): eased scrolling the visitor can interrupt; the route bar marker slides to the current section; each line fills in as it scrolls past; the side panel slides in and items inside it slide sideways. Only transform and opacity are animated. Reduced motion turns all of it off.

Rules for anything new:
- Real content only. No invented numbers, quotes or claims.
- No em dashes, no "A · B · C" strings, no labels above headings, no tag pills, no emoji.
- The transit theme is visual. The copy stays plain: no train puns, and no sentence that leans on one detail for no reason.
- Content lives in `src/content.js`; `src/data.js` shapes it into lines and stops.

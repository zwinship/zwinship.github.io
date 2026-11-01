# Design notes

The site is drawn like a transit map. Each section is a line in an MBTA colour (Red: research, Orange: software, Green: experience, Blue: projects, Silver: education) and each item is a station on it. Figtree throughout, white ground, near-black ink.

Routes (hash based, see `src/router.js`):
- no hash: the landing page (options live in `src/landings/`, picked by `DEFAULT_LANDING`; preview others with `?landing=<key>`)
- `#/`: the main page
- `#/<section>`: the main page, eased to that section
- `#/<item>`: the item opens in a side panel over the main page, so closing it leaves you where you were

Motion (motion/react): eased scrolling the visitor can interrupt; the route bar marker slides to the current section; each line fills in as it scrolls past; the side panel slides in and items inside it slide sideways. Only transform and opacity are animated. Reduced motion turns all of it off.

Rules for anything new:
- Real content only. No invented numbers, quotes or claims.
- No em dashes, no "A · B · C" strings, no labels above headings, no tag pills, no emoji.
- The transit theme is visual. The copy stays plain: no train puns, and no sentence that leans on one detail for no reason.
- Content lives in `src/content.js`; `src/data.js` shapes it into lines and stops.

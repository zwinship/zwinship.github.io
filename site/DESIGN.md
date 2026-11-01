# Design notes

One page of content, two styles. Visitors pick with the switch in the bottom right corner; the choice is saved in localStorage (key `site-mode`). Transit is the default.

- **Plain**: an academic homepage. Source Serif 4, photo and contact links in a sticky left column, one blue for links.
- **Transit**: the same content drawn as a subway map. Figtree, one MBTA line colour per section (Red: research, Orange: software, Green: experience, Blue: projects, Silver: education), stations for items, a route bar pinned to the top that shows where you are.

Switching runs as a view transition (`document.startViewTransition`): named elements (photo, name, section headings, each item) move between their two layouts; everything else crossfades. Browsers without view transitions, and visitors with reduced motion, get an instant switch. The item at the top of the screen stays at the top after a switch.

Items with more to say get their own page at `#/<id>`, with previous and next links inside the same section. In transit mode the page title sits on a station sign.

Rules for anything new:
- Real content only. No invented numbers, quotes or claims.
- No em dashes, no "A · B · C" meta strings, no labels above headings, no tag pills, no emoji.
- Copy stays plain in both modes. The transit theme is visual; do not write train puns into the text.
- Content lives in `src/content.js`; `App.jsx` only shapes it.

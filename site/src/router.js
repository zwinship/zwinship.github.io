// Hash routes:
//   (no hash), #/   the main page (a short intro plays first on a bare visit)
//   #/fun           the page that leads to the Wii and Windows 98 versions
//   #/<section>     the main page, at that section
//   #/<item>        the main page with that item open on top
import { useEffect, useState } from 'react';
import { animate } from 'motion/react';
import { lineById, pageById } from './data.js';

export function parse(hash = location.hash) {
  if (!hash || hash === '#') return { view: 'main' };
  const m = hash.match(/^#\/([\w-]*)$/);
  const id = m ? m[1] : hash.slice(1);
  if (pageById(id)) return { view: 'main', item: id };
  if (lineById(id)) return { view: 'main', section: id };
  if (id === 'fun') return { view: 'fun' };
  return { view: 'main' };
}

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const listeners = new Set();
// hashchange and popstate can both fire for one navigation; only pass on real changes.
let last = JSON.stringify(parse()) + location.hash;
function emit() {
  const r = parse();
  const key = JSON.stringify(r) + location.hash;
  if (key === last) return;
  last = key;
  listeners.forEach(fn => fn(r));
}
addEventListener('hashchange', emit);
addEventListener('popstate', emit);

export function navigate(hash) {
  if (hash === '' ) {
    history.pushState(null, '', location.pathname + location.search);
    emit();
  } else if (location.hash === hash) {
    last = '';
    emit();
  } else {
    location.hash = hash;
  }
}

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => { listeners.add(setRoute); return () => listeners.delete(setRoute); }, []);
  return route;
}

export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Eased scroll that the visitor can interrupt with the wheel, touch or keys.
let current = null;
export function stopScroll() { current?.stop(); current = null; }
export function scrollToY(y, { instant = false } = {}) {
  current?.stop();
  const max = document.documentElement.scrollHeight - innerHeight;
  const target = Math.max(0, Math.min(max, y));
  const from = scrollY;
  if (instant || reduceMotion() || Math.abs(target - from) < 2) { scrollTo(0, target); return; }
  const dist = Math.abs(target - from);
  const duration = Math.min(1.1, 0.45 + dist / 4000);
  const stop = () => { current?.stop(); cleanup(); };
  const cleanup = () => ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(e => removeEventListener(e, stop));
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(e => addEventListener(e, stop, { passive: true }));
  current = animate(from, target, {
    duration, ease: [0.65, 0, 0.25, 1],
    onUpdate: v => scrollTo(0, v),
    onComplete: cleanup,
  });
}

export const ROUTE_BAR = 72;
export function scrollToSection(id, opts) {
  const el = document.getElementById(id);
  if (!el) return;
  scrollToY(el.getBoundingClientRect().top + scrollY - ROUTE_BAR - 8, opts);
}

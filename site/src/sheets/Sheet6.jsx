import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useIsPresent, useMotionValue, useTransform } from 'motion/react';
import { Content } from './Sheet1.jsx';
import { pageById } from '../data.js';
import { getOrigin, reduceMotion } from '../router.js';
import './Sheet6.css';

// Split view: the page slides left and stays visible (dimmed, with the item lit up),
// and the item reads in a pane on the right. Phones get a full screen pane instead.
const EASE = [0.32, 0.72, 0, 1];
const NARROW = '(max-width: 820px)';
const PANE = 0.52;          // share of the viewport the pane takes
const GUTTER = 24;

function useNarrow() {
  const [narrow, setNarrow] = useState(() => matchMedia(NARROW).matches);
  useEffect(() => {
    const mq = matchMedia(NARROW);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return narrow;
}

function findStop(id) {
  const o = getOrigin();
  if (o?.el?.isConnected && o.el.dataset.anchor === id) return o.el;
  return document.querySelector(`#page .stop[data-anchor="${id}"]`);
}

// Where the page should sit, and where the lit-up item is, for a given stop.
function layout(stop, px, py) {
  const vw = innerWidth, vh = innerHeight;
  const leftW = vw - Math.max(Math.round(vw * PANE), Math.min(520, vw));
  const r = stop.getBoundingClientRect();
  const line = stop.closest('.line')?.getBoundingClientRect() ?? r;
  // Untransformed positions.
  const top = r.top - py, bottom = r.bottom - py;
  const lineLeft = line.left - px, right = r.right - px;
  const span = right + 20 - lineLeft;
  let x = Math.min(0, Math.max(GUTTER - lineLeft, (leftW - span) / 2 - lineLeft));
  // Only move up or down when the item would sit under the route bar or below the fold.
  const minTop = 104, maxBottom = vh - GUTTER;
  let y = 0;
  if (top < minTop) y = minTop - top;
  else if (bottom > maxBottom) y = Math.max(minTop - top, maxBottom - bottom);
  const doc = document.documentElement;
  y = Math.max(-(doc.scrollHeight - scrollY - vh), Math.min(scrollY, y));
  x = Math.round(x); y = Math.round(y);
  const hole = { x: lineLeft + x + 2, y: top + y - 14, w: Math.min(right + x + 20, leftW + 40) - (lineLeft + x) - 2, h: bottom - top + 28 };
  return { x, y, hole };
}

export default function Sheet6({ id, dir, onClose, onGo }) {
  const pg = pageById(id);
  const { line } = pg;
  const scroller = useRef(null);
  const reduced = reduceMotion();
  const present = useIsPresent();
  const narrow = useNarrow();
  const split = !narrow;

  // Page offset and the lit-up hole, all as motion values so nothing re-renders per frame.
  const px = useMotionValue(0), py = useMotionValue(0);
  const hx = useMotionValue(0), hy = useMotionValue(0), hw = useMotionValue(0), hh = useMotionValue(0);
  const clip = useTransform([hx, hy, hw, hh], ([x, y, w, h]) => {
    const W = innerWidth, H = innerHeight, r = Math.max(0, Math.min(12, w / 2, h / 2));
    return `path(evenodd, "M0 0H${W}V${H}H0Z M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z")`;
  });
  const anims = useRef([]);
  const first = useRef(true);
  const lastStop = useRef(null);

  // Move the page itself; restore it exactly when done.
  useEffect(() => {
    const page = document.getElementById('page');
    if (!page) return undefined;
    // The route bar is sticky inside the page: hold it at the top while the page moves up or down.
    const bar = page.querySelector('.route');
    const apply = () => {
      const x = px.get(), y = py.get();
      page.style.transform = x || y ? `translate3d(${x}px, ${y}px, 0)` : '';
      const head = bar?.previousElementSibling;
      const stuck = bar && scrollY >= (head ? head.offsetTop + head.offsetHeight : 0) - 1;
      if (bar) bar.style.transform = y && stuck ? `translate3d(0, ${-y}px, 0)` : '';
    };
    const a = px.on('change', apply), b = py.on('change', apply);
    return () => {
      a(); b(); anims.current.forEach(c => c.stop());
      page.style.transform = '';
      if (bar) bar.style.transform = '';
    };
  }, [px, py]);

  const run = (targets, opts) => {
    anims.current.forEach(c => c.stop());
    const t = reduced ? { duration: 0 } : opts;
    anims.current = targets.map(([mv, v]) => animate(mv, v, t));
  };

  // Open, and follow the item down the line on Next and Previous.
  useLayoutEffect(() => {
    if (!present) return;
    if (!split) { run([[px, 0], [py, 0]], { duration: 0 }); first.current = true; return; }
    const stop = findStop(id);
    if (!stop) return;
    const isFirst = first.current;
    first.current = false;
    const L = layout(stop, px.get(), py.get());
    if (isFirst) {
      // Start the hole on the item where it sits now.
      const r = stop.getBoundingClientRect();
      const line0 = stop.closest('.line')?.getBoundingClientRect() ?? r;
      hx.set(line0.left + 2); hy.set(r.top - 14); hw.set(L.hole.w); hh.set(r.height + 28);
    }
    lastStop.current = stop;
    run([[px, L.x], [py, L.y], [hx, L.hole.x], [hy, L.hole.y], [hw, L.hole.w], [hh, L.hole.h]],
      { duration: isFirst ? 0.55 : 0.42, ease: EASE });
  }, [id, split, present]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the layout right if the window changes size.
  useEffect(() => {
    if (!split || !present) return undefined;
    const onResize = () => {
      const stop = lastStop.current;
      if (!stop) return;
      const L = layout(stop, px.get(), py.get());
      run([[px, L.x], [py, L.y], [hx, L.hole.x], [hy, L.hole.y], [hw, L.hole.w], [hh, L.hole.h]], { duration: 0 });
    };
    // Deep links: the page may still settle (late fonts, scroll placement) after the pane opens.
    let alive = true;
    document.fonts?.ready.then(() => { if (alive) onResize(); });
    addEventListener('resize', onResize);
    addEventListener('scroll', onResize, { passive: true });
    return () => { alive = false; removeEventListener('resize', onResize); removeEventListener('scroll', onResize); };
  }, [split, present]); // eslint-disable-line react-hooks/exhaustive-deps

  // Closing: slide the page back to exactly where it was.
  useEffect(() => {
    if (present || !split) return;
    const stop = lastStop.current;
    const ox = px.get(), oy = py.get();
    const targets = [[px, 0], [py, 0]];
    if (stop) {
      const r = stop.getBoundingClientRect();
      targets.push([hx, hx.get() - ox], [hy, r.top - oy - 14]);
    }
    run(targets, { duration: 0.42, ease: EASE });
  }, [present]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!present) return undefined;
    const onKey = e => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && pg.next && !e.target.closest('input,textarea')) onGo(pg.next.id, 1);
      if (e.key === 'ArrowLeft' && pg.prev && !e.target.closest('input,textarea')) onGo(pg.prev.id, -1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [pg, onClose, onGo, present]);

  useEffect(() => {
    scroller.current?.scrollTo(0, 0);
    const t = setTimeout(() => document.getElementById(`sheet-title-${id}`)?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(t);
  }, [id]);

  const open = reduced ? 0 : 0.55;
  const close = reduced ? 0 : 0.42;
  const from = split ? { x: reduced ? 0 : '100%' } : { y: reduced ? 0 : '100%' };
  const swap = reduced ? 0 : 0.38;

  return (
    <motion.div className={`s6-wrap${present ? '' : ' s6-leaving'}${split ? ' s6-split' : ' s6-full'}`}
      initial={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ duration: close }}>
      {split && (
        <motion.div className="s6-scrim" onClick={onClose} aria-hidden="true" style={{ clipPath: clip }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: present ? open * 0.8 : close }} />
      )}
      <motion.div className="s6-pane" role="dialog" aria-modal="true" aria-labelledby={`sheet-title-${pg.id}`} ref={scroller}
        style={{ '--c': line.color }}
        initial={from} animate={{ x: 0, y: 0 }} exit={{ ...from, transition: { duration: close, ease: EASE } }}
        transition={{ duration: open, ease: EASE }}>
        <div className="sheet-bar s6-bar">
          <button type="button" className="sheet-close" onClick={onClose}>Close</button>
          <span className="sheet-line"><i aria-hidden="true" />{line.name}</span>
          {pg.count > 1 && <span className="sheet-count">{pg.index + 1} of {pg.count}</span>}
        </div>
        <div className="sheet-body s6-body">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.article key={pg.id} className="page s6-page" custom={dir}
              variants={{
                enter: d => ({ opacity: 0, y: reduced ? 0 : d * 56 }),
                center: { opacity: 1, y: 0 },
                exit: d => ({ opacity: 0, y: reduced ? 0 : d * -40, transition: { duration: swap * 0.45, ease: [0.4, 0, 1, 1] } }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: swap, ease: EASE, delay: swap * 0.2 }}>
              <Content pg={pg} />
              {(pg.prev || pg.next) && (
                <nav className="next-prev" aria-label={`More in ${line.name}`}>
                  {pg.prev
                    ? <a className="prev" href={`#/${pg.prev.id}`} onClick={e => { e.preventDefault(); onGo(pg.prev.id, -1); }}><span className="np-label">Previous</span>{pg.prev.title}</a>
                    : <span />}
                  {pg.next
                    ? <a className="next" href={`#/${pg.next.id}`} onClick={e => { e.preventDefault(); onGo(pg.next.id, 1); }}><span className="np-label">Next</span>{pg.next.title}</a>
                    : <span />}
                </nav>
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

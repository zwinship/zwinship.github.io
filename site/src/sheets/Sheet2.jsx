import { useEffect, useRef, useState } from 'react';
import { motion, useIsPresent } from 'motion/react';
import { pageById } from '../data.js';
import { getOrigin, reduceMotion } from '../router.js';
import { Content } from './Sheet1.jsx';
import './Sheet2.css';

// The clicked station grows into the page: its ring opens into a full screen in the
// line colour, the colour pulls up into a band, and the page appears under it.
const BAND = 10;
const GROW = 0.5;
const HOLD = 0.04;
const LIFT = 0.5;
const EASE_LIFT = [0.45, 0, 0.15, 1];
const SWAP = 0.22;
const EASE_GROW = [0.6, 0, 0.3, 1];
const EASE = [0.32, 0.72, 0, 1];

// Centre and radius of a station ring on the line, if it is on screen.
function ringOf(el) {
  if (!el || !document.contains(el)) return null;
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el, '::before');
  const left = parseFloat(cs.left), top = parseFloat(cs.top), w = parseFloat(cs.width);
  if (!Number.isFinite(left) || !Number.isFinite(w)) return null;
  const x = r.left + left + w / 2, y = r.top + top + w / 2;
  if (x < 16 || y < 16 || x > innerWidth - 16 || y > innerHeight - 16) return null;
  return { x, y, r: w / 2 };
}

function target(id) {
  const stop = document.querySelector(`.stop[data-anchor="${id}"]`);
  return ringOf(stop) || ringOf(getOrigin()?.el) || { x: innerWidth / 2, y: innerHeight / 2, r: 11 };
}

const circle = (r, { x, y }) => `circle(${r.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`;
const cover = p => Math.hypot(Math.max(p.x, innerWidth - p.x), Math.max(p.y, innerHeight - p.y)) + 2;

export default function Sheet2({ id, dir, onClose, onGo }) {
  const pg = pageById(id);
  const { line } = pg;
  const reduced = reduceMotion();
  const present = useIsPresent();
  const scroller = useRef(null);
  const last = useRef(id);
  const [settled, setSettled] = useState(reduced);
  const [shown, setShown] = useState(id);
  const [wipe, setWipe] = useState(null);
  const spg = pageById(shown);

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

  // Next and previous: a band of line colour wipes across, and the page swaps under it.
  useEffect(() => {
    if (last.current === id) return undefined;
    last.current = id;
    if (reduced) { setShown(id); return undefined; }
    setWipe(w => ({ key: (w?.key || 0) + 1, dir }));
    const t = setTimeout(() => setShown(id), SWAP * 1000);
    return () => clearTimeout(t);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scroller.current?.scrollTo(0, 0);
    const t = setTimeout(() => document.getElementById(`sheet-title-${shown}`)?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(t);
  }, [shown]);

  const d = s => (reduced ? 0 : s);
  const page = {
    closed: () => {
      const p = target(id);
      return { clipPath: [circle(cover(p), p), circle(p.r, p)], transition: { duration: d(0.5), delay: d(0.26), ease: EASE_GROW } };
    },
    open: () => {
      const p = target(id);
      return { clipPath: [circle(p.r, p), circle(cover(p), p)], transition: { duration: d(GROW), ease: EASE_GROW } };
    },
  };
  const wash = {
    closed: () => ({ scaleY: 1, transition: { duration: d(0.3), ease: EASE } }),
    open: () => ({ scaleY: BAND / innerHeight, transition: { duration: d(LIFT), delay: d(GROW + HOLD), ease: EASE_LIFT } }),
  };
  const body = {
    closed: { opacity: 0, y: 0, transition: { duration: d(0.14) } },
    open: { opacity: 1, y: 0, transition: { duration: d(0.34), delay: d(GROW + HOLD + LIFT * 0.35), ease: EASE } },
  };

  return (
    <motion.div className={`s2-wrap${present ? '' : ' leaving'}`} initial={{ opacity: 1 }} exit={{ opacity: 1 }}
      transition={{ duration: d(0.8) }} style={{ '--c': line.color }}>
      <motion.div className={`s2-page${settled && present ? ' settled' : ''}`} role="dialog" aria-modal="true"
        aria-labelledby={`sheet-title-${spg.id}`}
        variants={page} initial={reduced ? false : 'closed'} animate="open" exit="closed">
        <div className="s2-band" aria-hidden="true" />
        <motion.div className="s2-bar" variants={body} initial={reduced ? false : { opacity: 0, y: -6 }} animate="open" exit="closed">
          <button type="button" className="s2-close" onClick={onClose}>Close</button>
          <span className="s2-line"><i aria-hidden="true" />{line.name}</span>
          {pg.count > 1 && <span className="s2-count">{spg.index + 1} of {spg.count}</span>}
        </motion.div>
        <div className="s2-view">
          <div className="s2-scroll" ref={scroller}>
            <motion.div className="s2-body" variants={body} initial={reduced ? false : { opacity: 0, y: 14 }} animate="open" exit="closed">
              <article className="page s2-article" key={spg.id}>
                <Content pg={spg} />
              </article>
              {(spg.prev || spg.next) && (
                <nav className="next-prev s2-np" aria-label={`More in ${line.name}`}>
                  {spg.prev
                    ? <a className="prev" href={`#/${spg.prev.id}`} onClick={e => { e.preventDefault(); onGo(spg.prev.id, -1); }}><span className="np-label">Previous</span>{spg.prev.title}</a>
                    : <span />}
                  {spg.next
                    ? <a className="next" href={`#/${spg.next.id}`} onClick={e => { e.preventDefault(); onGo(spg.next.id, 1); }}><span className="np-label">Next</span>{spg.next.title}</a>
                    : <span />}
                </nav>
              )}
            </motion.div>
          </div>
          {wipe && (
            <motion.div key={wipe.key} className="s2-wipe" aria-hidden="true"
              initial={{ x: `${wipe.dir * 101}%` }}
              animate={{ x: [`${wipe.dir * 101}%`, '0%', '0%', `${wipe.dir * -101}%`] }}
              transition={{ duration: 0.56, times: [0, SWAP / 0.56, (SWAP + 0.04) / 0.56, 1], ease: EASE_GROW }}
              onAnimationComplete={() => setWipe(w => (w?.key === wipe.key ? null : w))} />
          )}
        </div>
        <motion.div className="s2-wash" aria-hidden="true" variants={wash}
          initial={reduced ? false : { scaleY: 1 }} animate="open" exit="closed"
          onAnimationComplete={v => { if (v === 'open') setSettled(true); }}
          style={reduced ? { scaleY: BAND / innerHeight } : undefined} />
      </motion.div>
    </motion.div>
  );
}

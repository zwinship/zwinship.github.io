import { useEffect, useRef } from 'react';
import { AnimatePresence, animate, motion, useIsPresent } from 'motion/react';
import { Content } from './Sheet1.jsx';
import { pageById } from '../data.js';
import { reduceMotion } from '../router.js';
import './Sheet4.css';

// Arriving: a long, even braking curve. Leaving: eases away. Between stations: depart, run, brake.
const ARRIVE = { duration: 0.58, ease: [0.25, 0.85, 0.35, 1] };
const DEPART = { duration: 0.48, ease: [0.5, 0, 0.3, 1] };
const RUN = { duration: 0.54, ease: [0.45, 0, 0.2, 1] };
const BEHIND = 0.26;   // how far the page underneath falls back, as a share of the width
const DIM = 0.32;

// The main page shifts left a little while the item page pulls in over it.
function usePageShift(reduced, present) {
  const pos = useRef(0);
  const anim = useRef(null);
  const el = () => document.getElementById('page');
  const to = (target, t) => {
    const page = el();
    anim.current?.stop();
    if (!page || reduced) return;
    anim.current = animate(pos.current, target, {
      ...t,
      onUpdate: v => { pos.current = v; page.style.transform = v ? `translate3d(${v.toFixed(2)}px, 0, 0)` : ''; },
    });
  };
  useEffect(() => {
    const page = el();
    const orig = page ? page.style.transform : '';
    const shift = -Math.min(110, innerWidth * 0.08);
    to(shift, ARRIVE);
    return () => {
      anim.current?.stop();
      anim.current = null;
      pos.current = 0;
      if (!page) return;
      page.style.transform = orig;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (!present) to(0, DEPART); }, [present]); // eslint-disable-line react-hooks/exhaustive-deps
}

function Route({ pg, onGo }) {
  const stations = pg.line.items.filter(it => it.body);
  return (
    <ol className="s4-route" aria-label={pg.line.name}>
      {stations.map((st, i) => (
        <li key={st.id} className={i === pg.index ? 'here' : i < pg.index ? 'past' : ''}>
          <a href={`#/${st.id}`} aria-label={st.title} aria-current={i === pg.index ? 'page' : undefined}
            onClick={e => { e.preventDefault(); if (i !== pg.index) onGo(st.id, i > pg.index ? 1 : -1); }}>
            <span className="s4-dot">
              {i === pg.index && <motion.span layoutId="s4-here" className="s4-here" transition={RUN} />}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function Sheet4({ id, dir, onClose, onGo }) {
  const pg = pageById(id);
  const reduced = reduceMotion();
  const present = useIsPresent();
  usePageShift(reduced, present);

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
    const t = setTimeout(() => document.getElementById(`sheet-title-${id}`)?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(t);
  }, [id]);

  const go = (e, to, d) => { e.preventDefault(); if (present) onGo(to, d); };
  const { line } = pg;
  const instant = { duration: 0 };
  return (
    <motion.div className={`s4-wrap${present ? '' : ' s4-leaving'}`} initial={{ opacity: 1 }} exit={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : DEPART.duration }}>
      <motion.div className="s4-dim" aria-hidden="true"
        initial={{ opacity: 0 }} animate={{ opacity: DIM }} exit={{ opacity: 0 }}
        transition={reduced ? instant : present ? ARRIVE : DEPART} />
      <motion.div className="s4-frame" role="dialog" aria-modal="true" aria-labelledby={`sheet-title-${pg.id}`}
        style={{ '--c': line.color }}
        initial={{ x: reduced ? 0 : '100%' }} animate={{ x: 0, transition: reduced ? instant : ARRIVE }}
        exit={{ x: reduced ? 0 : '100%', transition: reduced ? instant : DEPART }}>
        <div className="s4-bar">
          <button type="button" className="sheet-close s4-close" onClick={onClose}>Close</button>
          <span className="s4-line">{line.name}</span>
          <Route pg={pg} onGo={(to, d) => present && onGo(to, d)} />
          {pg.count > 1 && <span className="s4-count">{pg.index + 1} of {pg.count}</span>}
        </div>
        <div className="s4-track">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div key={pg.id} className="s4-stop" custom={dir}
              variants={{
                enter: d => ({ x: reduced ? 0 : d > 0 ? '100%' : `${-BEHIND * 100}%`, zIndex: d > 0 ? 2 : 1 }),
                center: { x: 0 },
                exit: d => ({ x: reduced ? 0 : d > 0 ? `${-BEHIND * 100}%` : '100%', zIndex: d > 0 ? 1 : 2 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ default: reduced ? instant : RUN, zIndex: instant }}>
              <div className="s4-scroll">
                <article className="page s4-page">
                  <Content pg={pg} />
                  {(pg.prev || pg.next) && (
                    <nav className="next-prev s4-np" aria-label={`More in ${line.name}`}>
                      {pg.prev
                        ? <a className="prev" href={`#/${pg.prev.id}`} onClick={e => go(e, pg.prev.id, -1)}><span className="np-label">Previous</span>{pg.prev.title}</a>
                        : <span />}
                      {pg.next
                        ? <a className="next" href={`#/${pg.next.id}`} onClick={e => go(e, pg.next.id, 1)}><span className="np-label">Next</span>{pg.next.title}</a>
                        : <span />}
                    </nav>
                  )}
                </article>
              </div>
              <motion.div className="s4-shade" aria-hidden="true" custom={dir}
                variants={{
                  enter: d => ({ opacity: d > 0 ? 0 : DIM }),
                  center: { opacity: 0 },
                  exit: d => ({ opacity: d > 0 ? DIM : 0 }),
                }}
                transition={reduced ? instant : RUN} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

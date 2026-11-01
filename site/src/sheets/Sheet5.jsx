// Option 5: the item rises from the bottom as a large sheet. The page behind dims and steps back
// slightly; drag the top of the sheet down to put it away.
import { useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, animate, motion, useDragControls, useIsPresent, useMotionValue, useTransform } from 'motion/react';
import { Content } from './Sheet1.jsx';
import { pageById } from '../data.js';
import { reduceMotion } from '../router.js';
import './Sheet5.css';

const OPEN = { type: 'spring', bounce: 0, visualDuration: 0.5, restDelta: 0.5 };
const SHUT = { type: 'spring', bounce: 0, visualDuration: 0.34, restDelta: 1, restSpeed: 20 };
const BACK = { type: 'spring', bounce: 0.12, visualDuration: 0.36 };
const EASE = [0.32, 0.72, 0, 1];
const PAGE_SCALE = 0.96;

export default function Sheet5({ id, dir, onClose, onGo }) {
  const pg = pageById(id);
  const reduced = reduceMotion();
  const present = useIsPresent();
  const sheet = useRef(null);
  const height = useRef(innerHeight);
  const start = reduced ? 0 : innerHeight;
  const y = useMotionValue(start);
  const progress = useTransform(y, v => Math.max(0, Math.min(1, 1 - v / height.current)));
  const controls = useDragControls();

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

  // The page behind steps back as the sheet comes up, and returns exactly as it was once it is gone.
  useLayoutEffect(() => {
    const page = document.getElementById('page');
    const root = document.documentElement;
    const measure = () => { if (sheet.current) height.current = sheet.current.offsetHeight || innerHeight; };
    measure();
    addEventListener('resize', measure);
    if (!page || reduced) return () => removeEventListener('resize', measure);
    root.classList.add('s5-open');
    page.style.willChange = 'transform';
    const apply = p => {
      page.style.transformOrigin = `50% ${scrollY}px`;
      page.style.transform = `scale(${1 - (1 - PAGE_SCALE) * p})`;
    };
    apply(progress.get());
    const off = progress.on('change', apply);
    return () => {
      off();
      removeEventListener('resize', measure);
      root.classList.remove('s5-open');
      page.style.transform = '';
      page.style.transformOrigin = '';
      page.style.willChange = '';
    };
  }, [progress, reduced]);

  const grab = e => {
    if (!present || e.button > 0 || e.target.closest('button, a')) return;
    controls.start(e);
  };
  const release = (_, info) => {
    const h = height.current;
    if (info.velocity.y > 500 || (info.offset.y > Math.min(160, h * 0.25) && info.velocity.y > -200)) onClose();
    else animate(y, 0, { ...BACK, velocity: info.velocity.y });
  };

  const { line } = pg;
  return (
    <motion.div className={`s5-wrap${present ? '' : ' s5-leaving'}`}
      initial={{ opacity: reduced ? 0 : 1 }} animate={{ opacity: 1 }} exit={{ opacity: reduced ? 0 : 1 }}
      transition={{ duration: reduced ? 0.15 : 0.3 }}>
      <motion.div className="s5-backdrop" style={{ opacity: progress }} onClick={onClose} />
      <motion.div ref={sheet} className="s5-sheet" role="dialog" aria-modal="true" aria-labelledby={`sheet-title-${pg.id}`}
        style={{ y, '--c': line.color }}
        initial={{ y: start }} animate={{ y: 0 }} exit={{ y: reduced ? 0 : innerHeight, transition: SHUT }}
        transition={reduced ? { duration: 0 } : OPEN}
        drag={present ? 'y' : false} dragControls={controls} dragListener={false}
        dragConstraints={{ top: 0 }} dragElastic={{ top: 0.06, bottom: 0 }} dragMomentum={false}
        onDragEnd={release}>
        <div className="s5-head" onPointerDown={grab}>
          <span className="s5-handle" aria-hidden="true" />
          <div className="s5-bar">
            <span className="s5-line"><i aria-hidden="true" />{line.name}</span>
            {pg.count > 1 && <span className="s5-count">{pg.index + 1} of {pg.count}</span>}
            <button type="button" className="s5-close" onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="s5-body">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div key={pg.id} className="s5-scroll" custom={dir}
              variants={{
                enter: d => ({ opacity: 0, y: reduced ? 0 : d * 18 }),
                center: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.34, ease: EASE, delay: reduced ? 0 : 0.1 } },
                exit: d => ({ opacity: 0, y: reduced ? 0 : d * -12, transition: { duration: reduced ? 0 : 0.14, ease: 'easeIn' } }),
              }}
              initial="enter" animate="center" exit="exit">
              <article className="page s5-page"><Content pg={pg} /></article>
              {(pg.prev || pg.next) && (
                <nav className="next-prev s5-np" aria-label={`More in ${line.name}`}>
                  {pg.prev
                    ? <a className="prev" href={`#/${pg.prev.id}`} onClick={e => { e.preventDefault(); onGo(pg.prev.id, -1); }}><span className="np-label">Previous</span>{pg.prev.title}</a>
                    : <span />}
                  {pg.next
                    ? <a className="next" href={`#/${pg.next.id}`} onClick={e => { e.preventDefault(); onGo(pg.next.id, 1); }}><span className="np-label">Next</span>{pg.next.title}</a>
                    : <span />}
                </nav>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

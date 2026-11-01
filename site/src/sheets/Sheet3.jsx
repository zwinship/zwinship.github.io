// Option 3: the item expands in place. A white surface grows from the clicked stop into a
// centred reading panel, the title travels from the list into the panel, and the rest fades up.
// Closing shrinks it back to the item's spot.
import { useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, animate, motion, usePresence } from 'motion/react';
import { Content } from './Sheet1.jsx';
import { pageById } from '../data.js';
import { getOrigin, reduceMotion } from '../router.js';
import './Sheet3.css';

const EASE = [0.32, 0.72, 0, 1];
const OPEN = 0.52;
const CLOSE = 0.44;

// The list entry for an item, if it is on screen.
function stopFor(id) {
  const a = document.querySelector(`#page .stop h3 a[href="#/${id}"]`);
  const el = a?.closest('.stop');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.bottom > 0 && r.top < innerHeight ? el : null;
}

const px = n => `${Math.round(n * 10) / 10}px`;
// A rectangle as a clip-path on a full-viewport layer.
function inset(r, radius) {
  return `inset(${px(r.top)} ${px(innerWidth - r.right)} ${px(innerHeight - r.bottom)} ${px(r.left)} round ${px(radius)})`;
}
const panelRadius = panel => parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 0;

// A stand-in for the title while it travels. It sits at the panel title's spot; layer a is laid
// out like the list title (scaled), layer b like the panel title, and they cross-fade on the way.
function makeFlyer(h2, h3, wrap) {
  const t = h2.getBoundingClientRect();
  const ts = getComputedStyle(h2);
  const os = getComputedStyle(h3);
  const s = parseFloat(os.fontSize) / parseFloat(ts.fontSize);
  const box = document.createElement('div');
  box.className = 's3-fly';
  box.setAttribute('aria-hidden', 'true');
  Object.assign(box.style, { left: px(t.left), top: px(t.top), width: px(t.width), fontSize: ts.fontSize });
  const a = document.createElement('div');
  a.className = 's3-fly-a';
  Object.assign(a.style, {
    width: px(h3.getBoundingClientRect().width / s),
    textDecorationThickness: px(2 / s),
    textUnderlineOffset: px(3 / s),
  });
  a.textContent = h3.textContent;
  const b = document.createElement('div');
  b.className = 's3-fly-b';
  b.textContent = h2.textContent;
  box.append(a, b);
  wrap.append(box);
  return { box, a, b, t, s };
}
function flyerOffset(fly, h3) {
  const o = h3.getBoundingClientRect();
  return { x: o.left - fly.t.left, y: o.top - fly.t.top, scale: fly.s };
}

export default function Sheet3({ id, dir, onClose, onGo }) {
  const pg = pageById(id);
  const [present, safeToRemove] = usePresence();
  const reduced = reduceMotion();
  const wrap = useRef(null);
  const backdrop = useRef(null);
  const surface = useRef(null);
  const panel = useRef(null);
  const running = useRef([]);
  const flyer = useRef(null);
  const closing = useRef(false);
  const idRef = useRef(id);
  idRef.current = id;

  const track = c => { running.current.push(c); return c; };
  const stopAll = () => { running.current.forEach(c => c.stop()); running.current = []; };
  const settle = () => {
    // Finished opening: the panel carries its own white ground, so the layer can go.
    panel.current.style.background = '#fff';
    surface.current.style.visibility = 'hidden';
  };
  const fadeTargets = () => [
    ...panel.current.querySelectorAll('.s3-bar, .s3-body article.page > :not(.sign), .s3-body .next-prev'),
  ];

  // Open.
  useLayoutEffect(() => {
    // Lock the page now, so the scrollbar is gone before anything is measured.
    document.documentElement.classList.add('sheet-open');
    const p = panel.current;
    const h2 = p.querySelector('.sign h2');
    const o = getOrigin();
    const fromEl = o?.el && document.contains(o.el) && o.el.querySelector(`h3 a[href="#/${id}"]`) ? o.el : null;
    if (reduced) { settle(); return undefined; }
    if (!fromEl) {
      settle();
      track(animate(backdrop.current, { opacity: [0, 1] }, { duration: 0.3 }));
      track(animate(p, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.34, ease: EASE }));
      return stopAll;
    }

    const from = fromEl.getBoundingClientRect();
    const to = p.getBoundingClientRect();
    const h3 = fromEl.querySelector('h3');
    const sign = p.querySelector('.sign');
    const fades = fadeTargets();
    fades.forEach(el => { el.style.opacity = '0'; });
    sign.style.opacity = '0';
    h2.style.opacity = '0';

    const fly = makeFlyer(h2, h3, wrap.current);
    flyer.current = fly;
    h3.style.opacity = '0';
    const start = flyerOffset(fly, h3);

    const sf = surface.current;
    sf.style.visibility = 'visible';
    track(animate(backdrop.current, { opacity: [0, 1] }, { duration: 0.36 }));
    track(animate(sf, { opacity: [0, 1] }, { duration: 0.12 }));
    track(animate(sf, { clipPath: [inset(from, 4), inset(to, panelRadius(p))] }, { duration: OPEN, ease: EASE }));
    track(animate(fly.box, { x: [start.x, 0], y: [start.y, 0], scale: [start.scale, 1] }, { duration: OPEN, ease: EASE }));
    track(animate(fly.a, { opacity: [1, 0] }, { duration: OPEN * 0.2, delay: OPEN * 0.24 }));
    track(animate(fly.b, { opacity: [0, 1] }, { duration: OPEN * 0.26, delay: OPEN * 0.34 }));
    track(animate(sign, { opacity: [0, 1] }, { duration: OPEN * 0.4, delay: OPEN * 0.25 }));
    fades.forEach((el, i) => track(animate(el, { opacity: [0, 1], y: [14, 0] },
      { duration: 0.34, ease: EASE, delay: OPEN * 0.6 + Math.min(i, 6) * 0.035 })));
    const done = setTimeout(() => {
      if (closing.current) return;
      h3.style.opacity = '';
      h2.style.opacity = '';
      fly.box.remove();
      if (flyer.current === fly) flyer.current = null;
      settle();
    }, OPEN * 1000 + 20);
    return () => {
      clearTimeout(done);
      stopAll();
      h3.style.opacity = '';
      fly.box.remove();
      if (flyer.current === fly) flyer.current = null;
    };
    // Runs once: later items swap inside the panel.
  }, []);

  // Close: shrink back to the item's spot in the list, or scale down and fade.
  useEffect(() => {
    if (present) return;
    closing.current = true;
    const p = panel.current;
    document.querySelectorAll('#page .stop h3').forEach(h => { h.style.opacity = ''; });
    let hidden = null;
    const finish = () => {
      if (hidden) hidden.style.opacity = '';
      flyer.current?.box.remove();
      safeToRemove();
    };
    stopAll();
    if (reduced) { finish(); return; }
    const el = stopFor(idRef.current);
    const h2 = document.getElementById(`sheet-title-${idRef.current}`);
    const bar = p.querySelector('.s3-bar').getBoundingClientRect();
    const h2r = h2?.getBoundingClientRect();
    if (!el) {
      animate([backdrop.current, surface.current], { opacity: 0 }, { duration: 0.26 });
      animate(p, { opacity: 0, scale: 0.96 }, { duration: 0.24, ease: EASE }).then(finish);
      flyer.current?.box.remove();
      return;
    }
    const to = el.getBoundingClientRect();
    const h3 = el.querySelector('h3');
    const pr = p.getBoundingClientRect();
    const sf = surface.current;
    sf.style.visibility = 'visible';
    sf.style.opacity = '1';
    sf.style.clipPath = inset(pr, panelRadius(p));
    p.style.background = 'transparent';

    // The title flies back only if it is in view in the panel.
    let fly = flyer.current;
    const titleShown = h2r && h2r.bottom > bar.bottom && h2r.top < pr.bottom;
    if (!fly && titleShown) {
      fly = makeFlyer(h2, h3, wrap.current);
      fly.a.style.opacity = '0';
      fly.b.style.opacity = '1';
      flyer.current = fly;
    }
    if (h2) h2.style.opacity = '0';
    if (fly) { hidden = h3; h3.style.opacity = '0'; }
    animate([...p.children], { opacity: 0 }, { duration: 0.16 });
    animate(backdrop.current, { opacity: 0 }, { duration: CLOSE, delay: 0.04 });
    animate(sf, { clipPath: inset(to, 4) }, { duration: CLOSE, ease: EASE, delay: 0.03 });
    // Without the title to carry back, let the list entry show through as the surface lands.
    animate(sf, { opacity: 0 }, fly ? { duration: 0.14, delay: CLOSE - 0.1 } : { duration: CLOSE * 0.7, delay: CLOSE * 0.3 });
    if (fly) {
      const end = flyerOffset(fly, h3);
      animate(fly.box, end, { duration: CLOSE, ease: EASE, delay: 0.03 });
      animate(fly.b, { opacity: 0 }, { duration: CLOSE * 0.2, delay: CLOSE * 0.12 });
      animate(fly.a, { opacity: 1 }, { duration: CLOSE * 0.26, delay: CLOSE * 0.26 });
    }
    const t = setTimeout(finish, (CLOSE + 0.06) * 1000);
    return () => clearTimeout(t);
  }, [present]);

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
    panel.current?.scrollTo(0, 0);
    const t = setTimeout(() => document.getElementById(`sheet-title-${id}`)?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(t);
  }, [id]);

  const { line } = pg;
  return (
    <div className={`s3-wrap${present ? '' : ' leaving'}`} ref={wrap} style={{ '--c': line.color }}>
      <div className="s3-backdrop" ref={backdrop} onClick={present ? onClose : undefined} />
      <div className="s3-surface" ref={surface} aria-hidden="true" />
      <div className="s3-panel" ref={panel} role="dialog" aria-modal="true" aria-labelledby={`sheet-title-${pg.id}`}>
        <div className="s3-bar">
          <button type="button" className="sheet-close" onClick={onClose}>Close</button>
          <span className="sheet-line"><i aria-hidden="true" />{line.name}</span>
          {pg.count > 1 && <span className="sheet-count">{pg.index + 1} of {pg.count}</span>}
        </div>
        <div className="s3-body">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.article key={pg.id} className="page" custom={dir}
              variants={{
                enter: d => ({ opacity: 0, x: reduced ? 0 : d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: d => ({ opacity: 0, x: reduced ? 0 : d * -40 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}>
              <Content pg={pg} />
            </motion.article>
          </AnimatePresence>
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
        </div>
      </div>
    </div>
  );
}

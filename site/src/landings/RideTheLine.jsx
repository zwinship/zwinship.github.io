import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'motion/react';
import { LINES } from '../data.js';
import './RideTheLine.css';

// The strip map above the doors in a subway car: one route, every section a line colour,
// every item a stop. A car rides the track to the chosen stop.

const NARROW = '(max-width: 759px), (max-aspect-ratio: 85/100)';

// Track geometry in "units" (one unit per stop). Narrow screens leave room before each line for its name.
function geometry(vertical) {
  const lead = vertical ? 1.5 : 0.25;
  const gap = vertical ? 1.5 : 0.7;
  let p = lead;
  const stops = [];
  const segs = [];
  LINES.forEach((line, li) => {
    if (li > 0) p += gap;
    const start = p;
    line.items.forEach(item => {
      p += 0.5;
      stops.push({ item, line, p, hash: item.body ? `#/${item.id}` : `#/${line.id}` });
      p += 0.5;
    });
    segs.push({ line, start, end: p });
  });
  const end = p + 0.25;
  // Segments meet halfway across each gap so the line runs unbroken.
  segs.forEach((s, i) => {
    s.from = i === 0 ? 0 : (segs[i - 1].end + s.start) / 2;
    s.label = vertical ? s.start - gap / 2 : (s.start + s.end) / 2;
  });
  segs.forEach((s, i) => { s.to = i === segs.length - 1 ? end : segs[i + 1].from; });
  const fun = vertical ? [end + 1.1, end + 2.2] : [];
  const total = vertical ? end + 2.6 : end;
  return { stops, segs, end, total, fun };
}

const FUN = [['/play/wii/', 'Living room, 2006'], ['/play/win98/', 'Family computer, 1998']];

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

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function RideTheLine({ onGo }) {
  const vertical = useNarrow();
  const geo = useMemo(() => geometry(vertical), [vertical]);
  const { stops, segs, total } = geo;
  const [sel, setSel] = useState(0);
  const [moving, setMoving] = useState(true);
  const trackRef = useRef(null);

  // The car's position along the track, in units. It drives like a train: capped speed,
  // steady acceleration, and braking that starts just early enough to stop on the mark.
  const pos = useMotionValue(-2);
  const px = useMotionValue(0);
  const scale = useRef(1);
  const car = useRef({ v: 0, target: stops[0].p, raf: 0, last: 0 });

  const place = useCallback(() => px.set(pos.get() * scale.current), [pos, px]);

  useLayoutEffect(() => {
    const el = trackRef.current;
    const measure = () => {
      const r = el.getBoundingClientRect();
      scale.current = (vertical ? r.height : r.width) / total;
      place();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [vertical, total, place]);

  const step = useCallback(now => {
    const c = car.current;
    const dt = Math.min(0.05, (now - c.last) / 1000);
    c.last = now;
    const k = scale.current || 1;
    const ACC = 1700 / k, BRAKE = 2300 / k, VMAX = 1900 / k;   // px/s², px/s², px/s in units
    const x = pos.get();
    const s = c.target - x;
    const dir = Math.sign(s);
    // Speed toward the target; negative while still rolling the other way.
    let v = c.v * dir;
    const limit = Math.min(VMAX, Math.sqrt(2 * BRAKE * Math.abs(s)));
    if (v < limit) v = Math.min(limit, v + (v < 0 ? BRAKE : ACC) * dt);
    else v = Math.max(limit, v - BRAKE * dt);
    let nx = x + v * dir * dt;
    if ((c.target - nx) * dir <= 0 && v >= 0) nx = c.target;
    c.v = v * dir;
    pos.set(nx);
    place();
    if (Math.abs(c.target - nx) < 0.002 && Math.abs(v) < 40 / k) {
      pos.set(c.target); place(); c.v = 0; c.raf = 0;
      setMoving(false);
      return;
    }
    c.raf = requestAnimationFrame(step);
  }, [pos, place]);

  const driveTo = useCallback(target => {
    const c = car.current;
    c.target = target;
    if (reduced()) {
      cancelAnimationFrame(c.raf); c.raf = 0; c.v = 0;
      pos.set(target); place(); setMoving(false);
      return;
    }
    setMoving(true);
    if (!c.raf) { c.last = performance.now(); c.raf = requestAnimationFrame(step); }
  }, [pos, place, step]);

  // Roll in from the left once the line has drawn.
  useEffect(() => {
    if (reduced()) { driveTo(stops[0].p); return; }
    const t = setTimeout(() => driveTo(stops[0].p), 750);
    return () => { clearTimeout(t); cancelAnimationFrame(car.current.raf); car.current.raf = 0; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the car on its stop when the layout flips between wide and narrow.
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    const c = car.current;
    cancelAnimationFrame(c.raf); c.raf = 0; c.v = 0;
    c.target = stops[sel].p;
    pos.set(c.target); place(); setMoving(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo]);

  const choose = useCallback(i => {
    const n = Math.max(0, Math.min(stops.length - 1, i));
    setSel(n);
    driveTo(stops[n].p);
  }, [stops, driveTo]);

  const cur = stops[sel];
  const go = (e, hash) => { e?.preventDefault(); onGo(hash); };

  const selRef = useRef(sel);
  selRef.current = sel;
  useEffect(() => {
    const onKey = e => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      const onControl = t instanceof Element && t.closest('a, button') && !t.closest('.rl-strip');
      const k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); choose(selRef.current + 1); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); choose(selRef.current - 1); }
      else if (k === 'Home') { e.preventDefault(); choose(0); }
      else if (k === 'End') { e.preventDefault(); choose(stops.length - 1); }
      else if (k === 'Enter' && !onControl) { e.preventDefault(); onGo(stops[selRef.current].hash); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [choose, stops, onGo]);

  // Keep the chosen stop in view when the narrow strip is taller than the screen.
  useEffect(() => {
    if (!vertical) return;
    document.getElementById(`rl-stop-${sel}`)?.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' });
  }, [sel, vertical]);

  const pick = i => {
    if (i === sel) onGo(stops[i].hash);
    else choose(i);
  };

  const at = p => ({ '--p': p / total });

  return (
    <div className={`rl-root ${vertical ? 'rl-v' : 'rl-h'}`}>
      <header className="rl-head">
        <div>
          <h1>Zach Winship</h1>
          <p>MS in Quantitative Economics, New York University</p>
        </div>
        <a className="rl-enter" href="#/" onClick={e => go(e, '#/')}>Enter</a>
      </header>

      <div className="rl-display" style={{ '--c': cur.line.color }}>
        <div className="rl-display-in">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={sel} className="rl-now"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.3, 0, 0.2, 1] }}>
              <span className="rl-badge"><i />{cur.line.name}</span>
              <a className="rl-title" href={cur.hash} onClick={e => go(e, cur.hash)}>{cur.item.title}</a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="rl-strip" role="listbox" tabIndex={0} aria-label="Stops"
        aria-activedescendant={`rl-stop-${sel}`}>
        <div className="rl-track" ref={trackRef} style={{ '--n': total }}>
          {segs.map((s, i) => (
            <div key={s.line.id} className="rl-seg" style={{ ...at(s.from), '--q': (s.to - s.from) / total, '--c': s.line.color, '--i': i }} />
          ))}
          {segs.map((s, i) => (
            <a key={s.line.id} className="rl-line-name" href={`#/${s.line.id}`} tabIndex={-1}
              style={{ ...at(s.label), '--c': s.line.color, '--i': i }}
              onClick={e => go(e, `#/${s.line.id}`)}>{s.line.name}</a>
          ))}
          {stops.map((s, i) => (
            <div key={s.item.id} id={`rl-stop-${i}`} role="option" aria-selected={i === sel}
              className={`rl-stop${i === sel ? ' is-sel' : ''}${i === sel && !moving ? ' is-here' : ''}`}
              style={{ ...at(s.p), '--c': s.line.color, '--i': i }}
              onClick={() => pick(i)}>
              <span className="rl-dot" />
              <span className="rl-name"><span>{s.item.title}</span></span>
            </div>
          ))}
          {vertical && (
            <>
              <div className="rl-dash" style={{ ...at(geo.end), '--q': (geo.fun[1] - geo.end) / total }} />
              {FUN.map(([href, label], i) => (
                <a key={href} className="rl-fun-stop" href={href} style={at(geo.fun[i])}>
                  <span className="rl-dot" /><span className="rl-name"><span>{label}</span></span>
                </a>
              ))}
            </>
          )}
          <motion.div className="rl-car" style={vertical ? { y: px } : { x: px }} aria-hidden="true">
            <span />
          </motion.div>
        </div>
        {!vertical && (
          <div className="rl-branches">
            <svg viewBox="0 0 60 120" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 60 L16 60 L44 24 L60 24" />
              <path d="M0 60 L16 60 L44 96 L60 96" />
            </svg>
            {FUN.map(([href, label], i) => (
              <a key={href} className={`rl-fun rl-fun-${i}`} href={href}>
                <span className="rl-dot" />{label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LINES } from '../data.js';
import './Intro4.css';

const OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const SQUASH = 'cubic-bezier(0.7, 0, 0.3, 1)';
const SETTLE = 'cubic-bezier(0.55, 0, 0.1, 1)';
const STROKE = 6;
const MID = 12; // the lines are bolder mid-flight, then thin to the real stroke as they land

const inset = (t, r, b, l, round) => `inset(${t}px ${r}px ${b}px ${l}px round ${round}px)`;

// Five colour bands fill the screen, then each one squeezes into a thin line and the
// lines slide together into the route bar of the page underneath. Any input skips it.
export default function Intro4({ onDone }) {
  const [geo, setGeo] = useState(null);
  const root = useRef(null);
  const cover = useRef(null);
  const bands = useRef([]);
  const labels = useRef([]);
  const done = useRef(false);

  // Measure the real route bar so each line lands exactly on its counterpart.
  useLayoutEffect(() => {
    const line = document.querySelector('.route-line');
    if (!line) { onDone(); return; }
    const segs = [...line.querySelectorAll('.seg')].map(s => s.getBoundingClientRect());
    const dots = [...line.querySelectorAll('.dot')].map(d => d.getBoundingClientRect());
    if (segs.length < LINES.length - 1 || dots.length < LINES.length) { onDone(); return; }
    setGeo({
      W: innerWidth, H: innerHeight,
      left: line.getBoundingClientRect().left,
      targets: LINES.map((_, i) => segs[i] || dots[i]),
    });
  }, [onDone]);

  useEffect(() => {
    if (!geo) return undefined;
    const { W, H, targets } = geo;
    const n = LINES.length;
    const h = H / n;
    const anims = [];
    const play = (el, frames, opts) => { if (el) anims.push(el.animate(frames, { fill: 'both', ...opts })); };
    const finish = () => { if (!done.current) { done.current = true; onDone(); } };

    LINES.forEach((_, i) => {
      const top = i * h;
      const c = top + h / 2;
      const t = targets[i];
      const last = i === n - 1;
      const band = inset(top, 0, H - top - h, 0, 0);
      const line = inset(c - MID / 2, 0, H - c - MID / 2, 0, MID / 2);
      const y = last ? t.top + t.height / 2 - STROKE / 2 : t.top;
      const land = inset(y, W - t.right, H - y - STROKE, t.left, STROKE / 2);
      play(bands.current[i], [
        { clipPath: inset(top, W, H - top - h, 0, 0) },
        { clipPath: band },
      ], { duration: 520, delay: i * 65, easing: OUT });
      play(bands.current[i], [
        { clipPath: band, easing: SQUASH },
        { clipPath: line, offset: 0.38, easing: SETTLE },
        { clipPath: land },
      ], { duration: 1000, delay: 920 + i * 45, fill: 'forwards' });
      play(labels.current[i], [
        { transform: 'translateX(-48px)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      ], { duration: 520, delay: 100 + i * 65, easing: OUT });
      play(labels.current[i], [
        { transform: 'translateX(0) scaleY(1)', opacity: 1 },
        { transform: 'translateX(36px) scaleY(0.2)', opacity: 0 },
      ], { duration: 300, delay: 920 + i * 45, easing: 'cubic-bezier(0.5, 0, 0.75, 0)', fill: 'forwards' });
      // The landed lines sit on the real segments; fade them so sub-pixel edges hand over cleanly.
      play(bands.current[i], [{ opacity: 1 }, { opacity: 0 }], { duration: last ? 240 : 200, delay: last ? 2080 : 2110, easing: 'ease-in-out' });
    });
    play(cover.current, [{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 1690, easing: 'ease-in-out' });
    const timer = setTimeout(finish, 2330);

    const skip = () => {
      if (done.current) return;
      clearTimeout(timer);
      root.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      setTimeout(finish, 210);
    };
    const evs = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'resize'];
    evs.forEach(e => addEventListener(e, skip, { passive: true }));
    return () => {
      clearTimeout(timer);
      evs.forEach(e => removeEventListener(e, skip, { passive: true }));
      anims.forEach(a => a.cancel());
    };
  }, [geo, onDone]);

  if (!geo) return <div className="intro-cover" />;
  const h = geo.H / LINES.length;
  return (
    <div className="i4-root" ref={root} aria-hidden="true">
      <div className="i4-cover" ref={cover} />
      {LINES.map((l, i) => (
        <div key={l.id} className="i4-band" ref={el => { bands.current[i] = el; }}
          style={{ background: l.color, clipPath: inset(i * h, geo.W, geo.H - i * h - h, 0, 0) }}>
          <span className="i4-label" ref={el => { labels.current[i] = el; }}
            style={{ top: i * h + h / 2, left: geo.left, opacity: 0 }}>{l.name}</span>
        </div>
      ))}
    </div>
  );
}

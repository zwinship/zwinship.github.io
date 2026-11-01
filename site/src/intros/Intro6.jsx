import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Intro6.css';

// Zoom out: the camera starts right up against the first station of the route bar and
// pulls back in one move until the drawing sits exactly on the real bar, then the page fades in.
const HOLD = 160;      // ms on the close-up before the pull back
const ZOOM = 1750;     // ms for the pull back
const FADE_AT = 1080;  // ms after the start of the zoom when the page starts to show
const FADE = 700;
const SKIP = 200;
const HANDOFF = 160;  // ms the drawing takes to dissolve into the real bar underneath

// cubic-bezier(x1, y1, x2, y2) solved for y at a given x.
function bezier(x1, y1, x2, y2) {
  const c = (a, b) => t => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  const bx = c(x1, x2), by = c(y1, y2);
  return x => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 24; i++) { t = (lo + hi) / 2; if (bx(t) < x) lo = t; else hi = t; }
    return by(t);
  };
}
const EASE = bezier(0.3, 0.5, 0.08, 1);
const clamp01 = n => Math.min(1, Math.max(0, n));

function measure() {
  const line = document.querySelector('.route-line');
  if (!line) return null;
  const items = [...line.querySelectorAll(':scope > li')];
  const stops = items.map(li => {
    const dot = li.querySelector('.dot');
    const seg = li.querySelector('.seg');
    const c = getComputedStyle(li).getPropertyValue('--c').trim();
    const d = dot.getBoundingClientRect();
    const s = seg && seg.getBoundingClientRect();
    return {
      c, here: !!dot.querySelector('.marker'),
      x: d.left + d.width / 2, y: d.top + d.height / 2, r: d.width / 2,
      seg: s && { x: s.left, y: s.top, w: s.width, h: s.height },
    };
  });
  return { stops, w: innerWidth, h: innerHeight };
}

export default function Intro6({ onDone }) {
  const [box, setBox] = useState(null);
  const group = useRef(null);
  const cover = useRef(null);
  const root = useRef(null);
  const fills = useRef(null);
  const svg = useRef(null);
  const done = useRef(false);

  // Measure once the web font is in, so label widths (and so the segments) are final.
  useLayoutEffect(() => {
    let live = true;
    const go = () => {
      if (!live || done.current) return;
      const b = measure();
      if (!b || !b.stops.length) { done.current = true; onDone(); return; }
      setBox(b);
    };
    const fonts = document.fonts?.ready;
    if (!fonts || document.fonts.status === 'loaded') go();
    else Promise.race([fonts, new Promise(r => setTimeout(r, 400))]).then(go);
    return () => { live = false; };
  }, [onDone]);

  useEffect(() => {
    if (!box) return undefined;
    const first = box.stops[0];
    const outer = first.r;                              // outer radius of the ring, px
    const s0 = (Math.min(box.w, box.h) * 0.62) / outer; // ring fills most of the screen
    const ls0 = Math.log(s0);
    const cx = box.w / 2, cy = box.h / 2;
    let raf = 0, prev = 0, t = 0, skipping = false;

    const place = p => {
      const s = Math.exp(ls0 * (1 - p));
      // Keep the first station's centre on a path from the middle of the screen to its real spot.
      const tx = cx + (first.x - cx) * p;
      const ty = cy + (first.y - cy) * p;
      group.current.setAttribute('transform', `translate(${tx} ${ty}) scale(${s}) translate(${-first.x} ${-first.y})`);
    };
    const finish = () => { if (!done.current) { done.current = true; onDone(); } };

    const frame = now => {
      // A clock that never jumps more than two frames, so a slow frame while the page is
      // still settling delays the move a little instead of skipping part of it.
      if (prev) t += Math.min(now - prev, 34);
      prev = now;
      const z = clamp01((t - HOLD) / ZOOM);
      place(EASE(z));
      const f = clamp01((t - HOLD - FADE_AT) / FADE);
      cover.current.style.opacity = String(1 - f * f * (3 - 2 * f));
      if (fills.current) fills.current.style.opacity = String(clamp01((t - HOLD - FADE_AT) / 400));
      const end = HOLD + Math.max(ZOOM, FADE_AT + FADE);
      svg.current.style.opacity = String(1 - clamp01((t - end) / HANDOFF));
      if (t >= end + HANDOFF) { finish(); return; }
      raf = requestAnimationFrame(frame);
    };
    place(0);
    raf = requestAnimationFrame(frame);

    const skip = () => {
      if (done.current || skipping) return;
      skipping = true;
      cancelAnimationFrame(raf);
      const el = root.current;
      el.style.transition = `opacity ${SKIP}ms ease-out`;
      el.style.opacity = '0';
      setTimeout(finish, SKIP + 20);
    };
    const opts = { passive: true };
    const evs = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'resize'];
    evs.forEach(e => addEventListener(e, skip, opts));
    return () => {
      cancelAnimationFrame(raf);
      evs.forEach(e => removeEventListener(e, skip, opts));
    };
  }, [box, onDone]);

  if (!box) return <div className="i6-root"><div className="i6-cover" /></div>;
  return (
    <div className="i6-root" ref={root} aria-hidden="true">
      <div className="i6-cover" ref={cover} />
      <svg className="i6-svg" ref={svg} width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`}>
        <g ref={group}>
          {box.stops.map((s, i) => s.seg && (
            <rect key={`s${i}`} x={s.seg.x} y={s.seg.y} width={s.seg.w} height={s.seg.h} rx={s.seg.h / 2} fill={s.c} />
          ))}
          {box.stops.map((s, i) => (
            <circle key={`d${i}`} cx={s.x} cy={s.y} r={s.r - 2} fill="#fff" stroke={s.c} strokeWidth="4" />
          ))}
          <g ref={fills} style={{ opacity: 0 }}>
            {box.stops.map((s, i) => s.here && (
              <circle key={`m${i}`} cx={s.x} cy={s.y} r={s.r - 2} fill="#161616" stroke={s.c} strokeWidth="4" />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LINES } from '../data.js';
import './Intro3.css';

// Timing in seconds: run in and brake to a stop at the end of the route, wait, pull out.
const T_IN = 1.0;
const T_BRAKE = 0.5;  // last part of the run in
const BRAKE_N = 2.2;  // braking curve (2 is constant deceleration; a touch more eases the stop)
const T_DWELL = 0.24;
const T_OUT = 0.85;
const T_ACC = 0.45;   // pulling out: constant acceleration up to speed, then cruise off screen
const SKIP_FADE = 200;

function measure() {
  const el = document.querySelector('.route-line');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const W = document.documentElement.clientWidth;
  const H = innerHeight;
  const phone = W <= 640;
  const cw = phone ? Math.round(Math.min(44, Math.max(32, W * 0.09))) : Math.round(Math.min(136, Math.max(84, W * 0.085)));
  const ch = phone ? 20 : 30;
  const gap = phone ? 4 : 6;
  const cy = r.top + r.height / 2;
  // Slope of the wake: its widest point trails the last car by about a fifth of the screen.
  const k = Math.min(4, Math.max(1.6, Math.max(cy, H - cy) / (0.2 * W)));
  return { W, H, cy, end: phone ? W - 10 : r.right, cw, ch, gap, L: cw * 5 + gap * 4, k };
}

// One car: a flat rounded body, a row of windows, a darker skirt. The two outer ends are raked.
function Car({ x, w, h, color, rakeL, rakeR }) {
  const r = Math.round(h * 0.16);
  const s = Math.round(h * 0.42);
  const pts = [
    [x + (rakeL ? s : 0), 0], [x + w - (rakeR ? s : 0), 0], [x + w, h * 0.62], [x + w, h], [x, h], [x, h * 0.62],
  ].map(([px, py], i) => {
    const ix = i === 0 || i === 4 || i === 5 ? r / 2 : -r / 2;
    const iy = i < 2 ? r / 2 : i === 3 || i === 4 ? -r / 2 : 0;
    return `${px + ix},${py + iy}`;
  }).join(' ');
  const wy = Math.round(h * 0.2);
  const wh = Math.round(h * 0.3);
  const ww = Math.max(6, Math.round(h * 0.42));
  const pad = Math.round(h * 0.28);
  const left = x + pad + (rakeL ? s * 0.8 : 0);
  const right = x + w - pad - (rakeR ? s * 0.8 : 0);
  const n = Math.max(1, Math.floor((right - left + 4) / (ww + 4)));
  const step = n > 1 ? (right - left - ww) / (n - 1) : 0;
  return (
    <g>
      <polygon points={pts} fill={color} stroke={color} strokeWidth={r} strokeLinejoin="round" />
      <rect x={x + 1} y={h * 0.8} width={w - 2} height={h * 0.1} fill="#000" opacity="0.2" />
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={left + i * step} y={wy} width={ww} height={wh} rx={1.5} fill="#fff" opacity="0.92" />
      ))}
    </g>
  );
}

// Five cars in the line colours run along the route bar. Behind them the cover opens in a wake
// and the real page, route included, is left behind. Click, key, scroll or resize skips it.
export default function Intro3({ onDone }) {
  const [m, setM] = useState(null);
  const root = useRef(null);
  const cover = useRef(null);
  const track = useRef(null);
  const train = useRef(null);
  const blur = useRef(null);
  const done = useRef(false);

  useLayoutEffect(() => {
    const v = measure();
    if (!v) { done.current = true; onDone(); return; }
    setM(v);
  }, [onDone]);

  useEffect(() => {
    if (!m) return undefined;
    const { W, H, L, k } = m;
    const { end } = m;
    let { cy } = m;
    // Positions are for the front of the train.
    const x0 = -8;
    const stop = Math.min(end, W - 12);
    const D = stop - x0;
    const tb = T_BRAKE;
    const tc = T_IN - tb;
    const v = D / (tc + tb / BRAKE_N);           // cruising speed, px/s
    const exitTo = W + L + Math.max(cy, H - cy) / k + 40;
    const D2 = exitTo - stop;
    const v2 = D2 / (T_OUT - T_ACC / 2);         // speed leaving
    const vMax = Math.max(v, v2);
    const total = T_IN + T_DWELL + T_OUT;

    const at = t => {
      if (t <= tc) return [x0 + v * t, v];
      if (t <= T_IN) {
        const s = (t - tc) / tb;
        const db = (v * tb) / BRAKE_N;
        return [x0 + v * tc + db * (1 - (1 - s) ** BRAKE_N), v * (1 - s) ** (BRAKE_N - 1)];
      }
      if (t <= T_IN + T_DWELL) return [stop, 0];
      const u = Math.min(t - T_IN - T_DWELL, T_OUT);
      if (u <= T_ACC) return [stop + (v2 * u * u) / (2 * T_ACC), (v2 * u) / T_ACC];
      return [stop + (v2 * T_ACC) / 2 + v2 * (u - T_ACC), v2];
    };

    const draw = (head, speed) => {
      const vn = Math.min(1, speed / vMax);
      const tail = head - L;
      const ax = tail + 10;                       // apex of the wake, tucked behind the last car
      const top = ax - cy / k;
      const bot = ax - (H - cy) / k;
      if (Math.min(top, bot) >= W) cover.current.style.visibility = 'hidden';
      else cover.current.style.clipPath = `polygon(${ax}px ${cy}px, ${top}px 0px, ${W}px 0px, ${W}px ${H}px, ${bot}px ${H}px)`;
      track.current.style.transform = `translate3d(${ax}px, ${cy - 2}px, 0)`;
      train.current.style.transform = `translate3d(${tail}px, ${cy - m.ch / 2}px, 0) scaleX(${1 + 0.06 * vn})`;
      blur.current.style.transform = `translate3d(${tail - 2}px, ${cy}px, 0) scaleX(${vn})`;
      blur.current.style.opacity = String(Math.min(1, vn * 1.4));
    };

    const finish = () => { if (!done.current) { done.current = true; onDone(); } };
    let raf = 0;
    let t = 0;
    let last = 0;
    let warm = 0;
    let ready = false;
    // Let the page finish its first paints before the clock starts, so the run in does not stutter.
    const wait = new Promise(r => setTimeout(r, 400));
    Promise.race([document.fonts ? document.fonts.ready : wait, wait]).then(() => { ready = true; });
    const frame = now => {
      if (done.current) return;
      if (!ready || warm < 3) {
        if (ready) warm += 1;
        last = now;
        raf = requestAnimationFrame(frame);
        return;
      }
      // A late or dropped frame moves the train on by at most two frames' worth.
      t += Math.min(now - last, 34) / 1000;
      last = now;
      // The route can move a little if a web font lands late; follow it.
      const r = document.querySelector('.route-line')?.getBoundingClientRect();
      if (r) cy = r.top + r.height / 2;
      const [x, s] = at(Math.min(t, total));
      draw(x, s);
      if (t >= total) { finish(); return; }
      raf = requestAnimationFrame(frame);
    };
    draw(x0, v);
    raf = requestAnimationFrame(frame);

    const skip = () => {
      if (done.current) return;
      done.current = true;
      cancelAnimationFrame(raf);
      const el = root.current;
      if (el) { el.style.transition = `opacity ${SKIP_FADE}ms linear`; el.style.opacity = '0'; }
      setTimeout(onDone, SKIP_FADE + 20);
    };
    const opts = { passive: true };
    const evs = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'resize'];
    evs.forEach(e => addEventListener(e, skip, opts));
    return () => {
      cancelAnimationFrame(raf);
      evs.forEach(e => removeEventListener(e, skip, opts));
    };
  }, [m, onDone]);

  if (!m) return <div className="i3-root"><div className="i3-cover" /></div>;
  const { L, ch, cw, gap, W } = m;
  return (
    <div className="i3-root" ref={root} aria-hidden="true">
      <div className="i3-cover" ref={cover} />
      <div className="i3-track" ref={track} style={{ width: W }} />
      <div className="i3-blur" ref={blur}>
        {LINES.map((l, i) => (
          <span key={l.id} style={{ '--c': l.color, top: `${(i - 2) * ch * 0.17 - 1}px`, width: `${cw * (0.7 + 0.25 * ((i * 3) % 5))}px` }} />
        ))}
      </div>
      <svg className="i3-train" ref={train} width={L} height={ch} viewBox={`0 0 ${L} ${ch}`}>
        {LINES.map((l, i) => i < LINES.length - 1 && (
          <rect key={`c${l.id}`} x={(i + 1) * (cw + gap) - gap - 1} y={ch * 0.45} width={gap + 2} height={ch * 0.22} fill="#15171a" />
        ))}
        {LINES.map((l, i) => (
          <Car key={l.id} x={i * (cw + gap)} w={cw} h={ch} color={l.color} rakeL={i === 0} rakeR={i === LINES.length - 1} />
        ))}
      </svg>
    </div>
  );
}

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { animate, cubicBezier, motion, motionValue, useTransform } from 'motion/react';
import { LINES } from '../data.js';
import './Intro5.css';

const EXT = 40;                                   // bars run past the screen edges so their ends never show
const linear = t => t;
const DROP = cubicBezier(0.42, 0, 0.18, 1);
const DRAW_IN = cubicBezier(0.55, 0, 0.25, 1);
// Swing: constant acceleration for most of the travel, then a short hard brake that ends at rest
// exactly at 90 degrees (position and speed continuous, no overshoot).
const BRAKE_AT = 0.8;
const SWING = x => (x < BRAKE_AT ? (x * x) / BRAKE_AT : 1 - ((1 - x) * (1 - x)) / (1 - BRAKE_AT));
const FADE = cubicBezier(0.4, 0, 0.6, 1);

// Timeline, in seconds.
const T = {
  drop: 0, dropLen: 0.66, dropStagger: 0.05,
  nameIn: 0.38, nameInLen: 0.4, nameOut: 1.3, nameOutLen: 0.24,
  draw: 1.3, drawLen: 0.32,
  swing: 1.64, swingLen: 0.62,
};
T.landed = T.swing + T.swingLen;
T.end = T.landed + 0.14;

const snap = v => Math.round(v * devicePixelRatio) / devicePixelRatio;

// Where each line ends up: the left end of its segment in the route bar
// (Education has no segment, so it closes into its station).
function measure() {
  const lis = document.querySelectorAll('.route-line > li');
  if (lis.length !== LINES.length) return null;
  const W = innerWidth, H = innerHeight;
  const phone = W <= 640;
  const thick = phone ? 10 : 16;   // even, so the thinned bar sits on whole pixels
  const arms = LINES.map((l, i) => {
    const seg = lis[i].querySelector('.seg');
    if (seg) {
      // The page paints the segment on whole device pixels, so land on those.
      const r = seg.getBoundingClientRect();
      const x = snap(r.left), top = snap(r.top), h = snap(r.bottom) - top;
      return { color: l.color, x, y: top + h / 2, len: snap(r.right) - x, h };
    }
    const r = lis[i].querySelector('.dot').getBoundingClientRect();
    return { color: l.color, x: r.left + r.width / 2, y: r.top + r.height / 2, len: 0, h: 6 };
  });
  // While falling, the lines stand evenly spaced under the name; they slide to their pivots as they draw in.
  const band = Math.min(W * 0.62, 880);
  arms.forEach((a, i) => { a.x0 = W / 2 - band / 2 + (band * i) / (arms.length - 1); });
  // Stations along each line, kept clear of the name and of the stretch that becomes the segment.
  const gap = phone ? 74 : 104;
  const clear = phone ? 46 : 84;
  arms.forEach((a, i) => {
    a.stations = [];
    for (let y = 46 + ((i * 37) % gap); y < H - 24; y += gap) {
      if (Math.abs(y - H / 2) < clear) continue;
      if (y > a.y - 30 && y < a.y + a.len + 30) continue;
      a.stations.push(y);
    }
  });
  return { H, thick, arms };
}

function Station({ y, bot, out, full }) {
  // Ticks on as the falling tip passes it.
  const scale = useTransform([bot, out], ([b, o]) => {
    const k = Math.min(Math.max((full - b - EXT - y) / 26, 0), 1);
    if (k === 0) return 0;
    return (k < 1 ? 0.4 + 0.75 * k : 1) * o;
  });
  return <motion.span className="i5-st" style={{ top: y + EXT, scale }} />;
}

function Arm({ a, i, t, H, thick }) {
  const full = H + 2 * EXT;
  const pivot = a.y + EXT;
  const reach = full - pivot;                     // length of the line below the pivot
  const d0 = T.drop + i * T.dropStagger;
  const rotate = useTransform(t, [T.swing, T.landed], [0, -90], { ease: SWING });
  // Falls in from the top; while swinging, it reels in to the length of its segment.
  const bot = useTransform([t, rotate], ([v, r]) => {
    if (v < T.swing) return full * (1 - DROP(Math.min(Math.max((v - d0) / T.dropLen, 0), 1)));
    const p = r / -90;
    const len = a.len + (reach - a.len) * (1 - p) ** 1.4;
    return full - pivot - len;
  });
  // The part above the route bar draws down into the pivot, and the line thins to the segment's height.
  const top = useTransform(t, [T.draw, T.draw + T.drawLen], [0, pivot], { ease: DRAW_IN });
  const side = useTransform(t, [T.draw, T.draw + T.drawLen], [0, (thick - a.h) / 2], { ease: DRAW_IN });
  const out = useTransform(t, [T.draw, T.draw + 0.16], [1, 0]);
  const x = useTransform(t, [T.draw, T.draw + T.drawLen], [a.x0 - a.x, 0], { ease: DRAW_IN });
  const barClip = useTransform([top, bot, side], ([tp, b, s]) =>
    `inset(${tp}px ${s}px ${b}px ${s}px round ${(thick - 2 * s) / 2}px)`);
  const stClip = useTransform([top, bot], ([tp, b]) => `inset(${tp}px -40px ${b}px -40px)`);
  return (
    <motion.div
      className="i5-arm"
      style={{
        '--c': a.color, left: a.x - thick / 2, top: -EXT, width: thick, height: full,
        transformOrigin: `${thick / 2}px ${a.y + EXT}px`, x, rotate,
      }}
    >
      <motion.span className="i5-bar" style={{ clipPath: barClip }} />
      <motion.span className="i5-stations" style={{ clipPath: stClip }}>
        {a.stations.map(y => <Station key={y} y={y} bot={bot} out={out} full={full} />)}
      </motion.span>
    </motion.div>
  );
}

// The five lines fall down the screen side by side, stations ticking on, with the name across them.
// Then each draws in to the length of its segment and swings up about its left end, like a crossing
// arm, locking into the route bar of the page underneath while the dark ground lifts.
export default function Intro5({ onDone }) {
  const [geo, setGeo] = useState(null);
  const done = useRef(false);
  const t = useMemo(() => motionValue(0), []);
  const skipFade = useMemo(() => motionValue(1), []);
  const nameOpacity = useTransform(t, [T.nameIn, T.nameIn + T.nameInLen, T.nameOut, T.nameOut + T.nameOutLen],
    [0, 1, 1, 0], { ease: [cubicBezier(0, 0, 0.58, 1), linear, cubicBezier(0.42, 0, 1, 1)] });
  const nameY = useTransform(t, [T.nameIn, T.nameIn + T.nameInLen], [14, 0], { ease: cubicBezier(0.2, 0, 0.2, 1) });
  const ground = useTransform(t, [T.swing + 0.4, T.landed + 0.08], [1, 0], { ease: FADE });
  const cover = useTransform([t, skipFade], ([v, s]) => (v < T.landed ? 1 : Math.max(0, 1 - (v - T.landed) / (T.end - T.landed))) * s);

  useLayoutEffect(() => {
    let live = true;
    // Label widths set the segment positions, so wait (briefly) for the font before measuring.
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, new Promise(r => setTimeout(r, 400))]).then(() => requestAnimationFrame(() => {
      if (!live) return;
      const g = measure();
      if (g) setGeo(g);
      else if (!done.current) { done.current = true; onDone(); }
    }));
    return () => { live = false; };
  }, [onDone]);

  useEffect(() => {
    if (!geo) return undefined;
    const finish = () => { if (!done.current) { done.current = true; onDone(); } };
    const run = animate(t, T.end, { duration: T.end, ease: 'linear' });
    run.then(finish);
    const skip = () => {
      if (done.current) return;
      done.current = true;
      run.stop();
      animate(skipFade, 0, { duration: 0.18 });
      setTimeout(onDone, 200);
    };
    const evs = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'resize'];
    evs.forEach(e => addEventListener(e, skip, { passive: true }));
    return () => {
      evs.forEach(e => removeEventListener(e, skip));
      run.stop();
    };
  }, [geo, t, skipFade, onDone]);

  return (
    <motion.div className="i5-cover" aria-hidden="true" style={{ opacity: cover }}>
      <motion.div className="i5-ground" style={{ opacity: ground }} />
      {geo && geo.arms.map((a, i) => <Arm key={LINES[i].id} a={a} i={i} t={t} H={geo.H} thick={geo.thick} />)}
      {geo && <motion.p className="i5-name" style={{ opacity: nameOpacity, y: nameY }}>Zach Winship</motion.p>}
    </motion.div>
  );
}

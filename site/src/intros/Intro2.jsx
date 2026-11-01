import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LINES } from '../data.js';
import './Intro2.css';

// The whole map: the five lines draw across the screen as one big diagram that meets at a
// central interchange, then each line straightens into its piece of the route bar and the page shows.

// Timeline in seconds.
const DRAW_AT = 0.05, DRAW_STEP = 0.07, DRAW = 0.75;
const HUB_AT = 0.45;
const POP = 0.24;
const FLAT_AT = 1.2, FLAT_STEP = 0.04, FLAT = 0.75;
const STOPS_OUT = 0.28;
const CLONE_AT = 1.85, CLONE = 0.3;
const COVER_AT = 2.05, COVER = 0.5;
const END = 2.6;
const SKIP = 0.2;

function bezier(x1, y1, x2, y2) {
  const c = (a, b) => t => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  const bx = c(x1, x2), by = c(y1, y2);
  return x => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 22; i++) { t = (lo + hi) / 2; if (bx(t) < x) lo = t; else hi = t; }
    return by(t);
  };
}
const EASE_DRAW = bezier(0.45, 0, 0.2, 1);
const EASE_FLAT = bezier(0.65, 0, 0.3, 1);
const clamp01 = n => Math.min(1, Math.max(0, n));
const prog = (t, at, dur) => clamp01((t - at) / dur);
const backOut = p => { const s = 2.2; const q = p - 1; return p >= 1 ? 1 : 1 + (s + 1) * q ** 3 + s * q ** 2; };

// Octilinear routes through a hub at (0, 0) in units of u. The first and last legs run off screen.
// Every route moves steadily from its first point to its last, so it can collapse onto a straight bar.
function routes(u, s) {
  return [
    [[-99, -2], [-3, -2], [-1, 0], [2, 0], [4, -2], [99, -2]].map(([x, y]) => [x * u, y * u]),
    [[2, -99], [2, -3], [0, -1], [0, 2], [-2, 4], [-2, 99]].map(([x, y]) => [x * u, y * u]),
    [[-3, 99], [-3, 3], [3, -3], [3, -99]].map(([x, y]) => [x * u, y * u]),
    [[-3, -99], [-3, -3], [3, 3], [3, 99]].map(([x, y]) => [x * u, y * u]),
    [[-99 * u, 3 * u], [-4 * u, 3 * u], [-u - s, s], [u + s, s], [4 * u, 3 * u], [99 * u, 3 * u]],
  ];
}

// Clip the outer legs to just past the screen edge so the drawing starts and ends at the edges.
function clipLegs(pts, cx, cy, W, H, pad) {
  const out = pts.map(p => [p[0] + cx, p[1] + cy]);
  const off = p => p[0] < -pad || p[0] > W + pad || p[1] < -pad || p[1] > H + pad;
  // On narrow screens some bends fall off screen: start the line at the last one that does.
  while (out.length > 2 && off(out[1])) out.shift();
  while (out.length > 2 && off(out[out.length - 2])) out.pop();
  const fit = (a, b) => {
    // a is off screen, b is the bend; move a back along the leg to the edge plus pad.
    const dx = a[0] - b[0], dy = a[1] - b[1];
    let k = 1;
    if (dx > 0) k = Math.min(k, (W + pad - b[0]) / dx);
    if (dx < 0) k = Math.min(k, (-pad - b[0]) / dx);
    if (dy > 0) k = Math.min(k, (H + pad - b[1]) / dy);
    if (dy < 0) k = Math.min(k, (-pad - b[1]) / dy);
    return [b[0] + dx * Math.max(k, 0), b[1] + dy * Math.max(k, 0)];
  };
  out[0] = fit(out[0], out[1]);
  out[out.length - 1] = fit(out[out.length - 1], out[out.length - 2]);
  return out.filter((p, i) => i === 0 || Math.hypot(p[0] - out[i - 1][0], p[1] - out[i - 1][1]) > 0.5);
}

// Path commands with rounded bends: lists of [cmd, ...points].
function rounded(pts, r) {
  const cmds = [['M', pts[0]]];
  for (let i = 1; i < pts.length - 1; i++) {
    const [p, q, n] = [pts[i - 1], pts[i], pts[i + 1]];
    const l1 = Math.hypot(q[0] - p[0], q[1] - p[1]), l2 = Math.hypot(n[0] - q[0], n[1] - q[1]);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const a = [q[0] - (q[0] - p[0]) / l1 * rr, q[1] - (q[1] - p[1]) / l1 * rr];
    const b = [q[0] + (n[0] - q[0]) / l2 * rr, q[1] + (n[1] - q[1]) / l2 * rr];
    cmds.push(['L', a], ['Q', q, b]);
  }
  cmds.push(['L', pts[pts.length - 1]]);
  return cmds;
}
const toD = (cmds, f) => cmds.map(([c, ...ps]) => c + ps.map(p => { const [x, y] = f(p); return `${x.toFixed(2)} ${y.toFixed(2)}`; }).join(' ')).join(' ');

// Stations: middle of each inner leg, and a stop on each outer leg if it is on screen.
function stations(pts, u, W, H) {
  const lens = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); lens.push(l); total += l; }
  const at = (leg, d) => {
    const [p, q] = [pts[leg], pts[leg + 1]];
    const k = d / lens[leg];
    let before = 0;
    for (let i = 0; i < leg; i++) before += lens[i];
    return { x: p[0] + (q[0] - p[0]) * k, y: p[1] + (q[1] - p[1]) * k, f: (before + d) / total };
  };
  const out = [];
  const last = lens.length - 1;
  out.push(at(0, lens[0] - 1.4 * u));
  for (let i = 1; i < last; i++) out.push(at(i, lens[i] / 2));
  out.push(at(last, 1.4 * u));
  const m = 12;
  return out.filter(s => s.x > m && s.x < W - m && s.y > m && s.y < H - m && Math.hypot(s.x - W / 2, s.y - H / 2) > u * 0.9);
}

function build() {
  const W = innerWidth, H = innerHeight;
  const u = Math.min(W, H) / (W < H ? 7.2 : 8);
  const sw = Math.round(Math.min(22, Math.max(12, Math.min(W, H) * 0.024)));
  const s = sw * 1.7;
  const cx = W / 2, cy = H / 2;
  const lines = routes(u, s).map((r, i) => {
    const pts = clipLegs(r, cx, cy, W, H, sw * 2);
    return { color: LINES[i].color, pts, cmds: rounded(pts, u * 0.55), stops: stations(pts, u, W, H) };
  });
  const hub = { x: cx, y: cy + s / 2, w: sw * 2.3, h: s + sw * 2.3 };
  return { W, H, u, sw, lines, hub };
}

// Where each line lands: the real segments, and the last dot for the last line, which has none.
function targets() {
  const ol = document.querySelector('.route .route-line');
  if (!ol) return null;
  const items = [...ol.querySelectorAll(':scope > li')];
  const r = ol.getBoundingClientRect();
  const segs = items.map(li => {
    const seg = li.querySelector('.seg');
    if (seg) { const b = seg.getBoundingClientRect(); const y = b.top + b.height / 2; return { L: [b.left + b.height / 2, y], R: [b.right - b.height / 2, y], w: b.height }; }
    const d = li.querySelector('.dot').getBoundingClientRect();
    const c = [d.left + d.width / 2, d.top + d.height / 2];
    return { L: c, R: c, w: d.width - 2, dot: true };
  });
  return { box: { left: r.left, top: r.top, width: r.width, height: r.height }, segs };
}

// Affine map that slides a line onto its target: its start goes to L, its end to R,
// and everything across the line folds onto it.
function flattener(pts, T) {
  const A = pts[0], B = pts[pts.length - 1];
  const dx = B[0] - A[0], dy = B[1] - A[1];
  const n2 = dx * dx + dy * dy;
  const kx = (T.R[0] - T.L[0]) / n2, ky = (T.R[1] - T.L[1]) / n2;
  return p => {
    const k = (p[0] - A[0]) * dx + (p[1] - A[1]) * dy;
    return [T.L[0] + kx * k, T.L[1] + ky * k];
  };
}

export default function Intro2({ onDone }) {
  const [map, setMap] = useState(null);
  const root = useRef(null);
  const white = useRef(null);
  const paths = useRef([]);
  const stopEls = useRef([]);
  const hubEl = useRef(null);
  const clone = useRef(null);
  const done = useRef(false);

  useLayoutEffect(() => {
    if (!document.querySelector('.route .route-line')) { done.current = true; onDone(); return; }
    setMap(build());
  }, [onDone]);

  useEffect(() => {
    if (!map) return undefined;
    let raf = 0, t0 = 0, tgt = null, flat = null, skipAt = -1;
    const popAt = map.lines.map(l => l.stops.map(() => -1));
    const finish = () => { if (!done.current) { done.current = true; onDone(); } };

    const frame = now => {
      if (!t0) t0 = now;
      const t = (now - t0) / 1000;

      if (skipAt >= 0) {
        const p = prog(t, skipAt, SKIP);
        root.current.style.opacity = String(1 - p);
        if (p >= 1) { finish(); return; }
        raf = requestAnimationFrame(frame);
        return;
      }

      // Draw.
      map.lines.forEach((l, i) => {
        const el = paths.current[i];
        const p = EASE_DRAW(prog(t, DRAW_AT + i * DRAW_STEP, DRAW));
        if (t < FLAT_AT) el.style.strokeDashoffset = String(1 - p);
        l.stops.forEach((s, j) => {
          const st = stopEls.current[i]?.[j];
          if (!st) return;
          if (popAt[i][j] < 0 && p >= s.f) popAt[i][j] = t;
          const pop = popAt[i][j] < 0 ? 0 : backOut(prog(t, popAt[i][j], POP));
          const out = 1 - EASE_FLAT(prog(t, FLAT_AT, STOPS_OUT));
          st.style.transform = `scale(${Math.max(0, pop * out)})`;
        });
      });
      const hp = backOut(prog(t, HUB_AT, POP)) * (1 - EASE_FLAT(prog(t, FLAT_AT, STOPS_OUT)));
      hubEl.current.style.transform = `scale(${Math.max(0, hp)})`;

      // Straighten.
      if (t >= FLAT_AT) {
        if (!tgt) {
          tgt = targets();
          if (!tgt) { finish(); return; }
          flat = map.lines.map((l, i) => flattener(l.pts, tgt.segs[i]));
          paths.current.forEach(el => { el.style.strokeDasharray = 'none'; el.style.strokeDashoffset = '0'; });
          const c = clone.current, b = tgt.box;
          Object.assign(c.style, { left: `${b.left}px`, top: `${b.top}px`, width: `${b.width}px` });
        }
        map.lines.forEach((l, i) => {
          const p = EASE_FLAT(prog(t, FLAT_AT + i * FLAT_STEP, FLAT));
          const f = flat[i];
          const d = toD(l.cmds, q => { const r = f(q); return [q[0] + (r[0] - q[0]) * p, q[1] + (r[1] - q[1]) * p]; });
          const el = paths.current[i];
          el.setAttribute('d', d);
          el.style.strokeWidth = String(map.sw + (tgt.segs[i].w - map.sw) * p);
        });
        clone.current.style.opacity = String(EASE_FLAT(prog(t, CLONE_AT, CLONE)));
        // The last line ends as a disc under the last dot; drop it once the dot covers it.
        if (t > CLONE_AT + CLONE) paths.current[4].style.opacity = '0';
      }
      white.current.style.opacity = String(1 - prog(t, COVER_AT, COVER));

      if (t >= END) { finish(); return; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const skip = () => {
      if (done.current || skipAt >= 0) return;
      skipAt = t0 ? (performance.now() - t0) / 1000 : 0;
    };
    const evs = ['pointerdown', 'keydown', 'wheel', 'touchmove', 'resize'];
    evs.forEach(e => addEventListener(e, skip, { passive: true }));
    return () => {
      cancelAnimationFrame(raf);
      evs.forEach(e => removeEventListener(e, skip, { passive: true }));
    };
  }, [map, onDone]);

  if (!map) return <div className="intro-cover" />;
  const { W, H, sw, lines, hub } = map;
  return (
    <div className="i2-root" ref={root} aria-hidden="true">
      <div className="i2-white" ref={white} />
      <svg className="i2-map" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {lines.map((l, i) => (
          <path key={l.color} ref={el => { paths.current[i] = el; }} d={toD(l.cmds, p => p)} pathLength="1"
            stroke={l.color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: '1 1', strokeDashoffset: 1 }} />
        ))}
        {lines.map((l, i) => l.stops.map((s, j) => (
          <circle key={`${i}-${j}`} ref={el => { (stopEls.current[i] ||= [])[j] = el; }} className="i2-pop"
            cx={s.x} cy={s.y} r={sw * 0.78} fill="#fff" stroke={l.color} strokeWidth={sw * 0.42}
            style={{ transform: 'scale(0)' }} />
        )))}
        <rect ref={hubEl} className="i2-pop" x={hub.x - hub.w / 2} y={hub.y - hub.h / 2} width={hub.w} height={hub.h}
          rx={hub.w / 2} fill="#fff" stroke="#15171a" strokeWidth={Math.max(3, sw * 0.32)} style={{ transform: 'scale(0)' }} />
      </svg>
      <ol className="route-line i2-clone" ref={clone}>
        {LINES.map((l, i) => (
          <li key={l.id} style={{ '--c': l.color }}>
            <span className="intro-stop">
              <span className="dot">{i === 0 && <span className="marker" />}</span>
              <span className="label">{l.name}</span>
            </span>
            {i < LINES.length - 1 && <span className="seg i2-hide" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

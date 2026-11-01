import { useLayoutEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LINES } from '../data.js';

// Octilinear lines out of one central station, like a transit system map.
// Paths use only M, H, V and L so stops can be placed with plain geometry.
const WIDE = {
  box: [1200, 720], c: [600, 380],
  paths: {
    research: 'M600 380 H430 L290 240 H90',
    software: 'M600 380 V110',
    experience: 'M600 380 H770 L910 240 H1110',
    projects: 'M600 380 L740 520 H1110',
    education: 'M600 380 L460 520 H90',
  },
  label: { research: ['end', -22, 7], software: ['middle', 0, -28], experience: ['start', 22, 7], projects: ['start', 22, 7], education: ['end', -22, 7] },
  fun: [['M600 380 V580 L540 640 H430', '/play/wii/', 'Living room, 2006', 'end', [430, 640]], ['M600 380 V580 L660 640 H770', '/play/win98/', 'Family computer, 1998', 'start', [770, 640]]],
};
const TALL = {
  box: [400, 760], c: [200, 340],
  paths: {
    research: 'M200 340 L70 210 V70',
    software: 'M200 340 V70',
    experience: 'M200 340 L330 210 V70',
    projects: 'M200 340 L330 470 V700',
    education: 'M200 340 L70 470 V620',
  },
  label: { research: ['middle', 0, -24], software: ['middle', 0, -24], experience: ['middle', 0, -24], projects: ['middle', 0, 40], education: ['middle', 0, 40] },
  fun: [],
};
const SHORT = {
  box: [400, 620], c: [200, 290],
  paths: {
    research: 'M200 290 L80 170 V64',
    software: 'M200 290 V64',
    experience: 'M200 290 L320 170 V64',
    projects: 'M200 290 L320 410 V560',
    education: 'M200 290 L80 410 V500',
  },
  label: { research: ['middle', 0, -24], software: ['middle', 0, -24], experience: ['middle', 0, -24], projects: ['middle', 0, 40], education: ['middle', 0, 40] },
  fun: [],
};

function pick() {
  if (innerWidth / innerHeight >= 0.85) return WIDE;
  return innerHeight < 760 ? SHORT : TALL;
}

// Path string to vertices.
function vertices(d) {
  const pts = []; let x = 0; let y = 0;
  for (const [, cmd, a, b] of d.matchAll(/([MHVL])\s*(-?[\d.]+)(?:\s+(-?[\d.]+))?/g)) {
    if (cmd === 'M' || cmd === 'L') { x = +a; y = +b; } else if (cmd === 'H') x = +a; else y = +a;
    pts.push([x, y]);
  }
  return pts;
}

// Stops spaced evenly between the hub and the terminus, nudged off the bends.
function placeStops(d, n) {
  const v = vertices(d);
  const seg = v.slice(1).map((p, i) => Math.hypot(p[0] - v[i][0], p[1] - v[i][1]));
  const cum = seg.reduce((a, l) => [...a, a[a.length - 1] + l], [0]);
  const total = cum[cum.length - 1];
  const corners = cum.slice(1, -1);
  const at = s => {
    const i = Math.max(0, cum.findIndex((c, k) => k > 0 && c >= s) - 1);
    const t = (s - cum[i]) / (seg[i] || 1);
    return [v[i][0] + (v[i + 1][0] - v[i][0]) * t, v[i][1] + (v[i + 1][1] - v[i][1]) * t];
  };
  const start = 70; const end = total - 46;
  const gap = Math.min(28, (end - start) / (n + 1) / 2);
  return Array.from({ length: n }, (_, i) => {
    let s = n === 1 ? (start + end) / 2 : start + ((end - start) * i) / (n - 1);
    for (const c of corners) if (Math.abs(s - c) < gap) s = s < c ? c - gap : c + gap;
    return at(s);
  }).concat([v[v.length - 1]]);
}

export default function SystemMap({ onGo }) {
  const [lay, setLay] = useState(pick);
  const [focus, setFocus] = useState(null);

  useLayoutEffect(() => {
    scrollTo(0, 0);
    const on = () => setLay(pick());
    addEventListener('resize', on);
    return () => removeEventListener('resize', on);
  }, []);

  const [w, h] = lay.box;
  const go = (e, hash) => { e.preventDefault(); onGo(hash); };
  const stops = Object.fromEntries(LINES.map(l => [l.id, placeStops(lay.paths[l.id], l.items.length)]));
  const caption = focus && LINES.flatMap(l => l.items.map(it => ({ it, l }))).find(x => x.it.id === focus);

  return (
    <div className={`lp-map${lay === SHORT ? ' short' : ''}`}>
      <header className="lp-head">
        <div>
          <h1>Zach Winship</h1>
          <p>MS in Quantitative Economics, New York University</p>
        </div>
        <a className="lp-enter" href="#/" onClick={e => go(e, '#/')}>Enter</a>
      </header>
      <svg className="lp-svg" viewBox={`0 0 ${w} ${h}`} role="group" aria-label="Map of the site: each line is a section, each stop a paper, job or project">
        {LINES.map((l, li) => (
          <motion.path key={`${l.id}-${w}-${h}`} className="lp-line" d={lay.paths[l.id]} stroke={l.color}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.1 + li * 0.08, duration: 0.9, ease: [0.65, 0, 0.35, 1] }} />
        ))}
        {LINES.map((l, li) => {
          const pts = stops[l.id];
          const end = pts[pts.length - 1];
          const [anchor, dx, dy] = lay.label[l.id];
          return (
            <motion.g key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 + li * 0.08, duration: 0.3 }}>
              {l.items.map((it, i) => {
                const [x, y] = pts[i];
                const hash = it.body ? `#/${it.id}` : `#/${l.id}`;
                const on = focus === it.id;
                return (
                  <a key={it.id} href={hash} className="lp-stop" onClick={e => go(e, hash)} aria-label={`${it.title}, ${l.name}`}
                    onMouseEnter={() => setFocus(it.id)} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus(it.id)} onBlur={() => setFocus(null)}>
                    <circle cx={x} cy={y} r="20" className="hit" />
                    <circle cx={x} cy={y} r={on ? 11 : 8} stroke={l.color} className="ring" />
                  </a>
                );
              })}
              <a href={`#/${l.id}`} className="lp-term" onClick={e => go(e, `#/${l.id}`)}>
                <circle cx={end[0]} cy={end[1]} r="13" stroke={l.color} />
                <text x={end[0] + dx} y={end[1] + dy} textAnchor={anchor}>{l.name}</text>
              </a>
            </motion.g>
          );
        })}
        {lay.fun.map(([d, href, label, anchor, [ex, ey]], i) => (
          <motion.a key={href} href={href} className="lp-fun" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}>
            <path d={d} />
            <circle cx={ex} cy={ey} r="8" />
            <text x={ex + (anchor === 'end' ? -16 : 16)} y={ey + 6} textAnchor={anchor}>{label}</text>
          </motion.a>
        ))}
        <a href="#/" className="lp-hub" tabIndex={-1} onClick={e => go(e, '#/')} aria-hidden="true">
          <motion.circle cx={lay.c[0]} cy={lay.c[1]} r="24" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }} />
        </a>
      </svg>
      <p className="lp-caption" aria-live="polite">
        {caption ? <><i style={{ background: caption.l.color }} aria-hidden="true" />{caption.it.title}</> : ' '}
      </p>
      <p className="lp-others">
        <a href="/play/wii/">Living room, 2006</a>
        <a href="/play/win98/">Family computer, 1998</a>
      </p>
    </div>
  );
}

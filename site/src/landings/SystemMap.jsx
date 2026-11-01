import { useLayoutEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LINES } from '../data.js';
import { SHORT } from './shortNames.js';


// Octilinear lines out of one central station. Paths use only M, H, V and L.
// Stops sit on each line's outer run; `lean` is the direction station names run (degrees).
const WIDE = {
  box: [1440, 760], c: [720, 390], labels: true,
  paths: {
    research: 'M720 390 H580 L440 250 H150',
    software: 'M720 390 V130',
    experience: 'M720 390 H860 L1000 250 H1290',
    projects: 'M720 390 L860 530 H1290',
    education: 'M720 390 L580 530 H150',
  },
  lean: { research: -45, software: 0, experience: -45, projects: 45, education: 45 },
  term: { research: ['end', -24, 8], software: ['middle', 0, -28], experience: ['start', 24, 8], projects: ['start', 24, 8], education: ['end', -24, 8] },
  fun: [['M720 390 V660 L680 700 H560', '/play/wii/', 'Living room, 2006', 'end', [560, 700]], ['M720 390 V660 L760 700 H880', '/play/win98/', 'Family computer, 1998', 'start', [880, 700]]],
};
const TALL = {
  box: [400, 760], c: [200, 340], labels: false,
  paths: {
    research: 'M200 340 L70 210 V70',
    software: 'M200 340 V70',
    experience: 'M200 340 L330 210 V70',
    projects: 'M200 340 L330 470 V700',
    education: 'M200 340 L70 470 V620',
  },
  term: { research: ['middle', 0, -24], software: ['middle', 0, -24], experience: ['middle', 0, -24], projects: ['middle', 0, 40], education: ['middle', 0, 40] },
  fun: [],
};
const SHORT_SCREEN = {
  ...TALL, box: [400, 620], c: [200, 290],
  paths: {
    research: 'M200 290 L80 170 V64',
    software: 'M200 290 V64',
    experience: 'M200 290 L320 170 V64',
    projects: 'M200 290 L320 410 V560',
    education: 'M200 290 L80 410 V500',
  },
};

function pick() {
  if (innerWidth >= 900 && innerWidth / innerHeight >= 1.1) return WIDE;
  return innerHeight < 760 ? SHORT_SCREEN : TALL;
}

function vertices(d) {
  const pts = []; let x = 0; let y = 0;
  for (const [, cmd, a, b] of d.matchAll(/([MHVL])\s*(-?[\d.]+)(?:\s+(-?[\d.]+))?/g)) {
    if (cmd === 'M' || cmd === 'L') { x = +a; y = +b; } else if (cmd === 'H') x = +a; else y = +a;
    pts.push([x, y]);
  }
  return pts;
}

// Wide map: stops spread along the outer run. Tall map: along the whole line, clear of the hub.
function placeStops(d, n, outerOnly) {
  const v = vertices(d);
  const end = v[v.length - 1];
  if (outerOnly) {
    const a = v[v.length - 2];
    const ts = n === 1 ? [0.45] : Array.from({ length: n }, (_, i) => 0.07 + (0.8 * i) / (n - 1));
    return ts.map(t => [Math.round(a[0] + (end[0] - a[0]) * t), Math.round(a[1] + (end[1] - a[1]) * t)]).concat([end]);
  }
  const seg = v.slice(1).map((p, i) => Math.hypot(p[0] - v[i][0], p[1] - v[i][1]));
  const cum = seg.reduce((acc, l) => [...acc, acc[acc.length - 1] + l], [0]);
  const total = cum[cum.length - 1];
  const at = s => {
    const i = Math.max(0, cum.findIndex((c, k) => k > 0 && c >= s) - 1);
    const t = (s - cum[i]) / (seg[i] || 1);
    return [v[i][0] + (v[i + 1][0] - v[i][0]) * t, v[i][1] + (v[i + 1][1] - v[i][1]) * t];
  };
  const start = 64; const stop = total - 44;
  return Array.from({ length: n }, (_, i) => at(n === 1 ? (start + stop) / 2 : start + ((stop - start) * i) / (n - 1))).concat([end]);
}

export default function SystemMap({ onGo }) {
  const [lay, setLay] = useState(pick);
  const [hot, setHot] = useState(null);       // hovered or focused stop
  const [picked, setPicked] = useState(null); // tapped once on a phone

  useLayoutEffect(() => {
    scrollTo(0, 0);
    const on = () => setLay(pick());
    addEventListener('resize', on);
    return () => removeEventListener('resize', on);
  }, []);

  const [w, h] = lay.box;
  const go = (e, hash) => { e.preventDefault(); onGo(hash); };
  const stops = Object.fromEntries(LINES.map(l => [l.id, placeStops(lay.paths[l.id], l.items.length, lay.labels)]));
  const all = LINES.flatMap(l => l.items.map(it => ({ it, l, hash: it.body ? `#/${it.id}` : `#/${l.id}` })));
  const shown = all.find(x => x.it.id === (hot || picked));

  const tapStop = (e, x) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (!lay.labels && picked !== x.it.id) { setPicked(x.it.id); return; }
    onGo(x.hash);
  };

  return (
    <div className={`lp-map${lay === SHORT_SCREEN ? ' short' : ''}${lay.labels ? ' wide' : ''}`}>
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
        {lay.fun.map(([d, href, label, anchor, [ex, ey]], i) => (
          <motion.a key={href} href={href} className="lp-fun" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}>
            <path d={d} />
            <circle cx={ex} cy={ey} r="8" />
            <text x={ex + (anchor === 'end' ? -16 : 16)} y={ey + 6} textAnchor={anchor}>{label}</text>
          </motion.a>
        ))}
        <motion.circle className="lp-hub" cx={lay.c[0]} cy={lay.c[1]} r="24" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }} />
        {LINES.map((l, li) => {
          const pts = stops[l.id];
          const end = pts[pts.length - 1];
          const [anchor, dx, dy] = lay.term[l.id];
          const lean = lay.lean?.[l.id] ?? 0;
          return (
            <motion.g key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + li * 0.08, duration: 0.35 }}>
              {l.items.map((it, i) => {
                const [x, y] = pts[i];
                const x0 = all.find(a => a.it.id === it.id);
                const on = (hot || picked) === it.id;
                return (
                  <a key={it.id} href={x0.hash} className={`lp-stop${on ? ' on' : ''}`} onClick={e => tapStop(e, x0)} aria-label={`${it.title}, ${l.name}`}
                    onMouseEnter={() => setHot(it.id)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(it.id)} onBlur={() => setHot(null)}>
                    <circle cx={x} cy={y} r="22" className="hit" />
                    <circle cx={x} cy={y} r="17" className="focus" />
                    <circle cx={x} cy={y} r={on ? 11 : 8} stroke={l.color} className="ring" />
                    {lay.labels && (
                      lean === 0
                        ? <text className="lp-name" x={x + 20} y={y + 6}>{SHORT[it.id] || it.title}</text>
                        : <text className="lp-name" x={x + 14} y={y + 6} transform={`rotate(${lean} ${x} ${y})`}>{SHORT[it.id] || it.title}</text>
                    )}
                  </a>
                );
              })}
              <a href={`#/${l.id}`} className="lp-term" onClick={e => go(e, `#/${l.id}`)}>
                <circle cx={end[0]} cy={end[1]} r="22" className="hit" />
                <circle cx={end[0]} cy={end[1]} r="13" stroke={l.color} className="ring" />
                <text x={end[0] + dx} y={end[1] + dy} textAnchor={anchor}>{l.name}</text>
              </a>
            </motion.g>
          );
        })}
      </svg>
      <p className="lp-caption" aria-live="polite">
        {shown ? (
          <>
            <i style={{ background: shown.l.color }} aria-hidden="true" />
            <span>{shown.it.title}</span>
            {!lay.labels && picked === shown.it.id && <a href={shown.hash} onClick={e => go(e, shown.hash)}>Open</a>}
          </>
        ) : ' '}
      </p>
      <p className="lp-others">
        <a href="/play/wii/">Living room, 2006</a>
        <a href="/play/win98/">Family computer, 1998</a>
      </p>
    </div>
  );
}

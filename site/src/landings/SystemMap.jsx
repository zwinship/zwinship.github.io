import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { LINES } from '../data.js';

// Octilinear paths out of one central station, like a transit system map.
const WIDE = {
  box: [1200, 720], c: [600, 380],
  paths: {
    research: 'M600 380 H430 L290 240 H90',
    software: 'M600 380 V110',
    experience: 'M600 380 H770 L910 240 H1110',
    projects: 'M600 380 L740 520 H1110',
    education: 'M600 380 L460 520 H90',
  },
  label: { research: ['end', -18, 6], software: ['middle', 0, -26], experience: ['start', 18, 6], projects: ['start', 18, 6], education: ['end', -18, 6] },
  fun: [['M600 380 V580 L540 640 H430', '/play/wii/', 'Living room, 2006', 'end'], ['M600 380 V580 L660 640 H770', '/play/win98/', 'Family computer, 1998', 'start']],
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
  label: { research: ['middle', 0, -22], software: ['middle', 0, -22], experience: ['middle', 0, -22], projects: ['middle', 0, 36], education: ['middle', 0, 36] },
  fun: [],
};

function useLayout() {
  const pick = () => (innerWidth / innerHeight < 0.85 ? TALL : WIDE);
  const [lay, setLay] = useState(pick);
  useLayoutEffect(() => {
    const on = () => setLay(pick());
    addEventListener('resize', on);
    return () => removeEventListener('resize', on);
  }, []);
  return lay;
}

export default function SystemMap({ onGo }) {
  const lay = useLayout();
  const refs = useRef({});
  const [pts, setPts] = useState({});
  const [hover, setHover] = useState(null);

  // Place stations evenly along each line, clear of the centre and the terminus.
  useLayoutEffect(() => {
    const out = {};
    for (const l of LINES) {
      const path = refs.current[l.id];
      if (!path) continue;
      const len = path.getTotalLength();
      const n = l.items.length;
      const ends = path.getPointAtLength(len);
      out[l.id] = {
        end: [ends.x, ends.y],
        items: l.items.map((it, i) => {
          const t = n === 1 ? 0.55 : 0.2 + (0.66 * i) / (n - 1);
          const p = path.getPointAtLength(len * t);
          return [p.x, p.y];
        }),
      };
    }
    setPts(out);
  }, [lay]);

  const [w, h] = lay.box;
  const go = (e, hash) => { e.preventDefault(); onGo(hash); };

  return (
    <div className="lp-map">
      <header className="lp-head">
        <div>
          <h1>Zach Winship</h1>
          <p>MS in Quantitative Economics, New York University</p>
        </div>
        <a className="lp-enter" href="#/" onClick={e => go(e, '#/')}>Enter</a>
      </header>
      <svg className="lp-svg" viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="lp-map-title">
        <title id="lp-map-title">Map of the site. Each line is a section; each stop is a paper, job or project.</title>
        {lay.fun.map(([d, href, label, anchor], i) => {
          const end = d.match(/H(\d+)$/);
          const y = Number(d.match(/(\d+) H\d+$/)[1]);
          return (
            <a key={href} href={href} className="lp-fun">
              <motion.path d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 + i * 0.1, duration: 0.8, ease: 'easeInOut' }} />
              <text x={Number(end[1]) + (anchor === 'end' ? -14 : 14)} y={y + 6} textAnchor={anchor}>{label}</text>
              <circle cx={end[1]} cy={y} r="7" />
            </a>
          );
        })}
        {LINES.map((l, li) => (
          <g key={l.id} style={{ '--c': l.color }}>
            <motion.path ref={el => { refs.current[l.id] = el; }} className="lp-line" d={lay.paths[l.id]} stroke={l.color}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.1 + li * 0.08, duration: 0.9, ease: [0.65, 0, 0.35, 1] }} />
          </g>
        ))}
        {LINES.map((l, li) => {
          const p = pts[l.id];
          if (!p) return null;
          const [anchor, dx, dy] = lay.label[l.id];
          return (
            <motion.g key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 + li * 0.08, duration: 0.3 }}>
              {l.items.map((it, i) => {
                const [x, y] = p.items[i];
                const hash = it.body ? `#/${it.id}` : `#/${l.id}`;
                const on = hover === it.id;
                return (
                  <a key={it.id} href={hash} className="lp-stop" onClick={e => go(e, hash)} aria-label={`${it.title} (${l.name})`}
                    onMouseEnter={() => setHover(it.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(it.id)} onBlur={() => setHover(null)}>
                    <circle cx={x} cy={y} r="18" className="hit" />
                    <circle cx={x} cy={y} r={on ? 11 : 8} stroke={l.color} className="ring" />
                  </a>
                );
              })}
              <a href={`#/${l.id}`} className="lp-term" onClick={e => go(e, `#/${l.id}`)}>
                <circle cx={p.end[0]} cy={p.end[1]} r="13" stroke={l.color} />
                <text x={p.end[0] + dx} y={p.end[1] + dy} textAnchor={anchor}>{l.name}</text>
              </a>
            </motion.g>
          );
        })}
        <a href="#/" className="lp-hub" onClick={e => go(e, '#/')} aria-label="Enter">
          <motion.circle cx={lay.c[0]} cy={lay.c[1]} r="24" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }} />
        </a>
        {hover && (() => {
          for (const l of LINES) {
            const i = l.items.findIndex(it => it.id === hover);
            if (i < 0 || !pts[l.id]) continue;
            const [x, y] = pts[l.id].items[i];
            const right = x < w / 2;
            const t = l.items[i].title;
            return <text className="lp-tip" x={x + (right ? 20 : -20)} y={y - 16} textAnchor={right ? 'start' : 'end'}>{t.length > 46 ? `${t.slice(0, 44)}...` : t}</text>;
          }
          return null;
        })()}
      </svg>
      <p className="lp-others">
        <a href="/play/wii/">Living room, 2006</a>
        <a href="/play/win98/">Family computer, 1998</a>
      </p>
    </div>
  );
}

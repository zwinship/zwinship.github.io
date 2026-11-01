import { useState } from 'react';
import { LINES } from '../data.js';
import './StationSign.css';

// Signage arrow in the style of station wayfinding: square shaft, open 90 degree head.
function Arrow() {
  return (
    <svg className="ss-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M1 10.1H16.4L9.8 3.5L12.5 0.8L23.7 12L12.5 23.2L9.8 20.5L16.4 13.9H1Z" />
    </svg>
  );
}

const hashFor = (line, it) => (it.body ? `#/${it.id}` : `#/${line.id}`);

export default function StationSign({ onGo }) {
  const [active, setActive] = useState(LINES[0].id);
  const line = LINES.find(l => l.id === active);
  const go = (e, hash) => { e.preventDefault(); onGo(hash); };

  return (
    <div className="ss">
      <header className="ss-band">
        <div className="ss-band-in">
          <h1 className="ss-name">Zach Winship</h1>
          <p className="ss-sub">MS in Quantitative Economics, New York University</p>
        </div>
      </header>
      <div className="ss-stripe" aria-hidden="true">
        {LINES.map(l => <span key={l.id} style={{ background: l.color }} />)}
      </div>

      <main className="ss-wall">
        <nav className="ss-lines" aria-label="Sections">
          <ul>
            {LINES.map((l, i) => (
              <li key={l.id} style={{ '--c': l.color, '--i': i }}>
                <a href={`#/${l.id}`} className={`ss-line${l.id === active ? ' is-on' : ''}`}
                  onClick={e => go(e, `#/${l.id}`)}
                  onMouseEnter={() => setActive(l.id)} onFocus={() => setActive(l.id)}>
                  <span className="ss-bullet" aria-hidden="true" />
                  <span className="ss-label">{l.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="ss-strip" style={{ '--c': line.color }} aria-label={`${line.name} stops`}>
          <ol key={line.id} style={{ '--n': line.items.length }}>
            {line.items.map((it, i) => (
              <li key={it.id} style={{ '--i': i }}>
                <a href={hashFor(line, it)} onClick={e => go(e, hashFor(line, it))}>
                  <span className="ss-stop" aria-hidden="true" />
                  <span className="ss-title">{it.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="ss-foot">
        <div className="ss-fun">
          <a href="/play/wii/">Living room, 2006</a>
          <a href="/play/win98/">Family computer, 1998</a>
        </div>
        <a href="#/" className="ss-enter" onClick={e => go(e, '#/')}>
          <span>Enter</span>
          <Arrow />
        </a>
      </footer>
      <div className="ss-edge" aria-hidden="true" />
    </div>
  );
}

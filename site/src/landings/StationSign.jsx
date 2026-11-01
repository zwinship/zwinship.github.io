import { useEffect, useRef, useState } from 'react';
import { LINES } from '../data.js';
import './StationSign.css';

const hashFor = (line, it) => (it.body ? `#/${it.id}` : `#/${line.id}`);
const narrow = () => matchMedia('(max-width: 760px)').matches;

export default function StationSign({ onGo }) {
  // Wide screens open on the first line; phones start with every line folded.
  const [active, setActive] = useState(() => (narrow() ? null : LINES[0].id));
  const [intro, setIntro] = useState(true);
  const hoverTimer = useRef(0);
  const pointer = useRef({ type: 'mouse', wasOn: false });

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 1400);
    return () => { clearTimeout(t); clearTimeout(hoverTimer.current); };
  }, []);

  const go = (e, hash) => { e.preventDefault(); onGo(hash); };

  // A short pause before switching lines, so a diagonal move toward the strip does not swap it.
  const hoverIn = id => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActive(id), 160);
  };
  const hoverOut = () => clearTimeout(hoverTimer.current);

  // Touch: the first tap opens a line's stops, a second tap enters the section.
  const pick = (e, id) => {
    e.preventDefault();
    clearTimeout(hoverTimer.current);
    const { type, wasOn } = pointer.current;
    pointer.current = { type: 'mouse', wasOn: false };
    if (type === 'touch' && !wasOn) setActive(id);
    else onGo(`#/${id}`);
  };

  return (
    <div className={`ss${intro ? ' is-intro' : ''}`}>
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
            {LINES.map((l, i) => {
              const on = l.id === active;
              return (
                <li key={l.id} className={on ? 'is-on' : undefined} style={{ '--c': l.color, '--i': i }}>
                  <a href={`#/${l.id}`} className="ss-line" aria-expanded={on}
                    onPointerDown={e => { pointer.current = { type: e.pointerType, wasOn: on }; }}
                    onClick={e => pick(e, l.id)}
                    onMouseEnter={() => hoverIn(l.id)} onMouseLeave={hoverOut}
                    onFocus={() => setActive(l.id)}>
                    <span className="ss-bullet" aria-hidden="true" />
                    <span className="ss-label">{l.name}</span>
                  </a>
                  {/* Stops follow their bullet in tab order; on wide screens they are drawn in the shared strip. */}
                  <ol className="ss-strip" style={{ '--n': l.items.length }} aria-label={`${l.name} stops`}>
                    <li className="ss-term">
                      <a href={`#/${l.id}`} onClick={e => go(e, `#/${l.id}`)}>
                        <span className="ss-mark" aria-hidden="true" />
                        <span className="ss-title">{l.name}</span>
                      </a>
                    </li>
                    {l.items.map((it, j) => (
                      <li key={it.id} style={{ '--j': j }}>
                        <a href={hashFor(l, it)} onClick={e => go(e, hashFor(l, it))}>
                          <span className="ss-mark" aria-hidden="true" />
                          <span className="ss-title">{it.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </li>
              );
            })}
          </ul>
        </nav>
      </main>

      <footer className="ss-foot">
        <div className="ss-fun">
          <a href="/play/wii/">Living room, 2006</a>
          <a href="/play/win98/">Family computer, 1998</a>
        </div>
        <a href="#/" className="ss-enter" onClick={e => go(e, '#/')}>Enter</a>
      </footer>
    </div>
  );
}

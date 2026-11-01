import { useLayoutEffect } from 'react';
import { navigate } from './router.js';

const VERSIONS = [
  { href: '/play/wii/', name: 'Living room, 2006', line: 'This site as a Wii Menu.', img: '/images/fun-wii.jpg' },
  { href: '/play/win98/', name: 'Family computer, 1998', line: 'This site as a Windows 98 desktop.', img: '/images/fun-win98.jpg' },
];

export default function FunPage() {
  useLayoutEffect(() => { scrollTo(0, 0); }, []);
  return (
    <div className="fun">
      <header className="fun-head">
        <a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }}>Zach Winship</a>
      </header>
      <main id="main" className="fun-main">
        <h1>Fun versions</h1>
        <ul className="fun-list">
          {VERSIONS.map(v => (
            <li key={v.href}>
              <a href={v.href}>
                <img src={v.img} alt="" width="1280" height="800" loading="eager" />
                <span className="fun-name">{v.name}</span>
                <span className="fun-line">{v.line}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="fun-back"><a href="#/" onClick={e => { e.preventDefault(); navigate('#/'); }}>Back to the main site</a></p>
      </main>
    </div>
  );
}

import { useLayoutEffect } from 'react';
import { navigate } from './router.js';

const VERSIONS = [
  { href: '/play/wii/', name: 'Living room, 2006', line: 'This site as a Wii Menu.', img: '/images/fun-wii.jpg' },
  { href: '/play/win98/', name: 'Family computer, 1998', line: 'This site as a Windows 98 desktop.', img: '/images/fun-win98.jpg' },
];

// fromMain: arrived from the main page in this tab, so going back returns to the same spot.
export default function FunPage({ fromMain }) {
  useLayoutEffect(() => { scrollTo(0, 0); document.getElementById('main')?.focus({ preventScroll: true }); }, []);
  const back = e => {
    e.preventDefault();
    if (fromMain) history.back();
    else navigate('#/');
  };
  return (
    <div className="fun">
      <header className="fun-head">
        <a href="#/" onClick={back}>Zach Winship</a>
      </header>
      <main id="main" className="fun-main" tabIndex={-1}>
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
        <p className="fun-back"><a href="#/" onClick={back}>Back to the main site</a></p>
      </main>
    </div>
  );
}

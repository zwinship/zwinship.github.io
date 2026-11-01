import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { BLOG, EMAIL, EXPERIENCE, LINKS, MEDIA, PERSONAL, PROFILE, RESEARCH, SOFTWARE } from './content.js';

// ---------------------------------------------------------------------------
// Content model. Both modes render the same items; only the styling changes.
// ---------------------------------------------------------------------------

const byId = (list, id) => list.find(x => x.id === id);
const r = id => byId(RESEARCH, id);
const p = id => byId(PERSONAL, id);

const RESEARCH_ITEMS_RAW = [
  { id: 'nber', title: r('nber').title, year: '2026',
    sub: 'NBER Working Paper 35414, under review. With Yulia Chikish, Greg Colman, Dhaval Dave, Brad Humphreys and Zachary Santamaria.',
    blurb: 'EMS travel times in Manhattan fell by 63 to 70 seconds after the toll started.',
    body: [r('nber').body.replace(/^NBER Working Paper No\. 35414, under journal review\. /, '')], links: r('nber').links, press: true },
  { id: 'cz', title: r('cz').title, year: '2026', sub: 'Working paper.',
    blurb: 'Traffic, pedestrians, subway ridership and businesses on either side of the 60th Street boundary.',
    body: [r('cz').body], links: r('cz').links.filter(([h]) => h !== 'https://github.com/zwinship') },
  { id: 'ozone', title: r('ozone').title, year: '2025', sub: 'Blog post, American Action Forum internship.',
    blurb: "What the EPA's ozone standard costs US manufacturers in revenue.",
    body: [r('ozone').body], links: r('ozone').links.filter(([, l]) => l !== 'eSLR blog post').map(([h, l]) => [h, l === 'Ozone blog post' ? 'Blog post' : l]) },
  { id: 'mbta-ts', title: r('mbta-ts').title, year: '2025', sub: 'Undergraduate paper.',
    blurb: 'Forecasting ridership on the T from weather and season, and where service could change.',
    body: [r('mbta-ts').body], links: r('mbta-ts').links },
  { id: 'polls', title: r('polls').title, year: '2024', sub: 'Undergraduate paper.',
    blurb: 'Do polls predict elections, or move them? A test on the 2024 presidential race.',
    body: [r('polls').body], links: r('polls').links },
  { id: 'llm', title: r('llm').title, year: 'In progress', sub: 'In progress.',
    blurb: "Language models as simulated economic agents, using Expected Parrot's EDSL.",
    body: [r('llm').body], links: r('llm').links },
];

const RESEARCH_ITEMS = RESEARCH_ITEMS_RAW.map(it => ({ ...it, paperLinks: true }));

const SOFTWARE_ITEMS = [
  { id: 'rd2dnet', title: SOFTWARE.name, year: '2026', sub: 'Python and R. Version 2 in development.',
    blurb: 'Boundary discontinuity designs where distance runs along the street network.',
    body: [...SOFTWARE.body, SOFTWARE.credit], links: SOFTWARE.links, install: SOFTWARE.platforms },
];

const EXPERIENCE_ITEMS = EXPERIENCE.map((e, i) => ({
  id: `exp-${i}`, title: e.role, sub: `${e.org}, ${e.when}`, blurb: e.body, year: e.when.match(/\d{4}/)?.[0], links: e.links,
}));

const PROJECT_ITEMS = [
  { id: 'chesque', title: 'Chesque', year: '2026', sub: 'Browser game.',
    blurb: 'Chess where every piece is a hero. Online play, bots, and an eight-army mode.',
    body: [p('chesque').body], links: p('chesque').links },
  { id: 'octastats', title: 'OctaStats', year: '2025', sub: 'UFC prediction model.',
    blurb: 'Fight predictions with a public record of every pick.',
    body: [p('octa1').body, p('octa2').body], links: [...p('octa2').links, ['https://github.com/zwinship/UFC_Model', 'GitHub (version 1)']] },
  { id: 'tott', title: 'Tale of the Tape', year: '2026', sub: 'Daily game.',
    blurb: 'Guess the UFC fighter from a stat comparison. A new one every day.',
    body: [p('tott').body], links: p('tott').links },
  { id: 'mbta-led', title: 'MBTA live LED map', year: '2026', sub: 'Hardware. The frame is still being built.',
    blurb: 'A Raspberry Pi that lights an LED for every train running on the T.',
    body: [p('mbta-led').body], links: p('mbta-led').links, image: '/images/mbta_led_build.jpg' },
  { id: 'micro', title: 'Intermediate Microeconomics course site', year: '2026', sub: 'With Naveen Sunder, Bentley University.',
    blurb: 'Twelve interactive weeks of intermediate micro, piloted by Bentley students this year.',
    body: [r('micro').body], links: r('micro').links },
  { id: 'blog', title: BLOG.name, year: '2027', sub: 'Blog. First post planned for early 2027.',
    blurb: BLOG.body,
    body: [BLOG.body], posts: BLOG.posts },
];

const EDUCATION_ITEMS = PROFILE.education.map((e, i) => ({
  id: `edu-${i}`, title: e.degree, sub: `${e.school}, ${e.when}`, blurb: e.note,
}));

// Line colours are the MBTA's.
const LINES = [
  { id: 'research', name: 'Research', color: '#da291c', items: RESEARCH_ITEMS },
  { id: 'software', name: 'Software', color: '#ed8b00', items: SOFTWARE_ITEMS },
  { id: 'experience', name: 'Experience', color: '#00843d', items: EXPERIENCE_ITEMS },
  { id: 'projects', name: 'Projects', color: '#003da5', items: PROJECT_ITEMS },
  { id: 'education', name: 'Education', color: '#7c878e', items: EDUCATION_ITEMS },
];

const PAGES = LINES.flatMap(line => line.items.filter(it => it.body).map((it, i, arr) => ({
  ...it, line, prev: arr[i - 1], next: arr[i + 1],
})));
const pageById = id => PAGES.find(pg => pg.id === id);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const isExternal = href => /^https?:/.test(href);
function A({ href, children, ...rest }) {
  return <a href={href} {...(isExternal(href) ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>{children}</a>;
}

const vt = name => ({ style: { viewTransitionName: name } });
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Run a DOM update inside a view transition when the browser has them.
function transition(update) {
  if (!document.startViewTransition || reduceMotion()) { update(); return; }
  document.startViewTransition(update);
}

function readMode() {
  try { const m = localStorage.getItem('site-mode'); if (m === 'plain' || m === 'transit') return m; } catch { /* storage blocked */ }
  return 'transit';
}

function readRoute() {
  const m = location.hash.match(/^#\/([\w-]+)$/);
  return m && pageById(m[1]) ? m[1] : null;
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

function ModeSwitch({ mode, onChange }) {
  return (
    <div className="mode-switch" role="group" aria-label="Page style" {...vt('mode-switch')}>
      {[['plain', 'Plain'], ['transit', 'Transit']].map(([m, label]) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => mode !== m && onChange(m)}>{label}</button>
      ))}
    </div>
  );
}

function Intro({ compact }) {
  return (
    <header className={`intro${compact ? ' compact' : ''}`}>
      <a href="#" className="portrait-link" aria-label="Home" {...vt('portrait')}>
        <img className="portrait" src="/images/zwinship.png" alt="Zach Winship" width="400" height="400" />
      </a>
      <div className="intro-text">
        <h1 className="name" {...vt('name')}><a href="#">Zach Winship</a></h1>
        <p className="role" {...vt('role')}>MS in Quantitative Economics<br className="plain-only" /><span className="transit-only">, </span>New York University</p>
        <ul className="contact" {...vt('contact')}>
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><A href={LINKS.resume}>CV</A></li>
          <li><A href={LINKS.github}>GitHub</A></li>
          <li><A href={LINKS.linkedin}>LinkedIn</A></li>
        </ul>
      </div>
      <nav className="side-nav" aria-label="Sections">
        <ul>
          {LINES.map(l => <li key={l.id}><a href={`#${l.id}`}>{l.name}</a></li>)}
        </ul>
      </nav>
      <p className="others">
        Other versions of this site: <a href="/play/wii/">Living room, 2006</a> and <a href="/play/win98/">Family computer, 1998</a>
      </p>
    </header>
  );
}

// Transit mode: a route diagram pinned to the top. The train marks how far down the page you are.
function RouteBar({ current, progress }) {
  return (
    <nav className="route" aria-label="Sections" {...vt('route')}>
      <div className="route-in">
        <ol className="route-line">
          {LINES.map((l, i) => (
            <li key={l.id} style={{ '--c': l.color }} className={current === l.id ? 'here' : ''}>
              <a href={`#${l.id}`} aria-current={current === l.id ? 'location' : undefined}>
                <span className="dot" aria-hidden="true" />
                <span className="label">{l.name}</span>
              </a>
              {i < LINES.length - 1 && <span className="seg" aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <span className="route-name" aria-hidden="true">{(LINES.find(l => l.id === current) || LINES[0]).name}</span>
        <span className="progress" aria-hidden="true" style={{ width: `${progress * 100}%`, background: (LINES.find(l => l.id === current) || LINES[0]).color }} />
      </div>
    </nav>
  );
}

function Item({ it }) {
  const title = it.body ? <a href={`#/${it.id}`}>{it.title}</a> : it.title;
  return (
    <li className="stop" data-anchor={it.id} {...vt(`s-${it.id}`)}>
      <h3>{title}</h3>
      <p className="sub">{it.sub}</p>
      <p className="blurb">{it.blurb}</p>
      {it.links && it.links.length > 0 && (!it.body || it.paperLinks) && (
        <p className="item-links">{it.links.map(([href, label]) => <A key={href} href={href}>{label}</A>)}</p>
      )}
    </li>
  );
}

function Home() {
  return (
    <>
      <div className="bio" data-anchor="bio" {...vt('bio')}>
        <p>{PROFILE.lede}</p>
        {PROFILE.about.map(t => <p key={t.slice(0, 20)}>{t}</p>)}
      </div>
      {LINES.map(l => (
        <section key={l.id} id={l.id} className="line" style={{ '--c': l.color }} data-anchor={l.id}>
          <h2 {...vt(`h-${l.id}`)}>{l.name}</h2>
          <ol className="stops">
            {l.items.map(it => <Item key={it.id} it={it} />)}
          </ol>
        </section>
      ))}
    </>
  );
}

function Page({ id }) {
  const pg = pageById(id);
  const { line } = pg;
  return (
    <article className="page" style={{ '--c': line.color }}>
      <p className="crumb"><a href={`#${line.id}`}>{line.name}</a></p>
      <div className="sign" data-anchor="page-sign" {...vt(`s-${pg.id}`)}>
        <h2>{pg.title}</h2>
      </div>
      <p className="sub">{pg.sub}</p>
      {pg.image && <img className="page-img" src={pg.image} alt={`${pg.title}, partway through the build`} />}
      {pg.body.map((t, i) => <p key={t.slice(0, 24)} data-anchor={`page-p${i}`}>{t}</p>)}
      {pg.install && (
        <dl className="install">
          {pg.install.map(([k, v]) => <div key={k}><dt>{k}</dt><dd><code>{v}</code></dd></div>)}
        </dl>
      )}
      {pg.posts && (
        <>
          <h3>Planned posts</h3>
          <ul className="plain-list">{pg.posts.map(([t, , when]) => <li key={t}>{t} <span className="when">({when.replace('Planned · ', '')})</span></li>)}</ul>
        </>
      )}
      {pg.links && pg.links.length > 0 && (
        <p className="item-links">{pg.links.map(([href, label]) => <A key={href + label} href={href}>{label}</A>)}</p>
      )}
      {pg.press && (
        <>
          <h3 data-anchor="page-press">Coverage</h3>
          <ul className="plain-list press">
            {MEDIA.map(([href, outlet, headline]) => <li key={href}><A href={href}>{outlet}</A>: {headline}</li>)}
          </ul>
        </>
      )}
      {(pg.prev || pg.next) && <nav className="next-prev" aria-label={`More in ${line.name}`}>
        {pg.prev ? <a className="prev" href={`#/${pg.prev.id}`}><span className="np-label">Previous</span>{pg.prev.title}</a> : <span />}
        {pg.next ? <a className="next" href={`#/${pg.next.id}`}><span className="np-label">Next</span>{pg.next.title}</a> : <span />}
      </nav>}
    </article>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const [mode, setMode] = useState(readMode);
  const [route, setRoute] = useState(readRoute);
  const [current, setCurrent] = useState(LINES[0].id);
  const [progress, setProgress] = useState(0);
  const homeScroll = useRef(0);
  const routeRef = useRef(route);
  const homeHash = useRef('');

  // A shared link to a section: the content renders after the browser tried to scroll, so do it now.
  useEffect(() => {
    if (routeRef.current || location.hash.length < 2) return;
    const go = () => document.getElementById(location.hash.slice(1))?.scrollIntoView();
    go();
    document.fonts?.ready.then(go);
  }, []);

  useLayoutEffect(() => { document.documentElement.dataset.mode = mode; }, [mode]);

  // Hash routing for the item pages, with a transition between list and page.
  useEffect(() => {
    const onHash = e => {
      const next = readRoute();
      const prev = routeRef.current;
      if (next === prev) return;          // plain in-page anchors: let the browser scroll
      if (!prev) { homeScroll.current = scrollY; homeHash.current = new URL(e.oldURL).hash; }
      const returning = !next && location.hash === homeHash.current;
      const sectionHash = !next && !returning && location.hash.length > 1 ? location.hash.slice(1) : null;
      routeRef.current = next;
      transition(() => {
        flushSync(() => setRoute(next));
        if (next) scrollTo(0, 0);
        else if (sectionHash && document.getElementById(sectionHash)) document.getElementById(sectionHash).scrollIntoView();
        else scrollTo(0, homeScroll.current);
      });
    };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.title = route ? `${pageById(route).title}, Zach Winship` : 'Zach Winship';
  }, [route]);

  // Which section is on screen, and how far down the page we are.
  useEffect(() => {
    if (route) return undefined;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0);
      let cur = LINES[0].id;
      for (const l of LINES) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < 140) cur = l.id;
      }
      if (max > 0 && scrollY >= max - 2) cur = LINES[LINES.length - 1].id;
      setCurrent(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [route, mode]);

  // Switch styles, keeping whatever was at the top of the screen at the top afterwards.
  const changeMode = next => {
    let anchor = null; let offset = 0;
    for (const el of document.querySelectorAll('[data-anchor]')) {
      const top = el.getBoundingClientRect().top;
      if (top > 40) { anchor = el.dataset.anchor; offset = top; break; }
    }
    try { localStorage.setItem('site-mode', next); } catch { /* storage blocked */ }
    transition(() => {
      flushSync(() => setMode(next));
      document.documentElement.dataset.mode = next;
      if (scrollY < 40 || !anchor) return;
      const el = document.querySelector(`[data-anchor="${anchor}"]`);
      if (el) scrollBy(0, el.getBoundingClientRect().top - offset);
    });
  };

  return (
    <div className={`site ${mode}${route ? ' on-page' : ''}`}>
      <a className="skip" href="#main" onClick={e => { e.preventDefault(); const m = document.getElementById('main'); m.scrollIntoView(); m.focus(); }}>Skip to content</a>
      <ModeSwitch mode={mode} onChange={changeMode} />
      <Intro compact={!!route} />
      {mode === 'transit' && <RouteBar current={route ? pageById(route).line.id : current} progress={route ? 0 : progress} />}
      <main id="main" tabIndex={-1}>
        {route ? <Page id={route} /> : <Home />}
      </main>
      <footer className="foot">
        <div className="foot-in">
          <p className="foot-name">Zach Winship</p>
          <p className="foot-links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <A href={LINKS.github}>GitHub</A>
            <A href={LINKS.linkedin}>LinkedIn</A>
          </p>
          <p className="foot-others">Also here: <a href="/play/wii/">Living room, 2006</a> and <a href="/play/win98/">Family computer, 1998</a></p>
        </div>
      </footer>
    </div>
  );
}

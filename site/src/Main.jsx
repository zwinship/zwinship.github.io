import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { EMAIL, LINKS, PROFILE } from './content.js';
import { LINES, pageById } from './data.js';
import { navigate, parse, scrollToSection } from './router.js';

const isExternal = href => /^https?:/.test(href);
export function A({ href, children, ...rest }) {
  return <a href={href} {...(isExternal(href) ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>{children}</a>;
}

// Same-page links that animate instead of jumping.
function go(e, hash) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
  e.preventDefault();
  navigate(hash);
}

function Intro() {
  return (
    <header className="intro">
      <div className="intro-text">
        <h1 className="name"><a href="#/" onClick={e => go(e, '#/')}>Zach Winship</a></h1>
        <p className="role">MS in Quantitative Economics, New York University</p>
        <ul className="contact">
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><A href={LINKS.resume}>CV</A></li>
          <li><A href={LINKS.github}>GitHub</A></li>
          <li><A href={LINKS.linkedin}>LinkedIn</A></li>
        </ul>
      </div>
      <img className="portrait" src="/images/zwinship.png" alt="Zach Winship" width="400" height="400" />
    </header>
  );
}

// Pinned diagram of the sections. A marker slides to the current station.
function RouteBar({ current, progress }) {
  const cur = LINES.find(l => l.id === current) || LINES[0];
  return (
    <nav className="route" aria-label="Sections">
      <div className="route-in">
        <ol className="route-line">
          {LINES.map((l, i) => (
            <li key={l.id} style={{ '--c': l.color }} className={current === l.id ? 'here' : ''}>
              <a href={`#/${l.id}`} onClick={e => go(e, `#/${l.id}`)} aria-current={current === l.id ? 'location' : undefined}>
                <span className="dot" aria-hidden="true">
                  {current === l.id && <motion.span className="marker" layoutId="route-marker" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                </span>
                <span className="label">{l.name}</span>
              </a>
              {i < LINES.length - 1 && <span className="seg" aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <span className="route-name" aria-hidden="true">{cur.name}</span>
      </div>
      <motion.span className="progress" aria-hidden="true" style={{ scaleX: progress, background: cur.color }} />
    </nav>
  );
}

function Stop({ it }) {
  const title = it.body
    ? <a href={`#/${it.id}`} onClick={e => go(e, `#/${it.id}`)}>{it.title}</a>
    : it.title;
  return (
    <li className={`stop${it.body ? ' has-page' : ''}`} data-anchor={it.id}>
      <h3>{title}</h3>
      <p className="sub">{it.sub}</p>
      <p className="blurb">{it.blurb}</p>
      {it.showLinks && it.links?.length > 0 && (
        <p className="item-links">{it.links.map(([href, label]) => <A key={href + label} href={href}>{label}</A>)}</p>
      )}
    </li>
  );
}

// The coloured line fills in as the section scrolls past.
function Line({ line }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 75%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return (
    <section ref={ref} id={line.id} className="line" style={{ '--c': line.color }}>
      <span className="track" aria-hidden="true"><motion.span className="fill" style={{ scaleY: fill }} /></span>
      <h2>{line.name}</h2>
      <ol className="stops">
        {line.items.map(it => <Stop key={it.id} it={it} />)}
      </ol>
    </section>
  );
}

export default function Main({ restoreY }) {
  const [current, setCurrent] = useState(LINES[0].id);
  const { scrollYProgress } = useScroll();

  // Arriving from the landing or a shared link: jump straight to the section.
  useLayoutEffect(() => {
    const r = parse();
    const back = restoreY?.current;
    if (restoreY) restoreY.current = null;
    const target = r.section || (r.item && pageById(r.item).line.id);
    const place = () => {
      if (target) scrollToSection(target, { instant: true });
      else scrollTo(0, back ?? 0);
    };
    place();
    // Fonts arriving late change heights above the target; place again unless the visitor has moved.
    if (target || back) {
      let moved = false;
      const mark = () => { moved = true; };
      addEventListener('wheel', mark, { passive: true, once: true });
      addEventListener('touchstart', mark, { passive: true, once: true });
      addEventListener('keydown', mark, { once: true });
      document.fonts?.ready.then(() => { if (!moved) place(); });
    }
  }, [restoreY]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      let cur = LINES[0].id;
      for (const l of LINES) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < 160) cur = l.id;
      }
      if (scrollY >= document.documentElement.scrollHeight - innerHeight - 2) cur = LINES[LINES.length - 1].id;
      setCurrent(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="site">
      <a className="skip" href="#main" onClick={e => { e.preventDefault(); const m = document.getElementById('main'); scrollToSection(LINES[0].id); m.focus({ preventScroll: true }); }}>Skip to content</a>
      <Intro />
      <RouteBar current={current} progress={scrollYProgress} />
      <main id="main" tabIndex={-1}>
        <div className="bio">
          <p>{PROFILE.lede}</p>
          {PROFILE.about.map(t => <p key={t.slice(0, 20)}>{t}</p>)}
        </div>
        {LINES.map(l => <Line key={l.id} line={l} />)}
      </main>
      <footer className="foot">
        <div className="foot-in">
          <p className="foot-name">Zach Winship</p>
          <p className="foot-links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <A href={LINKS.github}>GitHub</A>
            <A href={LINKS.linkedin}>LinkedIn</A>
            <A href={LINKS.resume}>CV</A>
          </p>
          <p className="foot-fun">
            <a href="#/fun" onClick={e => go(e, '#/fun')}>Fun versions</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

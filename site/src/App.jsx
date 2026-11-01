import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'motion/react';
import MapFigure from './MapFigure.jsx';
import PlayDialog from './PlayDialog.jsx';
import {
  BLOG, EMAIL, EXPERIENCE, LINKS, MEDIA, MEDIA_FORTHCOMING, PERSONAL, PRESENTATIONS, PROFILE, RESEARCH, SOFTWARE,
} from './content.js';

const SECTIONS = [
  ['research', 'Research'],
  ['software', 'Software'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['talks', 'Talks'],
  ['writing', 'Writing'],
  ['about', 'About'],
];

const isExternal = href => /^https?:/.test(href);
function A({ href, children, ...rest }) {
  return <a href={href} {...(isExternal(href) ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>{children}</a>;
}
function LinkList({ links }) {
  if (!links || !links.length) return null;
  return (
    <ul className="links">
      {links.map(([href, label]) => <li key={href + label}><A href={href}>{label}</A></li>)}
    </ul>
  );
}

function Header({ onPlay }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setCurrent(vis.target.id);
    }, { rootMargin: '-35% 0px -60% 0px' });
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = e => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', close);
    return () => removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a className="wordmark" href="#top">Zach Winship</a>
        <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(o => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className={open ? 'open' : ''} aria-label="Sections">
          <ul>
            {SECTIONS.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} aria-current={current === id ? 'true' : undefined} onClick={() => setOpen(false)}>{label}</a></li>
            ))}
            <li><a href={LINKS.resume}>Résumé</a></li>
          </ul>
          <button className="play-button" onClick={() => { setOpen(false); onPlay(); }}>Play</button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="name">
      <MapFigure />
      <div className="wrap hero-text">
        <h1 id="name">{PROFILE.name}</h1>
        <p className="lede">{PROFILE.lede}</p>
        <p className="now">{PROFILE.now}</p>
        <p className="hero-links">
          <a href="#research">The NBER paper</a>
          <a href="#software">rd2dnet</a>
          <a href={LINKS.resume}>Résumé (PDF)</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </div>
    </section>
  );
}

function SectionHead({ id, title, note }) {
  return (
    <div className="section-head">
      <h2 id={`${id}-title`}>{title}</h2>
      {note && <p>{note}</p>}
    </div>
  );
}

function Research() {
  const [paper, ...rest] = RESEARCH;
  const others = rest.filter(p => p.id !== 'micro');
  return (
    <section id="research" className="section" aria-labelledby="research-title">
      <div className="wrap split">
        <SectionHead id="research" title="Research" note="Causal inference on cities, transport and regulation." />
        <div>
          <article className="feature">
            <p className="kicker">{paper.badge}, {paper.year}</p>
            <h3>{paper.title}</h3>
            <p className="byline">With {paper.coauthors}.</p>
            <div className="finding">
              <p className="finding-figure">63 to 70 seconds</p>
              <p className="finding-text">shorter total EMS travel times after congestion pricing began, roughly 5 to 6%.</p>
            </div>
            <p>{paper.body}</p>
            <LinkList links={paper.links} />
            <h4>Coverage</h4>
            <ul className="coverage">
              {MEDIA.map(([href, outlet, headline]) => (
                <li key={href}><A href={href}><span className="outlet">{outlet}</span> {headline}</A></li>
              ))}
              {MEDIA_FORTHCOMING.map(o => <li key={o}><span className="outlet">{o}</span> forthcoming</li>)}
            </ul>
          </article>
          <ol className="paper-list">
            {others.map(p => (
              <li key={p.id}>
                <span className="year">{p.soon ? 'In progress' : p.year}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <LinkList links={p.links} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Software() {
  const s = SOFTWARE;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(s.install); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); }
  };
  return (
    <section id="software" className="section software" aria-labelledby="software-title">
      <div className="wrap software-grid">
        <div>
          <p className="kicker">Software · version {s.version}</p>
          <h2 id="software-title" className="software-name">{s.name}</h2>
          <p className="software-summary">{s.summary}</p>
          <p className="org">{s.status}</p>
          {s.body.map(p => <p key={p.slice(0, 20)}>{p}</p>)}
          <table className="platforms">
            <caption className="sr-only">Install by platform</caption>
            <tbody>
              {s.platforms.map(([lang, cmd]) => (
                <tr key={lang}><th scope="row">{lang}</th><td>{cmd.includes(' ') && !cmd.startsWith('draft') ? <code>{cmd}</code> : cmd}</td></tr>
              ))}
            </tbody>
          </table>
          <LinkList links={s.links} />
          <p className="credit">{s.credit}</p>
        </div>
        <figure className="code-figure">
          <div className="code-bar">
            <code>{s.install}</code>
            <button onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <pre><code>{s.example}</code></pre>
          <figcaption>Quick start on the bundled mock Midtown data, from the package README.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function ProjectRow({ p, open, onToggle }) {
  const id = `project-${p.id}`;
  return (
    <li className={open ? 'open' : ''}>
      <h3>
        <button aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span className="year">{p.soon ? 'In progress' : p.year}</span>
          <span className="title">{p.title}</span>
          <span className="meta">{p.meta.split(' · ')[0]}</span>
          <span className="sign" aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div id={id} className="project-body" key="body"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.3, 0, 0.2, 1] }}>
            <div className="project-inner">
              <p>{p.body}</p>
              {p.video && (
                <video src={`/${p.video}`} poster={`/${p.poster}`} controls playsInline preload="none" width="640" height="360" />
              )}
              <p className="tags">{p.tags.join(', ')}</p>
              <LinkList links={p.links} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function Projects() {
  const list = [RESEARCH.find(p => p.id === 'micro'), ...PERSONAL];
  const [open, setOpen] = useState(() => new Set());
  const toggle = id => setOpen(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap split">
        <SectionHead id="projects" title="Projects" note="Things I built because I wanted them to exist. Open a row for details." />
        <ul className="project-list">
          {list.map(p => <ProjectRow key={p.id} p={p} open={open.has(p.id)} onToggle={() => toggle(p.id)} />)}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap split">
        <SectionHead id="experience" title="Experience" />
        <ol className="timeline">
          {EXPERIENCE.map(e => (
            <li key={e.role + e.when}>
              <p className="when">{e.when}</p>
              <div>
                <h3>{e.role}</h3>
                <p className="org">{e.org}</p>
                <p>{e.body}</p>
                <LinkList links={e.links} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Talks() {
  return (
    <section id="talks" className="section" aria-labelledby="talks-title">
      <div className="wrap split">
        <SectionHead id="talks" title="Talks and teaching" note="Slides are PDFs. The India talk came with four short methodology videos." />
        <ol className="talk-list">
          {PRESENTATIONS.map(t => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p className="org">{t.meta}</p>
              <p>{t.body}</p>
              {t.vids && (
                <div className={t.vids.length > 1 ? 'video-row' : 'video-one'}>
                  {t.vids.map(([src, label]) => (
                    <figure key={src}>
                      <video src={`/${src}`} controls playsInline preload="metadata" width="320" height="180" />
                      <figcaption>{label}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              <LinkList links={[...(t.pdf ? [[`/${t.pdf}`, 'Slides (PDF)']] : []), ...(t.gh ? [[t.gh, 'Code on GitHub']] : [])]} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" className="section" aria-labelledby="writing-title">
      <div className="wrap split">
        <SectionHead id="writing" title="Writing" />
        <div className="blog">
          <h3>{BLOG.name}</h3>
          <p className="org">{BLOG.status}</p>
          <p>{BLOG.body}</p>
          <ol className="posts">
            {BLOG.posts.map(([title, topics, when]) => (
              <li key={title}><span className="post-title">{title}</span><span className="post-meta">{topics} · {when}</span></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap split">
        <SectionHead id="about" title="About" />
        <div className="about">
          <img src="/images/zwinship.png" alt="Zach Winship" width="220" height="212" loading="lazy" />
          <div>
            {PROFILE.about.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
            <h3>Education</h3>
            <ul className="education">
              {PROFILE.education.map(e => (
                <li key={e.degree}><strong>{e.degree}</strong>, {e.school}. <span className="org">{e.when}.</span> {e.note}</li>
              ))}
            </ul>
            <h3>Tools</h3>
            <p>{PROFILE.skills.join(', ')}.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onPlay }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div>
          <p className="footer-name">Zach Winship</p>
          <p>New York, NY</p>
        </div>
        <ul className="footer-links">
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><A href={LINKS.linkedin}>LinkedIn</A></li>
          <li><A href={LINKS.github}>GitHub</A></li>
          <li><a href={LINKS.resume}>Résumé (PDF)</a></li>
        </ul>
        <p className="footer-play">
          This site also comes as a <button className="text-button" onClick={onPlay}>Wii Menu or a Windows 98 desktop</button>.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [playOpen, setPlayOpen] = useState(false);
  const opener = useRef(null);
  const openPlay = () => { opener.current = document.activeElement; setPlayOpen(true); };
  const closePlay = () => { setPlayOpen(false); opener.current?.focus?.(); };
  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Skip to content</a>
      <Header onPlay={openPlay} />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Hero />
        <Research />
        <Software />
        <Projects />
        <Experience />
        <Talks />
        <Writing />
        <About />
      </main>
      <Footer onPlay={openPlay} />
      <PlayDialog open={playOpen} onClose={closePlay} />
    </MotionConfig>
    </LazyMotion>
  );
}

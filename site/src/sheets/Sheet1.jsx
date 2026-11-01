import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { A } from '../Main.jsx';
import { pageById } from '../data.js';
import { reduceMotion } from '../router.js';

const EASE = [0.32, 0.72, 0, 1];

export function Content({ pg }) {
  return (
    <>
      <div className="sign">
        <h2 id={`sheet-title-${pg.id}`} tabIndex={-1}>{pg.title}</h2>
      </div>
      <p className="sub">{pg.sub}</p>
      {pg.image && <img className="page-img" src={pg.image} alt={`${pg.title}, partway through the build`} />}
      {pg.body.map(t => <p key={t.slice(0, 24)}>{t}</p>)}
      {pg.install && (
        <dl className="install">
          {pg.install.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{/^(pip|remotes|ssc|net) /.test(v) ? <code>{v}</code> : v}</dd></div>)}
        </dl>
      )}
      {pg.posts && (
        <>
          <h3>Planned posts</h3>
          <ul className="plain-list">{pg.posts.map(([t, , when]) => <li key={t}>{t} <span className="when">({when.replace('Planned · ', '')})</span></li>)}</ul>
        </>
      )}
      {pg.links?.length > 0 && (
        <p className="item-links">{pg.links.map(([href, label]) => <A key={href + label} href={href}>{label}</A>)}</p>
      )}
      {pg.press && (
        <>
          <h3>Coverage</h3>
          <ul className="plain-list press">
            {pg.press.map(([href, outlet, headline]) => <li key={href}><A href={href}>{outlet}</A>: {headline}</li>)}
          </ul>
        </>
      )}
    </>
  );
}

// An item opens as a panel over the page, so closing it leaves you exactly where you were.
export default function ItemSheet({ id, dir, onClose, onGo }) {
  const pg = pageById(id);
  const scroller = useRef(null);
  const reduced = reduceMotion();
  const present = useIsPresent();

  useEffect(() => {
    if (!present) return undefined;
    const onKey = e => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && pg.next && !e.target.closest('input,textarea')) onGo(pg.next.id, 1);
      if (e.key === 'ArrowLeft' && pg.prev && !e.target.closest('input,textarea')) onGo(pg.prev.id, -1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [pg, onClose, onGo, present]);

  useEffect(() => {
    scroller.current?.scrollTo(0, 0);
    const t = setTimeout(() => document.getElementById(`sheet-title-${id}`)?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(t);
  }, [id]);

  const { line } = pg;
  return (
    <motion.div className={`sheet-wrap${present ? '' : ' leaving'}`} initial={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.5 }}>
      <motion.div className="sheet-backdrop" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35 }} />
      <motion.div className="sheet" role="dialog" aria-modal="true" aria-labelledby={`sheet-title-${pg.id}`} ref={scroller}
        style={{ '--c': line.color }}
        initial={{ x: reduced ? 0 : '100%' }} animate={{ x: 0 }} exit={{ x: reduced ? 0 : '100%' }}
        transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}>
        <div className="sheet-bar">
          <button type="button" className="sheet-close" onClick={onClose}>Close</button>
          <span className="sheet-line"><i aria-hidden="true" />{line.name}</span>
          {pg.count > 1 && <span className="sheet-count">{pg.index + 1} of {pg.count}</span>}
        </div>
        <div className="sheet-body">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.article key={pg.id} className="page" custom={dir}
              variants={{
                enter: d => ({ opacity: 0, x: reduced ? 0 : d * 48 }),
                center: { opacity: 1, x: 0 },
                exit: d => ({ opacity: 0, x: reduced ? 0 : d * -48 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}>
              <Content pg={pg} />
            </motion.article>
          </AnimatePresence>
          {(pg.prev || pg.next) && (
            <nav className="next-prev" aria-label={`More in ${line.name}`}>
              {pg.prev
                ? <a className="prev" href={`#/${pg.prev.id}`} onClick={e => { e.preventDefault(); onGo(pg.prev.id, -1); }}><span className="np-label">Previous</span>{pg.prev.title}</a>
                : <span />}
              {pg.next
                ? <a className="next" href={`#/${pg.next.id}`} onClick={e => { e.preventDefault(); onGo(pg.next.id, 1); }}><span className="np-label">Next</span>{pg.next.title}</a>
                : <span />}
            </nav>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

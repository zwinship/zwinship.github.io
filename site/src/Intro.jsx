import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { LINES } from './data.js';

const EASE = [0.65, 0, 0.35, 1];

// A short opening: the route draws across the screen under the name, then glides up
// into the route bar of the page underneath and the cover lifts. Click, key or scroll skips it.
export default function Intro({ onDone }) {
  const [box, setBox] = useState(null);
  const y = useMotionValue(0);
  const cover = useMotionValue(1);
  const nameOpacity = useMotionValue(0);
  const clip = useMotionValue(100);
  const clipPath = useTransform(clip, n => `inset(-24px ${n}% -24px 0)`);
  const done = useRef(false);

  // Line the drawn route up with the real one so it lands exactly on top of it.
  useLayoutEffect(() => {
    const el = document.querySelector('.route-line');
    if (!el) { onDone(); return; }
    const r = el.getBoundingClientRect();
    setBox({ left: r.left, width: r.width, top: r.top, height: r.height });
  }, [onDone]);

  useEffect(() => {
    if (!box) return undefined;
    const mid = innerHeight / 2 - box.height / 2;
    y.set(mid - box.top);
    const finish = () => { if (!done.current) { done.current = true; onDone(); } };
    const run = async () => {
      await Promise.all([
        animate(clip, 0, { duration: 0.9, ease: EASE }),
        animate(nameOpacity, 1, { duration: 0.5, delay: 0.25 }),
      ]);
      await new Promise(r => setTimeout(r, 350));
      if (done.current) return;
      animate(nameOpacity, 0, { duration: 0.25 });
      await animate(y, 0, { duration: 0.7, ease: [0.5, 0, 0.15, 1] });
      await animate(cover, 0, { duration: 0.35 });
      finish();
    };
    run();
    const skip = () => {
      if (done.current) return;
      animate(cover, 0, { duration: 0.2 }).then(finish);
      done.current = true;
      setTimeout(onDone, 220);
    };
    addEventListener('pointerdown', skip);
    addEventListener('resize', skip);
    addEventListener('keydown', skip);
    addEventListener('wheel', skip, { passive: true });
    addEventListener('touchmove', skip, { passive: true });
    return () => {
      removeEventListener('pointerdown', skip);
      removeEventListener('resize', skip);
      removeEventListener('keydown', skip);
      removeEventListener('wheel', skip);
      removeEventListener('touchmove', skip);
    };
  }, [box, clip, cover, nameOpacity, onDone, y]);

  if (!box) return <div className="intro-cover" />;
  return (
    <motion.div className="intro-cover" aria-hidden="true" style={{ opacity: cover }}>
      <motion.div className="intro-route" style={{ left: box.left, width: box.width, top: box.top, y }}>
        <motion.p className="intro-name" style={{ opacity: nameOpacity }}>Zach Winship</motion.p>
        <motion.ol className="route-line" style={{ clipPath }}>
          {LINES.map((l, i) => (
            <li key={l.id} style={{ '--c': l.color }}>
              <span className="intro-stop"><span className="dot" /><span className="label">{l.name}</span></span>
              {i < LINES.length - 1 && <span className="seg" />}
            </li>
          ))}
        </motion.ol>
      </motion.div>
    </motion.div>
  );
}

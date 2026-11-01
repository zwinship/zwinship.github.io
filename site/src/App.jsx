import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Main from './Main.jsx';
import ItemSheet from './ItemSheet.jsx';
import Intro from './Intro.jsx';
import FunPage from './FunPage.jsx';
import { lineById, pageById } from './data.js';
import { navigate, reduceMotion, scrollToSection, scrollToY, stopScroll, useRoute } from './router.js';

// The intro plays on a bare visit to the home page, once per browser tab.
function shouldPlayIntro() {
  if (location.hash && location.hash !== '#' && location.hash !== '#/') return false;
  if (reduceMotion()) return false;
  try { if (sessionStorage.getItem('intro-seen')) return false; sessionStorage.setItem('intro-seen', '1'); } catch { /* storage blocked */ }
  return true;
}

export default function App() {
  const route = useRoute();
  const prev = useRef(route);
  const fromMain = useRef(false);
  const closeMode = useRef('back');
  const savedScroll = useRef(null);
  const closing = useRef(false);
  const mainScroll = useRef(null);
  const savedFocus = useRef(null);
  const [dir, setDir] = useState(1);
  const [intro, setIntro] = useState(shouldPlayIntro);
  const endIntro = useCallback(() => setIntro(false), []);

  // Main scrolls itself into place when it mounts (see Main.jsx); this handles moves while it is shown.
  useLayoutEffect(() => {
    const was = prev.current;
    prev.current = route;
    if (was === route) return;
    if (was.view === 'main' && route.view === 'fun') { mainScroll.current = scrollY; return; }
    if (route.view !== 'main' || was.view !== 'main') return;
    if (route.item && !was.item) {           // opening an item
      stopScroll();
      closing.current = false;
      fromMain.current = true;
      savedScroll.current = scrollY;
      savedFocus.current = document.activeElement;
      return;
    }
    if (route.item) return;                  // moving between items
    if (was.item) {                          // closing an item
      document.documentElement.classList.remove('sheet-open');
      const f = savedFocus.current;
      requestAnimationFrame(() => (f && document.contains(f) ? f : document.getElementById('main'))?.focus({ preventScroll: true }));
      closing.current = false;
      if (closeMode.current === 'replace' && route.section) scrollToSection(route.section, { instant: true });
      else if (savedScroll.current == null) scrollToSection(pageById(was.item).line.id, { instant: true });
      else scrollTo(0, savedScroll.current);
      closeMode.current = 'back';
      return;
    }
    if (route.section) scrollToSection(route.section);
    else scrollToY(0);
  }, [route]);

  useEffect(() => {
    document.title = route.item ? `${pageById(route.item).title}, Zach Winship`
      : route.section ? `${lineById(route.section).name}, Zach Winship`
        : route.view === 'fun' ? 'Fun versions, Zach Winship' : 'Zach Winship';
  }, [route]);

  // Lock and silence the page behind an open item.
  useEffect(() => {
    document.documentElement.classList.toggle('sheet-open', !!route.item);
    const site = document.getElementById('page');
    if (site) site.inert = !!route.item;
  }, [route.item, route.view]);

  const closeItem = () => {
    if (closing.current) return;
    closing.current = true;
    if (fromMain.current) { fromMain.current = false; closeMode.current = 'back'; history.back(); }
    else { closeMode.current = 'replace'; location.replace(`#/${pageById(route.item).line.id}`); }
  };
  const goItem = (id, d) => { if (closing.current) return; setDir(d); location.replace(`#/${id}`); };
  const fade = { duration: reduceMotion() ? 0 : 0.25 };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        {route.view === 'fun' ? (
          <motion.div key="fun" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
            <FunPage fromMain={mainScroll.current != null} />
          </motion.div>
        ) : (
          <motion.div key="main" id="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
            <Main restoreY={mainScroll} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {route.view === 'main' && route.item && (
          <ItemSheet key="sheet" id={route.item} dir={dir} onClose={closeItem} onGo={goItem} />
        )}
      </AnimatePresence>
      {intro && route.view === 'main' && <Intro onDone={endIntro} />}
    </MotionConfig>
  );
}

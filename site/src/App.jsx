import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Main from './Main.jsx';
import ItemSheet from './ItemSheet.jsx';
import { LANDINGS, DEFAULT_LANDING } from './landings/index.js';
import { lineById, pageById } from './data.js';
import { navigate, reduceMotion, scrollToSection, scrollToY, useRoute } from './router.js';

const landingKey = () => {
  const q = new URLSearchParams(location.search).get('landing');
  return q && LANDINGS[q] ? q : DEFAULT_LANDING;
};

export default function App() {
  const route = useRoute();
  const prev = useRef(route);
  const fromMain = useRef(false);
  const closeMode = useRef('back');
  const savedScroll = useRef(0);
  const savedFocus = useRef(null);
  const [dir, setDir] = useState(1);
  const Landing = LANDINGS[landingKey()];

  // Main scrolls itself into place when it mounts (see Main.jsx); this handles moves while it is shown.
  useLayoutEffect(() => {
    const was = prev.current;
    prev.current = route;
    if (was === route || route.view !== 'main' || was.view !== 'main') return;
    if (route.item && !was.item) {           // opening an item
      fromMain.current = true;
      savedScroll.current = scrollY;
      savedFocus.current = document.activeElement;
      return;
    }
    if (route.item) return;                  // moving between items
    if (was.item) {                          // closing an item
      const f = savedFocus.current;
      requestAnimationFrame(() => (f && document.contains(f) ? f : document.getElementById('main'))?.focus({ preventScroll: true }));
      if (closeMode.current === 'replace' && route.section) scrollToSection(route.section, { instant: true });
      else scrollTo(0, savedScroll.current);
      closeMode.current = 'back';
      return;
    }
    if (route.section) scrollToSection(route.section);
    else scrollToY(0);
  }, [route]);

  useEffect(() => {
    document.title = route.item ? `${pageById(route.item).title}, Zach Winship`
      : route.section ? `${lineById(route.section).name}, Zach Winship` : 'Zach Winship';
  }, [route]);

  // Lock and silence the page behind an open item.
  useEffect(() => {
    document.documentElement.classList.toggle('sheet-open', !!route.item);
    const site = document.getElementById('page');
    if (site) site.inert = !!route.item;
  }, [route.item, route.view]);

  const closeItem = () => {
    if (fromMain.current) { fromMain.current = false; closeMode.current = 'back'; history.back(); }
    else { closeMode.current = 'replace'; location.replace(`#/${pageById(route.item).line.id}`); }
  };
  const goItem = (id, d) => { setDir(d); location.replace(`#/${id}`); };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        {route.view === 'landing' ? (
          <motion.div key="landing" className="landing-wrap"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion() ? 0 : 0.22 }}>
            <Landing onGo={navigate} />
          </motion.div>
        ) : (
          <motion.div key="main" id="page"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion() ? 0 : 0.3 }}>
            <Main />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {route.view === 'main' && route.item && (
          <ItemSheet key="sheet" id={route.item} dir={dir} onClose={closeItem} onGo={goItem} />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

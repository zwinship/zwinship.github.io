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
  const prev = useRef(null);
  const fromMain = useRef(false);
  const [dir, setDir] = useState(1);
  const Landing = LANDINGS[landingKey()];

  // Section scrolling: instant when the main page has just appeared, eased when already on it.
  const mainShown = useRef(route.view === 'main');
  useLayoutEffect(() => {
    const was = prev.current;
    prev.current = route;
    if (route.view !== 'main') { mainShown.current = false; return; }
    const justArrived = !mainShown.current;
    mainShown.current = true;
    if (route.item) { if (!was?.item) fromMain.current = !!was && was.view === 'main'; return; }
    if (was?.item) return;                       // closing an item: stay put
    if (route.section) {
      if (justArrived) requestAnimationFrame(() => scrollToSection(route.section, { instant: true }));
      else scrollToSection(route.section);
    } else if (!justArrived && was && !was.item) scrollToY(0);
    else if (justArrived) scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    document.title = route.item ? `${pageById(route.item).title}, Zach Winship`
      : route.section ? `${lineById(route.section).name}, Zach Winship` : 'Zach Winship';
  }, [route]);

  // Lock the page behind an open item.
  useEffect(() => {
    document.documentElement.classList.toggle('sheet-open', !!route.item);
  }, [route.item]);

  const closeItem = () => {
    if (fromMain.current) history.back();
    else navigate(`#/${pageById(route.item).line.id}`);
  };
  const goItem = (id, d) => { setDir(d); location.replace(`#/${id}`); };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        {route.view === 'landing' ? (
          <motion.div key="landing" className="landing-wrap"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion() ? 0 : 0.35 }}>
            <Landing onGo={navigate} />
          </motion.div>
        ) : (
          <motion.div key="main"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion() ? 0 : 0.4 }}>
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

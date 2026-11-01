import { useEffect, useRef, useState } from 'react';
import map from './midtown.json';

const [, , VW, VH] = map.viewBox;
// 1600 viewBox units span 26,000 ft (7,925 m) of the State Plane projection, north up.
const UNITS_PER_M = VW / 7925;
// 60th Street runs about 29 degrees off horizontal; the avenues run perpendicular to it.
const STREET_ANGLE = 28.9;
// x of the west end of W 60th St (at the Hudson) in viewBox units
const BOUNDARY_WEST_X = 490;

export default function MapFigure() {
  const figRef = useRef(null);
  const [layout, setLayout] = useState(null);
  // Wide screens: scale the map to the hero's height and slide it so 60th Street starts just right of the
  // text column (the map's left edge is the Hudson, so the cut is invisible). Narrow screens: the map sits
  // below the text and simply covers its box.
  useEffect(() => {
    const fig = figRef.current;
    if (!fig) return;
    const measure = () => {
      const hero = fig.parentElement, W = hero.clientWidth, H = hero.clientHeight;
      if (W <= 760) { const r = fig.querySelector('svg').getBoundingClientRect(); setLayout({ narrow: true, k: Math.max(r.width / VW, r.height / VH) }); return; }
      const k = H / VH;
      const text = hero.querySelector('.hero-text > *');
      const textRight = text ? text.getBoundingClientRect().left - hero.getBoundingClientRect().left + 560 : W * 0.45;
      const westEnd = Math.max(W * 0.5, textRight + 40);
      setLayout({ narrow: false, k, left: westEnd - BOUNDARY_WEST_X * k });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(fig.parentElement);
    measure();
    return () => ro.disconnect();
  }, []);
  const barPx = layout ? layout.k * UNITS_PER_M * 500 : 0;
  const svgStyle = layout && !layout.narrow ? { left: `${layout.left}px`, width: `${VW * layout.k}px`, height: '100%' } : undefined;
  return (
    <figure className="map" ref={figRef}>
      <svg viewBox={map.viewBox.join(' ')} role="img" aria-labelledby="map-title map-desc"
        preserveAspectRatio={layout && !layout.narrow ? 'none' : 'xMidYMid slice'} style={svgStyle}>
        <title id="map-title">Street map of Midtown Manhattan</title>
        <desc id="map-desc">Every street in Midtown Manhattan as a thin line, with 60th Street, the northern edge of the congestion relief zone, drawn in violet.</desc>
        <path className="map-streets" d={map.streets} />
        <path className="map-gap" d={map.gap} />
        <path className="map-boundary" d={map.boundary} pathLength="1" />
        <text className="map-label" transform={`translate(512 293) rotate(${STREET_ANGLE})`}>W 60 ST</text>
        <text className="map-label" transform={`translate(905 509) rotate(${STREET_ANGLE})`}>E 60 ST</text>
        <text className="map-label map-label--area" transform={`translate(790 330) rotate(${STREET_ANGLE - 90})`}>CENTRAL PARK</text>
      </svg>
      {barPx > 0 && (
        <div className="map-furniture" aria-hidden="true">
          <div className="scale-bar" style={{ width: `${barPx}px` }}><span>0</span><span>500 m</span></div>
          <div className="north"><svg viewBox="-8 -26 16 30"><path d="M0 -26 L8 4 L0 -2 L-8 4 Z" /></svg>N</div>
        </div>
      )}
      <figcaption>
        Midtown Manhattan. The violet line is 60th Street, the northern edge of the congestion relief zone
        in <a href="#research">our NBER paper</a>; it is dashed where it crosses Central Park.
        <span className="map-credit"> {map.credit}</span>
      </figcaption>
    </figure>
  );
}

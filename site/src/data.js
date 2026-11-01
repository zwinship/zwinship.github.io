// Shapes the content in content.js into lines (sections) and stops (items) for the site.
import { BLOG, EXPERIENCE, MEDIA, PERSONAL, PROFILE, RESEARCH, SOFTWARE } from './content.js';

const byId = (list, id) => list.find(x => x.id === id);
const r = id => byId(RESEARCH, id);
const p = id => byId(PERSONAL, id);

const RESEARCH_ITEMS = [
  { id: 'nber', title: r('nber').title, year: '2026',
    sub: 'NBER Working Paper 35414, under review. With Yulia Chikish, Greg Colman, Dhaval Dave, Brad Humphreys and Zachary Santamaria. I led the data construction and empirical analysis.',
    blurb: 'EMS travel times in Manhattan fell by 63 to 70 seconds after the toll started.',
    body: [r('nber').body.replace(/^NBER Working Paper No\. 35414, under journal review\. /, '')],
    links: r('nber').links, press: MEDIA },
  { id: 'cz', title: r('cz').title, year: '2026', sub: 'Senior capstone, advised by Dhaval Dave.',
    blurb: 'Traffic, pedestrians and subway ridership on either side of the 60th Street boundary.',
    body: [r('cz').body], links: r('cz').links.filter(([h]) => h !== 'https://github.com/zwinship') },
  { id: 'ozone', title: r('ozone').title, year: '2025', sub: 'Blog post, American Action Forum internship.',
    blurb: "Estimates that the EPA's ozone standard costs US manufacturers about $277M a year in revenue, a cost the EPA's own analysis leaves out.",
    body: [r('ozone').body],
    links: r('ozone').links.filter(([, l]) => l !== 'eSLR blog post').map(([h, l]) => [h, l === 'Ozone blog post' ? 'Blog post' : l]) },
  { id: 'mbta-ts', title: r('mbta-ts').title, year: '2025', sub: 'Undergraduate paper.',
    blurb: 'Forecasts T ridership from weather and season to show where service could change.',
    body: [r('mbta-ts').body], links: r('mbta-ts').links },
  { id: 'polls', title: r('polls').title, year: '2024', sub: 'Undergraduate paper.',
    blurb: 'Tests whether polls predicted the 2024 presidential election or moved it.',
    body: [r('polls').body], links: r('polls').links },
  { id: 'llm', title: r('llm').title, year: '2026', sub: 'In progress.',
    blurb: "Language models as simulated economic agents, using Expected Parrot's EDSL.",
    body: [r('llm').body], links: r('llm').links },
].map(it => ({ ...it, showLinks: true }));

const SOFTWARE_ITEMS = [
  { id: 'rd2dnet', title: SOFTWARE.name, year: '2026', sub: 'Python and R. Version 2 in development.',
    blurb: 'Boundary discontinuity designs where distance runs along the street network.',
    body: [...SOFTWARE.body, SOFTWARE.credit], links: SOFTWARE.links, install: SOFTWARE.platforms },
];

const EXPERIENCE_ITEMS = EXPERIENCE.map((e, i) => ({
  id: `exp-${i}`, title: e.role, sub: `${e.org}, ${e.when}`, blurb: e.body, links: e.links, showLinks: true,
}));

const PROJECT_ITEMS = [
  { id: 'chesque', title: 'Chesque', year: '2026', sub: 'Browser game.',
    blurb: 'Chess where every piece is a hero. Online play, bots, and an eight-army mode.',
    body: [p('chesque').body], links: p('chesque').links },
  { id: 'octastats', title: 'OctaStats', year: '2025', sub: 'UFC prediction model.',
    blurb: 'UFC fight predictions from a dynamic logit model, with a live dashboard tracking its accuracy.',
    body: [p('octa1').body, p('octa2').body], links: [...p('octa2').links.map(([h, l]) => [h, l === 'GitHub' ? 'GitHub (version 2)' : l]), ['https://github.com/zwinship/UFC_Model', 'GitHub (version 1)']] },
  { id: 'tott', title: 'Tale of the Tape', year: '2026', sub: 'Browser game.',
    blurb: 'A daily game: guess the mystery UFC fighter from stat comparisons.',
    body: [p('tott').body], links: p('tott').links },
  { id: 'mbta-led', title: 'MBTA live LED map', year: '2026', sub: 'Hardware.',
    blurb: 'A Raspberry Pi that lights an LED for every train running on the T.',
    body: [p('mbta-led').body], links: p('mbta-led').links, image: '/images/mbta_led_build.jpg' },
  { id: 'blog', title: BLOG.name, year: '2027', sub: 'First post planned for early 2027.',
    blurb: BLOG.body, body: [BLOG.body], posts: BLOG.posts },
];

const EDUCATION_ITEMS = PROFILE.education.map((e, i) => ({
  id: `edu-${i}`, title: e.degree, sub: `${e.school}, ${e.when}`, blurb: e.note,
}));

// Line colours are the MBTA's.
export const LINES = [
  { id: 'research', name: 'Research', color: '#da291c', items: RESEARCH_ITEMS },
  { id: 'software', name: 'Software', color: '#ed8b00', items: SOFTWARE_ITEMS },
  { id: 'experience', name: 'Experience', color: '#00843d', items: EXPERIENCE_ITEMS },
  { id: 'projects', name: 'Projects', color: '#003da5', items: PROJECT_ITEMS },
  { id: 'education', name: 'Education', color: '#7c878e', items: EDUCATION_ITEMS },
];

export const PAGES = LINES.flatMap(line => line.items.filter(it => it.body).map((it, i, arr) => ({
  ...it, line, index: i, count: arr.length, prev: arr[i - 1], next: arr[i + 1],
})));
export const pageById = id => PAGES.find(pg => pg.id === id);
export const lineById = id => LINES.find(l => l.id === id);

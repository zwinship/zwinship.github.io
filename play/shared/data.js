// Generated from site/src/content.js by `npm run build` in site/. Edit that file, not this one.
const RESEARCH = [
 {
  "id": "nber",
  "title": "Congestion Pricing and Emergency Medical Service Response: Evidence from New York City",
  "year": "2026",
  "badge": "NBER WP No. 35414",
  "meta": "Urban Economics · Health Policy · Causal Inference",
  "coauthors": "Yulia Chikish, Greg Colman, Dhaval Dave, Brad Humphreys and Zachary Santamaria",
  "body": "NBER Working Paper No. 35414, under journal review. Using a difference-in-discontinuities design at the 60th Street congestion relief zone boundary, we find congestion pricing reduced total EMS travel times by 63 to 70 seconds (roughly 5 to 6%), with vehicular traffic down 18 to 21% near the boundary and no evidence of displacement to adjacent areas.",
  "tags": [
   "Python",
   "Stata",
   "Causal Inference",
   "Policy"
  ],
  "links": [
   [
    "https://www.nber.org/papers/w35414",
    "NBER paper"
   ]
  ]
 },
 {
  "id": "cz",
  "title": "Traffic, Transit, and the Toll: Causal Evidence from NYC's Congestion Pricing",
  "year": "2026",
  "meta": "Urban Economics · Causal Inference · Policy Research",
  "body": "A difference-in-discontinuities design at the 60th Street boundary, with distance measured along the road network, using C2Smart traffic camera data and MTA ridership. Near the boundary, passenger vehicles fell 20.6% and trucks 18.1%, while pedestrians rose 13.5% and bicycles 19.8%. Ridership at boundary subway stations fell 24.7%, which cuts against a simple shift from cars to transit. Presented at Bentley Undergraduate Research Day.",
  "tags": [
   "Python",
   "Stata",
   "Causal Inference",
   "Spatial",
   "DD-RD"
  ],
  "links": [
   [
    "https://www.researchgate.net/publication/405220672",
    "Paper"
   ],
   [
    "https://github.com/zwinship",
    "GitHub"
   ]
  ]
 },
 {
  "id": "ozone",
  "title": "The Real Price of Clean Air: EPA Ozone Regulation",
  "year": "2025",
  "meta": "Regulatory Economics · Causal Inference · Policy",
  "body": "Uses the EPA's 0.071 ppm ozone threshold in a regression discontinuity design to estimate the revenue impact on US manufacturing firms: an estimated $277M a year in lost revenue, which the EPA's own analysis does not count.",
  "tags": [
   "Python",
   "Econometrics",
   "RDD",
   "Policy"
  ],
  "links": [
   [
    "https://policyinterns.com/2025/06/18/the-real-price-of-clean-air/",
    "Ozone blog post"
   ],
   [
    "https://policyinterns.com/2025/07/24/eslr-reform-without-precedent/",
    "eSLR blog post"
   ],
   [
    "https://zwinshippolicyintern.github.io/",
    "Map"
   ],
   [
    "https://github.com/zwinship/EPA_Ozone_Regulation_Blog",
    "GitHub"
   ]
  ]
 },
 {
  "id": "mbta-ts",
  "title": "ARIMA Modeling of MBTA Ridership",
  "year": "2025",
  "meta": "Forecasting · Transportation Economics",
  "body": "MBTA ridership modeled alongside weather and seasonal patterns to show where the T could adjust service. Built in R with reproducible code that pulls data from the source.",
  "tags": [
   "R",
   "ARIMA",
   "Forecasting",
   "Econometrics"
  ],
  "links": [
   [
    "https://www.researchgate.net/publication/391840600_UNDERGRADUATE_ARIMA_Modeling_of_MBTA_Ridership_Reducing_Costs_and_Preserving_Rider_Experience_via_Supply-Side_Optimization",
    "Paper"
   ],
   [
    "https://github.com/zwinship/MBTA_TIME_SERIES",
    "GitHub"
   ]
  ]
 },
 {
  "id": "polls",
  "title": "Election Polling: Indicator vs. Catalyst",
  "year": "2024",
  "meta": "Political Economy · Data Collection and Analysis",
  "body": "Do polls predict elections or influence them? I scraped polling data from across the web, cleaned it with Python, and tested the question on the 2024 presidential election.",
  "tags": [
   "Stata",
   "Causal Inference",
   "Econometrics",
   "Policy"
  ],
  "links": [
   [
    "https://www.researchgate.net/publication/386876438_UNDERGRADUATE_Polling_as_an_Indicator_Not_a_Catalyst_for_Election_Outcomes_Evidence_from_the_2024_US_Presidential_Election",
    "Paper"
   ],
   [
    "https://github.com/zwinship/Polling_Data_Analysis",
    "GitHub"
   ]
  ]
 },
 {
  "id": "micro",
  "title": "Intermediate Microeconomics Course Website",
  "year": "2026",
  "meta": "Interactive Education · Web Development · Ongoing",
  "body": "A full 12-week interactive Intermediate Microeconomics course built with Professor Naveen Sunder at Bentley: consumer theory, producer theory, market structure and welfare, public goods, externalities, adverse selection and moral hazard. Includes \"Ask the Course AI\", a retrieval chatbot students can ask course questions. Students are piloting it this academic year.",
  "tags": [
   "Python",
   "JSXGraph",
   "Web Development",
   "Economics",
   "AI Chatbot"
  ],
  "links": [
   [
    "https://falconeconsim.github.io/",
    "Course site"
   ],
   [
    "https://falconeconsim.github.io/ask.html",
    "Ask the Course AI"
   ]
  ]
 },
 {
  "id": "llm",
  "title": "Agentic LLMs for Economic and Game Theory Analysis",
  "year": "2026",
  "soon": true,
  "meta": "Applied AI · Behavioral Economics · Game Theory",
  "body": "Using Expected Parrot's EDSL framework (John Horton, MIT Sloan) to run language models as simulated economic agents: historical counterfactual prediction, causal impact analysis and game-theoretic behavior. The question is whether Homo silicus replicates and extends classic economics experiments.",
  "tags": [
   "Python",
   "LLMs",
   "Game Theory",
   "Behavioral Econ",
   "Causal Inference"
  ],
  "links": []
 }
];
const SOFTWARE = {
 "id": "rd2dnet",
 "title": "rd2dnet: Boundary Discontinuity Designs on Street Networks",
 "year": "2026",
 "badge": "v1",
 "meta": "Software · Spatial Econometrics · Python and R",
 "body": "rd2dnet extends rd2d (Cattaneo, Titiunik and Yu) so that distance to the boundary is measured along streets instead of in straight lines. You choose the metric: meters, travel time, a land-use contrast, a penalty for switching road class, or your own matrix. Estimation, robust bias-corrected inference, uniform bands and the bandwidth selector follow rd2d; the density test follows rddensity. Cluster-robust errors default to CR2. It ships for Python and R with the same functions and the same numbers on the bundled data; a Stata port is in testing.",
 "credit": "Built on rd2d by Matias D. Cattaneo, Rocío Titiunik and Ruiqi Rae Yu. Independent project, not affiliated with or endorsed by the rd2d authors.",
 "status": "Version 1 is out for Python (PyPI) and R. Version 2 is in development and due soon.",
 "tags": [
  "Python",
  "R",
  "Regression Discontinuity",
  "Networks",
  "Spatial"
 ],
 "links": [
  [
   "https://github.com/zwinship/rd2dnet",
   "GitHub"
  ],
  [
   "https://pypi.org/project/rd2dnet/",
   "PyPI"
  ],
  [
   "https://github.com/zwinship/rd2dnet/blob/main/examples/tutorial.ipynb",
   "Tutorial notebook"
  ],
  [
   "https://github.com/zwinship/rd2dnet/blob/main/CHANGELOG.md",
   "Changelog"
  ]
 ]
};
const PERSONAL = [
 {
  "id": "octa2",
  "title": "OctaStats UFC Model V2",
  "year": "2026",
  "meta": "Machine Learning · Sports Analytics · Full Rebuild",
  "body": "Version 2, a full rebuild a year after launch: a dynamic logit model, an automated data pipeline, and its own data instead of scraped sources.",
  "tags": [
   "Python",
   "Machine Learning",
   "Econometrics",
   "Data Collection"
  ],
  "links": [
   [
    "https://octastats.github.io/index.html",
    "Live site"
   ],
   [
    "https://github.com/zwinship/OctaStats_UFC_Model_V2",
    "GitHub"
   ]
  ]
 },
 {
  "id": "octa1",
  "title": "UFC Fight Outcome Prediction Model",
  "year": "2025",
  "meta": "Machine Learning · Sports Analytics",
  "body": "A two-stage model for UFC fights: it classifies fighters by style, then predicts matchups from how those styles interact. A live dashboard tracks accuracy and hypothetical betting returns.",
  "tags": [
   "Python",
   "Machine Learning",
   "Econometrics",
   "Web Dev"
  ],
  "links": [
   [
    "https://octastats.github.io/index.html",
    "Dashboard"
   ],
   [
    "https://github.com/zwinship/UFC_Model",
    "GitHub"
   ]
  ]
 },
 {
  "id": "tott",
  "title": "Tale of the Tape: UFC Daily Challenge",
  "year": "2026",
  "meta": "Interactive Game · Sports Analytics",
  "body": "A daily guessing game: identify a mystery UFC fighter from stat comparisons. The other UFC daily games were bad, so I built my own. New fighter every day.",
  "tags": [
   "Web Development",
   "Data Collection",
   "Sports Analytics"
  ],
  "links": [
   [
    "https://taleofthetape.github.io",
    "Play"
   ],
   [
    "https://github.com/zwinship/taleofthetape",
    "GitHub"
   ]
  ]
 },
 {
  "id": "chesque",
  "title": "Chesque",
  "year": "2026",
  "meta": "Browser Game · Chess Variant",
  "body": "Chess rules, but every piece is a hero in your army. Play people online (10 min + 5 s), bots, or a friend by link, or try Danse Macabre: eight armies, last one standing. There is a daily mate puzzle, lessons, and daily goals, all in pixel art.",
  "tags": [
   "Web Development",
   "Game Design",
   "Chess"
  ],
  "links": [
   [
    "https://chesque.pages.dev/#home",
    "Play"
   ]
  ]
 },
 {
  "id": "mbta-led",
  "title": "MBTA Live Tracker LED Art",
  "year": "2026",
  "soon": true,
  "meta": "Hardware · API Integration · Real-Time Data",
  "body": "A physical LED map on a Raspberry Pi that tracks MBTA trains in real time. The software and API work is done; the frame and LED mounting are still in progress.",
  "tags": [
   "Python",
   "Hardware",
   "MBTA API",
   "Spatial"
  ],
  "links": [
   [
    "https://github.com/zwinship/MBTA_Live_Art",
    "GitHub"
   ]
  ],
  "video": "videos/MBTA_LED_Build.mp4",
  "poster": "images/mbta_led_build.jpg"
 }
];
const EXPERIENCE = [
 {
  "role": "Research Assistant to Professor Anna Vitali",
  "org": "New York University, Department of Economics",
  "when": "Sep 2026 to present",
  "body": "Research assistant on two development field projects in Uganda: one on firm networks and mobility in Kampala's markets, one on insurance within small firms. I build and maintain the Stata data pipelines: survey cleaning, high-frequency checks, preloads for later survey rounds, and the market listing analysis."
 },
 {
  "role": "Teaching Assistant, Introductory Macroeconomics",
  "org": "New York University",
  "when": "Aug 2026 to present",
  "body": "Lead two recitation sections, about 90 students in all, and proctor and grade exams."
 },
 {
  "role": "Instructional Content Assistant",
  "org": "Bentley University",
  "when": "Summer 2026",
  "body": "Built an interactive learning platform for Intermediate Microeconomics with Professor Sunder: visualizations, practice problems, flashcards and lecture content in one chapter-by-chapter system in HTML and JavaScript.",
  "links": [
   [
    "https://falconeconsim.github.io/",
    "Course site"
   ]
  ]
 },
 {
  "role": "Research Assistant",
  "org": "Bentley University",
  "when": "May 2025 to Dec 2025",
  "body": "Wrote Python scrapers to build a dataset of ASSA conference sessions, then analyzed geographic coverage and representation in economics research with Python, Stata and text analysis, for Professor Savannah Adkins."
 },
 {
  "role": "Regulatory Data Intern",
  "org": "American Action Forum, Washington, DC",
  "when": "May 2025 to Aug 2025",
  "body": "Automated the scraping and cleaning of the federal Unified Agenda, built datasets and dashboards on regulatory activity, and wrote policy analysis and literature reviews on federal regulation. Attended congressional and agency hearings.",
  "links": [
   [
    "https://policyinterns.com/author/typhoonscented11a6c9fde0/",
    "Internship blog posts"
   ]
  ]
 }
];
const MEDIA = [["https://www.nber.org/digest/202609/urban-congestion-pricing-and-response-times-emergency-medical-services","NBER Digest","Urban congestion pricing and response times of emergency medical services"],["https://www.promarket.org/2026/09/21/new-yorks-congestion-toll-helped-ambulances-move-faster/","ProMarket","New York's congestion toll helped ambulances move faster"],["https://fortune.com/2026/07/08/nyc-congestion-pricing-ambulance-trips-one-minute-economic-benefits/","Fortune","Congestion pricing shaves a minute off ambulance trips"],["https://abc7ny.com/post/7-side-investigates-has-congestion-pricing-reduced-911-response-times/19476789/","ABC7","7 On Your Side Investigates: 911 response times"],["https://gothamist.com/news/every-second-counts-congestion-pricing-speeds-up-ambulances-in-manhattan-study-finds","Gothamist","Every second counts: congestion pricing speeds up ambulances"],["https://nyc.streetsblog.org/2026/07/07/report-shows-yet-another-benefit-to-congestion-pricing-faster-emergency-response-times","Streetsblog NYC","Yet another benefit: faster emergency response"],["https://cityobservatory.substack.com/p/the-week-observed-july-10-2026","City Observatory","The Week Observed, July 10 2026"],["https://finance.yahoo.com/economy/policy/articles/even-shaving-one-minute-off-182426964.html","Yahoo Finance","Even shaving one minute off"]];
const BLOG = [["Strava as a Proxy for Urban Crime Perception","Proxy Variables · Urban Data","Planned · Jan 2027"],["What Your Neighbor's Windows Say About Their Schedule","Spillover Effects · Time-Lapse","Planned · Mar 2027"],["Detecting AI Use via Dash Frequency in Academic Writing","Econometrics · Science of Science","Unscheduled"]];
const BLOG_STATUS = "Every two months, first post planned for early 2027";
const SKILLS = ["Python","R","Stata","SQL","LaTeX","Causal inference","Regression discontinuity","Spatial analysis","Forecasting and ARIMA","Machine learning","Web development","Raspberry Pi hardware"];
const PROFILE = {
 "name": "Zach Winship",
 "title": "Economist",
 "lede": "I'm a master's student in quantitative economics at NYU, interested in urban and transportation economics.",
 "now": "MS in Quantitative Economics at NYU, finishing May 2027.",
 "about": [
  "This year I'm a research assistant to Professor Anna Vitali and a teaching assistant for Introductory Macroeconomics.",
  "My research so far is on transport and regulation in the US: congestion pricing in New York, the EPA's ozone standard, and ridership on Boston's subway. I also wrote rd2dnet, a package for boundary discontinuity designs on street networks.",
  "Outside of that I build things: a UFC prediction model, a chess game, a daily guessing game, and an LED map of the T.",
  "I work mostly in Python, R and Stata, along with SQL, JavaScript and LaTeX."
 ],
 "education": [
  {
   "degree": "MS in Quantitative Economics",
   "school": "New York University",
   "when": "Summer 2026 to May 2027",
   "note": "NYU Economics Teaching Fellowship, Summer 2026."
  },
  {
   "degree": "BS in Quantitative Economics",
   "school": "Bentley University",
   "when": "May 2026",
   "note": "Minors in Mathematics and Data Technologies. GPA 3.74, on the Dean's or President's List every semester. Coursework in econometrics, statistical analysis, data analytics, mathematical economics and public policy analysis."
  }
 ],
 "skills": [
  "Python",
  "R",
  "Stata",
  "SQL",
  "LaTeX",
  "Causal inference",
  "Regression discontinuity",
  "Spatial analysis",
  "Forecasting and ARIMA",
  "Machine learning",
  "Web development",
  "Raspberry Pi hardware"
 ]
};
const EMAIL = "zachtwinship@gmail.com";
const byId = id => [...RESEARCH, SOFTWARE, ...PERSONAL].find(p => p.id === id);

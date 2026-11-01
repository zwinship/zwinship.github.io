// Generated from site/src/content.js by `npm run build` in site/. Edit that file, not this one.
const RESEARCH = [
 {
  "id": "nber",
  "title": "Congestion Pricing and EMS Response Time: Evidence From New York City",
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
  "title": "NYC Congestion Pricing: Mobility and Commercial Effects",
  "year": "2026",
  "meta": "Urban Economics · Causal Inference · Policy Research",
  "body": "A difference-in-discontinuities design using C2Smart traffic camera data and MTA ridership records to estimate the effect of NYC's congestion pricing zone on vehicle traffic, pedestrian activity, subway ridership and commercial outcomes at the 60th Street boundary.",
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
  "body": "Uses the EPA's 0.071 ppm ozone threshold in a regression discontinuity design to estimate the revenue impact on U.S. manufacturing firms: a $277M annual reduction that the EPA's own analysis leaves out.",
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
  "year": "Est. Aug 2026",
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
 "body": "rd2dnet carries the boundary discontinuity framework of rd2d (Cattaneo, Titiunik and Yu) from Euclidean coordinates to network coordinates. Distance to the boundary is measured along streets, and you choose the metric: metres, travel time, a land-use contrast, a penalty for switching road class, or your own matrix. Estimation, robust bias-corrected inference, uniform bands and the bandwidth selector follow rd2d; the density test follows rddensity. Cluster-robust errors default to CR2. It ships for Python and R with the same functions and the same numbers on the bundled data; a Stata port is in testing.",
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
  "body": "Rebuilt from the ground up for the model's first anniversary: a dynamic logit framework, an automated data pipeline, and proprietary data with no reliance on scraped third-party sources.",
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
  "id": "mbta-ts",
  "title": "MBTA Time Series Analysis",
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
  "id": "mbta-led",
  "title": "MBTA Live Tracker LED Art",
  "year": "Est. Jun 2026",
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
const PRESENTATIONS = [
 {
  "title": "Infrastructure Maintenance: Evidence from India",
  "meta": "Bentley University · 2026",
  "body": "Chaurey and Le's paper on the RSVY program, India's 2003 to 2007 maintenance initiative for 147 \"backward districts.\" With a regression discontinuity at the backwardness-index threshold, the paper finds maintenance spending (not new construction) raised village non-farm employment 14 to 16%, entirely through informal microenterprises.",
  "tags": [
   "Development Economics",
   "Regression Discontinuity",
   "Infrastructure Policy",
   "India",
   "Causal Inference"
  ],
  "pdf": "presentations/Infrastructure_Maintenance_Evidence_From_India_Presentation.pdf",
  "vids": [
   [
    "videos/methodology/RDThisPaper.mp4",
    "RD design: this paper"
   ],
   [
    "videos/methodology/RDVariants.mp4",
    "RD functional form variants"
   ],
   [
    "videos/methodology/DiffInDisc.mp4",
    "Difference-in-discontinuities"
   ],
   [
    "videos/methodology/CompositeIndexCritique.mp4",
    "Composite index critique"
   ]
  ]
 },
 {
  "title": "Rural Roads and Local Economic Development",
  "meta": "Bentley University · 2026",
  "body": "Taught Asher and Novosad's (2019) paper to a class: the instrumental variable strategy, the spatial identification, and what it means for rural infrastructure policy.",
  "tags": [
   "Development Economics",
   "Causal Inference",
   "Teaching",
   "IV Strategy"
  ],
  "pdf": "presentations/Rural_Roads_and_Local_Economic_Development_Presentation.pdf"
 },
 {
  "title": "VAR and VECM Time Series Models",
  "meta": "Bentley University · 2025",
  "body": "Taught a class on vector autoregressions and vector error correction models: how they work and how to use them on economic data.",
  "tags": [
   "Econometrics",
   "Time Series",
   "Teaching"
  ],
  "pdf": "presentations/VAR_VECM_Presentation.pdf"
 },
 {
  "title": "Visualizing Experimental Economics Theory",
  "meta": "Bentley University · 2025",
  "body": "An animated explainer of our experiment's theoretical predictions: the game's structure, the equilibrium intuition and the math, in a 3Blue1Brown-inspired style.",
  "tags": [
   "Game Theory",
   "Python Animation",
   "Educational Content",
   "Mathematical Modeling"
  ],
  "vids": [
   [
    "videos/EffortModel.mp4",
    "Effort model explainer"
   ]
  ],
  "gh": "https://github.com/zwinship/visualizing-experimental-econ-theory"
 },
 {
  "title": "Regulation with Limited Information",
  "meta": "American Action Forum · 2025",
  "body": "Regulatory reform when data is thin: ways to make policy decisions and analyze regulatory impacts when information is incomplete.",
  "tags": [
   "Policy Analysis",
   "Regulatory Economics",
   "Public Policy"
  ],
  "pdf": "presentations/Regulation_Limited_Info_Presentation.pdf"
 },
 {
  "title": "Traffic, Transit, and the Toll: Causal Evidence from NYC's Congestion Pricing Policy",
  "meta": "Bentley University · Undergraduate Research Day · 2025",
  "body": "My capstone paper at Bentley Undergraduate Research Day: the difference-in-discontinuities strategy, the C2Smart and MTA data, and results for traffic, pedestrians, subway ridership and businesses at the 60th Street boundary.",
  "tags": [
   "Urban Economics",
   "Transportation Policy",
   "Causal Inference",
   "Regression Discontinuity",
   "NYC"
  ],
  "pdf": "presentations/NYC_CZ_Presentation.pdf"
 }
];
const EXPERIENCE = [
 {
  "role": "Research Assistant to Professor Anna Vitali",
  "org": "New York University, Department of Economics",
  "when": "Sep 2026 to May 2027",
  "body": "Research assistant on two development field projects in Uganda: one on firm networks and mobility in Kampala's markets, one on insurance within small firms. I build and maintain the Stata data pipelines: survey cleaning, high-frequency checks, preloads for later survey rounds, and the market listing analysis. Also my MSQE Research Practicum."
 },
 {
  "role": "Teaching Assistant, Introductory Macroeconomics",
  "org": "New York University",
  "when": "Aug 2026 to present",
  "body": "Weekly recitations on course material and problem sets, exam proctoring and grading, and grade entry."
 },
 {
  "role": "NYU Economics Teaching Fellowship",
  "org": "New York University",
  "when": "Summer 2026",
  "body": "Teaching fellowship in the NYU Economics department over the summer 2026 session, supporting undergraduate economics instruction."
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
  "when": "May 2025 to Aug 2025",
  "body": "Compiled and analyzed data on 2025 ASSA conference education sessions, with a focus on geographic distribution and representation, for Professor Savannah Adkins's research on global trends and socioeconomic bias in economics publishing."
 },
 {
  "role": "Regulatory Data Intern",
  "org": "American Action Forum · Washington, DC",
  "when": "May 2025 to Aug 2025",
  "body": "Compiled and cleaned regulatory datasets in Python, produced statistical summaries, and reviewed literature on the economic impact of federal regulations. Attended congressional and agency hearings on regulatory policy.",
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
 "title": "Quantitative Economist and Data Analyst",
 "lede": "I study cities and transport with causal inference: where a policy line falls on a street map, and what changes on either side of it.",
 "now": "MS in Quantitative Economics at NYU, finishing May 2027.",
 "about": [
  "I recently graduated from Bentley University with a BS in Quantitative Economics and a double minor in Mathematics and Data Technologies. I'm now pursuing the MS in Quantitative Economics at New York University, expected May 2027, where I'm a teaching assistant for Introductory Macroeconomics and a research assistant to Professor Anna Vitali.",
  "My work sits at the intersection of data and policy. I'm drawn to questions where careful empirical methods can cut through noise and say something concrete about how the world works. I'm a co-author on an NBER working paper on how NYC's congestion pricing changed EMS response times, and I wrote rd2dnet, a package for boundary discontinuity designs on street networks.",
  "Outside of coursework I spend a lot of time on personal projects. Most people have portfolios full of coursework; this one is made up of things I chose to spend my time on. I'm especially interested in transportation economics, spatial analytics, optimization, and Homo silicus: using language models as simulated economic agents to replicate classic experiments."
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
   "when": "Graduated May 2026",
   "note": "Double minor in Mathematics and Data Technologies. GPA 3.74. Coursework in econometrics, statistical analysis, data analytics, mathematical economics and public policy analysis."
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
const EMAIL = "zwinship@bentley.edu";
const byId = id => [...RESEARCH, SOFTWARE, ...PERSONAL].find(p => p.id === id);

// PlasticOptics microsite content.
// Primary source: "PlasticOptics" Google Doc, V2 tab (stages, unit economics,
// Stage 0 budget). Later stages (food, removal, in-line analysis) come from the
// "Plasticoptics Master Plan". External facts carry sources.
// Market sizes and total capital are back-of-the-envelope estimates.
// Money is INR. L = lakh (1e5), Cr = crore (1e7).

export { EMAIL } from "@/lib/site";

export const PAGES = [
  { path: "/plastic", label: "Overview" },
  { path: "/plastic/technology", label: "Technology" },
  { path: "/plastic/business", label: "Business" },
];

/* ───────────────────────── V2: overview ───────────────────────── */

export const goal = "The goal is to measure and remove microplastics from water, food and air.";

// Phase 1 is water; food and air follow. Stages belong to Phase 1.
export const phases = [
  {
    n: 1,
    name: "Water",
    text: "The research is ready to begin. Water is the first market, and its methods carry over to food and air.",
  },
  {
    n: 2,
    name: "Food",
    text: "Salt, sugar, milk and other staples. Salt, for example, is dissolved in water, filtered and tested the same way. Removal from food is harder.",
  },
  {
    n: 3,
    name: "Air",
    text: "Airborne particles settle on a water surface and are tested with the same method.",
  },
];

export const focus =
  "Phase 1 (water) takes about four years: the test cartridge, the benchtop analyser, an affordable Raman spectrometer and removal. Stages overlap from Year 3.";

// The Problem: three short reasons, each with sources.
export const problem: { k: string; text: string; src: (keyof typeof SOURCES)[] }[] = [
  {
    k: "Health",
    text: "One study estimated about 240,000 plastic particles in a litre of bottled water, about 90% of them nanoplastics. In patients with carotid artery disease, those with micro- or nanoplastics in their plaque had 4.5 times the risk of heart attack, stroke or death. The study shows an association, not a cause.",
    src: ["pnasBottled", "nejmPlaque"],
  },
  {
    k: "Regulation",
    text: "The Madras High Court has ordered a microplastics warning on PET bottled water, salt and sugar. The Supreme Court declined to interfere.",
    src: ["madrasHc", "supremeCourt"],
  },
  {
    k: "Testing",
    text: "SGS and Eurofins quote ₹75,000 per test. SGS ships samples abroad, and its results take more than ten days.",
    src: [],
  },
];

export const discovery = [
  "None of the 10–15 beverage contract manufacturers consulted has been asked by a buyer to test for microplastics.",
  "Testing laboratories receive such a request about once a year. Awareness is the main barrier.",
];

export const customers = [
  {
    name: "Premium packaged water brands",
    text: "Brands that compete on purity, such as Backbay, Uravu and Smartwater, for which testing is a competitive advantage.",
  },
  {
    name: "Injectable pharmaceutical manufacturers",
    text: "They already count particles in every batch, but cannot tell which particles are plastic.",
  },
  {
    name: "Export beverage contractors",
    text: "Buyers in Europe and Australia are beginning to set microplastic requirements that suppliers must meet.",
  },
];

// Phase 1 stages. start and end are in years from today, for the timeline.
export const stages: {
  n: number;
  name: string;
  when: string;
  start: number;
  end: number;
  ongoing?: boolean;
  what: string;
  notes: string[];
  funding: string;
  current?: boolean;
}[] = [
  {
    n: 0,
    name: "Build the test cartridge",
    when: "Months 0–9",
    start: 0,
    end: 0.75,
    what: "The core of the system: a single-use cartridge that detects microplastics and distinguishes them from other particles.",
    notes: [
      "The principal challenge is performance in real water samples.",
      "Research collaboration with Prof. Sarit S. Agasti and Prof. Suryasarathi Bose.",
      "Launch of the Microplastics Index to raise awareness of the problem.",
    ],
    funding: "₹23.8 lakh (this request)",
    current: true,
  },
  {
    n: 1,
    name: "Build the benchtop analyser",
    when: "Months 9–24",
    start: 0.75,
    end: 2,
    what: "An industrial prototype installed in plants. It reports particle counts and plastic classes.",
    notes: [
      "Rapid iteration of the prototype, with five pilot plants.",
      "A testing service at ₹5,000 per sample, which also builds the data set.",
    ],
    funding: "₹75 lakh (BIRAC BIG, NIDHI-PRAYAS, service revenue)",
  },
  {
    n: 2,
    name: "Scale the benchtop analyser",
    when: "Years 3–4",
    start: 2,
    end: 4,
    what: "Growth from five pilot plants to 20 plants in Year 3 and 60 by the end of Year 4.",
    notes: [
      "Expansion of the team.",
      "Contract manufacturing of test cartridges and benchtop analysers.",
      "A sales and marketing organisation.",
    ],
    funding: "₹5 crore (Seed)",
  },
  {
    n: 3,
    name: "Build an affordable Raman spectrometer",
    when: "Years 3–4, in parallel",
    start: 2,
    end: 4,
    what: "Counts and identifies each particle, so that a plant can trace its source.",
    notes: [
      "Highly challenging: many components are under controlled intellectual property, and the supply chain must be redesigned.",
    ],
    funding: "Series A",
  },
  {
    n: 4,
    name: "Removal kit",
    when: "Year 4, in parallel",
    start: 3,
    end: 4,
    what: "A simple kit, attached to a filter at a plant outlet, that removes microplastics.",
    notes: [
      "Research on removal is extensive, but no commercial product exists. The challenge is a technology that is scalable and usable.",
    ],
    funding: "Series B",
  },
  {
    n: 5,
    name: "Scale",
    when: "Year 5 onward",
    start: 4,
    end: 5,
    ongoing: true,
    what: "120 plants in Year 5. The removal kit and Raman spectrometer are scaled while benchtop analysers sell in India, and the benchtop analyser is taken to Dubai and Singapore, where testing is not limited to spectroscopy.",
    notes: ["The first PlasticOptics factory."],
    funding: "Series C",
  },
];

export const prices = {
  device: 800000, // ₹, also the catch-all for service and maintenance per active plant per year
  cartridge: 2000, // ₹
  testsPerYear: 360,
  marginPct: 80,
};

export const landedCost = [
  { item: "Benchtop analyser", inputs: ["₹1.2 lakh optics", "₹40,000 assembly and calibration"], total: "₹1.6 lakh" },
  { item: "Test cartridge", inputs: ["₹400 assembly and AI token costs"], total: "₹400" },
];

export const incumbent = { equipment: "₹1.5 crore", perTest: "₹75,000" };

// Break-even table exactly as in "PlasticOptics - Latest" (Nov 2026). Values in ₹ lakh.
// Device column is ₹8 lakh × ACTIVE plants: a catch-all for device sales, service and maintenance.
// Costs are not yet modelled beyond Year 1; blank cells are deliberate.
export const breakEven = [
  { year: 1, active: 0, added: 0, cartridges: 0, device: 0, revenue: "0", capital: "₹23.8 L", costs: "₹23.8 L" },
  { year: 2, active: 0, added: 0, cartridges: 0, device: 0, revenue: "0", capital: "₹75 L", costs: "" },
  { year: 3, active: 20, added: 20, cartridges: 144, device: 160, revenue: "₹3.04 Cr", capital: "", costs: "" },
  { year: 4, active: 60, added: 40, cartridges: 432, device: 480, revenue: "₹9.12 Cr", capital: "", costs: "" },
  { year: 5, active: 120, added: 60, cartridges: 864, device: 960, revenue: "₹18.24 Cr", capital: "", costs: "" },
];

export const microplasticsIndex = [
  "Leading bottled water brands are tested regularly and the results are published.",
  "Public results create demand from brands, and a ₹5,000 test makes it cheap for a brand to respond.",
];

export const objective = {
  pilot: "Uravu Labs, Bengaluru (proposed).",
};

export const budget = [
  { item: "Research collaboration", v: 8.5 },
  { item: "Optical equipment", v: 4 },
  { item: "Lab space and equipment", v: 3 },
  { item: "Analytical balance", v: 2.8 },
  { item: "Reagents and membranes", v: 2 },
  { item: "AI counting", v: 2 },
  { item: "Sample collection", v: 1 },
  { item: "Raman/FTIR reference testing", v: 0.5 },
];

export const stage0Done = [
  "Microplastics counted by PlasticOptics are equivalent to those counted by Raman spectroscopy on the same samples.",
  "The method counts microplastics accurately in water that contains iron, organic matter or suspended solids.",
  "The maintenance requirements of the analyser and the final cost of a cartridge are known.",
  "Customer interviews are complete, and the first pilot plant has agreed to take part.",
];

export const afterStage0 = "On completion of Stage 0, the company will apply for BIRAC BIG or NIDHI-PRAYAS funding and incubation support.";

export const founder = {
  name: "Sri Nikitha T",
  bio: "Eight years in manufacturing, government and technology: process innovation at NRB Bearings, industrial wastewater treatment at Ecosattva, the Government of Telangana Innovation Fellowship, and AI product management. IIT Kharagpur and Ashoka University.",
};

/* ───────────────────────── Market facts (sourced) ───────────────────────── */

export const SOURCES = {
  pnasBottled: {
    label: "Qian et al., PNAS (2024): about 240,000 plastic particles per litre of bottled water",
    url: "https://www.pnas.org/doi/10.1073/pnas.2300582121",
  },
  nejmPlaque: {
    label: "Marfella et al., New England Journal of Medicine (2024): microplastics in carotid plaque and cardiovascular events",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2309822",
  },
  madrasHc: {
    label: "Verdictum, Madras High Court orders microplastics warning on PET bottled water, salt and sugar (Feb 2026)",
    url: "https://www.verdictum.in/madras-high-court/food-safety-and-standards-authority-of-india-v-g-subramania-koushik-2026mhc3978-may-contain-microplastics-label-mandatory-pet-bottle-water-sugar-salt-1623145",
  },
  supremeCourt: {
    label: "Daily Excelsior, Supreme Court: nothing wrong in displaying the warning (Apr 2026)",
    url: "https://www.dailyexcelsior.com/?p=2189290",
  },
  madrasHcRecall: {
    label: "Bar & Bench, Madras High Court refuses to recall microplastics disclosure order (Sept 2026)",
    url: "https://www.barandbench.com/news/litigation/madras-high-court-refuses-to-recall-order-to-disclose-microplastics-in-packaged-water-sugar-salt",
  },
  bis: {
    label: "BIS, compulsory certification of packaged drinking water (Sept 2022)",
    url: "https://services.bis.gov.in/php/BIS_2.0/BISBlog/?p=610",
  },
  ibef: {
    label: "IBEF, India packaged drinking water industry outlook",
    url: "https://www.ibef.org/blogs/india-packaged-drinking-water-industry-demand-trends-and-market-outlook",
  },
  california: {
    label: "California State Water Board, microplastics policy handbook (2022)",
    url: "https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/mp-hndbk.pdf",
  },
  californiaNews: {
    label: "CalMatters, California approves microplastics testing (Sept 2022)",
    url: "https://calmatters.org/environment/2022/09/california-microplastics-testing-drinking-water-sources/",
  },
  eu: {
    label: "Commission Delegated Decision (EU) 2024/1441",
    url: "https://eur-lex.europa.eu/eli/dec_del/2024/1441/oj/eng",
  },
  jrc: {
    label: "EU Joint Research Centre, methodology to measure microplastics in drinking water (2024)",
    url: "https://joint-research-centre.ec.europa.eu/jrc-news-and-updates/new-methodology-measure-microplastics-eus-drinking-water-2024-04-23_en",
  },
  fssai: {
    label: "Business Standard, FSSAI launches project on microplastics in food (Aug 2024)",
    url: "https://business-standard.com/amp/health/fssai-launches-project-to-tackle-microplastic-contamination-in-food-124081800288_1.html",
  },
  bisleri: {
    label: "Business Today, Bisleri has 128 plants (Sept 2023)",
    url: "https://businesstoday.in/interactive/photo-essay/bisleris-thirst-for-dominance-how-jayanti-chauhan-is-propelling-the-brand-to-greater-heights-110-28-09-2023",
  },
  indiaVolume: {
    label: "Research and Markets, India packaged water: 24.92 billion litres in 2024",
    url: "https://www.researchandmarkets.com/report/india-packaged-water-market",
  },
  unu: {
    label: "UNU-INWEH, Global Bottled Water Industry (2023): 350 billion litres, US$270 billion",
    url: "https://unu.edu/inweh/collection/global-bottled-water-industry-review-impacts-and-trends",
  },
  mpDetection: {
    label: "MarketsandMarkets, microplastic detection market: US$4.76 billion in 2024",
    url: "https://www.marketsandmarkets.com/Market-Reports/microplastic-detection-market-17417476.html",
  },
  foodTesting: {
    label: "Fortune Business Insights, food safety testing market: US$24.24 billion in 2024",
    url: "https://www.fortunebusinessinsights.com/food-safety-testing-market-108286",
  },
  fssaiLabs: {
    label: "FSSAI, notified food testing laboratories (206 as of January 2024)",
    url: "https://fssai.gov.in/cms/food-laboratories.php",
  },
  airIndia: {
    label: "IMARC, India air quality monitoring market: US$170 million in 2024",
    url: "https://www.imarcgroup.com/india-air-quality-monitoring-market",
  },
  airGlobal: {
    label: "IMARC, air quality monitoring market: US$5.2 billion in 2024",
    url: "https://imarcgroup.com/air-quality-monitoring-market-statistics",
  },
  airStations: {
    label: "CREA, Tracing the Hazy Air 2025: 1,524 monitoring stations in India",
    url: "https://energyandcleanair.org/publication/tracing-the-hazy-air-2025-progress-report-on-national-clean-air-programme-ncap/",
  },
  matter: {
    label: "Tech.eu, Matter raises $10M (Aug 2023)",
    url: "https://tech.eu/2023/08/11/matter-10m-microplastics-filtration-technology/",
  },
  polygone: {
    label: "Business Wire, PolyGone Systems raises $4M seed (Feb 2026)",
    url: "https://www.businesswire.com/news/home/20260218402495/en/PolyGone-Systems-Raises-$4M-Seed-Round-to-Scale-Microplastic-Monitoring-and-Removal",
  },
  klar2o: {
    label: "Startbase, Klar2O raises €4.5M Series A (Sept 2025)",
    url: "https://www.startbase.com/news/45-mio-e-series-a-fuer-klar2o/",
  },
  uravu: {
    label: "Mongabay India, Uravu Labs air-to-water (Aug 2024)",
    url: "https://india.mongabay.com/2024/08/innovative-air-to-water-tech-using-liquid-desiccant-makes-affordable-renewable-water/",
  },
};

export const market = {
  licensedPlants: 6200, // BIS licences for packaged drinking water, IS 14543 (">6,200", Sept 2022)
  packagedWaterMarketCr: 32040, // IBEF, 2025
  packagedWaterMarket2032Cr: 57850,
  nationalBrandPlants: 500, // estimate: plants bottling for national brands; Bisleri alone has 128
  indiaVolumeBnL: 24.92, // 2024
  globalVolumeBnL: 350, // 2021
  usd: 85, // ₹ per US$, for conversion
};

/* ───────────────────────── Current status ───────────────────────── */

export const status = {
  summary: "PlasticOptics is in Stage 0. Fluorescence experiments on Kaveri river samples are under way in a home laboratory, with results cross-checked by Raman spectroscopy. The method is not yet validated.",
  inPlace: [
    "Access to a Raman spectrometer for reference testing.",
    "Most of the materials required for the Stage 0 experiments.",
    "Conversations with 10–15 beverage contract manufacturers and with testing laboratories.",
    "Price quotes for microplastic testing from SGS and Eurofins.",
    "Agreement from Prof. Sarit S. Agasti (JNCASR) and Prof. Suryasarathi Bose (IISc) to collaborate.",
  ],
  conclusion:
    "The funding requested pays for the experiments that establish whether the method works, and for a first prototype.",
};

export const whyNow = [
  {
    when: "2026",
    where: "India · Madras High Court",
    what: "Ordered PET bottled water, packaged salt and packaged sugar to carry a warning that they may contain micro- or nano-plastics. The Supreme Court declined to interfere, and the High Court refused to recall the order.",
    src: ["madrasHc", "madrasHcRecall"] as const,
  },
  {
    when: "2022",
    where: "California",
    what: "First jurisdiction to require microplastic testing of drinking water. Testing of treated water is scheduled for 2026–2028. Estimated cost: $1,000–2,000 per sample.",
    src: ["california", "californiaNews"] as const,
  },
  {
    when: "2024",
    where: "European Union",
    what: "Adopted a standard method for measuring microplastics in drinking water, ahead of watch-list inclusion. The method requires a minimum sample of 1,000 litres.",
    src: ["eu", "jrc"] as const,
  },
  {
    when: "2024",
    where: "India · FSSAI",
    what: "Launched a project on micro- and nano-plastics in food with CSIR-IITR, ICAR-CIFT and BITS Pilani to validate detection methods.",
    src: ["fssai"] as const,
  },
];

/* ───────────────────────── Go-to-market ───────────────────────── */

export const pathToMarket = [
  {
    step: "Validate",
    stage: "Stage 0 · months 0–9",
    body: "Build the test cartridge and demonstrate agreement with Raman. Confirm performance in real water. Launch the Microplastics Index.",
  },
  {
    step: "Pilot",
    stage: "Stage 1 · months 9–24",
    body: "Build the benchtop analyser and run five pilot plants. Offer a testing service at ₹5,000 per sample to build data and demand.",
  },
  {
    step: "Sell",
    stage: "Stage 2 · Years 3–4",
    body: "Sell the analyser with test cartridges, service and maintenance: 20 plants in Year 3 and 60 by the end of Year 4.",
  },
];

export const risks = [
  {
    risk: "Measurement accuracy",
    test: "Counts agree with Raman/FTIR on identical samples.",
    when: "Stage 0",
  },
  {
    risk: "Performance in real water",
    test: "Counts remain accurate with iron, organic matter and turbidity present.",
    when: "Stage 0",
  },
  {
    risk: "Cartridge cost",
    test: "Landed cost of ₹400 or less per cartridge.",
    when: "Stage 0",
  },
  {
    risk: "Awareness",
    test: "Buyers rarely request microplastic testing today. The Microplastics Index and the testing service must create demand.",
    when: "Stages 0–1",
  },
  {
    risk: "Pricing",
    test: "Customers accept ₹2,000 per cartridge and ₹8 lakh for the analyser.",
    when: "Stage 1",
  },
  {
    risk: "Usage",
    test: "About one test a day per plant (360 a year).",
    when: "Stages 1–2",
  },
];

/* ───────────────────────── Research collaborators ───────────────────────── */

export const collaborators = [
  {
    name: "Prof. Sarit S. Agasti",
    role: "Associate Professor, New Chemistry Unit",
    org: "JNCASR, Bengaluru",
    work: "Imaging and sensing chemistry; super-resolution microscopy.",
    url: "https://www.jncasr.ac.in/faculty/sagasti",
  },
  {
    name: "Prof. Suryasarathi Bose",
    role: "Professor, Department of Materials Engineering",
    org: "IISc, Bengaluru",
    work: "Polymer materials for water treatment, including a microplastic-removing hydrogel (2024).",
    url: "https://iisc.ac.in/events/novel-hydrogel-removes-microplastics-from-water/",
  },
];
